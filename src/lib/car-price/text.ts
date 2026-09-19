export function normalizeText(text: string) {
  if (!text) return "";

  let value = String(text).trim().toLocaleLowerCase("en-US");

  value = value
    .replace(/ي/g, "ی")
    .replace(/ى/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ی")
    .replace(/[\u200c\u200f\u200e\u202a-\u202e]/g, " ");

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  const englishDigits = "0123456789";

  for (let i = 0; i < 10; i++) {
    value = value.replaceAll(persianDigits[i], englishDigits[i]);
    value = value.replaceAll(arabicDigits[i], englishDigits[i]);
  }

  // پژو207 / 207پژو → پژو 207
  value = value.replace(/([\u0600-\u06FF])(\d)/g, "$1 $2");
  value = value.replace(/(\d)([\u0600-\u06FF])/g, "$1 $2");

  value = value.replace(/[-–—_]/g, " ");
  value = value.replace(/\s+/g, " ").trim();

  return value;
}

export function textMatchesQuery(haystack: string, query: string) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return false;

  const normalizedHaystack = normalizeText(haystack);
  return normalizedQuery.split(" ").every((token) => normalizedHaystack.includes(token));
}

export function formatToman(price: number) {
  return `${Math.round(price).toLocaleString("fa-IR")} تومان`;
}

export function toEnglishDigits(value: string) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  const englishDigits = "0123456789";

  let output = value;

  for (let i = 0; i < 10; i++) {
    output = output.replaceAll(persianDigits[i], englishDigits[i]);
    output = output.replaceAll(arabicDigits[i], englishDigits[i]);
  }

  return output;
}
