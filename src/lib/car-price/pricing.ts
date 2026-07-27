export type Car = {
  id: number;
  carName: string;
  carPrice: string;
};

export type BodyStatus =
  | "بی‌رنگ"
  | "خط و خش جزئی"
  | "صافکاری بدون رنگ"
  | "رنگ یک ناحیه"
  | "رنگ دو ناحیه"
  | "رنگ چند ناحیه";

export type ChassisStatus = "سالم" | "ضربه خورده" | "آسیب شدید";

export const BODY_FACTORS: Record<BodyStatus, number> = {
  "بی‌رنگ": 1.0,
  "خط و خش جزئی": 0.98,
  "صافکاری بدون رنگ": 0.94,
  "رنگ یک ناحیه": 0.92,
  "رنگ دو ناحیه": 0.88,
  "رنگ چند ناحیه": 0.82,
};

export const CHASSIS_FACTORS: Record<ChassisStatus, number> = {
  "سالم": 1.0,
  "ضربه خورده": 0.77,
  "آسیب شدید": 0.65,
};

export const BODY_OPTIONS = Object.keys(BODY_FACTORS) as BodyStatus[];
export const CHASSIS_OPTIONS = Object.keys(CHASSIS_FACTORS) as ChassisStatus[];

export function parsePrice(price: string) {
  return Number(price.replaceAll(",", "").trim());
}

export function getPriceRange(price: number) {
  const unit = 100_000_000;
  const min = Math.floor(price / unit) * unit;
  const max = min + unit;

  return {
    min,
    max,
  };
}

type CalculateInput = {
  basePrice: number;
  year: number;
  km: number;
  body: BodyStatus;
  chassis: ChassisStatus;
  lastYear: number;
};

export function calculateCarPrice(input: CalculateInput) {
  const yearDropPerYear = 0.02;
  const kmDropPer10k = 0.03;

  const age = Math.max(0, input.lastYear - input.year);

  const yearDrop = Math.min(age * yearDropPerYear, 0.5);
  const yearFactor = 1 - yearDrop;

  const kmDrop = Math.min((input.km / 10000) * kmDropPer10k, 0.3);
  const kmFactor = 1 - kmDrop;

  const bodyFactor = BODY_FACTORS[input.body];
  const chassisFactor = CHASSIS_FACTORS[input.chassis];

  const finalPrice =
    input.basePrice * yearFactor * kmFactor * bodyFactor * chassisFactor;

  return {
    finalPrice: Math.round(finalPrice),
    details: {
      age,
      yearFactor,
      kmFactor,
      bodyFactor,
      chassisFactor,
      basePrice: input.basePrice,
    },
    range: getPriceRange(finalPrice),
  };
}
