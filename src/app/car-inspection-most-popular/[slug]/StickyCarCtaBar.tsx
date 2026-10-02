"use client";

import { useEffect, useState } from "react";
import InspectCtaButton from "./InspectCtaButton";
import PriceEstimateCtaButton from "./PriceEstimateCtaButton";

type StickyCarCtaBarProps = {
  carName: string;
  searchTerm?: string;
  carGroupId?: number;
  carGroupName?: string;
};

/**
 * وقتی دکمه‌های اصلی هیرو از دید خارج شوند، نوار ثابت پایین صفحه
 * با «شروع کارشناسی» و «تخمین قیمت» را نشان می‌دهد (موبایل و دسکتاپ).
 */
export default function StickyCarCtaBar({
  carName,
  searchTerm,
  carGroupId,
  carGroupName,
}: StickyCarCtaBarProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const anchor = document.getElementById("car-cta-anchor");
    if (!anchor) {
      setShow(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {show ? <div className="h-28 lg:h-0" aria-hidden /> : null}
      <div
        className={`fixed z-[45] transition-all duration-300 ease-out ${
          show
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-4 opacity-0 pointer-events-none"
        } inset-x-0 bottom-[calc(6.75rem+env(safe-area-inset-bottom))] lg:inset-x-auto lg:left-5 lg:right-auto lg:bottom-5`}
      >
        <div className="mx-auto w-[calc(100%-1.5rem)] max-w-lg overflow-hidden rounded-2xl border border-[#DCE3F4] bg-white/95 p-2.5 shadow-[0_12px_36px_rgba(16,17,23,0.16)] backdrop-blur-md lg:mx-0 lg:w-[20rem] lg:max-w-[20rem] lg:p-2">
          <div className="flex flex-col gap-2">
            <InspectCtaButton
              carName={carName}
              searchTerm={searchTerm}
              carGroupId={carGroupId}
              carGroupName={carGroupName}
              className="!h-11 w-full text-sm lg:!h-10 lg:text-xs"
            />
            <PriceEstimateCtaButton
              carName={carName}
              searchTerm={searchTerm}
              className="!min-h-11 w-full text-xs lg:!min-h-10 lg:px-2 lg:text-[11px] lg:leading-5"
            />
          </div>
        </div>
      </div>
    </>
  );
}
