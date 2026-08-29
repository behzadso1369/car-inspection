export function getReadingTime(html: string, wpm = 200): number {
  if (!html) return 1;

  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&zwnj;|\u200c/gi, "")
    .replace(/&nbsp;|\u00a0/gi, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / wpm));
}
