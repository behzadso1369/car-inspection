import {
  calculateCarPrice,
  getPriceRange,
  type BodyStatus,
  type ChassisStatus,
} from "@/lib/car-price/pricing";
import { normalizeText } from "@/lib/car-price/text";

export type BudgetCarInput = {
  id: string;
  name: string;
  /** قیمت پایه نمایشی (همان منطق displayBasePrice صفحه) */
  basePrice: number;
  lastYear: number;
};

export type BudgetAlternative = {
  id: string;
  name: string;
  year: number;
  km: number;
  body: BodyStatus;
  chassis: ChassisStatus;
  estimatedPrice: number;
  healthRank: number;
};

type ProfileTemplate = {
  yearOffset: number;
  km: number;
  body: BodyStatus;
  chassis: ChassisStatus;
  healthRank: number;
};

/** از سالم‌ترین به آسیب‌دیده‌تر — برای مهندسی معکوس بودجه */
const PROFILE_TEMPLATES: ProfileTemplate[] = [
  { yearOffset: 0, km: 3000, body: "بی‌رنگ", chassis: "سالم", healthRank: 0 },
  { yearOffset: 0, km: 15000, body: "بی‌رنگ", chassis: "سالم", healthRank: 1 },
  { yearOffset: 1, km: 30000, body: "بی‌رنگ", chassis: "سالم", healthRank: 2 },
  { yearOffset: 1, km: 45000, body: "خط و خش جزئی", chassis: "سالم", healthRank: 3 },
  { yearOffset: 2, km: 60000, body: "رنگ یک ناحیه", chassis: "سالم", healthRank: 4 },
  { yearOffset: 3, km: 75000, body: "رنگ دو ناحیه", chassis: "سالم", healthRank: 5 },
  { yearOffset: 3, km: 90000, body: "رنگ دو ناحیه", chassis: "ضربه خورده", healthRank: 6 },
  { yearOffset: 4, km: 120000, body: "رنگ چند ناحیه", chassis: "ضربه خورده", healthRank: 7 },
];

const DEFAULT_TOLERANCE = 0.1;
const DEFAULT_LIMIT = 3;
const HEALTHY_RANK_MAX = 2;

function isCloseToTarget(estimated: number, target: number, tolerance: number) {
  if (target <= 0 || estimated <= 0) return false;

  const ratio = Math.abs(estimated - target) / target;
  if (ratio <= tolerance) return true;

  const estimatedRange = getPriceRange(estimated);
  const targetRange = getPriceRange(target);
  return estimatedRange.min === targetRange.min;
}

function nameFamilyKey(name: string) {
  const tokens = normalizeText(name).split(" ").filter(Boolean);
  // فقط برند/خانواده اول تا پیشنهادها متنوع‌تر باشند (پراید / پژو / کوییک ...)
  return tokens[0] || name;
}

function priceDistance(estimated: number, target: number) {
  return Math.abs(estimated - target);
}

type FindOptions = {
  excludeId?: string;
  excludeName?: string;
  limit?: number;
  tolerance?: number;
};

/**
 * با بودجه نهایی کاربر، ۲–۳ ماشین جایگزین از لیست پیدا می‌کند
 * و برای هرکدام مشخصات کامل (سال/کارکرد/رنگ/شاسی) پیشنهاد می‌دهد.
 * اولویت با پروفایل‌های سالم است؛ در صورت نیاز گزینه‌های آسیب‌دیده‌تر هم پر می‌شوند.
 */
export function findBudgetAlternatives(
  targetPrice: number,
  cars: BudgetCarInput[],
  options: FindOptions = {},
): BudgetAlternative[] {
  const {
    excludeId,
    excludeName,
    limit = DEFAULT_LIMIT,
    tolerance = DEFAULT_TOLERANCE,
  } = options;

  if (!targetPrice || targetPrice <= 0 || cars.length === 0) return [];

  const excludeNameKey = excludeName ? normalizeText(excludeName) : "";
  const matches: BudgetAlternative[] = [];

  for (const car of cars) {
    if (excludeId && car.id === excludeId) continue;
    if (excludeNameKey && normalizeText(car.name) === excludeNameKey) continue;
    if (!car.basePrice || car.basePrice <= 0 || !car.lastYear) continue;

    for (const profile of PROFILE_TEMPLATES) {
      const year = car.lastYear - profile.yearOffset;
      if (year < car.lastYear - 15 || year > car.lastYear) continue;

      const { finalPrice } = calculateCarPrice({
        basePrice: car.basePrice,
        lastYear: car.lastYear,
        year,
        km: profile.km,
        body: profile.body,
        chassis: profile.chassis,
      });

      if (!isCloseToTarget(finalPrice, targetPrice, tolerance)) continue;

      matches.push({
        id: car.id,
        name: car.name,
        year,
        km: profile.km,
        body: profile.body,
        chassis: profile.chassis,
        estimatedPrice: finalPrice,
        healthRank: profile.healthRank,
      });
      // سالم‌ترین پروفایل هم‌بودجه برای این ماشین کافی است
      break;
    }
  }

  matches.sort((a, b) => {
    if (a.healthRank !== b.healthRank) return a.healthRank - b.healthRank;
    return (
      priceDistance(a.estimatedPrice, targetPrice) -
      priceDistance(b.estimatedPrice, targetPrice)
    );
  });

  const picked: BudgetAlternative[] = [];
  const usedFamilies = new Set<string>();

  // اول سالم‌ها
  for (const item of matches) {
    if (picked.length >= limit) break;
    if (item.healthRank > HEALTHY_RANK_MAX) continue;
    const family = nameFamilyKey(item.name);
    if (usedFamilies.has(family)) continue;
    usedFamilies.add(family);
    picked.push(item);
  }

  // پر کردن با بقیه (آسیب‌دیده‌تر / کارکرد بالاتر)
  for (const item of matches) {
    if (picked.length >= limit) break;
    const family = nameFamilyKey(item.name);
    if (usedFamilies.has(family)) continue;
    usedFamilies.add(family);
    picked.push(item);
  }

  return picked;
}

/** فرمت نمایش مثل: کوییک ۱۴۰۴ ۳۰۰۰ کارکرد بی‌رنگ شاسی سالم */
export function formatBudgetAlternativeLabel(item: BudgetAlternative) {
  const year = new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(item.year);
  const km = new Intl.NumberFormat("fa-IR").format(item.km);
  return `${item.name} ${year} ${km} کارکرد ${item.body} شاسی ${item.chassis}`;
}
