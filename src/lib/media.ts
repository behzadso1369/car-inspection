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

/** Turn slider/banner API links into in-app paths when they point at carmacheck.com. */
export function sliderHref(link?: string | null): string | null {
  const trimmed = String(link ?? "").trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed, "https://carmacheck.com");
    const host = url.hostname.replace(/^www\./, "");
    if (host === "carmacheck.com" || host === "localhost") {
      return `${url.pathname}${url.search}${url.hash}` || "/";
    }
    return trimmed;
  } catch {
    return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  }
}
