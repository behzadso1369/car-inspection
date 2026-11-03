"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DEALERS_HUB_PATH } from "@/app/car-inspection-dealers/dealer-hub-data";
import { apiAssetUrl, sliderHref } from "@/lib/media";
import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import {
  BrandMark,
  useHeroBrands,
  type HeroBrandsProps,
  type HeroTab,
} from "./hero-kit";

const HERO_FALLBACK_SRC = "/images/home/hero-xray-car-2k.webp";
const HERO_SLIDE_MS = 3000;
const HERO_FADE_MS = 900;
const HERO_IMAGE_SIZES = "(max-width: 1023px) 100vw, 2560px";

export type HomeHeroSlide = {
  Id?: number;
  ImagePath?: string | null;
  Text?: string | null;
  Link?: string | null;
  DurationTime?: number | null;
};

type NormalizedHeroSlide = {
  id: string | number;
  src: string;
  href: string | null;
  alt: string;
};

const HERO_TABS: HeroTab[] = ["car", "motorcycle", "dealer"];
const POPULAR_CARS_PATH = "/car-inspection-most-popular";

const COPY: Record<HeroTab, { picker: string; cta: string }> = {
  car: {
    picker: "خودروی خود را انتخاب کنید",
    cta: "درخواست کارشناسی",
  },
  motorcycle: {
    picker: "موتور خود را انتخاب کنید",
    cta: "درخواست کارشناسی",
  },
  dealer: {
    picker: "پنل کارشناسی ویژه نمایشگاه داران",
    cta: "ورود به صفحه نمایشگاه داران",
  },
};

const TAB_LABELS: Record<HeroTab, string> = {
  car: "ماشین",
  motorcycle: "موتور",
  dealer: "نمایشگاه داران",
};

type HeroTile = ReturnType<typeof useHeroBrands>["tiles"][number];

function tabIndicatorRight(tab: HeroTab) {
  const index = HERO_TABS.indexOf(tab);
  return `calc(4px + ${index} * (100% - 8px) / 3)`;
}

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
      className={`home-hero-brand-tile flex w-full min-h-[60px] flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-1.5 text-center transition hover:-translate-y-0.5 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 lg:h-full lg:min-h-[76px] lg:gap-1 lg:py-2 ${className} ${
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
  const isDealer = tab === "dealer";

  const navigate = useCallback(
    (targetHref: string) => {
      if (isPending) return;
      startTransition(() => {
        router.push(targetHref);
      });
    },
    [isPending, router],
  );

  const primaryHref = isDealer ? DEALERS_HUB_PATH : href;

  return (
    <div className="home-hero-picker relative rounded-[24px] bg-white px-3.5 pb-3.5 pt-3.5 shadow-[0_18px_50px_rgba(8,16,36,0.32)] sm:rounded-[28px] sm:px-4 sm:pb-4 sm:pt-4 lg:flex lg:h-full lg:min-h-0 lg:flex-1 lg:flex-col">
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
        className="relative mx-auto mt-2 grid max-w-md grid-cols-3 rounded-full bg-[#F2F5FB] p-1 lg:mt-3"
      >
        <span
          className="absolute top-1 h-[calc(100%-8px)] rounded-full bg-[#416CEA] shadow-[0_8px_20px_rgba(65,108,234,0.28)] transition-[right] duration-300 ease-out"
          style={{
            width: "calc((100% - 8px) / 3)",
            right: tabIndicatorRight(tab),
          }}
        />
        {HERO_TABS.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            className={`relative z-10 rounded-full px-0.5 py-2.5 text-[11px] font-bold leading-tight sm:text-sm ${
              tab === item ? "text-white" : "text-[#5B6270]"
            }`}
            onClick={() => setTab(item)}
          >
            {TAB_LABELS[item]}
          </button>
        ))}
      </div>

      {isDealer ? (
        <p className="mt-4 text-center text-xs leading-6 text-[#5B6270] sm:text-sm lg:flex-1 lg:content-center">
          گزارش کارشناسی، اعتبار و پشتیبانی نمایشگاه در یک پنل
        </p>
      ) : (
        <div className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2 lg:min-h-0 lg:flex-1 lg:content-center">
          {tiles.map((tile) => (
            <BrandTileLink
              key={tile.key}
              tile={tile}
              disabled={isPending}
              onNavigate={navigate}
            />
          ))}
        </div>
      )}

      <button
        type="button"
        disabled={isPending}
        onClick={() => navigate(primaryHref)}
        className="home-hero-primary-cta mt-3.5 flex h-12 w-full items-center justify-center rounded-full bg-[#416CEA] text-sm font-bold text-white shadow-[0_12px_24px_rgba(65,108,234,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-[#3456bb] active:scale-[0.99] disabled:opacity-80"
      >
        {cta}
      </button>

      {tab === "car" ? (
        <Link
          href={POPULAR_CARS_PATH}
          className="home-hero-popular-cta mt-2.5 flex h-10 w-full items-center justify-center rounded-full border-2 border-[#416CEA] bg-[#F2F5FB] text-sm font-bold text-[#416CEA] transition hover:bg-[#E8EEFC] active:scale-[0.99]"
        >
          ماشین های پرطرفدار
        </Link>
      ) : null}
    </div>
  );
}

function normalizeHeroSlides(
  slides: HomeHeroSlide[] | undefined,
): NormalizedHeroSlide[] {
  const items = Array.isArray(slides) ? slides : [];
  const normalized = items.flatMap((item, index) => {
    const src = apiAssetUrl(item?.ImagePath);
    if (!src) return [];
    const alt = String(item?.Text ?? "").trim() || "اسلاید کارماچک";
    return [
      {
        id: item?.Id ?? src ?? index,
        src,
        href: sliderHref(item?.Link ?? undefined),
        alt,
      },
    ];
  });
  return normalized.length
    ? normalized
    : [{ id: "fallback", src: HERO_FALLBACK_SRC, href: null, alt: "" }];
}

function BannerFrame({
  href,
  label,
  children,
}: {
  href: string | null;
  label: string;
  children: ReactNode;
}) {
  const className = "absolute inset-0 overflow-hidden bg-[#050B18]";
  if (!href) {
    return (
      <div className={className} aria-hidden>
        {children}
      </div>
    );
  }

  const external = /^https?:\/\//i.test(href);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`${className} cursor-pointer`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={label}
      className={`${className} cursor-pointer`}
    >
      {children}
    </Link>
  );
}

function HeroBackdrop({ slides }: { slides?: HomeHeroSlide[] }) {
  const sources = useMemo(() => normalizeHeroSlides(slides), [slides]);
  const fallbackOnly =
    sources.length === 1 && sources[0].src === HERO_FALLBACK_SRC;
  const [baseIndex, setBaseIndex] = useState(0);
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);
  const [overlayShown, setOverlayShown] = useState(false);
  const overlayIndexRef = useRef<number | null>(null);
  overlayIndexRef.current = overlayIndex;

  const finishCrossfade = useCallback(() => {
    const current = overlayIndexRef.current;
    if (current == null) return;
    overlayIndexRef.current = null;
    setBaseIndex(current);
    setOverlayShown(false);
    setOverlayIndex(null);
  }, []);

  useEffect(() => {
    if (sources.length < 2) return;
    const timer = window.setTimeout(() => {
      setOverlayIndex((current) =>
        current == null ? (baseIndex + 1) % sources.length : current,
      );
    }, HERO_SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [baseIndex, sources.length]);

  useEffect(() => {
    if (overlayIndex == null) return;
    setOverlayShown(false);
    const start = window.setTimeout(() => setOverlayShown(true), 40);
    return () => window.clearTimeout(start);
  }, [overlayIndex]);

  useEffect(() => {
    if (overlayIndex == null || !overlayShown) return;
    const safety = window.setTimeout(finishCrossfade, HERO_FADE_MS + 80);
    return () => window.clearTimeout(safety);
  }, [overlayIndex, overlayShown, finishCrossfade]);

  const activeIndex =
    overlayShown && overlayIndex != null ? overlayIndex : baseIndex;
  const active = sources[activeIndex] ?? sources[0];

  return (
    <BannerFrame href={active?.href ?? null} label={active?.alt || "اسلاید کارماچک"}>
      {sources.map((slide, index) => {
        const isBase = index === baseIndex;
        const isOverlay = index === overlayIndex;
        return (
          <div
            key={slide.id}
            className={cn(
              "home-hero-slide absolute inset-0 overflow-hidden",
              isBase && "is-base",
              isOverlay && "is-overlay",
              isOverlay && overlayShown && "is-shown",
            )}
            style={
              isOverlay
                ? { transitionDuration: `${HERO_FADE_MS}ms` }
                : undefined
            }
            onTransitionEnd={(event) => {
              if (event.target !== event.currentTarget) return;
              if (event.propertyName !== "opacity") return;
              if (isOverlay && overlayShown) finishCrossfade();
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              quality={90}
              sizes={HERO_IMAGE_SIZES}
              loading={index === 0 ? undefined : "eager"}
              className={
                fallbackOnly
                  ? "origin-[82%_56%] scale-[1.28] object-cover object-[84%_56%] lg:origin-[90%_48%] lg:scale-100 lg:object-[88%_48%]"
                  : "object-cover object-center"
              }
            />
          </div>
        );
      })}
    </BannerFrame>
  );
}

function HeroTitle() {
  return (
    <h1
      id="home-hero-title"
      className="font-Peyda text-center font-extrabold tracking-[-0.02em] lg:text-right"
    >
      <span className="text-[17px] leading-6 text-[#FFD54F] drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] sm:text-lg lg:text-[1.625rem] lg:leading-8">
        کارماچک؛
      </span>{" "}
      <span className="text-[14px] leading-6 text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] sm:text-base lg:text-lg lg:leading-8">
        کارشناسی خودرو در تهران و شرق تهران
      </span>
    </h1>
  );
}

export default function HomeHero({
  carBrands,
  motorcycleBrands,
  slides,
}: HeroBrandsProps & { slides?: HomeHeroSlide[] }) {
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
      className="max-lg:pb-0 font-IranSans lg:-mt-6 lg:pb-0"
      aria-labelledby="home-hero-title"
    >
      <div className="relative bg-[#050B18] pt-5 lg:pt-0">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-black px-4 py-1 sm:px-5 lg:static lg:px-5 lg:py-1.5">
          <div className="mx-auto w-full max-w-7xl lg:max-w-[110rem]">
            <HeroTitle />
          </div>
        </div>
        <div className="lg:mx-auto lg:grid lg:w-full lg:max-w-[110rem] lg:grid-cols-[minmax(0,1.7fr)_minmax(32rem,1.15fr)] lg:items-stretch lg:gap-8 lg:px-3 lg:py-3">
          <div className="home-hero-media relative aspect-[1080/600] w-full overflow-hidden max-lg:max-h-[min(42dvh,20rem)] max-lg:min-h-[12rem] sm:max-lg:max-h-[min(44dvh,22rem)] lg:min-w-0 lg:overflow-hidden lg:rounded-[28px]">
            <HeroBackdrop slides={slides} />
          </div>

          <div className="home-hero-mobile-shell relative z-20 mx-auto -mt-2 w-[calc(100%-2.5rem)] max-w-[24.5rem] max-lg:pb-[calc(var(--site-bottom-nav-clearance)*0.55)] sm:-mt-3 md:mx-0 md:mb-6 md:ml-[5%] md:mr-auto lg:mx-0 lg:mb-0 lg:mt-0 lg:flex lg:h-full lg:min-h-0 lg:w-full lg:max-w-none">
            <BrandPicker {...pickerProps} />
          </div>
        </div>
      </div>
    </section>
  );
}
