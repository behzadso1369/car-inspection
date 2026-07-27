/**
 * مناطق تحت پوشش کارشناسی خودرو (سئوی محلی شرق تهران)
 * هر منطقه یک صفحه‌ی فرود اختصاصی در مسیر /car-inspection-tehran/[area] دارد.
 */

export type LocalArea = {
  slug: string;
  name: string; // نام منطقه (برای عنوان و متن)
  nearby: string[]; // محله‌های مجاور برای متن و لینک‌سازی داخلی
};

export const LOCAL_AREAS: LocalArea[] = [
  {
    slug: "shargh-tehran",
    name: "شرق تهران",
    nearby: ["تهرانپارس", "نارمک", "فرجام", "میدان رسالت", "پیروزی"],
  },
  {
    slug: "tehranpars",
    name: "تهرانپارس",
    nearby: ["نارمک", "فرجام", "میدان رسالت", "شرق تهران"],
  },
  {
    slug: "narmak",
    name: "نارمک",
    nearby: ["تهرانپارس", "فرجام", "میدان رسالت", "شرق تهران"],
  },
  {
    slug: "farjam",
    name: "فرجام",
    nearby: ["نارمک", "تهرانپارس", "میدان رسالت", "شرق تهران"],
  },
  {
    slug: "meydan-resalat",
    name: "میدان رسالت",
    nearby: ["نارمک", "تهرانپارس", "فرجام", "شرق تهران"],
  },
];

export function getAreaBySlug(slug: string): LocalArea | undefined {
  return LOCAL_AREAS.find((a) => a.slug === slug);
}
