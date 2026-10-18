"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BrandMark,
  tilesWithOther,
  useHeroBrands,
  type HeroBrandsProps,
  type HeroTab,
} from "./hero-kit";

export default function HeroScan({ carBrands, motorcycleBrands }: HeroBrandsProps) {
  const [tab, setTab] = useState<HeroTab>("car");
  const { href, tiles } = useHeroBrands(tab, carBrands, motorcycleBrands);
  const shown = tilesWithOther(tiles, 5);

  return (
    <section dir="rtl" className="relative overflow-hidden bg-[#F4F7FC] font-IranSans">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#d6e4ff_0%,transparent_55%)]" />
      <div className="relative mx-auto max-w-xl px-4 pb-10 pt-6 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8 lg:py-14">
        <div className="text-center lg:text-right">
          <p className="mb-4 text-sm font-bold text-[#416CEA]">کارماچک</p>
          <div className="relative mx-auto mb-3 h-36 w-full max-w-sm lg:h-64 lg:max-w-none">
            <Image
              src={tab === "car" ? "/cars/peugeot-206-hero.png" : "/flow-motorcycle.png"}
              alt=""
              fill
              priority
              className="object-contain drop-shadow-[0_18px_30px_rgba(53,99,233,0.22)]"
              sizes="(max-width: 1024px) 380px, 520px"
              quality={70}
            />
            <span className="hero-scan-beam pointer-events-none absolute inset-x-[8%] top-1/3 h-10 rounded-full" />
            <span className="pointer-events-none absolute inset-0 rounded-[40%] border border-[#416CEA]/15" />
            <span className="pointer-events-none absolute inset-x-[12%] bottom-0 h-12 bg-gradient-to-t from-[#F4F7FC] to-transparent" />
          </div>
          <h1 className="text-[1.55rem] font-extrabold leading-10 text-[#101828] lg:text-4xl lg:leading-[1.35]">
            {tab === "car" ? "کارشناسی دقیق خودرو" : "کارشناسی دقیق موتور"}
          </h1>
          <p className="mt-2 text-sm leading-7 text-[#416CEA] lg:text-base">
            {tab === "car"
              ? "اسکن رنگ، شاسی و فنی در محل شما"
              : "اسکن فنی و بدنه موتور در محل شما"}
          </p>
        </div>

        <div className="mt-5 rounded-[28px] border border-white/80 bg-white/80 p-4 shadow-[0_20px_50px_rgba(53,99,233,0.12)] backdrop-blur-md lg:mt-0">
          <div className="grid grid-cols-2 rounded-full bg-[#EEF2FD] p-1">
            <button
              type="button"
              onClick={() => setTab("car")}
              className={`rounded-full py-2.5 text-sm font-bold ${tab === "car" ? "bg-[#416CEA] text-white" : "text-[#5B6270]"}`}
            >
              ماشین
            </button>
            <button
              type="button"
              onClick={() => setTab("motorcycle")}
              className={`rounded-full py-2.5 text-sm font-bold ${tab === "motorcycle" ? "bg-[#416CEA] text-white" : "text-[#5B6270]"}`}
            >
              موتور
            </button>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {shown.map((tile) => (
              <Link
                key={tile.key}
                href={tile.href}
                prefetch={false}
                className="flex min-h-[84px] flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#F7F9FC] px-1 py-2 text-center ring-1 ring-[#E8ECF4] transition hover:-translate-y-0.5"
              >
                {tile.other ? (
                  <span className="text-lg font-black text-[#416CEA]">+</span>
                ) : tile.brand ? (
                  <BrandMark brand={tile.brand} size={36} />
                ) : null}
                <span className="text-[11px] font-semibold text-[#1E2A38]">{tile.label}</span>
              </Link>
            ))}
          </div>

          <Link
            href={href}
            className="mt-3 flex h-12 items-center justify-center rounded-2xl bg-[#416CEA] text-sm font-bold text-white"
          >
            شروع اسکن کارشناسی
          </Link>
        </div>
      </div>
    </section>
  );
}
