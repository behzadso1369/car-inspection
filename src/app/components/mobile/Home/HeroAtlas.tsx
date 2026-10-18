"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { inspectionHref } from "@/lib/popular-brands";
import {
  BrandMark,
  tabPath,
  tilesWithOther,
  useHeroBrands,
  type HeroBrandsProps,
  type HeroTab,
} from "./hero-kit";

export default function HeroAtlas({ carBrands, motorcycleBrands }: HeroBrandsProps) {
  const [tab, setTab] = useState<HeroTab>("car");
  const { href, tiles, brands } = useHeroBrands(tab, carBrands, motorcycleBrands);
  const [activeId, setActiveId] = useState<number | null>(brands[0]?.id ?? null);
  const active = brands.find((item) => item.id === activeId) ?? brands[0];
  const rail = tilesWithOther(tiles, 5);

  return (
    <section dir="rtl" className="bg-white font-IranSans">
      <div className="mx-auto max-w-xl px-4 pb-8 pt-5 lg:max-w-5xl lg:py-10">
        <p className="text-center text-lg font-extrabold text-[#3456BB]">کارماچک</p>
        <div className="mx-auto mt-3 flex max-w-xs justify-center gap-8 text-sm font-bold">
          <button
            type="button"
            onClick={() => {
              setTab("car");
              setActiveId(carBrands[0]?.id ?? null);
            }}
            className={tab === "car" ? "border-b-2 border-[#416CEA] pb-1 text-[#416CEA]" : "pb-1 text-[#8B8D93]"}
          >
            ماشین
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("motorcycle");
              setActiveId(motorcycleBrands[0]?.id ?? null);
            }}
            className={tab === "motorcycle" ? "border-b-2 border-[#416CEA] pb-1 text-[#416CEA]" : "pb-1 text-[#8B8D93]"}
          >
            موتور
          </button>
        </div>

        <h1 className="mt-4 text-center text-[1.35rem] font-extrabold text-[#101828] lg:text-3xl">
          بدنه را قبل از خرید ببینید
        </h1>
        <p className="mt-1 text-center text-[11px] text-[#6B6C70]">
          <span className="ml-1 inline-block h-2 w-2 rounded-full bg-[#416CEA]" />
          اصلی / رنگ‌شدگی / تعویض
        </p>

        <div className="relative mx-auto mt-4 max-w-lg">
          <div className="relative mx-auto aspect-square max-h-[340px] w-[78%]">
            <div className="hero-atlas-ring absolute inset-[-8%] rounded-full border border-[#416CEA]/20" />
            <Image
              src="/body-map/vehicle.png"
              alt="نقشه بدنه خودرو"
              fill
              className="object-contain"
              sizes="320px"
              quality={70}
              priority
            />
            <span className="pointer-events-none absolute inset-[18%] rounded-[42%] bg-[#416CEA]/25 blur-[2px]" />
            <span className="pointer-events-none absolute right-[8%] top-[28%] h-[38%] w-[22%] rounded-2xl bg-[#F59E0B]/35" />
          </div>

          {active ? (
            <aside className="absolute left-0 top-8 w-[108px] rounded-2xl border border-[#E8ECF4] bg-white p-2 shadow-[0_10px_24px_rgba(16,24,40,0.08)]">
              <div className="flex flex-col items-center gap-1">
                <BrandMark brand={active} size={28} />
                <span className="text-xs font-bold text-[#101828]">{active.label}</span>
              </div>
              <Link
                href={inspectionHref(tabPath(tab), active)}
                className="mt-2 block rounded-xl bg-[#416CEA] py-2 text-center text-[11px] font-bold text-white"
              >
                مدل‌های {active.label}
              </Link>
            </aside>
          ) : null}
        </div>

        <div className="mt-5 flex items-end gap-2 overflow-x-auto pb-1">
          {rail.map((tile) => {
            const selected = !tile.other && tile.brand?.id === active?.id;
            if (tile.other) {
              return (
                <Link
                  key={tile.key}
                  href={href}
                  className="flex min-w-[58px] flex-col items-center gap-1 text-[11px] font-bold text-[#6B6C70]"
                >
                  سایر
                </Link>
              );
            }
            return (
              <button
                key={tile.key}
                type="button"
                onClick={() => {
                  if (tile.brand) setActiveId(tile.brand.id);
                }}
                className={`flex min-w-[58px] flex-col items-center gap-1 ${selected ? "text-[#416CEA]" : "text-[#6B6C70]"}`}
              >
                {tile.brand ? <BrandMark brand={tile.brand} size={28} /> : null}
                <span className="text-[10px]">{tile.label}</span>
              </button>
            );
          })}
          <Link
            href={active ? inspectionHref(tabPath(tab), active) : href}
            className="mr-auto flex h-10 shrink-0 items-center rounded-xl bg-[#416CEA] px-3 text-xs font-bold text-white"
          >
            ادامه کارشناسی
          </Link>
        </div>
      </div>
    </section>
  );
}
