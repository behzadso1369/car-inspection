"use client";

import { Tick01Icon } from "hugeicons-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaqPreviewSection } from "@/app/components/FaqPreviewSection";
import { Footer } from "@/app/components/mobile/Home/Footer";
import { Header } from "@/app/components/mobile/Home/Header";
import { NavigationBar } from "@/app/components/mobile/Home/NavigationBar";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import { useOptimizedNavigation } from "@/hooks/useOptimizedNavigation";
import type { FaqItem } from "@/lib/faq-data";
import Banner from "../../components/mobile/Home/Banner";
import CallAction from "../../components/mobile/Home/CallAction";
import OpenSheet from "../CarGroupSheet";

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
    router.prefetch("./inspection-method");
  }, [router]);

  useEffect(() => {
    localStorage.setItem("CarGroupId", String(inputValue.value));
    localStorage.setItem("CarGroupName", String(inputValue.name));
  }, [inputValue]);

  const moveToInspectionMethod = (carGroupId?: number) => {
    const idToUse = carGroupId || inputValue.value;
    if (!idToUse) {
      console.error("CarGroupId is required");
      return;
    }

    instance
      .post(ApiHelper.get("CreateOrder"), {
        carGroupId: idToUse,
      })
      .then((res: any) => {
        if (res?.orderId) {
          localStorage.setItem("OrderId", res?.orderId);
          // بستن modal قبل از navigate
          setOpenModal(false);
          // استفاده از navigate بهینه‌سازی شده
          navigate("./inspection-method");
        }
      });
  };

  return (
    <div className="bg-white font-IranSans">
      <div className="px-4 w-full lg:w-2/5 lg:mx-24 lg:py-10">
        <div className="bg-white shadow-[8px_4px_24px_0px_#EAEAEA40] border border-[#DCDCDC] px-4 py-6 rounded-3xl my-6">
          <h1 className="text-black text-lg my-2 font-medium">
            کارشناسی خودرو
          </h1>
          <h2 className="text-[#55565A] font-light text-base">
            جهت شروع فرآیند کارشناسی اطلاعات زیر را وارد کنید.
          </h2>
          {/* <h1 className="text-black text-lg my-2 font-bold leading-8 lg:text-xl">
            کارشناسی خودرو در محل
          </h1> */}
          {/* <p className="text-[#55565A] font-light text-sm leading-7 lg:text-base">
            کارشناسی خودرو در محل تهران با اعزام کارشناس به تهران و شرق تهران؛ بررسی
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
                alt="مرحله اول رزرو کارشناسی خودرو"
                fill
                className="object-fill"
              />
            </div>

            <div>
              <h2 className="text-base text-black my-2 font-medium">
                مرحله اول: مشخصات اولیه خودرو
              </h2>
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
          <Label onClick={() => setOpenModal(true)} className="my-2">
            نام خودرو
          </Label>
          <Input
            onClick={() => setOpenModal(true)}
            value={inputValue.name}
            readOnly
            placeholder="نام خودرو را انتخاب کنید"
            className="items-center !py-4 border w-full border-[#DFDFDF] rounded-full text-[#55565A] text-xs h-11"
          />

          <Button
            onClick={() => moveToInspectionMethod()}
            disabled={isPending}
            className="bg-[#416CEA] text-white w-full h-11 rounded-3xl mt-4 disabled:opacity-50"
          >
            {isPending ? "در حال انتقال..." : "رزرو کارشناسی"}
          </Button>
        </div>
      </div>

      <div className="w-full bg-[#416CEA] relative mt-28 lg:mt-0 py-6 lg:py-8">
        <div className="absolute left-1/2 lg:left-0 -top-2 lg:-top-2/3 -translate-y-1/2 -translate-x-1/2 lg:translate-0 -rotate-y-180">
          <div className="w-[353px] lg:w-[739px] relative aspect-[2.09]">
            <Image
              alt="flow-car"
              src="/flow-car.png"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-24 lg:mt-14 px-4 lg:px-24 text-white w-full lg:w-1/2">
          <h2 className="text-lg font-medium">
            کارشناسی خودرو در محل با کارماچک
          </h2>
          <p className="text-base leading-8">
            کارشناس ما به آدرس شما در تهران و شرق تهران اعزام می‌شود و بدون نیاز
            به جابه‌جایی خودرو، موارد زیر را بررسی می‌کند:
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
            <span>شاسی</span>
          </p>
          <p className="flex">
            <Tick01Icon size={24} />
            <span>دیاگ</span>
          </p>
          <p className="flex">
            <Tick01Icon size={24} />
            <span>آپشن‌ها</span>
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
        <h2 className="font-bold w-full text-center">
          اعزام کارشناس به محل شما
        </h2>
        <div className="mx-auto mt-4 grid w-full max-w-6xl gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-[#DCDCDC] px-4 py-5 shadow-[8px_4px_24px_0px_#EAEAEA40]">
            <h3 className="text-sm font-semibold text-[#101117]">
              کارشناسی خودرو در محل تهران و شرق تهران
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
              پس از رزرو آنلاین، کارشناس به آدرسی که خودرو در آن قرار دارد اعزام
              می‌شود و بدون جابه‌جایی ماشین، بررسی کامل انجام می‌شود.
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
              در صورت تمایل می‌توانید خودرو را به مرکز کارشناسی کارماچک در شرق
              تهران بیاورید و کارشناسی را در محل مرکز انجام دهید.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#F0F2F4] py-16 lg:pt-12 flex flex-wrap justify-center relative px-4 lg:px-96">
        <h2 className="font-bold bg-[#F0F2F4] py-4 z-10">
          فرآیند انجام کارشناسی
        </h2>
        <div className="w-full my-4">
          <div className="flex flex-col w-2/5 pl-5">
            <span className="text-sm text-[#101117] lg:text-2xl">
              انتخاب خودرو
            </span>
            <span className="text-xs text-[#55565A] lg:text-base">
              انتخاب گروه خودرو با توجه به برند انتخاب شده
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
          title="سوالات متداول کارشناسی خودرو"
          subtitle="پاسخ سوالات رایج قبل از شروع فرآیند رزرو کارشناسی"
          items={inspectionFaqs}
          limit={6}
          showViewAll={inspectionFaqs.length > 6}
          expandInline
          className="bg-[#F0F2F4] lg:max-w-4xl lg:mx-auto lg:rounded-3xl lg:my-8"
        />
      )}

      <div className="lg:hidden">
        <NavigationBar />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
