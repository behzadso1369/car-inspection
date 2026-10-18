"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import {
  BrandMark,
  useHeroBrands,
  type HeroBrandsProps,
  type HeroTab,
} from "./hero-kit";

const COPY = {
  car: {
    picker: "خودروی خود را انتخاب کنید",
    cta: "درخواست کارشناسی",
  },
  motorcycle: {
    picker: "موتور خود را انتخاب کنید",
    cta: "درخواست کارشناسی",
  },
} as const;

type HeroTile = ReturnType<typeof useHeroBrands>["tiles"][number];

function BrandTileLink({
  tile,
  className = "",
  disabled = false,
  onNavigate,
}: {
  tile: HeroTile;
  className?: string;
  disabled?: boolean;
  onNavigate: (href: string) => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onNavigate(tile.href)}
      className={`flex w-full min-h-[60px] flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-1.5 text-center transition hover:-translate-y-0.5 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 lg:min-h-[76px] lg:gap-1 lg:py-2 ${className} ${
        tile.other
          ? "border border-dashed border-[#C5C9D3] bg-[#F7F8FC]"
          : "bg-[#F6F8FC] ring-1 ring-[#EEF1F7]"
      }`}
    >
      {tile.other ? (
        <span className="text-sm font-black text-[#416CEA] lg:text-base">+</span>
      ) : tile.brand ? (
        <>
          <span className="lg:hidden">
            <BrandMark brand={tile.brand} size={24} />
          </span>
          <span className="hidden lg:inline-flex">
            <BrandMark brand={tile.brand} size={30} />
          </span>
        </>
      ) : null}
      <span className="line-clamp-2 text-[10px] font-medium leading-3.5 text-[#2C3340] lg:text-[11px] lg:leading-4">
        {tile.other ? "سایر" : tile.label}
      </span>
    </button>
  );
}

function BrandPicker({
  tab,
  setTab,
  tiles,
  href,
  picker,
  cta,
}: {
  tab: HeroTab;
  setTab: (tab: HeroTab) => void;
  tiles: ReturnType<typeof useHeroBrands>["tiles"];
  href: string;
  picker: string;
  cta: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (targetHref: string) => {
      if (isPending) return;
      startTransition(() => {
        router.push(targetHref);
      });
    },
    [isPending, router],
  );

  return (
    <div className="relative rounded-[24px] bg-white px-3.5 pb-3.5 pt-3.5 shadow-[0_18px_50px_rgba(8,16,36,0.32)] sm:rounded-[28px] sm:px-4 sm:pb-4 sm:pt-4">
      {isPending ? (
        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 rounded-[24px] bg-white/90 backdrop-blur-[2px] sm:rounded-[28px]"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2 className="size-8 animate-spin text-[#416CEA]" aria-hidden />
          <span className="text-sm font-bold text-[#416CEA]">در حال انتقال…</span>
        </div>
      ) : null}
      <p className="text-center font-IranSans text-sm font-bold leading-6 tracking-[-0.025em] text-[#111111] sm:text-base lg:text-lg lg:leading-7 lg:tracking-[-0.035em]">
        {picker}
      </p>
      <div
        role="tablist"
        aria-label="نوع کارشناسی"
        className="relative mx-auto mt-2 grid max-w-xs grid-cols-2 rounded-full bg-[#F2F5FB] p-1 lg:mt-3"
      >
        <span
          className={`absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-[#416CEA] shadow-[0_8px_20px_rgba(65,108,234,0.28)] transition-all duration-300 ease-out ${
            tab === "car" ? "right-1 left-auto" : "left-1 right-auto"
          }`}
        />
        <button
          type="button"
          role="tab"
          aria-selected={tab === "car"}
          className={`relative z-10 rounded-full py-2.5 text-sm font-bold ${
            tab === "car" ? "text-white" : "text-[#5B6270]"
          }`}
          onClick={() => setTab("car")}
        >
          ماشین
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "motorcycle"}
          className={`relative z-10 rounded-full py-2.5 text-sm font-bold ${
            tab === "motorcycle" ? "text-white" : "text-[#5B6270]"
          }`}
          onClick={() => setTab("motorcycle")}
        >
          موتور
        </button>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
        {tiles.map((tile) => (
          <BrandTileLink
            key={tile.key}
            tile={tile}
            disabled={isPending}
            onNavigate={navigate}
          />
        ))}
      </div>

      <button
        type="button"
        disabled={isPending}
        onClick={() => navigate(href)}
        className="mt-3 flex h-12 w-full items-center justify-center rounded-full bg-[#416CEA] text-sm font-bold text-white shadow-[0_12px_24px_rgba(65,108,234,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-[#3456bb] active:scale-[0.99] disabled:opacity-80"
      >
        {cta}
      </button>
    </div>
  );
}

function HeroTitle() {
  return (
    <h1
      id="home-hero-title"
      className="font-Peyda text-left font-extrabold tracking-[-0.02em] lg:text-right"
    >
      <span className="block text-[clamp(1.5rem,5vw,2.85rem)] leading-[1.3] text-[#FFD54F] drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] lg:text-[3.6rem] lg:leading-[1.25] xl:text-[4.1rem]">
        کارماچک؛
      </span>
      <span className="mt-[0.28em] block text-[clamp(0.88rem,3.7vw,1.45rem)] font-extrabold leading-[1.55] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] lg:mt-3 lg:text-[1.85rem] lg:leading-[1.7] xl:text-[2.1rem]">
        <span className="whitespace-nowrap">کارشناسی خودرو</span>
        <br className="lg:hidden" />
        <span className="hidden lg:inline"> </span>
        <span className="whitespace-nowrap">در تهران و شرق تهران</span>
      </span>
    </h1>
  );
}

export default function HomeHero({
  carBrands,
  motorcycleBrands,
}: HeroBrandsProps) {
  const [tab, setTab] = useState<HeroTab>("car");
  const copy = COPY[tab];
  const { href, tiles } = useHeroBrands(tab, carBrands, motorcycleBrands);
  const pickerProps = {
    tab,
    setTab,
    tiles,
    href,
    picker: copy.picker,
    cta: copy.cta,
  };

  return (
    <section
      dir="rtl"
      className="max-lg:pb-0 font-IranSans lg:pb-10"
      aria-labelledby="home-hero-title"
    >
      <div className="relative bg-[#050B18] lg:min-h-[720px] xl:min-h-[760px]">
        <div className="relative aspect-[16/10] w-full max-lg:max-h-[min(36dvh,15rem)] max-lg:min-h-[9.5rem] overflow-hidden sm:aspect-[16/9] sm:max-lg:max-h-[min(38dvh,16.5rem)] lg:absolute lg:inset-0 lg:max-h-none lg:min-h-0 lg:aspect-auto">
          <Image
            src="/images/home/hero-xray-car-2k.webp"
            alt=""
            fill
            priority
            quality={90}
            sizes="(max-width: 1023px) 100vw, 2560px"
            className="origin-[82%_56%] scale-[1.28] object-cover object-[84%_56%] lg:origin-[90%_48%] lg:scale-100 lg:object-[88%_48%]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-transparent from-45% to-[#050B18]/50 lg:block"
          />

          <div className="absolute inset-0 z-10 max-lg:contents">
            <div className="absolute top-[5%] left-0 z-10 w-fit pl-4 sm:top-[6%] sm:pl-5 lg:top-8 lg:left-4 lg:flex lg:w-[min(34rem,42%)] lg:flex-col lg:gap-4 lg:pl-0 xl:top-10 xl:left-6 xl:gap-5">
              <HeroTitle />
              <div className="hidden lg:block">
                <BrandPicker {...pickerProps} />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto -mt-7 w-[calc(100%-2.5rem)] max-w-[24.5rem] pb-2 sm:-mt-8 md:mx-0 md:mb-6 md:ml-[5%] md:mr-auto lg:hidden">
          <BrandPicker {...pickerProps} />
        </div>
      </div>
    </section>
  );
}
