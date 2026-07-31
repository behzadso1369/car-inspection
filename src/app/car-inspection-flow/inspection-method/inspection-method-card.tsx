"use client";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { DiscountPriceDisplay } from "../components/DiscountPriceDisplay";
import { getInspectionPrices } from "../lib/pricing";

const INITIAL_FEATURE_COUNT = 9;
export { FESTIVAL_DISCOUNT, getInspectionPrices } from "../lib/pricing";

function FeatureCheckIcon() {
  return (
    <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] shadow-[0_2px_8px_rgba(34,197,94,0.35)] ring-2 ring-white">
      <Check className="size-2.5 text-white" strokeWidth={3.5} />
    </span>
  );
}

function FeaturePill({ name }: { name: string }) {
  return (
    <span className="flex items-center justify-center gap-1.5 rounded-full border border-[#DDE6FF] bg-gradient-to-b from-[#F8FAFF] to-[#EEF2FD] px-2.5 py-2.5 text-[11px] font-semibold leading-tight text-[#101117] shadow-[0_2px_8px_rgba(65,108,234,0.06)]">
      <FeatureCheckIcon />
      <span className="text-center">{name}</span>
    </span>
  );
}

function DiscountRibbon() {
  return (
    <div className="pointer-events-none absolute top-0 left-4 z-20">
      <div
        className="relative flex h-[56px] w-[40px] flex-col items-center justify-center bg-gradient-to-b from-[#FFB020] via-[#FF8A3D] to-[#FF5E62] pb-2 text-[11px] font-extrabold leading-[1.35] tracking-tight text-white shadow-[0_6px_18px_rgba(255,94,98,0.45)]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%)" }}
      >
        <span className="drop-shadow-sm text-center">جشنواره</span>
      </div>
    </div>
  );
}

function RecommendedBadge() {
  return (
    <div className="pointer-events-none absolute -top-3.5 right-4 z-20">
      <div className="relative flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#3456bb] via-[#416CEA] to-[#5B7FFF] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-[0_8px_20px_rgba(65,108,234,0.42)] ring-2 ring-white">
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_65%)]" />
        <Sparkles className="relative size-3.5 shrink-0 text-[#EAF0FF]" strokeWidth={2.5} />
        <span className="relative whitespace-nowrap">پیشنهاد کارماچک</span>
      </div>
    </div>
  );
}

export default function InspectionMethodCard({
  inspectionType,
  data,
  selected,
  onSelect,
  isFirst = false,
}: any) {
  const [showMore, setShowMore] = useState(false);
  const isSelected = selected === inspectionType;
  const visibleFeatures = showMore
    ? data.Features
    : data.Features.slice(0, INITIAL_FEATURE_COUNT);
  const hasMoreFeatures = data.Features.length > INITIAL_FEATURE_COUNT;

  return (
    <div className="relative mt-5 overflow-visible">
      <DiscountRibbon />
      {isFirst && <RecommendedBadge />}

      <div
        onClick={() => onSelect(inspectionType)}
        className={`cursor-pointer overflow-hidden rounded-3xl border bg-white transition-all duration-200 ${
          isSelected
            ? "border-2 border-[#416CEA] shadow-[0_10px_28px_rgba(65,108,234,0.18)]"
            : "border-[#DFDFDF] shadow-[0_6px_20px_rgba(16,17,23,0.05)] hover:shadow-[0_8px_24px_rgba(65,108,234,0.1)]"
        } ${isFirst ? "ring-1 ring-[#416CEA]/10" : ""}`}
        dir="rtl"
      >
        <div className="border-b border-[#E8ECF4] bg-white px-4 pb-4 pt-5">
          <div className="mb-4 mt-1 flex items-center gap-3 text-[#101117]">
            <RadioGroupItem value={String(data.Id)} id={String(data.Id)} />
            <Label className="!text-lg mt-1 font-bold" htmlFor={String(data.Id)}>
              {data.InspectionTypeName}
            </Label>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {visibleFeatures.map((item: any) => (
              <FeaturePill key={item.Id ?? item.Name} name={item.Name} />
            ))}

            {!showMore && hasMoreFeatures && (
              <button
                type="button"
                className="flex items-center justify-center rounded-full border border-[#416CEA]/30 bg-[#EEF2FD] px-2 py-2.5 text-center text-[11px] font-semibold leading-tight text-[#416CEA]"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowMore(true);
                }}
              >
                مشاهده بیشتر
              </button>
            )}
          </div>
        </div>

        <DiscountPriceDisplay
          {...getInspectionPrices(data)}
          variant="card"
        />
      </div>
    </div>
  );
}
