export type InspectionBrand = {
  id: number;
  name: string;
  label: string;
  imagePath: string | null;
};

type BrandSource = {
  Id?: number;
  Name?: string;
  ImagePath?: string | null;
};

type PopularBrandSpec = {
  name: string;
  label?: string;
};

/** ترتیب نمایش در هیرو صفحه اصلی (+ کاشی «سایر» در hero-kit) */
export const POPULAR_CAR_BRANDS: PopularBrandSpec[] = [
  { name: "پژو" },
  { name: "پراید" },
  { name: "رنو" },
  { name: "جک" },
  { name: "هیوندای" },
  { name: "کیا" },
  { name: "ام وی ام" },
];

/** ترتیب نمایش در هیرو صفحه اصلی (+ کاشی «سایر» در hero-kit) */
export const POPULAR_MOTORCYCLE_BRANDS: PopularBrandSpec[] = [
  { name: "یاماها" },
  { name: "کاوازاکی" },
  { name: "بنلی" },
  { name: "آپاچی" },
  { name: "کویر موتور", label: "کویر" },
  { name: "پیشرو" },
  { name: "کی تی ام" },
];

function normalizeBrandName(value?: string | null) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

export function pickPopularBrands(
  items: BrandSource[] | null | undefined,
  specs: PopularBrandSpec[],
): InspectionBrand[] {
  const list = Array.isArray(items) ? items : [];

  return specs
    .map((spec) => {
      const wanted = normalizeBrandName(spec.name);
      const hit =
        list.find((item) => normalizeBrandName(item.Name) === wanted) ??
        list.find((item) => normalizeBrandName(item.Name).includes(wanted));

      if (!hit?.Id) return null;

      const name = normalizeBrandName(hit.Name);
      return {
        id: hit.Id,
        name,
        label: spec.label || name,
        imagePath: hit.ImagePath ? String(hit.ImagePath) : null,
      };
    })
    .filter((item): item is InspectionBrand => Boolean(item));
}

export function parseBrandPreset(searchParams?: {
  brandId?: string | string[];
  brand?: string | string[];
}) {
  const rawId = searchParams?.brandId;
  const idValue = Array.isArray(rawId) ? rawId[0] : rawId;
  const id = Number(idValue);
  const rawName = searchParams?.brand;
  const nameValue = Array.isArray(rawName) ? rawName[0] : rawName;
  const brandName = normalizeBrandName(nameValue);

  return {
    brandId: Number.isFinite(id) && id > 0 ? id : undefined,
    brandName: brandName || undefined,
  };
}

export function inspectionHref(
  path:
    | "/car-inspection"
    | "/motorcycle-inspection"
    | "/car-inspection-dealers",
  brand?: Pick<InspectionBrand, "id" | "name">,
) {
  if (!brand) return path;
  const params = new URLSearchParams({
    brandId: String(brand.id),
    brand: brand.name,
  });
  return `${path}?${params.toString()}`;
}
