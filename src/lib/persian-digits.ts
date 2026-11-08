const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** نمایش: ارقام فارسی */
export function toPersianDigits(value: string): string {
  return value.replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)] ?? d);
}

/** tel: و پردازش: ارقام لاتین */
export function toEnglishDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));
}

export function phoneTelHref(phone: string | undefined | null): string {
  if (!phone) return "tel:";
  const digits = toEnglishDigits(phone).replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

export function formatPhoneDisplay(phone: string | undefined | null): string {
  if (!phone) return "";
  return toPersianDigits(toEnglishDigits(phone));
}
