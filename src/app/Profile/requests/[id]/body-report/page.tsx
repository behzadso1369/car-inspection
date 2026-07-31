"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft01Icon } from "hugeicons-react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import BodyReportViewer from "@/components/on-site/BodyReportViewer";
import type { BodyReport } from "@/types/on-site";

function BodyReportContent() {
  const params = useParams();
  const orderId = params.id;
  const [report, setReport] = useState<BodyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    instance
      .get(`${ApiHelper.get("GetOrderBodyReport")}?OrderId=${orderId}`)
      .then((res: BodyReport) => setReport(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [orderId]);

  return (
    <div className="grid grid-cols-3 gap-4 py-4 font-IranSans">
      <div className="col-span-3 lg:col-span-1 rounded-2xl order-1 lg:order-0 lg:border lg:border-[#D9D9D9] lg:max-h-[243px]">
        <h3 className="text-[#101117] font-normal my-6 px-4">تنظیمات حساب</h3>
        <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
          <div className="text-[#101117] flex">
            <Image alt="کارشناسی خودرو" src="/car-inspection-icon.svg" width={24} height={24} />
            <Link href="/Profile/requests" className="mx-1 text-base" prefetch={false}>
              تمامی درخواست‌ها
            </Link>
          </div>
          <ArrowLeft01Icon />
        </h6>
      </div>

      <div className="py-6 px-4 order-0 col-span-3 lg:col-span-2 lg:border lg:border-[#D9D9D9] rounded-2xl">
        <Link
          href={`/Profile/requests/${orderId}`}
          className="text-sm text-[#416CEA] mb-4 inline-block"
        >
          ← بازگشت به جزئیات سفارش
        </Link>

        {loading && (
          <p className="text-center text-[#55565A] py-12">در حال بارگذاری گزارش...</p>
        )}
        {error && (
          <p className="text-center text-[#55565A] py-12">
            گزارش بدنه هنوز ثبت نشده یا در دسترس نیست.
          </p>
        )}
        {report && report.Status === "Submitted" && <BodyReportViewer report={report} />}
        {report && report.Status !== "Submitted" && (
          <p className="text-center text-yellow-600 py-12">
            گزارش در حال تکمیل است. لطفاً بعداً مراجعه کنید.
          </p>
        )}
      </div>
    </div>
  );
}

export default function BodyReportPage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center font-IranSans text-[#55565A]">در حال بارگذاری...</div>
      }
    >
      <BodyReportContent />
    </Suspense>
  );
}
