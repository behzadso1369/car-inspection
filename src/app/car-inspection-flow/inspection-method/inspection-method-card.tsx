"use client";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const INITIAL_FEATURE_COUNT = 9;

function FeaturePill({ name }: { name: string }) {
  return (
    <span className="flex items-center justify-center rounded-full border border-[#F0F2F4] bg-white px-2 py-2.5 text-center text-[12px] font-medium leading-tight text-[#101117]">
      {name}
    </span>
  );
}

function DiscountRibbon() {
  return (
    <div className="pointer-events-none absolute top-0 left-4 z-20">
      <div
        className="relative pb-2 flex flex-col items-center h-[58px] w-[40px]  justify-center bg-gradient-to-b from-[#FFB020] via-[#FF8A3D] to-[#FF5E62] text-[15px] font-extrabold tracking-tight text-white shadow-[0_6px_18px_rgba(255,94,98,0.45)]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%)" }}
      >
        <div className="drop-shadow-sm text-xl font-extrabold">1 </div>
        <div className="drop-shadow-sm text-xs"> میلیون</div>
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
        className={`cursor-pointer rounded-3xl border bg-white transition-all duration-200 ${
          isSelected
            ? "border-2 border-[#416CEA] shadow-[0_10px_28px_rgba(65,108,234,0.18)]"
            : "border-[#DFDFDF] shadow-[0_6px_20px_rgba(16,17,23,0.05)] hover:shadow-[0_8px_24px_rgba(65,108,234,0.1)]"
        } ${isFirst ? "ring-1 ring-[#416CEA]/10" : ""}`}
        dir="rtl"
      >
        <div className="border-b border-[#DFDFDF] px-4 pb-4 pt-5">
          <div className="mb-4 flex items-center gap-3 mt-1  text-[#101117]">
            <RadioGroupItem value={String(data.Id)} id={String(data.Id)} />
            <Label className="!text-lg mt-1" htmlFor={String(data.Id)}>{data.InspectionTypeName}</Label>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {visibleFeatures.map((item: any) => (
              <FeaturePill key={item.Id ?? item.Name} name={item.Name} />
            ))}

            {!showMore && hasMoreFeatures && (
              <button
                type="button"
                className="flex items-center justify-center rounded-full border border-[#DFDFDF] bg-white px-2 py-2.5 text-center text-[11px] font-light leading-tight text-[#416CEA]"
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

        <div className="flex justify-between px-4 py-3">
          {/* <div className="flex flex-col">
                    <span className="text-[#101117] font-medium text-sm">قیمت بازار</span>
                    <div className="flex">
      <span className="text-[#55565A] text-m font-light">{ data.MarketPrice.toLocaleString()} </span>
                    <span className="text-[#55565A] text-m font-light">تومان</span>
                    </div>
              
                </div> */}
          {/* {data?.AdditionalCost > 0 &&      <div className="text-[11px] lg:text-base flex items-center">
                  <span className="text-[#416CEA] font-bold bg-[#F0F2F4] p-2 rounded-3xl"> {data?.AdditionalCost.toLocaleString()}+ تومان</span>
                </div>} */}

          <span className="font-medium font-bold text-[#101117]">قیمت </span>
          <div className="flex">
            <span className="text-m font-extrabold text-[#55565A]">
              {data?.AdditionalCost > 0
                ? (data.OurPrice + data.AdditionalCost).toLocaleString()
                : data.OurPrice.toLocaleString()}{" "}
            </span>
            <span className="inline-block w-1"> </span>

            <span className="text-m font-light text-[#55565A]"> تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}
