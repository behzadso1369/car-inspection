/**
 * تاریخ شمسی «امروز» به وقت تهران، برای تایتل و متن صفحاتی که داده‌ی روزانه دارند.
 * فقط سمت سرور (generateMetadata / Server Component) صدا زده شود تا در HTML اولیه بنشیند.
 * timeZone لازم است چون سرور با UTC کار می‌کند و بدون آن تا ۳.۵ ساعت بعد از نیمه‌شب تهران تاریخ دیروز می‌ماند.
 */
const TEHRAN_TZ = "Asia/Tehran";

function jalaliParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-arabext", {
    timeZone: TEHRAN_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value]),
  );
  return {
    weekday: parts.weekday as string,
    day: parts.day as string,
    month: parts.month as string,
    year: parts.year as string,
  };
}

/** «۶ آبان» */
export function jalaliDayMonth(date = new Date()) {
  const { day, month } = jalaliParts(date);
  return `${day} ${month}`;
}

/** «آبان ۱۴۰۵» */
export function jalaliMonthYear(date = new Date()) {
  const { month, year } = jalaliParts(date);
  return `${month} ${year}`;
}

/** «سه‌شنبه ۶ آبان ۱۴۰۵» */
export function jalaliFullDate(date = new Date()) {
  const { weekday, day, month, year } = jalaliParts(date);
  return `${weekday} ${day} ${month} ${year}`;
}

/** «2026-10-27» به وقت تهران، برای dateTime و اسکیما */
export function tehranIsoDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TEHRAN_TZ }).format(date);
}
