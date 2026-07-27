"use client"
import {
  calculateCarPrice,
  type BodyStatus,
  type ChassisStatus,
} from "@/lib/car-price/pricing"
import { useEffect, useMemo, useRef, useState } from "react"
import { Search, CarFront, Palette, ShieldCheck, BadgeDollarSign, RotateCcw } from "lucide-react"

import cars from "@/data/car.json"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NavigationBar } from "@/app/components/mobile/Home/NavigationBar"

type Step = "search_car" | "year" | "mileage" | "color" | "chassis" | "result"

type CarItem = {
  id: string | number
  carName: string
  carPrice: string | number
   lastYear:string;
   source:string
}

type NormalizedCar = {
  id: string
  name: string
  price: number
  lastYear:string
  source:string
}

const COLOR_OPTIONS: { label: BodyStatus; desc?: string }[] = [
  { label: "بی‌رنگ" },
  { label: "خط و خش جزئی" },
  { label: "صافکاری بدون رنگ" },
  { label: "رنگ یک ناحیه" },
  { label: "رنگ دو ناحیه" },
  { label: "رنگ چند ناحیه" },
]

const CHASSIS_OPTIONS: { label: ChassisStatus; desc?: string }[] = [
  { label: "سالم" },
  { label: "ضربه خورده" },
  { label: "آسیب شدید" },
]

function normalizePrice(value: string | number) {
  if (typeof value === "number") return value
  return Number(String(value).replaceAll(",", "").trim())
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value)
}

function getPriceRange(price: number) {
  const step = 100_000_000
  const min = Math.floor(price / step) * step
  const max = min + step
  return { min, max }
}
function toEnglishDigits(value: string) {
  const fa = "۰۱۲۳۴۵۶۷۸۹"
  const ar = "٠١٢٣٤٥٦٧٨٩"

  return value
    .replace(/[۰-۹]/g, (d) => String(fa.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ar.indexOf(d)))
}





export default function CarPricePage() {
  
  const carList: NormalizedCar[] = useMemo(() => {
    return (cars?.cars as CarItem[]).map((car) => ({
      id: String(car.id),
      name: car.carName,
      price: normalizePrice(car.carPrice),
      lastYear: car.lastYear,
      source:car.source
    }))
  }, [])

const [year, setYear] = useState("")
const [mileage, setMileage] = useState("")

const [step, setStep] = useState<Step>("search_car")
const [query, setQuery] = useState("")
const [selectedCar, setSelectedCar] = useState<NormalizedCar | null>(null)
const [selectedColor, setSelectedColor] = useState<(typeof COLOR_OPTIONS)[number] | null>(null)
const [selectedChassis, setSelectedChassis] = useState<(typeof CHASSIS_OPTIONS)[number] | null>(null)

const stepContentRef = useRef<HTMLDivElement | null>(null)


  const filteredCars = useMemo(() => {
    const q = query.trim()
    if (!q) return carList.slice(0, 12)
    return carList.filter((car) => car.name.includes(q)).slice(0, 20)
  }, [query, carList])

const priceResult = useMemo(() => {
  const yearNumber = Number(toEnglishDigits(year))
  const mileageNumber = Number(toEnglishDigits(mileage).replaceAll(",", ""))

  if (
    !selectedCar ||
    !selectedColor ||
    !selectedChassis ||
    !yearNumber ||
    mileage.trim() === "" ||
    Number.isNaN(mileageNumber)
  ) {
    return null
  }

  return calculateCarPrice({
    basePrice: selectedCar?.source == "hamrah" ? selectedCar?.price + 400000000 : selectedCar.price,
    lastYear:Number(selectedCar?.lastYear),
    year: yearNumber,
    km: mileageNumber,
    body:
      typeof selectedColor === "string"
        ? selectedColor
        : selectedColor.label,
    chassis:
      typeof selectedChassis === "string"
        ? selectedChassis
        : selectedChassis.label,
  })
}, [selectedCar, selectedColor, selectedChassis, year, mileage])

const finalPrice = priceResult?.finalPrice ?? 0


  const priceRange = priceResult?.range ?? null

const progressMap: Record<Step, number> = {
  search_car: 16,
  year: 32,
  mileage: 48,
  color: 64,
  chassis: 82,
  result: 100,
}

const progressValue = progressMap[step]

 const stepItems = [
  {
    key: "search_car",
    title: "خودرو",
    desc: "انتخاب مدل",
    icon: CarFront,
    active: step === "search_car",
    done: !!selectedCar,
  },
  {
    key: "year",
    title: "سال",
    desc: "سال ساخت",
    icon: BadgeDollarSign,
    active: step === "year",
    done: !!year,
  },
  {
    key: "mileage",
    title: "کارکرد",
    desc: "میزان پیمایش",
    icon: Search,
    active: step === "mileage",
    done: !!mileage,
  },
  {
    key: "color",
    title: "رنگ",
    desc: "وضعیت رنگ",
    icon: Palette,
    active: step === "color",
    done: !!selectedColor,
  },
  {
    key: "chassis",
    title: "شاسی",
    desc: "وضعیت اتاق",
    icon: ShieldCheck,
    active: step === "chassis",
    done: !!selectedChassis,
  },
  {
    key: "result",
    title: "نتیجه",
    desc: "قیمت نهایی",
    icon: BadgeDollarSign,
    active: step === "result",
    done: step === "result",
  },
] as const

useEffect(() => {
  if (step !== "search_car") {
    setTimeout(() => {
      stepContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }
}, [step, selectedCar])

  function handleSelectCar(car: NormalizedCar) {
  setSelectedCar(car)
  setYear("")
  setMileage("")
  setSelectedColor(null)
  setSelectedChassis(null)
  setQuery(car.name)
  setStep("year")
}
function handleYearSubmit() {
  const yearNumber = Number(toEnglishDigits(year))

  if (!yearNumber || yearNumber < 1380 || yearNumber > Number(selectedCar?.lastYear) + 1) {
    return
  }

  setStep("mileage")
}


function handleMileageSubmit() {
  const mileageNumber = Number(toEnglishDigits(mileage).replaceAll(",", ""))
  if (mileageNumber < 0) return
  setStep("color")
}

  function handleSelectColor(item: (typeof COLOR_OPTIONS)[number]) {
    setSelectedColor(item)
    setSelectedChassis(null)
    setStep("chassis")
  }

  function handleSelectChassis(item: (typeof CHASSIS_OPTIONS)[number]) {
    setSelectedChassis(item)
    setStep("result")
  }

  function resetAll() {
  setStep("search_car")
  setQuery("")
  setSelectedCar(null)
  setYear("")
  setMileage("")
  setSelectedColor(null)
  setSelectedChassis(null)
}

  return (
    <main className="modern-gradient relative min-h-screen overflow-hidden font-IranSans pb-28 lg:pb-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#3563E9]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-16 h-64 w-64 rounded-full bg-[#416CEA]/8 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-8">
        <div className="car-price-progress-track mx-auto mb-5 h-1.5 max-w-3xl md:mb-7">
          <div
            className="car-price-progress-fill h-full"
            style={{ width: `${progressValue}%` }}
          />
        </div>
        {/* ===== موبایل ===== */}
        <div className="lg:hidden">
          <div className="mx-auto flex max-w-md flex-col gap-4">
            {/* هدر کوچک موبایل */}
            <section className="pt-1">
              <Badge className="car-price-badge">
                کارشناسی هوشمند خودرو
              </Badge>

              <h1 className="mt-3 text-2xl font-black leading-9 text-gradient">
                قیمت حدودی خودروت رو سریع پیدا کن
              </h1>

              <p className="mt-2 text-sm leading-7 text-[#6B6C70]">
                اول خودرو را جستجو کن، بعد مشخصات را مرحله‌به‌مرحله وارد کن.
              </p>
            </section>

            {/* جستجو در نگاه اول */}
            <Card className="glass-card rounded-3xl border-[#3456bb]/10">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-extrabold text-[#101117]">
                      جستجوی خودرو
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs">
                      نام خودرو را وارد کنید
                    </CardDescription>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl car-price-icon-box">
                    <Search className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999A9C]" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="مثلاً دنا پلاس توربو"
                    className="h-12 rounded-2xl border-[#E8ECF4] bg-white pr-10 text-right focus-visible:border-[#3456bb] focus-visible:ring-[#3456bb]/20"
                  />
                </div>

                <div className="max-h-72 space-y-2 overflow-y-auto">
                  {filteredCars.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => handleSelectCar(car)}
                      className="car-price-interactive flex w-full items-center justify-between rounded-2xl px-4 py-3 text-right"
                    >
                      <div className="flex min-w-0 flex-col text-right">
                        <span className="truncate text-sm font-bold text-[#101117]">{car.name}</span>
                        <span className="mt-1 text-xs text-[#6B6C70]">
                          قیمت پایه: {formatPrice(car.source == "hamrah" ? car.price + 400000000 : car.price)} تومان
                        </span>
                      </div>
                      <CarFront className="h-4 w-4 shrink-0 car-price-accent" />
                    </button>
                  ))}

                  {!filteredCars.length && (
                    <div className="rounded-2xl border border-dashed border-[#E8ECF4] bg-white/70 px-4 py-6 text-center text-sm text-[#6B6C70]">
                      خودرویی با این عبارت پیدا نشد.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* مراحل در موبایل، فشرده و قابل دیدن */}
            <Card className="glass-card rounded-3xl border-[#3456bb]/10">
              <CardContent className="p-3">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-[#101117]">مراحل ارزیابی</h3>
                  <span className="text-xs font-medium car-price-accent">
                    {Math.ceil(progressValue / 20)} از ۶ مرحله
                  </span>
                </div>

               

                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {stepItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.key}
                        className={[
                          "min-w-[96px] rounded-2xl border p-3 transition",
                          item.active
                            ? "car-price-step-active"
                            : item.done
                              ? "car-price-step-done"
                              : "car-price-step-idle",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "mb-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black",
                            item.active
                              ? "bg-[#3456bb] text-white shadow-md shadow-[#3456bb]/25"
                              : item.done
                                ? "bg-[#416CEA] text-white"
                                : "bg-[#F0F2F4] text-[#999A9C]",
                          ].join(" ")}
                        >
                          {index + 1}
                        </div>
                        <div className="mb-1">
                          <Icon className="h-4 w-4 text-[#6B6C70]" />
                        </div>
                        <div className="text-xs font-extrabold text-[#101117]">{item.title}</div>
                        <div className="mt-1 text-[11px] text-[#6B6C70]">{item.desc}</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* محتوای مرحله فعلی در موبایل */}
           {step !== "search_car" && (
  <div ref={stepContentRef}>
    <Card className="glass-card rounded-3xl border-[#3456bb]/10">
      <CardContent className="p-4">
        {step === "year" && (
  <div>
    <div className="mb-3">
      <h3 className="text-base font-extrabold text-[#101117]">سال ساخت</h3>
      <p className="mt-1 text-xs text-[#6B6C70]">
        خودرو انتخاب‌شده: {selectedCar?.name}
      </p>
    </div>

    <div className="space-y-3">
      <Input
        value={year}
        onChange={(e) => setYear(toEnglishDigits(e.target.value))}
        placeholder="مثلاً 1401"
        className="h-12 rounded-2xl border-[#E8ECF4] bg-white focus-visible:border-[#3456bb] focus-visible:ring-[#3456bb]/20"
        inputMode="numeric"
      />
      <Button onClick={handleYearSubmit} className="car-price-btn h-11 w-full rounded-2xl border-0">
        ادامه
      </Button>
    </div>
  </div>
)}

{step === "mileage" && (
  <div>
    <div className="mb-3">
      <h3 className="text-base font-extrabold text-[#101117]">کارکرد خودرو</h3>
      <p className="mt-1 text-xs text-[#6B6C70]">
        میزان کارکرد را به کیلومتر وارد کنید
      </p>
    </div>

    <div className="space-y-3">
      <Input
        value={mileage}
        onChange={(e) => setMileage(toEnglishDigits(e.target.value))}
        placeholder="مثلاً 85000"
        className="h-12 rounded-2xl border-[#E8ECF4] bg-white focus-visible:border-[#3456bb] focus-visible:ring-[#3456bb]/20"
        inputMode="numeric"
      />
      <Button onClick={handleMileageSubmit} className="car-price-btn h-11 w-full rounded-2xl border-0">
        ادامه
      </Button>
    </div>
  </div>
)}

        {step === "color" && (
          <div>
            <div className="mb-3">
              <h3 className="text-base font-extrabold text-[#101117]">وضعیت رنگ</h3>
              <p className="mt-1 text-xs text-[#6B6C70]">
                خودرو انتخاب‌شده: {selectedCar?.name}
              </p>
            </div>

            <div className="space-y-2">
              {COLOR_OPTIONS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSelectColor(item)}
                  className="car-price-interactive w-full rounded-2xl px-4 py-3 text-right text-sm font-bold text-[#101117]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "chassis" && (
          <div>
            <div className="mb-3">
              <h3 className="text-base font-extrabold text-[#101117]">وضعیت شاسی و اتاق</h3>
              <p className="mt-1 text-xs text-[#6B6C70]">
                رنگ انتخاب‌شده: {selectedColor?.label}
              </p>
            </div>

            <div className="space-y-2">
              {CHASSIS_OPTIONS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSelectChassis(item)}
                  className="car-price-interactive w-full rounded-2xl px-4 py-3 text-right text-sm font-bold text-[#101117]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "result" && selectedCar && selectedColor && selectedChassis && priceRange && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-[#101117]">نتیجه ارزیابی</h3>
              <p className="mt-1 text-sm text-[#6B6C70]">
                قیمت حدودی بر اساس اطلاعات واردشده
              </p>
            </div>

            <div className="rounded-3xl car-price-result-card p-5 text-white">
              <div className="text-sm text-white/80">بازه قیمت تقریبی</div>
              <div className="mt-3 text-xl font-black leading-10">
                {formatPrice(priceRange.min)} تا {formatPrice(priceRange.max)} تومان
              </div>
            </div>

            <div className="space-y-2 rounded-2xl car-price-summary-box p-4">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-[#6B6C70]">خودرو</span>
                <span className="font-bold text-[#101117]">{selectedCar.name}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-[#6B6C70]">وضعیت رنگ</span>
                <span className="font-bold text-[#101117]">{selectedColor.label}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-[#6B6C70]">وضعیت شاسی</span>
                <span className="font-bold text-[#101117]">{selectedChassis.label}</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-[#E8ECF4] pt-2 text-sm">
                <span className="text-[#6B6C70]">قیمت محاسبه‌شده</span>
                <span className="font-black car-price-accent">
                  {formatPrice(finalPrice)} تومان
                </span>
              </div>
            </div>

            <Button onClick={resetAll} className="car-price-btn h-11 w-full rounded-2xl border-0">
              <RotateCcw className="ml-2 h-4 w-4" />
              شروع دوباره
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
)}

          </div>
        </div>

        {/* ===== دسکتاپ - دست‌نخورده و کامل ===== */}
        <div className="hidden lg:block">
          <div className="grid min-h-[calc(100vh-4rem)] grid-cols-12 gap-6">
            <div className="col-span-4">
              <Card className="glass-card sticky top-6 rounded-[2rem] border-[#3456bb]/10">
                <CardHeader>
                  <Badge className="mb-3 w-fit car-price-badge">
                    کارشناسی هوشمند خودرو
                  </Badge>

                  <CardTitle className="text-3xl font-black leading-[3rem] text-gradient">
                    قیمت‌گذاری سریع و هوشمند خودرو
                  </CardTitle>

                  <CardDescription className="mt-2 text-sm leading-7">
                    با انتخاب خودرو، وضعیت رنگ و شاسی، قیمت حدودی خودرو را با بازه ۱۰۰ میلیونی مشاهده کنید.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                 

                  <div className="space-y-3">
                    {stepItems.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={item.key}
                          className={[
                            "flex items-center gap-3 rounded-2xl border p-4 transition",
                            item.active
                              ? "car-price-step-active"
                              : item.done
                                ? "car-price-step-done"
                                : "car-price-step-idle",
                          ].join(" ")}
                        >
                          <div
                            className={[
                              "flex h-11 w-11 items-center justify-center rounded-2xl",
                              item.active
                                ? "bg-[#3456bb] text-white shadow-md shadow-[#3456bb]/25"
                                : item.done
                                  ? "bg-[#416CEA] text-white"
                                  : "bg-[#F0F2F4] text-[#999A9C]",
                            ].join(" ")}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="flex-1">
                            <div className="text-sm font-black text-[#101117]">
                              {index + 1}. {item.title}
                            </div>
                            <div className="mt-1 text-xs text-[#6B6C70]">{item.desc}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {(selectedCar || selectedColor || selectedChassis) && (
                    <div className="rounded-3xl car-price-summary-box p-4">
                      <h3 className="mb-3 text-sm font-black text-[#101117]">خلاصه انتخاب‌ها</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[#6B6C70]">خودرو</span>
                          <span className="font-bold text-[#101117]">{selectedCar?.name || "-"}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 text-sm">
  <span className="text-[#6B6C70]">سال ساخت</span>
  <span className="font-bold text-[#101117]">{year}</span>
</div>

<div className="flex items-center justify-between gap-3 text-sm">
  <span className="text-[#6B6C70]">کارکرد</span>
  <span className="font-bold text-[#101117]">{formatPrice(Number(toEnglishDigits(mileage)))} کیلومتر</span>
</div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[#6B6C70]">رنگ</span>
                          <span className="font-bold text-[#101117]">{selectedColor?.label || "-"}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[#6B6C70]">شاسی</span>
                          <span className="font-bold text-[#101117]">{selectedChassis?.label || "-"}</span>
                        </div>
                      </div>

                      <Button onClick={resetAll} variant="outline" className="mt-4 w-full rounded-2xl border-[#3456bb]/25 text-[#3456bb] hover:bg-[#eef2fd]">
                        <RotateCcw className="ml-2 h-4 w-4" />
                        شروع دوباره
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="col-span-8">
              <Card className="glass-card rounded-[2rem] border-[#3456bb]/10">
                <CardContent className="p-6">
                  {step === "search_car" && (
                    <div>
                      <div className="mb-6">
                        <h2 className="text-2xl font-black text-[#101117]">جستجوی خودرو</h2>
                        <p className="mt-2 text-sm text-[#6B6C70]">
                          از لیست خودروها جستجو و مدل موردنظر را انتخاب کنید.
                        </p>
                      </div>

                      <div className="relative mb-5">
                        <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#999A9C]" />
                        <Input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="مثلاً پژو 207، دنا پلاس، تارا..."
                          className="h-14 rounded-2xl border-[#E8ECF4] bg-white pr-12 text-base focus-visible:border-[#3456bb] focus-visible:ring-[#3456bb]/20"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                        {filteredCars.map((car) => (
                          <button
                            key={car.id}
                            onClick={() => handleSelectCar(car)}
                            className="car-price-interactive rounded-3xl p-4 text-right"
                          >
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl car-price-icon-box">
                              <CarFront className="h-5 w-5" />
                            </div>
                            <div className="text-sm font-black text-[#101117]">{car.name}</div>
                            <div className="mt-2 text-xs text-[#6B6C70]">
                              قیمت پایه: {formatPrice(car.source == "hamrah" ? car.price + 400000000 : car.price)} تومان
                            </div>
                          </button>
                        ))}
                      </div>

                      {!filteredCars.length && (
                        <div className="rounded-3xl border border-dashed border-[#E8ECF4] bg-white/70 px-4 py-10 text-center text-[#6B6C70]">
                          خودرویی با این عبارت پیدا نشد.
                        </div>
                      )}
                    </div>
                  )}
{step === "year" && (
  <div>
    <div className="mb-6">
      <h2 className="text-2xl font-black text-[#101117]">سال ساخت خودرو</h2>
      <p className="mt-2 text-sm text-[#6B6C70]">
        خودرو انتخاب‌شده: <span className="font-bold text-[#101117]">{selectedCar?.name}</span>
      </p>
    </div>

    <div className="max-w-md space-y-4">
      <Input
        value={year}
        onChange={(e) => setYear(toEnglishDigits(e.target.value))}
        placeholder="مثلاً 1401"
        className="h-14 rounded-2xl border-[#E8ECF4] bg-white focus-visible:border-[#3456bb] focus-visible:ring-[#3456bb]/20"
        inputMode="numeric"
      />
      <Button onClick={handleYearSubmit} className="car-price-btn rounded-2xl border-0 px-6">
        ادامه به مرحله کارکرد
      </Button>
    </div>
  </div>
)}

{step === "mileage" && (
  <div>
    <div className="mb-6">
      <h2 className="text-2xl font-black text-[#101117]">کارکرد خودرو</h2>
      <p className="mt-2 text-sm text-[#6B6C70]">
        سال انتخاب‌شده: <span className="font-bold text-[#101117]">{year}</span>
      </p>
    </div>

    <div className="max-w-md space-y-4">
      <Input
        value={mileage}
        onChange={(e) => setMileage(toEnglishDigits(e.target.value))}
        placeholder="مثلاً 85000"
        className="h-14 rounded-2xl border-[#E8ECF4] bg-white focus-visible:border-[#3456bb] focus-visible:ring-[#3456bb]/20"
        inputMode="numeric"
      />
      <Button onClick={handleMileageSubmit} className="car-price-btn rounded-2xl border-0 px-6">
        ادامه به مرحله رنگ
      </Button>
    </div>
  </div>
)}

                  {step === "color" && (
                    <div>
                      <div className="mb-6">
                        <h2 className="text-2xl font-black text-[#101117]">انتخاب وضعیت رنگ</h2>
                        <p className="mt-2 text-sm text-[#6B6C70]">
                          خودرو انتخاب‌شده: <span className="font-bold text-[#101117]">{selectedCar?.name}</span>
                        </p>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        {COLOR_OPTIONS.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleSelectColor(item)}
                            className="car-price-interactive rounded-3xl p-5 text-right"
                          >
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl car-price-icon-box">
                              <Palette className="h-5 w-5" />
                            </div>
                            <div className="text-sm font-black text-[#101117]">{item.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === "chassis" && (
                    <div>
                      <div className="mb-6">
                        <h2 className="text-2xl font-black text-[#101117]">انتخاب وضعیت شاسی و اتاق</h2>
                        <p className="mt-2 text-sm text-[#6B6C70]">
                          رنگ انتخاب‌شده: <span className="font-bold text-[#101117]">{selectedColor?.label}</span>
                        </p>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        {CHASSIS_OPTIONS.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleSelectChassis(item)}
                            className="car-price-interactive rounded-3xl p-5 text-right"
                          >
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl car-price-icon-box">
                              <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div className="text-sm font-black text-[#101117]">{item.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === "result" && selectedCar && selectedColor && selectedChassis && priceRange && (
                    <div>
                      <div className="mb-6">
                        <h2 className="text-2xl font-black text-[#101117]">نتیجه ارزیابی</h2>
                        <p className="mt-2 text-sm text-[#6B6C70]">
                          قیمت حدودی خودرو بر اساس مدل، وضعیت رنگ و شاسی
                        </p>
                      </div>

                      <div className="rounded-[2rem] car-price-result-card p-8 text-white">
                        <div className="text-sm text-white/80">بازه قیمت تقریبی</div>
                        <div className="mt-4 text-3xl font-black leading-[3.5rem]">
                          {formatPrice(priceRange.min)} تا {formatPrice(priceRange.max)} تومان
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <div className="rounded-3xl car-price-summary-box p-5">
                          <div className="mb-3 text-sm font-black text-[#101117]">جزئیات انتخاب</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[#6B6C70]">خودرو</span>
                              <span className="font-bold text-[#101117]">{selectedCar.name}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3 text-sm">
  <span className="text-[#6B6C70]">سال ساخت</span>
  <span className="font-bold text-[#101117]">{year}</span>
</div>

<div className="flex items-center justify-between gap-3 text-sm">
  <span className="text-[#6B6C70]">کارکرد</span>
  <span className="font-bold text-[#101117]">{formatPrice(Number(toEnglishDigits(mileage)))} کیلومتر</span>
</div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[#6B6C70]">رنگ</span>
                              <span className="font-bold text-[#101117]">{selectedColor.label}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[#6B6C70]">شاسی</span>
                              <span className="font-bold text-[#101117]">{selectedChassis.label}</span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-3xl car-price-summary-box p-5">
                          <div className="mb-3 text-sm font-black text-[#101117]">خروجی محاسبه</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[#6B6C70]">قیمت پایه</span>
                              <span className="font-bold text-[#101117]">{formatPrice(selectedCar.source == "hamrah" ? selectedCar.price + 400000000 : selectedCar.price)} تومان</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[#6B6C70]">قیمت محاسبه‌شده</span>
                              <span className="font-bold car-price-accent">{formatPrice(finalPrice)} تومان</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[#6B6C70]">بازه نهایی</span>
                              <span className="font-black car-price-accent-light">
                                {formatPrice(priceRange.min)} تا {formatPrice(priceRange.max)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button onClick={resetAll} className="car-price-btn mt-6 rounded-2xl border-0 px-6">
                        <RotateCcw className="ml-2 h-4 w-4" />
                        شروع دوباره
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <NavigationBar />
      </div>
    </main>
  )
}
