"use client";

import {
  formatBudgetAlternativeLabel,
  type BudgetAlternative,
} from "@/lib/car-price/budgetAlternatives";
import CarPriceInspectPromo from "@/components/car-price/CarPriceInspectPromo";
import InspectCtaButton from "@/app/car-inspection-most-popular/[slug]/InspectCtaButton";
import { BadgeCheck, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function CarPriceBudgetAlternatives({
  alternatives,
  carName,
  onStartPricing,
}: CarPriceBudgetAlternativesProps) {
  if (alternatives.length === 0) return null;

  return (
    <div className="space-y-3 rounded-2xl car-price-summary-box p-4 md:rounded-3xl md:p-5">
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl car-price-icon-box">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-black text-[#101117] md:text-base">
            با همین بودجه چه می‌توانی بخری؟
          </div>
          <p className="mt-0.5 text-[11px] leading-5 text-[#6B6C70] md:text-xs">
            گزینه‌های هم‌بودجه و معمولاً سالم‌تر از یک خودروی پرکارکرد یا آسیب‌دیده.
            پیشنهادها تخمینی‌اند و جایگزین کارشناسی حضوری نیستند.
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {alternatives.map((item, index) => (
          <li
            key={`${item.id}-${item.year}-${item.km}-${item.body}-${item.chassis}`}
            className="overflow-hidden rounded-2xl border border-[rgba(53,99,233,0.12)] bg-white shadow-[0_4px_18px_rgba(53,99,233,0.06)] transition-shadow hover:shadow-[0_8px_28px_rgba(53,99,233,0.12)]"
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
                  onClick={() => onStartPricing(item.name)}
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

      <CarPriceInspectPromo carName={carName} />
    </div>
  );
}
