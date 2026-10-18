"use client";

import Image from "next/image";
import { apiAssetUrl } from "@/lib/media";
import { inspectionHref, type InspectionBrand } from "@/lib/popular-brands";

export type HeroTab = "car" | "motorcycle";

export type HeroBrandsProps = {
  carBrands: InspectionBrand[];
  motorcycleBrands: InspectionBrand[];
};

export function tabPath(tab: HeroTab) {
  return tab === "car" ? "/car-inspection" : "/motorcycle-inspection";
}

export function brandSrc(imagePath?: string | null) {
  if (!imagePath) return "";
  return apiAssetUrl(imagePath.replace(/\\/g, "/"));
}

export function BrandMark({
  brand,
  size = 40,
}: {
  brand: InspectionBrand;
  size?: number;
}) {
  const src = brandSrc(brand.imagePath);
  if (src) {
    const isSvg = src.toLowerCase().includes(".svg");
    return (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
        sizes={`${size}px`}
        quality={70}
        unoptimized={isSvg}
      />
    );
  }

  const palettes = [
    "bg-[#EEF2FD] text-[#3456BB]",
    "bg-[#E8F6F1] text-[#0F766E]",
    "bg-[#FFF4E8] text-[#C2410C]",
    "bg-[#F3EEFF] text-[#6D28D9]",
  ];
  const letter = (brand.label || brand.name).trim().slice(0, 1);

  return (
    <span
      className={`flex items-center justify-center rounded-xl text-sm font-bold ${palettes[brand.id % palettes.length]}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {letter}
    </span>
  );
}

export function useHeroBrands(
  tab: HeroTab,
  carBrands: InspectionBrand[],
  motorcycleBrands: InspectionBrand[],
) {
  const brands = tab === "car" ? carBrands : motorcycleBrands;
  const href = tabPath(tab);
  const tiles = [
    ...brands.map((brand) => ({
      key: `${tab}-${brand.id}`,
      href: inspectionHref(href, brand),
      label: brand.label,
      brand,
      other: false as const,
    })),
    {
      key: `${tab}-other`,
      href,
      label: "سایر برندها",
      brand: null,
      other: true as const,
    },
  ];
  return { brands, href, tiles };
}

export function tilesWithOther<T extends { other: boolean }>(
  tiles: T[],
  brandCount: number,
) {
  const brands = tiles.filter((tile) => !tile.other).slice(0, brandCount);
  const other = tiles.find((tile) => tile.other);
  return other ? [...brands, other] : brands;
}
