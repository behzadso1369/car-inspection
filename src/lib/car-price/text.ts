export function normalizeText(text: string) {
  if (!text) return "";

  let value = String(text).trim().toLowerCase();

  value = value.replace(/ي/g, "ی").replace(/ك/g, "ک");
  value = value.replace(/\u200c/g, " ");

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  const englishDigits = "0123456789";

  for (let i = 0; i < 10; i++) {
    value = value.replaceAll(persianDigits[i], englishDigits[i]);
    value = value.replaceAll(arabicDigits[i], englishDigits[i]);
  }

  value = value.replace(/\s+/g, " ");

  return value;
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
