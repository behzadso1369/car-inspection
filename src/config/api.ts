export const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_ORIGIN ?? "https://api-test.carmacheck.com";

export const API_BASE_URL = `${API_ORIGIN}/api/`;

/** مسیر نسبی یا مطلق تصاویر/فایل‌های API */
export function apiMediaUrl(path: string): string {
  if (!path) return "";
  const trimmed = path.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `${API_ORIGIN}/${trimmed.replace(/^\//, "")}`;
}
