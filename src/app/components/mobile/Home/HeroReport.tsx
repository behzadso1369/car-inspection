"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronLeft, FileText } from "lucide-react";
import {
  BrandMark,
  tilesWithOther,
  useHeroBrands,
  type HeroBrandsProps,
  type HeroTab,
} from "./hero-kit";

const CHECKS = ["رنگ و بدنه", "شاسی", "فنی", "دیاگ", "گزارش کامل"];

export default function HeroReport({ carBrands, motorcycleBrands }: HeroBrandsProps) {
  const [tab, setTab] = useState<HeroTab>("car");
  const { href, tiles } = useHeroBrands(tab, carBrands, motorcycleBrands);
  const rows = tilesWithOther(tiles, 4);

  return (
    <section dir="rtl" className="bg-[#F7F6F2] font-IranSans">
      <div className="bg-gradient-to-l from-[#3456BB] to-[#416CEA] px-4 py-3 text-white">
        <div className="mx-auto flex max-w-xl items-center justify-between lg:max-w-5xl">
          <strong className="text-lg">کارماچک</strong>
          <span className="text-xs text-white/80">
            پرونده <bdi>۱۴۰۲۵-۰۸۴۱</bdi>
          </span>
        </div>
      </div>
      <div className="h-1 bg-[repeating-linear-gradient(90deg,#416CEA_0_12px,#e11d48_12px_16px,#416CEA_16px_28px)]" />

      <div className="mx-auto max-w-xl px-4 py-7 lg:max-w-5xl lg:py-12">
        <h1 className="text-center text-[1.55rem] font-extrabold leading-10 text-[#101828] lg:text-4xl">
          {tab === "car" ? "پرونده کارشناسی خودرو" : "پرونده کارشناسی موتور"}
        </h1>
        <p className="mt-2 text-center text-sm leading-7 text-[#55565A]">
          پیش از خرید، وضعیت واقعی را ببینید.
        </p>

        <div className="mx-auto mt-5 grid max-w-sm grid-cols-2">
          <button
            type="button"
            onClick={() => setTab("car")}
            className={`rounded-t-2xl border px-3 py-2.5 text-sm font-bold ${
              tab === "car"
                ? "border-b-0 border-[#E5E1D8] bg-white text-[#101828]"
                : "border-transparent bg-[#EDEAE3] text-[#6B6C70]"
            }`}
          >
            کارشناسی ماشین
          </button>
          <button
            type="button"
            onClick={() => setTab("motorcycle")}
            className={`rounded-t-2xl border px-3 py-2.5 text-sm font-bold ${
              tab === "motorcycle"
                ? "border-b-0 border-[#E5E1D8] bg-white text-[#101828]"
                : "border-transparent bg-[#EDEAE3] text-[#6B6C70]"
            }`}
          >
            کارشناسی موتور
          </button>
        </div>

        <div className="rounded-b-3xl rounded-t-sm border border-[#E5E1D8] bg-white p-4 shadow-[0_12px_32px_rgba(16,24,40,0.06)] lg:grid lg:grid-cols-[1fr_200px] lg:gap-6">
          <div>
            {rows.map((tile) => (
              <Link
                key={tile.key}
                href={tile.href}
                prefetch={false}
                className={`flex items-center gap-3 border-b border-[#EEEAE2] py-3 last:border-0 ${
                  tile.other ? "rounded-xl bg-[#F8F1E3] px-2" : ""
                }`}
              >
                {tile.other ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#416CEA]">
                    <Check size={18} />
                  </span>
                ) : tile.brand ? (
                  <BrandMark brand={tile.brand} size={40} />
                ) : null}
                <span className="flex-1">
                  <span className="block text-sm font-bold text-[#101828]">{tile.label}</span>
                  <span className="text-xs text-[#8B8D93]">انتخاب مدل</span>
                </span>
                <ChevronLeft size={16} className="text-[#A0A4AE]" />
              </Link>
            ))}
          </div>
          <ul className="mt-4 space-y-2.5 border-t border-dashed border-[#E5E1D8] pt-4 lg:mt-0 lg:border-r lg:border-t-0 lg:pr-5 lg:pt-0">
            {CHECKS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[#1E2A38]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#416CEA] text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={href}
          className="mx-auto mt-5 flex h-12 max-w-md items-center justify-center gap-2 rounded-full bg-[#3456BB] text-sm font-bold text-white shadow-[0_10px_24px_rgba(52,86,187,0.28)]"
        >
          <FileText size={18} />
          صدور گزارش کارشناسی
        </Link>
      </div>
    </section>
  );
}
