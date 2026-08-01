"use client";

import { Check, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { DiscountPriceDisplay } from "../components/DiscountPriceDisplay";
import { getInspectionPrices } from "../lib/pricing";

export { FESTIVAL_DISCOUNT, getInspectionPrices } from "../lib/pricing";

function FeatureCheckIcon({ isIncluded }: { isIncluded: boolean }) {
  return (
    <span
      className={`flex size-[18px] shrink-0 items-center justify-center rounded-full ring-2 ring-white ${
        isIncluded
          ? "bg-gradient-to-br from-[#5B7FFF] to-[#416CEA] shadow-[0_2px_8px_rgba(65,108,234,0.35)]"
          : "bg-[#D1D5DB]"
      }`}
    >
      <Check className="size-2.5 text-white" strokeWidth={3.5} />
    </span>
  );
}

function FeaturePill({
  name,
  isIncluded,
}: {
  name: string;
  isIncluded: boolean;
}) {
  return (
    <span
      className={`flex items-center justify-center gap-1.5 rounded-full border px-2.5 py-2.5 text-[11px] leading-tight ${
        isIncluded
          ? "border-[#DDE6FF] bg-gradient-to-b from-[#F8FAFF] to-[#EEF2FD] font-bold text-[#101117] shadow-[0_2px_8px_rgba(65,108,234,0.06)]"
          : "border-[#E5E7EB] bg-[#F9FAFB] font-normal text-[#9CA3AF] opacity-60"
      }`}
    >
      <FeatureCheckIcon isIncluded={isIncluded} />
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
  allFeatures = [],
}: any) {
  const isSelected = selected === inspectionType;
  const includedFeatures = Array.isArray(data.Features) ? data.Features : [];
  const includedFeatureKeys = new Set(
    includedFeatures.map((feature: any) =>
      feature.Id != null ? `id:${feature.Id}` : `name:${feature.Name}`,
    ),
  );
  const sortedFeatures = [...allFeatures].sort((first: any, second: any) => {
    const firstKey =
      first.Id != null ? `id:${first.Id}` : `name:${first.Name}`;
    const secondKey =
      second.Id != null ? `id:${second.Id}` : `name:${second.Name}`;

    return (
      Number(includedFeatureKeys.has(secondKey)) -
      Number(includedFeatureKeys.has(firstKey))
    );
  });

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
            {sortedFeatures.map((item: any) => {
              const featureKey =
                item.Id != null ? `id:${item.Id}` : `name:${item.Name}`;

              return (
                <FeaturePill
                  key={featureKey}
                  name={item.Name}
                  isIncluded={includedFeatureKeys.has(featureKey)}
                />
              );
            })}
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
