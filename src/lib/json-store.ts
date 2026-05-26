import { promises as fs } from "fs";
import path from "path";
import { dataDir } from "./data-dir";

/** Shared JSON persistence — Vercel Blob on production, local files in dev. */
export async function readJsonStore<T>(filename: string, fallback: T): Promise<T> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { get } = await import("@vercel/blob");
    const result = await get(filename, { access: "private" });
    if (!result || result.statusCode !== 200) return fallback;
    const text = await new Response(result.stream).text();
    if (!text.trim()) return fallback;
    return JSON.parse(text) as T;
  }

  const file = path.join(dataDir(), filename);
  try {
    const raw = await fs.readFile(file, "utf-8");
    if (!raw.trim()) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonStore<T>(filename: string, data: T): Promise<void> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    await put(filename, JSON.stringify(data, null, 2), {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  const dir = dataDir();
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), JSON.stringify(data, null, 2), "utf-8");
}
