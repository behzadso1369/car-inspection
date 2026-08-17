"use client";

import {
  calculateCarPrice,
  type BodyStatus,
  type ChassisStatus,
} from "@/lib/car-price/pricing";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  CarFront,
  Palette,
  ShieldCheck,
  BadgeDollarSign,
  RotateCcw,
  ArrowRight,
  Gauge,
} from "lucide-react";

import cars from "@/data/car.json";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NavigationBar } from "@/app/components/mobile/Home/NavigationBar";
import { FaqPreviewSection } from "@/app/components/FaqPreviewSection";
import CarPricingSeoContent, {
  carPriceFaqItems,
} from "@/components/car-price/CarPricingSeoContent";

type Step = "search_car" | "year" | "mileage" | "color" | "chassis" | "result";

type CarItem = {
  id: string | number;
  carName: string;
  carPrice: string | number;
  lastYear: string;
  source: string;
};

type NormalizedCar = {
  id: string;
  name: string;
  price: number;
  lastYear: string;
  source: string;
};

const COLOR_OPTIONS: { label: BodyStatus }[] = [
  { label: "بی‌رنگ" },
  { label: "خط و خش جزئی" },
  { label: "صافکاری بدون رنگ" },
  { label: "رنگ یک ناحیه" },
  { label: "رنگ دو ناحیه" },
  { label: "رنگ چند ناحیه" },
];

const CHASSIS_OPTIONS: { label: ChassisStatus }[] = [
  { label: "سالم" },
  { label: "ضربه خورده" },
  { label: "آسیب شدید" },
];

const INPUT_CLASS_LG =
  "car-price-input h-12 rounded-2xl border-[#E8ECF4] bg-white text-base focus-visible:border-[#3456bb] focus-visible:ring-[#3456bb]/20 md:h-14";
const BACK_BTN_CLASS =
  "rounded-2xl border-[#3456bb]/25 text-[#3456bb] hover:bg-[#eef2fd]";

function normalizePrice(value: string | number) {
  if (typeof value === "number") return value;
  return Number(String(value).replaceAll(",", "").trim());
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

function toEnglishDigits(value: string) {
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  const ar = "٠١٢٣٤٥٦٧٨٩";
  return value
    .replace(/[۰-۹]/g, (d) => String(fa.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ar.indexOf(d)));
}

function formatMileageInput(value: string) {
  const digits = toEnglishDigits(value).replace(/\D/g, "");
  return digits ? Number(digits).toLocaleString("en-US") : "";
}

function displayBasePrice(car: NormalizedCar) {
  return car.source === "hamrah" ? car.price + 400000000 : car.price;
}

export default function CarPricePage() {
  const carList: NormalizedCar[] = useMemo(() => {
    return (cars?.cars as CarItem[]).map((car) => ({
      id: String(car.id),
      name: car.carName,
      price: normalizePrice(car.carPrice),
      lastYear: car.lastYear,
      source: car.source,
    }));
  }, []);

  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [step, setStep] = useState<Step>("search_car");
  const [query, setQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<NormalizedCar | null>(null);
  const [selectedColor, setSelectedColor] = useState<(typeof COLOR_OPTIONS)[number] | null>(null);
  const [selectedChassis, setSelectedChassis] = useState<(typeof CHASSIS_OPTIONS)[number] | null>(null);

  const filteredCars = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return carList.filter((car) => car.name.includes(q)).slice(0, 20);
  }, [query, carList]);

  const priceResult = useMemo(() => {
    const yearNumber = Number(toEnglishDigits(year));
    const mileageNumber = Number(toEnglishDigits(mileage).replaceAll(",", ""));

    if (
      !selectedCar ||
      !selectedColor ||
      !selectedChassis ||
      !yearNumber ||
      mileage.trim() === "" ||
      Number.isNaN(mileageNumber)
    ) {
      return null;
    }

    return calculateCarPrice({
      basePrice: displayBasePrice(selectedCar),
      lastYear: Number(selectedCar?.lastYear),
      year: yearNumber,
      km: mileageNumber,
      body: selectedColor.label,
      chassis: selectedChassis.label,
    });
  }, [selectedCar, selectedColor, selectedChassis, year, mileage]);

  const finalPrice = priceResult?.finalPrice ?? 0;
  const priceRange = priceResult?.range ?? null;

  const progressMap: Record<Step, number> = {
    search_car: 16,
    year: 32,
    mileage: 48,
    color: 64,
    chassis: 82,
    result: 100,
  };
  const progressValue = progressMap[step];
  const stepIndex =
    ["search_car", "year", "mileage", "color", "chassis", "result"].indexOf(step) + 1;

  const stepItems = [
    { key: "search_car", title: "خودرو", desc: "انتخاب مدل", icon: CarFront, active: step === "search_car", done: !!selectedCar },
    { key: "year", title: "سال", desc: "سال ساخت", icon: BadgeDollarSign, active: step === "year", done: !!year },
    { key: "mileage", title: "کارکرد", desc: "میزان پیمایش", icon: Gauge, active: step === "mileage", done: !!mileage },
    { key: "color", title: "رنگ", desc: "وضعیت رنگ", icon: Palette, active: step === "color", done: !!selectedColor },
    { key: "chassis", title: "شاسی", desc: "وضعیت اتاق", icon: ShieldCheck, active: step === "chassis", done: !!selectedChassis },
    { key: "result", title: "نتیجه", desc: "قیمت نهایی", icon: BadgeDollarSign, active: step === "result", done: step === "result" },
  ] as const;

  function handleSelectCar(car: NormalizedCar) {
    setSelectedCar(car);
    setYear("");
    setMileage("");
    setSelectedColor(null);
    setSelectedChassis(null);
    setQuery(car.name);
    setStep("year");
  }

  function handleYearSubmit() {
    const yearNumber = Number(toEnglishDigits(year));
    if (!yearNumber || yearNumber < 1380 || yearNumber > Number(selectedCar?.lastYear) + 1) {
      return;
    }
    setStep("mileage");
  }

  function handleMileageSubmit() {
    const mileageNumber = Number(toEnglishDigits(mileage).replaceAll(",", ""));
    if (mileageNumber < 0 || mileage.trim() === "") return;
    setStep("color");
  }

  function handleSelectColor(item: (typeof COLOR_OPTIONS)[number]) {
    setSelectedColor(item);
    setSelectedChassis(null);
    setStep("chassis");
  }

  function handleSelectChassis(item: (typeof CHASSIS_OPTIONS)[number]) {
    setSelectedChassis(item);
    setStep("result");
  }

  function handleBack() {
    switch (step) {
      case "year":
        setYear("");
        setStep("search_car");
        break;
      case "mileage":
        setMileage("");
        setSelectedColor(null);
        setSelectedChassis(null);
        setStep("year");
        break;
      case "color":
        setSelectedColor(null);
        setSelectedChassis(null);
        setStep("mileage");
        break;
      case "chassis":
        setSelectedChassis(null);
        setStep("color");
        break;
      case "result":
        setSelectedChassis(null);
        setStep("chassis");
        break;
    }
  }

  function resetAll() {
    setStep("search_car");
    setQuery("");
    setSelectedCar(null);
    setYear("");
    setMileage("");
    setSelectedColor(null);
    setSelectedChassis(null);
  }

  const mobileBarRef = useRef<HTMLDivElement | null>(null);
  const [mobileBarHeight, setMobileBarHeight] = useState(140);

  useEffect(() => {
    const el = mobileBarRef.current;
    if (!el) return;

    const update = () => setMobileBarHeight(el.offsetHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [step]);

  const inputControls = (
    <>
      {step === "search_car" && (
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2 lg:mb-2 lg:gap-3">
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-[#101117]">جستجوی خودرو</p>
              <p className="mt-0.5 text-[11px] text-[#6B6C70]">نام خودرو را وارد کنید</p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl car-price-icon-box">
              <Search className="h-4 w-4" />
            </div>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999A9C]" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="مثلاً دنا پلاس، پژو ۲۰۷، تارا..."
              className={`${INPUT_CLASS_LG} pr-10 text-right`}
              autoComplete="off"
            />
          </div>
        </div>
      )}

      {step === "year" && (
        <div className="space-y-2.5">
          <div>
            <p className="text-sm font-extrabold text-[#101117]">سال ساخت</p>
            <p className="mt-0.5 truncate text-[11px] text-[#6B6C70]">{selectedCar?.name}</p>
          </div>
          <Input
            value={year}
            onChange={(e) => setYear(toEnglishDigits(e.target.value))}
            placeholder="مثلاً 1401"
            className={INPUT_CLASS_LG}
            inputMode="numeric"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBack} className={`h-11 flex-1 ${BACK_BTN_CLASS}`}>
              <ArrowRight className="ml-2 h-4 w-4" />
              بازگشت
            </Button>
            <Button onClick={handleYearSubmit} className="car-price-btn h-11 flex-1 rounded-2xl border-0">
              ادامه
            </Button>
          </div>
        </div>
      )}

      {step === "mileage" && (
        <div className="space-y-2.5">
          <div>
            <p className="text-sm font-extrabold text-[#101117]">کارکرد خودرو</p>
            <p className="mt-0.5 text-[11px] text-[#6B6C70]">میزان کارکرد به کیلومتر</p>
          </div>
          <Input
            value={mileage}
            onChange={(e) => setMileage(formatMileageInput(e.target.value))}
            placeholder="مثلاً 85,000"
            className={INPUT_CLASS_LG}
            inputMode="numeric"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBack} className={`h-11 flex-1 ${BACK_BTN_CLASS}`}>
              <ArrowRight className="ml-2 h-4 w-4" />
              بازگشت
            </Button>
            <Button onClick={handleMileageSubmit} className="car-price-btn h-11 flex-1 rounded-2xl border-0">
              ادامه
            </Button>
          </div>
        </div>
      )}

      {step === "color" && (
        <div>
          <p className="text-sm font-extrabold text-[#101117]">وضعیت رنگ</p>
          <p className="mt-0.5 truncate text-[11px] text-[#6B6C70]">{selectedCar?.name}</p>
        </div>
      )}

      {step === "chassis" && (
        <div>
          <p className="text-sm font-extrabold text-[#101117]">وضعیت شاسی و اتاق</p>
          <p className="mt-0.5 text-[11px] text-[#6B6C70]">رنگ: {selectedColor?.label}</p>
        </div>
      )}

      {step === "result" && (
        <div>
          <p className="text-sm font-extrabold text-[#101117]">نتیجه ارزیابی</p>
          <p className="mt-0.5 text-[11px] text-[#6B6C70]">قیمت حدودی بر اساس اطلاعات واردشده</p>
        </div>
      )}
    </>
  );

  return (
    <main className="relative min-h-screen bg-[#F3F5F8] font-IranSans pb-24 lg:pb-8" dir="rtl">
      {/* موبایل: نوار ثابت ورودی — زیر بنر و هدر سایت */}
      <div
        ref={mobileBarRef}
        className="fixed inset-x-0 top-[5.5rem] z-40 border-b border-[#E8ECF4] bg-white/95 px-3 py-2.5 shadow-[0_8px_24px_rgba(16,17,23,0.06)] backdrop-blur-md lg:hidden"
      >
        <div className="car-price-progress-track mb-2 h-1">
          <div
            className="car-price-progress-fill h-full"
            style={{ width: `${progressValue}%` }}
          />
        </div>
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-[13px] font-black leading-5 text-gradient">
              محاسبه قیمت خودرو کارکرده و قیمت‌گذاری آنلاین
            </h1>
            <p className="mt-0.5 text-[10px] leading-4 text-[#6B6C70]">
              اول خودرو را جستجو کن، بعد مشخصات را مرحله‌به‌مرحله وارد کن.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-[#EEF2FD] px-2 py-1 text-[10px] font-bold text-[#3456bb]">
            {stepIndex}/۶
          </span>
        </div>
        {inputControls}
      </div>
      <div className="lg:hidden" style={{ height: mobileBarHeight }} aria-hidden />

      <div className="relative mx-auto max-w-7xl px-3 pt-3 md:px-6 md:pt-6">
        {/* دسکتاپ: هدر کامل */}
        <header className="mb-6 hidden lg:block">
          <div className="car-price-progress-track mb-5 h-1.5 max-w-3xl">
            <div
              className="car-price-progress-fill h-full"
              style={{ width: `${progressValue}%` }}
            />
          </div>
          <Badge className="car-price-badge text-xs">کارشناسی هوشمند خودرو</Badge>
          <h1 className="mt-3 text-3xl font-black leading-[2.75rem] text-gradient">
            محاسبه قیمت خودرو کارکرده و قیمت‌گذاری آنلاین
          </h1>
          <p className="mt-2 text-sm leading-7 text-[#6B6C70]">
            اول خودرو را جستجو کن، بعد مشخصات را مرحله‌به‌مرحله وارد کن.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          {/* دسکتاپ: سایدبار مراحل */}
          <aside className="hidden lg:col-span-4 lg:block">
            <Card className="glass-card sticky top-28 rounded-[2rem] border-[#3456bb]/10">
              <CardHeader className="pb-3">
                <Badge className="mb-2 w-fit car-price-badge">قیمت‌گذاری هوشمند</Badge>
                <CardTitle className="text-2xl font-black leading-10 text-gradient">
                  مراحل ارزیابی خودرو
                </CardTitle>
                <CardDescription className="mt-1 text-sm leading-7">
                  مدل، سال، کارکرد، رنگ و شاسی را وارد کنید و بازه قیمت را ببینید.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {stepItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.key}
                      className={[
                        "flex items-center gap-3 rounded-2xl border p-3.5 transition",
                        item.active
                          ? "car-price-step-active"
                          : item.done
                            ? "car-price-step-done"
                            : "car-price-step-idle",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "flex h-10 w-10 items-center justify-center rounded-2xl",
                          item.active || item.done
                            ? "bg-[#3456bb] text-white"
                            : "bg-[#F0F2F4] text-[#999A9C]",
                        ].join(" ")}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-black text-[#101117]">
                          {index + 1}. {item.title}
                        </div>
                        <div className="mt-0.5 text-xs text-[#6B6C70]">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}

                {(selectedCar || selectedColor || selectedChassis) && (
                  <div className="rounded-3xl car-price-summary-box p-4">
                    <h3 className="mb-3 text-sm font-black text-[#101117]">خلاصه انتخاب‌ها</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-3">
                        <span className="text-[#6B6C70]">خودرو</span>
                        <span className="font-bold text-[#101117]">{selectedCar?.name || "-"}</span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-[#6B6C70]">سال ساخت</span>
                        <span className="font-bold text-[#101117]">{year || "-"}</span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-[#6B6C70]">کارکرد</span>
                        <span className="font-bold text-[#101117]">
                          {mileage
                            ? `${formatPrice(Number(toEnglishDigits(mileage).replaceAll(",", "")))} کیلومتر`
                            : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-[#6B6C70]">رنگ</span>
                        <span className="font-bold text-[#101117]">{selectedColor?.label || "-"}</span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-[#6B6C70]">شاسی</span>
                        <span className="font-bold text-[#101117]">{selectedChassis?.label || "-"}</span>
                      </div>
                    </div>
                    <Button
                      onClick={resetAll}
                      variant="outline"
                      className="mt-4 w-full rounded-2xl border-[#3456bb]/25 text-[#3456bb] hover:bg-[#eef2fd]"
                    >
                      <RotateCcw className="ml-2 h-4 w-4" />
                      شروع دوباره
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* پنل اصلی */}
          <div className="lg:col-span-8">
            <Card className="glass-card rounded-3xl border-[#3456bb]/10 md:rounded-[2rem]">
              {/* دسکتاپ: ورودی چسبان داخل کارت */}
              <div className="sticky top-28 z-20 hidden border-b border-[#E8ECF4]/80 bg-white/95 px-6 py-4 backdrop-blur-md lg:block">
                {inputControls}
              </div>

              <CardContent className="space-y-3 p-3 md:space-y-4 md:p-6">
                {step === "search_car" && (
                  <>
                    {!query.trim() ? (
                      <div className="rounded-2xl md:rounded-3xl">
                        <CarPricingSeoContent variant="intro" />
                      </div>
                    ) : (
                      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3 md:gap-3">
                        {filteredCars.map((car) => (
                          <button
                            key={car.id}
                            onClick={() => handleSelectCar(car)}
                            className="car-price-interactive flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-right md:flex-col md:items-start md:rounded-3xl md:p-4"
                          >
                            <div className="mb-0 flex min-w-0 flex-col text-right md:mb-3">
                              <div className="mb-2 hidden h-11 w-11 items-center justify-center rounded-2xl car-price-icon-box md:flex">
                                <CarFront className="h-5 w-5" />
                              </div>
                              <span className="truncate text-sm font-bold text-[#101117]">
                                {car.name}
                              </span>
                              <span className="mt-1 text-[11px] text-[#6B6C70] md:text-xs">
                                قیمت پایه: {formatPrice(displayBasePrice(car))} تومان
                              </span>
                            </div>
                            <CarFront className="h-4 w-4 shrink-0 car-price-accent md:hidden" />
                          </button>
                        ))}
                      </div>
                    )}

                    {!filteredCars.length && query.trim() && (
                      <div className="rounded-2xl border border-dashed border-[#E8ECF4] bg-white/70 px-4 py-8 text-center text-sm text-[#6B6C70]">
                        خودرویی با این عبارت پیدا نشد.
                      </div>
                    )}
                  </>
                )}

                {step === "year" && (
                  <p className="rounded-2xl bg-[#F8FAFF] px-4 py-3 text-xs leading-6 text-[#55565A] md:text-sm md:leading-7">
                    سال ساخت را بین ۱۳۸۰ تا {selectedCar?.lastYear} وارد کنید، سپس ادامه دهید.
                  </p>
                )}

                {step === "mileage" && (
                  <p className="rounded-2xl bg-[#F8FAFF] px-4 py-3 text-xs leading-6 text-[#55565A] md:text-sm md:leading-7">
                    کارکرد واقعی خودرو را وارد کنید تا محاسبه قیمت دقیق‌تر شود.
                  </p>
                )}

                {step === "color" && (
                  <div>
                    <div className="grid gap-2 sm:grid-cols-2 md:gap-3">
                      {COLOR_OPTIONS.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleSelectColor(item)}
                          className="car-price-interactive rounded-2xl px-4 py-3.5 text-right text-sm font-bold text-[#101117] md:rounded-3xl md:p-5"
                        >
                          <div className="mb-2 hidden h-11 w-11 items-center justify-center rounded-2xl car-price-icon-box md:flex">
                            <Palette className="h-5 w-5" />
                          </div>
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className={`mt-3 h-11 w-full ${BACK_BTN_CLASS}`}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                      بازگشت
                    </Button>
                  </div>
                )}

                {step === "chassis" && (
                  <div>
                    <div className="grid gap-2 sm:grid-cols-2 md:gap-3">
                      {CHASSIS_OPTIONS.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleSelectChassis(item)}
                          className="car-price-interactive rounded-2xl px-4 py-3.5 text-right text-sm font-bold text-[#101117] md:rounded-3xl md:p-5"
                        >
                          <div className="mb-2 hidden h-11 w-11 items-center justify-center rounded-2xl car-price-icon-box md:flex">
                            <ShieldCheck className="h-5 w-5" />
                          </div>
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className={`mt-3 h-11 w-full ${BACK_BTN_CLASS}`}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                      بازگشت
                    </Button>
                  </div>
                )}

                {step === "result" &&
                  selectedCar &&
                  selectedColor &&
                  selectedChassis &&
                  priceRange && (
                    <div className="space-y-4">
                      <div className="rounded-2xl car-price-result-card p-5 text-white md:rounded-[2rem] md:p-8">
                        <div className="text-xs text-white/80 md:text-sm">بازه قیمت تقریبی</div>
                        <div className="mt-2 text-lg font-black leading-9 md:mt-4 md:text-3xl md:leading-[3.5rem]">
                          {formatPrice(priceRange.min)} تا {formatPrice(priceRange.max)} تومان
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2 rounded-2xl car-price-summary-box p-4 md:rounded-3xl md:p-5">
                          <div className="mb-1 text-sm font-black text-[#101117]">جزئیات انتخاب</div>
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B6C70]">خودرو</span>
                            <span className="font-bold text-[#101117]">{selectedCar.name}</span>
                          </div>
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B6C70]">سال ساخت</span>
                            <span className="font-bold text-[#101117]">{year}</span>
                          </div>
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B6C70]">کارکرد</span>
                            <span className="font-bold text-[#101117]">
                              {formatPrice(Number(toEnglishDigits(mileage).replaceAll(",", "")))} کیلومتر
                            </span>
                          </div>
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B6C70]">رنگ</span>
                            <span className="font-bold text-[#101117]">{selectedColor.label}</span>
                          </div>
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B6C70]">شاسی</span>
                            <span className="font-bold text-[#101117]">{selectedChassis.label}</span>
                          </div>
                        </div>

                        <div className="space-y-2 rounded-2xl car-price-summary-box p-4 md:rounded-3xl md:p-5">
                          <div className="mb-1 text-sm font-black text-[#101117]">خروجی محاسبه</div>
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B6C70]">قیمت پایه</span>
                            <span className="font-bold text-[#101117]">
                              {formatPrice(displayBasePrice(selectedCar))} تومان
                            </span>
                          </div>
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B6C70]">قیمت محاسبه‌شده</span>
                            <span className="font-bold car-price-accent">
                              {formatPrice(finalPrice)} تومان
                            </span>
                          </div>
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B6C70]">بازه نهایی</span>
                            <span className="font-black car-price-accent-light">
                              {formatPrice(priceRange.min)} تا {formatPrice(priceRange.max)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 md:gap-3">
                        <Button
                          variant="outline"
                          onClick={handleBack}
                          className={`h-11 flex-1 ${BACK_BTN_CLASS}`}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                          بازگشت
                        </Button>
                        <Button
                          onClick={resetAll}
                          className="car-price-btn h-11 flex-1 rounded-2xl border-0"
                        >
                          <RotateCcw className="ml-2 h-4 w-4" />
                          شروع دوباره
                        </Button>
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-4 md:mt-6">
          <CarPricingSeoContent variant="details" />
        </div>
      </div>

      <FaqPreviewSection
        title="سوالات متداول قیمت‌گذاری خودرو"
        subtitle="پاسخ سوالات رایج درباره محاسبه قیمت خودرو کارکرده"
        items={carPriceFaqItems}
        expandInline
        showViewAll={false}
        className="lg:max-w-4xl lg:mx-auto lg:my-8"
      />

      <div className="block lg:hidden">
        <NavigationBar activePath="/car-price" />
      </div>
    </main>
  );
}
