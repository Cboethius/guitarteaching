import path from "path";

/** Writable JSON store path — `/tmp` on Vercel, `data/` locally. */
export function dataDir() {
  if (process.env.VERCEL) {
    return path.join("/tmp", "axschool-data");
  }
  return path.join(process.cwd(), "data");
}
