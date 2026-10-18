"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock3 } from "lucide-react";
import { BrandMark, useHeroBrands, type HeroBrandsProps, type HeroTab } from "./hero-kit";

export default function HeroOnsite({ carBrands, motorcycleBrands }: HeroBrandsProps) {
  const [tab, setTab] = useState<HeroTab>("car");
  const { href, tiles } = useHeroBrands(tab, carBrands, motorcycleBrands);

  return (
    <section dir="rtl" className="font-IranSans">
      <div className="relative overflow-hidden bg-[#1B2A4A] px-4 pb-28 pt-10 text-white">
        <div className="hero-onsite-map pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-xl text-center lg:max-w-3xl">
          <h1 className="text-[1.55rem] font-extrabold leading-10 lg:text-4xl lg:leading-[1.4]">
            {tab === "car" ? "کارشناس به محل خودرو می‌آید" : "کارشناس به محل موتور می‌آید"}
          </h1>
          <p className="mt-2 text-sm text-white/75 lg:text-base">تهران و شرق تهران · اعزام در محل</p>
          <div className="relative mx-auto mt-8 h-36 max-w-sm">
            <span className="absolute right-[18%] top-6 h-4 w-4 rounded-full bg-[#416CEA] ring-8 ring-[#416CEA]/25" />
            <span className="absolute left-[22%] top-16 h-3.5 w-3.5 rounded-full bg-white/80" />
            <span className="absolute right-[28%] top-10 w-[42%] border-t border-dashed border-white/50" />
            <p className="absolute right-[8%] top-0 text-[11px] text-white/70">تهرانپارس</p>
            <p className="absolute bottom-2 left-[18%] text-[11px] text-white/70">نارمک · رسالت</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-20 px-3 pb-8">
        <div className="mx-auto max-w-xl rounded-[28px] bg-white px-4 pb-5 pt-3 shadow-[0_-12px_40px_rgba(16,24,40,0.16)] lg:max-w-3xl">
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#D9DDE7]" />
          <p className="text-center text-base font-extrabold text-[#101828]">
            {tab === "car" ? "خودروی خود را انتخاب کنید" : "موتور خود را انتخاب کنید"}
          </p>
          <div className="mx-auto mt-3 grid max-w-xs grid-cols-2 rounded-full bg-[#F2F5FB] p-1">
            <button
              type="button"
              onClick={() => setTab("car")}
              className={`rounded-full py-2 text-sm font-bold ${tab === "car" ? "bg-[#416CEA] text-white" : "text-[#5B6270]"}`}
            >
              ماشین
            </button>
            <button
              type="button"
              onClick={() => setTab("motorcycle")}
              className={`rounded-full py-2 text-sm font-bold ${tab === "motorcycle" ? "bg-[#416CEA] text-white" : "text-[#5B6270]"}`}
            >
              موتور
            </button>
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tiles.map((tile) => (
              <Link
                key={tile.key}
                href={tile.href}
                prefetch={false}
                className="flex w-[72px] shrink-0 flex-col items-center gap-1.5"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${
                    tile.other
                      ? "border border-dashed border-[#C5C9D3] bg-[#F7F8FC]"
                      : "bg-white ring-1 ring-[#E8ECF4]"
                  }`}
                >
                  {tile.other ? (
                    <span className="text-sm font-black text-[#416CEA]">+</span>
                  ) : tile.brand ? (
                    <BrandMark brand={tile.brand} size={32} />
                  ) : null}
                </span>
                <span className="line-clamp-1 text-[11px] text-[#2C3340]">
                  {tile.other ? "سایر" : tile.label}
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#416CEA]">
            <Clock3 size={14} />
            میانگین اعزام: ۱ ساعت
          </p>
          <Link
            href={href}
            className="mt-3 flex h-12 items-center justify-center rounded-full bg-[#416CEA] text-sm font-bold text-white"
          >
            درخواست کارشناس در محل
          </Link>
        </div>
      </div>
    </section>
  );
}
