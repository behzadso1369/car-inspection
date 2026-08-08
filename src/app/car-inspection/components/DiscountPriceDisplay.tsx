"use client";

import { useEffect, useState } from "react";
import {
  formatDiscountBadge,
  readStoredInspectionPrices,
} from "../lib/pricing";

type DiscountPriceDisplayProps = {
  fullPrice: number;
  discountedPrice: number;
  label?: string;
  priceTitle?: string;
  variant?: "footer" | "summary" | "card";
  className?: string;
};

export function DiscountPriceDisplay({
  fullPrice,
  discountedPrice,
  label,
  priceTitle = "قیمت کارشناسی",
  variant = "footer",
  className = "",
}: DiscountPriceDisplayProps) {
  const discountAmount = Math.max(0, fullPrice - discountedPrice);
  const showDiscount = discountAmount > 0 && fullPrice > discountedPrice;

  if (variant === "card") {
    return (
      <div className={`rounded-b-3xl bg-gradient-to-b from-[#F8FAFF] to-[#EEF2FD] px-4 py-3 ${className}`}>
        <div className="flex items-center justify-between gap-4" dir="rtl">
          <span className="shrink-0 text-base font-medium text-[#101117]">{priceTitle}</span>
          <div className="flex flex-col items-end gap-1.5">
            {showDiscount && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#BDBDBD] line-through decoration-[#BDBDBD]">
                  {fullPrice.toLocaleString("fa-IR")}
                </span>
                <span className="shrink-0 rounded-full bg-[#E53935] px-3 py-1.5 text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(229,57,53,0.35)]">
                  {formatDiscountBadge(discountAmount)}
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-black leading-none text-[#101117]">
                {discountedPrice.toLocaleString("fa-IR")}
              </span>
              <span className="pb-0.5 text-sm font-bold text-[#101117]">تومان</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "summary") {
    return (
      <div className={`flex flex-col items-end gap-1 ${className}`}>
        {label ? (
          <span className="text-sm font-medium text-[#101117]">{label}</span>
        ) : null}
        {showDiscount && (
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#E53935] px-2 py-0.5 text-[10px] font-bold text-white">
              {formatDiscountBadge(discountAmount)}
            </span>
            <span className="text-xs text-[#BDBDBD] line-through">
              {fullPrice.toLocaleString("fa-IR")}
            </span>
          </div>
        )}
        <div className="flex items-baseline gap-1">
          <span className="text-base font-black text-[#101117]">
            {discountedPrice.toLocaleString("fa-IR")}
          </span>
          <span className="text-xs font-medium text-[#55565A]">تومان</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-end gap-0.5 ${className}`}>
      {label ? (
        <span className="text-sm font-medium text-[#101117]">{label}</span>
      ) : null}
      {showDiscount && (
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#E53935] px-2 py-0.5 text-[10px] font-bold text-white">
            {formatDiscountBadge(discountAmount)}
          </span>
          <span className="text-xs text-[#BDBDBD] line-through">
            {fullPrice.toLocaleString("fa-IR")}
          </span>
        </div>
      )}
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-black text-[#101117]">
          {discountedPrice.toLocaleString("fa-IR")}
        </span>
        <span className="text-xs font-medium text-[#55565A]">تومان</span>
      </div>
    </div>
  );
}

export function StoredInspectionPriceDisplay({
  variant = "footer",
  className = "",
}: {
  variant?: "footer" | "summary";
  className?: string;
}) {
  const [prices, setPrices] = useState(readStoredInspectionPrices());

  useEffect(() => {
    setPrices(readStoredInspectionPrices());
  }, []);

  if (!prices.discountedPrice && !prices.fullPrice) return null;

  const fullPrice = prices.fullPrice || prices.discountedPrice;
  const discountedPrice = prices.discountedPrice || prices.fullPrice;

  return (
    <DiscountPriceDisplay
      fullPrice={fullPrice}
      discountedPrice={discountedPrice}
      label={prices.method || undefined}
      variant={variant}
      className={className}
    />
  );
}
