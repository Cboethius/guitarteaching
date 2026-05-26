import { promises as fs } from "fs";
import path from "path";
import { dataDir } from "./data-dir";

const READ_RETRIES = 3;
const WRITE_RETRIES = 6;

type BlobRead<T> = {
  data: T;
  etag: string | null;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function usesBlobStore() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readBlobStore<T>(
  filename: string,
  fallback: T,
): Promise<BlobRead<T>> {
  const { get, head, BlobNotFoundError } = await import("@vercel/blob");

  let etag: string | null = null;
  try {
    const meta = await head(filename);
    etag = meta.etag ?? null;
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      return { data: fallback, etag: null };
    }
    throw error;
  }

  const result = await get(filename, { access: "private" });
  if (!result?.stream) {
    return { data: fallback, etag };
  }

  const text = await new Response(result.stream).text();
  if (!text.trim()) {
    return { data: fallback, etag };
  }

  return {
    data: JSON.parse(text) as T,
    etag,
  };
}

async function readFileStore<T>(filename: string, fallback: T): Promise<T> {
  const file = path.join(dataDir(), filename);
  try {
    const raw = await fs.readFile(file, "utf-8");
    if (!raw.trim()) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeFileStore<T>(filename: string, data: T): Promise<void> {
  const dir = dataDir();
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, filename),
    JSON.stringify(data, null, 2),
    "utf-8",
  );
}

/** Shared JSON persistence — Vercel Blob on production, local files in dev. */
export async function readJsonStore<T>(filename: string, fallback: T): Promise<T> {
  if (!usesBlobStore()) {
    if (process.env.VERCEL) {
      console.warn(
        `[json-store] BLOB_READ_WRITE_TOKEN missing — using ephemeral /tmp for ${filename}`,
      );
    }
    return readFileStore(filename, fallback);
  }

  let lastError: unknown;
  for (let attempt = 0; attempt < READ_RETRIES; attempt++) {
    try {
      const { data } = await readBlobStore(filename, fallback);
      return data;
    } catch (error) {
      lastError = error;
      if (attempt < READ_RETRIES - 1) {
        await sleep(80 * (attempt + 1));
      }
    }
  }

  console.error(`[json-store] Failed to read ${filename}:`, lastError);
  throw lastError;
}

export async function writeJsonStore<T>(filename: string, data: T): Promise<void> {
  if (!usesBlobStore()) {
    await writeFileStore(filename, data);
    return;
  }

  const { put } = await import("@vercel/blob");
  await put(filename, JSON.stringify(data, null, 2), {
    access: "private",
    allowOverwrite: true,
    contentType: "application/json",
  });
}

/** Atomic read-modify-write with Blob ETag checks to avoid lost updates. */
export async function updateJsonStore<T>(
  filename: string,
  fallback: T,
  updater: (current: T) => T,
): Promise<T> {
  if (!usesBlobStore()) {
    const current = await readFileStore(filename, fallback);
    const next = updater(current);
    await writeFileStore(filename, next);
    return next;
  }

  const { put, BlobPreconditionFailedError } = await import("@vercel/blob");

  for (let attempt = 0; attempt < WRITE_RETRIES; attempt++) {
    const { data, etag } = await readBlobStore(filename, fallback);
    const next = updater(data);

    try {
      await put(filename, JSON.stringify(next, null, 2), {
        access: "private",
        allowOverwrite: true,
        contentType: "application/json",
        ...(etag ? { ifMatch: etag } : {}),
      });
      return next;
    } catch (error) {
      if (
        error instanceof BlobPreconditionFailedError &&
        attempt < WRITE_RETRIES - 1
      ) {
        continue;
      }
      throw error;
    }
  }

  throw new Error(`Failed to update ${filename} after concurrent writes`);
}
