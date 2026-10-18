"use client";

import { useRouter, useSearchParams } from "next/navigation";
import HeroAtlas from "./HeroAtlas";
import HeroOnsite from "./HeroOnsite";
import HeroReport from "./HeroReport";
import HeroScan from "./HeroScan";
import type { HeroBrandsProps } from "./hero-kit";

const VARIANTS = [
  { id: "scan", num: "۱", title: "اسکن", Component: HeroScan },
  { id: "report", num: "۲", title: "گزارش", Component: HeroReport },
  { id: "onsite", num: "۳", title: "اعزام", Component: HeroOnsite },
  { id: "atlas", num: "۴", title: "اطلس بدنه", Component: HeroAtlas },
] as const;

export default function HeroPreviewClient({
  carBrands,
  motorcycleBrands,
}: HeroBrandsProps) {
  const router = useRouter();
  const params = useSearchParams();
  const current =
    VARIANTS.find((item) => item.id === params.get("v")) ?? VARIANTS[0];
  const Hero = current.Component;

  return (
    <div dir="rtl" className="min-h-screen bg-[#F3F5FA] font-IranSans">
      <nav className="sticky top-0 z-[70] border-b border-[#E4E8F1] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 overflow-x-auto px-3 py-2">
          {VARIANTS.map((item) => {
            const active = item.id === current.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => router.replace(`/hero-preview?v=${item.id}`)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-bold ${
                  active
                    ? "bg-[#416CEA] text-white"
                    : "bg-[#EEF2FD] text-[#3456BB]"
                }`}
              >
                {item.num} {item.title}
              </button>
            );
          })}
        </div>
      </nav>
      <Hero carBrands={carBrands} motorcycleBrands={motorcycleBrands} />
    </div>
  );
}
