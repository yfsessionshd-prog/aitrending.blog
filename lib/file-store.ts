import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";

function mutableDataPath(name: string) {
  return process.env.VERCEL ? join(tmpdir(), "aitrending-data", name) : join(process.cwd(), "data", name);
}

function bundledDataPath(name: string) {
  return join(process.cwd(), "data", name);
}

function ensureFile(name: string, fallback: unknown) {
  const path = mutableDataPath(name);
  const directory = dirname(path);
  if (!existsSync(directory)) mkdirSync(directory, { recursive: true });
  if (existsSync(path)) return path;

  const bundled = bundledDataPath(name);
  if (bundled !== path && existsSync(bundled)) {
    writeFileSync(path, readFileSync(bundled, "utf8"), "utf8");
    return path;
  }

  writeFileSync(path, JSON.stringify(fallback, null, 2), "utf8");
  return path;
}

export function readStore<T>(name: string, fallback: T): T {
  const path = ensureFile(name, fallback);
  try {
    const raw = readFileSync(path, "utf8").replace(/^\uFEFF/, "").trim();
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore(name: string, data: unknown) {
  const path = ensureFile(name, Array.isArray(data) ? [] : {});
  writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
}
