import type { CarNewPriceItem } from "@/lib/car-price/carNewPriceApi";

/** برند از ابتدای نام (مثل «آرتابان (ای ام جی)» یا «آریسان») */
export function extractBrandFromCarName(carName: string): string {
  const cleaned = carName.replace(/\s+/g, " ").trim();
  const withParen = cleaned.match(/^(.+?\([^)]+\))/);
  if (withParen) return withParen[1].trim();
  return cleaned.split(" ")[0]?.trim() || cleaned;
}

/** برای جستجوی گروه کارشناسی — برند + اولین کلمهٔ مدل */
export function brandModelSearchTerm(carName: string): string {
  const cleaned = carName.replace(/\s+/g, " ").trim();
  const brand = extractBrandFromCarName(cleaned);
  const tail = cleaned.slice(brand.length).trim();
  const model = tail.split(/\s+/).filter(Boolean)[0] ?? "";
  return model ? `${brand} ${model}`.trim() : brand;
}

export type BrandGroup = {
  brand: string;
  items: CarNewPriceItem[];
};

export function groupItemsByBrand(items: CarNewPriceItem[]): BrandGroup[] {
  const map = new Map<string, CarNewPriceItem[]>();

  for (const item of items) {
    const brand = extractBrandFromCarName(item.carName);
    const list = map.get(brand) ?? [];
    list.push(item);
    map.set(brand, list);
  }

  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b, "fa"))
    .map(([brand, brandItems]) => ({
      brand,
      items: [...brandItems].sort(
        (a, b) =>
          a.carName.localeCompare(b.carName, "fa") ||
          String(b.lastYear).localeCompare(String(a.lastYear), "fa", {
            numeric: true,
          }),
      ),
    }));
}
