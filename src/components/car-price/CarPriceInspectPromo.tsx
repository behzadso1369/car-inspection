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
      className="car-price-result-cta banner-cta !h-auto min-h-12 w-full max-w-full rounded-full border-0 !bg-[#FFD54F] px-4 py-3 !text-[#1A237E] hover:!bg-[#FFC107] hover:!text-[#1A237E] max-lg:hover:!scale-100 text-sm font-bold leading-snug whitespace-normal text-center md:text-base md:px-5"
    />
  );
}
