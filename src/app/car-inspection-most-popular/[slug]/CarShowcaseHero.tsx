"use client";

import { Tick01Icon } from "hugeicons-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import InspectCtaButton from "./InspectCtaButton";
import { LIGHT_PRESETS } from "./CarShowcase3D";

const CarShowcase3D = dynamic(() => import("./CarShowcase3D"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

const CHECK_ITEMS = [
  "فنی و موتور",
  "رنگ و بدنه",
  "شاسی",
  "دیاگ",
  "آپشن‌ها",
  "گزارش کامل",
] as const;

interface CarShowcaseHeroProps {
  name: string;
  brand: string;
  intro: string;
  glbUrl: string;
  searchTerm?: string;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isDesktop;
}

export default function CarShowcaseHero({
  name,
  brand,
  intro,
  glbUrl,
  searchTerm,
}: CarShowcaseHeroProps) {
  const isDesktop = useIsDesktop();
  const [lightPreset, setLightPreset] = useState(2);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflowX;
    const prevBody = body.style.overflowX;
    html.style.overflowX = "hidden";
    body.style.overflowX = "hidden";
    return () => {
      html.style.overflowX = prevHtml;
      body.style.overflowX = prevBody;
    };
  }, []);

  const car = (
    <div
      className="relative w-full"
      style={{
        height: isDesktop ? 500 : 320,
        width: isDesktop ? 740 : "100%",
        transform: isDesktop ? "scale(2)" : undefined,
        transformOrigin: "center center",
      }}
    >
      <CarShowcase3D url={glbUrl} lightPreset={lightPreset} />
    </div>
  );

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[80] pointer-events-auto rounded-2xl bg-white/95 border border-[#DCDCDC] shadow-lg p-3 w-56">
        <p className="text-xs text-[#55565A] mb-2 font-medium">زاویه نور — شماره را بگو</p>
        <div className="flex flex-col gap-1">
          {LIGHT_PRESETS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightPreset(item.id)}
              className={`text-right text-sm rounded-lg px-2 py-1.5 ${
                lightPreset === item.id
                  ? "bg-[#416CEA] text-white"
                  : "bg-[#F4F5F7] text-black"
              }`}
            >
              {item.id}. {item.label}
            </button>
          ))}
        </div>
      </div>
      {!isDesktop && <div className="px-4 pt-2">{car}</div>}

      <div className="px-4 w-full lg:w-2/5 lg:mx-24 lg:py-10 relative z-20">
        <div className="bg-white shadow-[8px_4px_24px_0px_#EAEAEA40] border border-[#DCDCDC] px-4 py-6 rounded-3xl my-6">
          <span className="text-sm text-[#416CEA] font-medium">{brand}</span>
          <h1 className="text-black text-lg my-2 font-medium lg:text-2xl">
            کارشناسی {name}
          </h1>
          <p className="text-[#55565A] font-light text-sm leading-7 lg:text-base">
            {intro}
          </p>
          <div className="mt-4">
            <InspectCtaButton carName={name} searchTerm={searchTerm} />
          </div>
          <p className="text-center text-xs text-[#8A8B90] mt-3">
            رزرو آنلاین کارشناسی {name} در محل، با هزینه شفاف
          </p>
        </div>
      </div>

      <div className="w-full bg-[#416CEA] relative mt-8 lg:mt-0 py-6 lg:py-8 overflow-visible">
        {isDesktop && (
          <div
            className="absolute pointer-events-none"
            style={{ left: 30, right: "auto", top: -340 }}
          >
            {car}
          </div>
        )}
        <div className="mt-8 lg:mt-14 px-4 lg:px-24 text-white w-full lg:w-1/2">
          <h2 className="text-lg font-medium">
            کارشناسی {name} در محل با کارماچک
          </h2>
          <p className="text-base leading-8">
            کارشناس ما به آدرس شما در تهران و شرق تهران اعزام می‌شود و بدون نیاز
            به جابه‌جایی {name}، موارد زیر را بررسی می‌کند:
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 w-full lg:w-1/2 px-4 lg:px-24 text-white">
          {CHECK_ITEMS.map((item) => (
            <p key={item} className="flex">
              <Tick01Icon size={24} className="flex-shrink-0" />
              <span>{item}</span>
            </p>
          ))}
          <p className="flex col-span-3">
            <Tick01Icon size={24} className="flex-shrink-0" />
            <span>رزرو آنلاین با هزینه شفاف</span>
          </p>
        </div>
      </div>
    </>
  );
}
