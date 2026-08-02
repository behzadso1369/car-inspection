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
    nearby: ["تهرانپارس", "نارمک", "فرجام", "میدان رسالت", "پیروزی", "مجیدیه"],
  },
  {
    slug: "tehranpars",
    name: "تهرانپارس",
    nearby: ["نارمک", "فرجام", "حکیمیه", "هفت حوض", "شرق تهران"],
  },
  {
    slug: "narmak",
    name: "نارمک",
    nearby: ["تهرانپارس", "هفت حوض", "فرجام", "مجیدیه", "شرق تهران"],
  },
  {
    slug: "farjam",
    name: "فرجام",
    nearby: ["نارمک", "تهرانپارس", "میدان رسالت", "پیروزی", "شرق تهران"],
  },
  {
    slug: "meydan-resalat",
    name: "میدان رسالت",
    nearby: ["نارمک", "فرجام", "پیروزی", "نیرو هوایی", "شرق تهران"],
  },
  {
    slug: "hakimiyeh",
    name: "حکیمیه",
    nearby: ["لویزان", "تهرانپارس", "هروی", "شرق تهران"],
  },
  {
    slug: "lavizan",
    name: "لویزان",
    nearby: ["حکیمیه", "هروی", "مجیدیه", "شرق تهران"],
  },
  {
    slug: "majidiyeh",
    name: "مجیدیه",
    nearby: ["نارمک", "لویزان", "هروی", "هفت حوض", "شرق تهران"],
  },
  {
    slug: "piroozi",
    name: "پیروزی",
    nearby: ["میدان رسالت", "نیرو هوایی", "فرجام", "شرق تهران"],
  },
  {
    slug: "niru-havaei",
    name: "نیرو هوایی",
    nearby: ["پیروزی", "میدان رسالت", "فرجام", "شرق تهران"],
  },
  {
    slug: "heravi",
    name: "هروی",
    nearby: ["لویزان", "مجیدیه", "حکیمیه", "شرق تهران"],
  },
  {
    slug: "haft-hoz",
    name: "هفت حوض",
    nearby: ["نارمک", "تهرانپارس", "مجیدیه", "شرق تهران"],
  },
];

export function getAreaBySlug(slug: string): LocalArea | undefined {
  return LOCAL_AREAS.find((a) => a.slug === slug);
}
