"use client";

import InspectCtaButton from "@/app/car-inspection-most-popular/[slug]/InspectCtaButton";

type CarPriceInspectPromoProps = {
  carName: string;
};

export default function CarPriceInspectPromo({ carName }: CarPriceInspectPromoProps) {
  return (
    <InspectCtaButton
      carName={carName}
      searchTerm={carName}
      showChevron
      label={`رزرو کارشناسی ${carName}`}
      className="banner-cta !h-12 w-full rounded-full border-0 !bg-[#FFD54F] px-5 !text-[#1A237E] hover:!bg-[#FFC107] hover:!text-[#1A237E] hover:scale-[1.02] active:scale-[0.97] text-sm font-bold md:text-base"
    />
  );
}
