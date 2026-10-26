// Mirrors next.config.ts's basePath. next/link resolves basePath on its own,
// but raw src strings (<img>, <video>, <source>) don't, so this prefixes them
// by hand while the site is served from https://<user>.github.io/plotnikova/.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
