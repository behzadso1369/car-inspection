"use client";

import { useEffect, useState } from "react";
import {
  formatBudgetAlternativeLabel,
  type BudgetAlternative,
} from "@/lib/car-price/budgetAlternatives";
import CarPriceInspectPromo from "@/components/car-price/CarPriceInspectPromo";
import InspectCtaButton from "@/app/car-inspection-most-popular/[slug]/InspectCtaButton";
import { BadgeCheck, ChevronLeft, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type CarPriceBudgetAlternativesProps = {
  alternatives: BudgetAlternative[];
  carName: string;
  onStartPricing: (carName: string) => void;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

function healthLabel(rank: number) {
  if (rank <= 1) return "سالم‌تر";
  if (rank <= 3) return "وضعیت خوب";
  return "هم‌بودجه";
}

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}

function AlternativesList({
  alternatives,
  onInspectPricing,
}: {
  alternatives: BudgetAlternative[];
  onInspectPricing: (carName: string) => void;
}) {
  return (
    <ul className="space-y-3">
      {alternatives.map((item, index) => (
        <li
          key={`${item.id}-${item.year}-${item.km}-${item.body}-${item.chassis}`}
          className="overflow-hidden rounded-2xl border border-[rgba(53,99,233,0.12)] bg-white shadow-[0_4px_18px_rgba(53,99,233,0.06)]"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[#EEF1F7] bg-gradient-to-l from-[#EEF2FD]/80 to-white px-3.5 py-2.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#3456bb] text-[11px] font-black text-white">
                {new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(index + 1)}
              </span>
              <p className="truncate text-sm font-black text-[#101117]">{item.name}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#3456bb] ring-1 ring-[rgba(53,99,233,0.16)]">
              <BadgeCheck className="h-3 w-3" />
              {healthLabel(item.healthRank)}
            </span>
          </div>

          <div className="space-y-3 px-3.5 py-3">
            <div>
              <p className="text-[12px] leading-6 text-[#4A4B50] md:text-sm">
                {formatBudgetAlternativeLabel(item)}
              </p>
              <p className="mt-1.5 text-sm font-black car-price-accent">
                برآورد حدودی: {formatPrice(item.estimatedPrice)} تومان
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <InspectCtaButton
                carName={item.name}
                searchTerm={item.name}
                label="کارشناسی این ماشین"
                className="!h-10 !rounded-xl !bg-[#3456bb] !px-2 !text-[11px] !font-bold !text-white hover:!bg-[#3563E9] md:!text-xs"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => onInspectPricing(item.name)}
                className="h-10 rounded-xl border-[#3456bb]/35 bg-white px-2 text-[11px] font-bold text-[#3456bb] hover:bg-[#EEF2FD] hover:text-[#2d4aa8] md:text-xs"
              >
                <Search className="ml-1 h-3.5 w-3.5 shrink-0" />
                قیمت‌گذاری این ماشین
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function CarPriceBudgetAlternatives({
  alternatives,
  carName,
  onStartPricing,
}: CarPriceBudgetAlternativesProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();

  if (alternatives.length === 0) return null;

  const previewNames = alternatives.slice(0, 3).map((item) => item.name);

  function handleStartPricing(name: string) {
    setOpen(false);
    onStartPricing(name);
  }

  const panelBody = (
    <>
      <p className="text-[11px] leading-5 text-[#6B6C70] md:text-xs">
        گزینه‌های هم‌بودجه و معمولاً سالم‌تر از یک خودروی پرکارکرد یا آسیب‌دیده.
        پیشنهادها تخمینی‌اند و جایگزین کارشناسی حضوری نیستند.
      </p>
      <div className="mt-4">
        <AlternativesList
          alternatives={alternatives}
          onInspectPricing={handleStartPricing}
        />
      </div>
    </>
  );

  return (
    <div className="space-y-3">
      <CarPriceInspectPromo carName={carName} />

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full overflow-hidden rounded-2xl border-0 p-[1.5px] text-right shadow-[0_10px_28px_rgba(53,99,233,0.22)] transition-transform active:scale-[0.98] md:rounded-3xl"
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(120deg,#2d4aa8,#416CEA,#7B93F5,#3456bb)] bg-[length:200%_200%] animate-[pulse_3s_ease-in-out_infinite]"
        />
        <span className="relative flex items-center gap-3 rounded-[15px] bg-[linear-gradient(135deg,#1E3488_0%,#3456bb_55%,#416CEA_100%)] px-4 py-3.5 text-white md:rounded-[22px] md:px-5 md:py-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
            <Sparkles className="h-5 w-5 text-[#FFD54F]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-black leading-6 md:text-base">
              با همین بودجه چه می‌توانی بخری؟
            </span>
            <span className="mt-0.5 block truncate text-[11px] text-white/80 md:text-xs">
              {previewNames.join("، ")}
            </span>
          </span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFD54F] text-[#1A237E] transition-transform group-hover:translate-x-[-2px]">
            <ChevronLeft className="h-4 w-4" />
          </span>
        </span>
      </button>

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="flex max-h-[85vh] w-full max-w-xl flex-col gap-0 overflow-hidden rounded-3xl border-[#E8EAF0] bg-white p-0 font-IranSans"
            dir="rtl"
          >
            <DialogHeader className="shrink-0 border-b border-[#EEF0F4] bg-[linear-gradient(180deg,#F7F9FF_0%,#FFFFFF_100%)] px-6 py-5 text-right">
              <DialogTitle className="text-lg font-black text-[#101117]">
                خودروهای پیشنهادی با این بودجه
              </DialogTitle>
              <DialogDescription className="sr-only">
                گزینه‌های هم‌بودجه برای خرید خودرو
              </DialogDescription>
            </DialogHeader>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{panelBody}</div>
          </DialogContent>
        </Dialog>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="bottom"
            className="flex max-h-[88vh] flex-col gap-0 overflow-hidden rounded-t-3xl border-[#E8EAF0] bg-white p-0 font-IranSans [&>button]:top-4 [&>button]:left-4 [&>button]:right-auto"
            dir="rtl"
          >
            <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-[#D8DCE6]" />
            <SheetHeader className="shrink-0 border-b border-[#EEF0F4] px-4 pb-4 pt-3 text-right">
              <SheetTitle className="text-base font-black text-[#101117]">
                خودروهای پیشنهادی با این بودجه
              </SheetTitle>
              <SheetDescription className="sr-only">
                گزینه‌های هم‌بودجه برای خرید خودرو
              </SheetDescription>
            </SheetHeader>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              {panelBody}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
