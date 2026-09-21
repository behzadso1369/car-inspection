"use client";

import {
  formatBudgetAlternativeLabel,
  type BudgetAlternative,
} from "@/lib/car-price/budgetAlternatives";
import CarPriceInspectPromo from "@/components/car-price/CarPriceInspectPromo";
import { Sparkles } from "lucide-react";

type CarPriceBudgetAlternativesProps = {
  alternatives: BudgetAlternative[];
  carName: string;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

export default function CarPriceBudgetAlternatives({
  alternatives,
  carName,
}: CarPriceBudgetAlternativesProps) {
  if (alternatives.length === 0) return null;

  return (
    <div className="space-y-3 rounded-2xl car-price-summary-box p-4 md:rounded-3xl md:p-5">
      <div className="flex items-start gap-2">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl car-price-icon-box">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-black text-[#101117]">
            با همین بودجه چه می‌توانی بخری؟
          </div>
          <p className="mt-0.5 text-[11px] leading-5 text-[#6B6C70] md:text-xs">
            به‌جای یک خودروی پرکارکرد یا آسیب‌دیده، گزینه‌های هم‌بودجه را ببین.
            پیشنهادها تخمینی‌اند و جایگزین کارشناسی حضوری نیستند.
          </p>
        </div>
      </div>

      <ul className="space-y-2">
        {alternatives.map((item) => (
          <li
            key={`${item.id}-${item.year}-${item.km}-${item.body}-${item.chassis}`}
            className="rounded-2xl border border-[#E8ECF4] bg-white px-3.5 py-3"
          >
            <p className="text-sm font-bold leading-6 text-[#101117]">
              {formatBudgetAlternativeLabel(item)}
            </p>
            <p className="mt-1 text-[11px] text-[#6B6C70]">
              برآورد حدودی: {formatPrice(item.estimatedPrice)} تومان
            </p>
          </li>
        ))}
      </ul>

      <CarPriceInspectPromo carName={carName} />
    </div>
  );
}
