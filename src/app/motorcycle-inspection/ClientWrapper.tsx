"use client";

import { Tick01Icon } from "hugeicons-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaqPreviewSection } from "@/app/components/FaqPreviewSection";
import { Footer } from "@/app/components/mobile/Home/Footer";
import { NavigationBar } from "@/app/components/mobile/Home/NavigationBar";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOptimizedNavigation } from "@/hooks/useOptimizedNavigation";
import type { FaqItem } from "@/lib/faq-data";
import {
  markMotorcycleFlow,
  MOTORCYCLE_GROUP_ID_KEY,
  MOTORCYCLE_GROUP_NAME_KEY,
} from "@/lib/motorcycle-inspection-storage";
import OpenSheet from "./CarGroupSheet";

// Lazy load کامپوننت‌های سنگین
const CarWayAnimation = dynamic(() => import("./CarWayAnimation"), {
  ssr: false,
  loading: () => (
    <div className="w-[45px] h-[117px] absolute -top-16 left-1/2 -translate-x-1/2" />
  ),
});

const OurCustomer = dynamic(() => import("./slider/page"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] lg:h-[800px] flex items-center justify-center">
      در حال بارگذاری...
    </div>
  ),
});

import {
  InspectionFlowStats,
  InspectionIntroSection,
} from "./InspectionLandingSections";
import InspectionSeoArticle from "./InspectionSeoArticleV2";

interface ClientWrapperProps {
  inspectionFaqs?: FaqItem[];
}

export default function ClientWrapper({
  inspectionFaqs = [],
}: ClientWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const router = useRouter();
  const { navigate, isPending } = useOptimizedNavigation();
  const [inputValue, setInputValue] = useState({
    name: "",
    value: 0,
  });

  // Prefetch کردن صفحه بعدی
  useEffect(() => {
    router.prefetch("/motorcycle-inspection/inspection-method");
  }, [router]);

  useEffect(() => {
    markMotorcycleFlow();
    if (inputValue.value) {
      localStorage.setItem(MOTORCYCLE_GROUP_ID_KEY, String(inputValue.value));
      localStorage.setItem(MOTORCYCLE_GROUP_NAME_KEY, String(inputValue.name));
    }
  }, [inputValue]);

  const moveToInspectionMethod = (
    motorcycleGroupId?: number,
    motorcycleGroupName?: string
  ) => {
    const idToUse = motorcycleGroupId || inputValue.value;
    if (!idToUse) {
      return;
    }

    markMotorcycleFlow();
    localStorage.setItem(MOTORCYCLE_GROUP_ID_KEY, String(idToUse));
    localStorage.setItem(
      MOTORCYCLE_GROUP_NAME_KEY,
      motorcycleGroupName || inputValue.name || ""
    );
    localStorage.removeItem("OrderId");
    setOpenModal(false);
    navigate("/motorcycle-inspection/inspection-method");
  };

  return (
    <main className="bg-white font-IranSans">
      <div className="px-4 w-full lg:w-2/5 lg:mx-24 lg:py-10">
        <div className="bg-white shadow-[8px_4px_24px_0px_#EAEAEA40] border border-[#DCDCDC] px-4 py-6 rounded-3xl my-6">
          <h1 className="text-black text-lg my-2 font-bold lg:text-xl">
            کارشناسی موتورسیکلت در محل تهران
          </h1>
          <h2 className="text-black text-base my-2 font-medium">
            ثبت درخواست کارشناسی موتور
          </h2>
          <p className="text-[#55565A] font-light text-sm leading-7 lg:text-base">
            جهت شروع فرآیند کارشناسی، مدل موتورسیکلت را انتخاب کنید.
          </p>
          {/* <h1 className="text-black text-lg my-2 font-bold leading-8 lg:text-xl">
            کارشناسی موتور در محل
          </h1> */}
          {/* <p className="text-[#55565A] font-light text-sm leading-7 lg:text-base">
            کارشناسی موتور در محل تهران با اعزام کارشناس به تهران و شرق تهران؛ بررسی
            فنی، رنگ و بدنه، شاسی و دیاگ. رزرو آنلاین، هزینه شفاف و گزارش کامل
            کارشناسی.
          </p>
          <p className="mt-3 text-[#101117] text-sm leading-7 lg:text-base">
            پیش از خرید یا فروش خودرو، کارشناس کارماچک را به آدرسی که خودرو در آن
            قرار دارد اعزام کنید و بدون جابه‌جایی ماشین، وضعیت فنی، رنگ و بدنه،
            شاسی، دیاگ و آپشن‌ها را با یک گزارش کامل بررسی کنید.
          </p> */}
          <div className="flex items-center">
            <div className="aspect-[2] relative w-16 h-8 ml-4">
              <Image
                src="/step1.png"
                alt="مرحله اول رزرو کارشناسی موتور"
                fill
                sizes="64px"
                quality={70}
                className="object-fill"
              />
            </div>

            <div>
              <p className="text-base text-black my-2 font-medium">
                مرحله اول: مشخصات اولیه موتور
              </p>
              <p className="text-[#55565A] font-light text-sm">
                بعدی: انتخاب روش کارشناسی
              </p>
            </div>
          </div>
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <OpenSheet
              openModal={openModal}
              setOpenModal={setOpenModal}
              inputValue={inputValue}
              setInputValue={setInputValue}
              moveToInspectionMethod={moveToInspectionMethod}
            />
          </Dialog>
          <fieldset className="mt-2 border-0 p-0">
            <legend className="sr-only">انتخاب مدل موتور</legend>
            <Label onClick={() => setOpenModal(true)} className="my-2">
              نام موتور
            </Label>
            <Input
              onClick={() => setOpenModal(true)}
              value={inputValue.name}
              readOnly
              placeholder="مدل موتور را انتخاب کنید"
              className="items-center !py-4 border w-full border-[#DFDFDF] rounded-full text-[#55565A] text-base h-11"
            />
          </fieldset>

          <Button
            onClick={() => moveToInspectionMethod()}
            disabled={isPending}
            className="bg-[#416CEA] text-white w-full h-11 rounded-3xl mt-4 disabled:opacity-50"
          >
            {isPending ? "در حال انتقال..." : "ادامه و انتخاب روش کارشناسی"}
          </Button>
        </div>
      </div>

      <div className="w-full bg-[#416CEA] relative mt-28 lg:mt-0 py-6 lg:py-8 overflow-visible">
        <div className="pointer-events-none absolute left-1/2 lg:left-0 -top-8 lg:-top-[86%] -translate-y-[44%] lg:-translate-y-[26%] -translate-x-1/2 lg:translate-x-0 -rotate-y-180 z-20 max-lg:w-full max-lg:max-w-[430px]">
          <div className="w-[min(100vw-1rem,430px)] lg:w-[739px] relative aspect-[2.09] max-lg:aspect-[1.85] mx-auto lg:mx-0">
            <Image
              alt="موتورسیکلت — کارشناسی در محل"
              src="/flow-motorcycle.png"
              fill
              sizes="(max-width: 1024px) 430px, 739px"
              quality={90}
              loading="lazy"
              className="object-contain object-bottom"
            />
          </div>
        </div>
        <div className="mt-24 lg:mt-14 px-4 lg:px-24 text-white w-full lg:w-1/2">
          <p className="text-lg font-medium">
            کارشناسی موتور در محل با کارماچک
          </p>
          <p className="text-base leading-8">
            کارشناس ما به آدرس شما در تهران و شرق تهران اعزام می‌شود و بدون نیاز
            به جابه‌جایی موتور، موارد زیر را بررسی می‌کند:
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 w-full lg:w-1/2 px-4 lg:px-24 text-white">
          <p className="flex">
            <Tick01Icon size={24} />
            <span>فنی و موتور</span>
          </p>
          <p className="flex">
            <Tick01Icon size={24} />
            <span>رنگ و بدنه</span>
          </p>
          <p className="flex">
            <Tick01Icon size={24} />
            <span>شاسی و فریم</span>
          </p>
          <p className="flex">
            <Tick01Icon size={24} />
            <span>سیستم برق</span>
          </p>
          <p className="flex">
            <Tick01Icon size={24} />
            <span>گزارش کامل</span>
          </p>
          <p className="flex col-span-3">
            <Tick01Icon size={24} />
            <span>رزرو آنلاین با هزینه شفاف</span>
          </p>
        </div>
      </div>

      <div className="px-4 py-16 font-medium" ref={ref}>
        <p className="font-bold w-full text-center text-lg">
          اعزام کارشناس به محل شما
        </p>
        <div className="mx-auto mt-4 grid w-full max-w-6xl gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-[#DCDCDC] px-4 py-5 shadow-[8px_4px_24px_0px_#EAEAEA40]">
            <h3 className="text-sm font-semibold text-[#101117]">
              کارشناسی موتور در محل تهران و شرق تهران
            </h3>
            <p className="text-sm font-light leading-7 text-[#55565A]">
              کارشناس کارماچک در زمان مقرر به آدرس شما می‌آید و گزارش کامل
              کارشناسی را در اختیارتان قرار می‌دهد.
            </p>
          </div>
          <div className="rounded-3xl border border-[#DCDCDC] px-4 py-5 shadow-[8px_4px_24px_0px_#EAEAEA40]">
            <h3 className="text-sm font-semibold text-[#101117]">
              کارشناسی در محل شما
            </h3>
            <p className="my-1 text-base font-light text-[#55565A]">
              تهران و شرق تهران
            </p>
            <p className="text-sm font-light leading-7 text-[#55565A]">
              پس از رزرو آنلاین، کارشناس به آدرسی که موتور در آن قرار دارد اعزام
              می‌شود و بدون جابه‌جایی موتور، بررسی کامل انجام می‌شود.
            </p>
          </div>
          <div className="rounded-3xl border border-[#DCDCDC] px-4 py-5 shadow-[8px_4px_24px_0px_#EAEAEA40]">
            <h3 className="text-sm font-semibold text-[#101117]">
              مراجعه به مرکز کارشناسی
            </h3>
            <p className="my-1 text-base font-light text-[#55565A]">
              شرق تهران
            </p>
            <p className="text-sm font-light leading-7 text-[#55565A]">
              در صورت تمایل می‌توانید موتور را به مرکز کارشناسی کارماچک در شرق
              تهران بیاورید و کارشناسی را در محل مرکز انجام دهید.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#F0F2F4] py-16 lg:pt-12 flex flex-wrap justify-center relative px-4 lg:px-96">
        <p className="font-bold bg-[#F0F2F4] py-4 z-10 text-center text-lg">
          فرآیند انجام کارشناسی
        </p>
        <div className="w-full my-4">
          <div className="flex flex-col w-2/5 pl-5">
            <span className="text-sm text-[#101117] lg:text-2xl">
              انتخاب موتور
            </span>
            <span className="text-xs text-[#55565A] lg:text-base">
              انتخاب مدل موتور با توجه به برند انتخاب شده
            </span>
          </div>
        </div>
        <div className="w-full flex justify-end my-4">
          <div className="flex flex-col w-2/5 pr-5">
            <span className="text-sm text-[#101117] lg:text-2xl">
              نوع کارشناسی{" "}
            </span>
            <span className="text-xs text-[#55565A] lg:text-base">
              ثبت کارشناسی استاندارد یا VIP
            </span>
          </div>
        </div>
        <div className="w-full my-4">
          <div className="flex flex-col w-2/5 pl-5">
            <span className="text-sm text-[#101117] lg:text-2xl">
              زمان کارشناسی{" "}
            </span>
            <span className="text-xs text-[#55565A] lg:text-base">
              انتخاب روز و ساعت کارشناسی{" "}
            </span>
          </div>
        </div>
        <div className="w-full flex justify-end my-4">
          <div className="flex flex-col w-2/5 pr-5">
            <span className="text-sm text-[#101117] lg:text-2xl">
              تایید و پردخت
            </span>
            <span className="text-xs text-[#55565A] lg:text-base">
              ثبت و تایید و پرداخت مبلغ نهایی کارشناسی
            </span>
          </div>
        </div>
        <div className="absolute w-16 top-24 h-[calc(100%-96px)] bg-way bg-cover">
          <CarWayAnimation containerRef={ref} />
        </div>
      </div>

      {/* <div className="h-[600px] lg:h-[800px]">
        <OurCustomer />
      </div> */}
      <InspectionIntroSection />
      <InspectionFlowStats />
      <InspectionSeoArticle />

      {inspectionFaqs.length > 0 && (
        <FaqPreviewSection
          title="سوالات متداول کارشناسی موتور"
          subtitle="پاسخ سوالات رایج قبل از شروع فرآیند رزرو کارشناسی موتور"
          items={inspectionFaqs}
          limit={6}
          showViewAll={inspectionFaqs.length > 6}
          expandInline
          className="bg-[#F0F2F4] lg:max-w-4xl lg:mx-auto lg:rounded-3xl lg:my-8"
        />
      )}

      <div className="lg:hidden">
        <NavigationBar activePath="/motorcycle-inspection" />
      </div>
      {/* <Footer /> */}
    </main>
  );
}
