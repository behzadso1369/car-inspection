/** Normalize API media paths and serve them same-origin to avoid third-party cookies. */
export function apiAssetUrl(path?: string | null): string {
  if (!path) return "";
  const trimmed = String(path).trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      if (url.hostname === "api.carmacheck.com") {
        return `/media${url.pathname}${url.search}`;
      }
    } catch {
      return trimmed;
    }
    return trimmed;
  }
  const clean = trimmed.replace(/\\/g, "/").replace(/^\/+/, "");
  return `/media/${clean}`;
}
