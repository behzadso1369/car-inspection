"use client";

import { Button } from "@/components/ui/button";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import { CheckmarkCircle01Icon } from "hugeicons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import   moment from "jalali-moment";


export default function ClientWrapper() {
  const [orderDetail, setOrderDetail] = useState<any>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [discountCode, setDiscountCode] = useState<any>("");
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getPaymentStatus = () => {
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      setLoading(false);
      return;
    }

    instance.get(ApiHelper.get("Payment") + "/" + orderId).then((res: any) => {
      setPaymentStatus(res);
      setOrderDetail(res);
      setDiscountCode(res?.discountCode || res?.trackingCode || "");
      setLoading(false);
    }).catch((error: any) => {
      console.error("Error fetching payment status:", error);
      setLoading(false);
    });
  };

  const moveToGateway = () => {
    router.push("/Profile");
  };

  useEffect(() => {
    getPaymentStatus();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="bg-white font-IranSans lg:px-4 lg:py-4 lg:max-w-xl lg:container lg:mx-auto lg:my-10 lg:pt-8">
        <div className="px-4">
          <div className="bg-white px-4 py-6 rounded-3xl mt-6">
            <div className="flex flex-wrap items-center w-full justify-center">
              <h3 className="w-full text-center my-4 text-base text-[#101117] font-bold">در حال بارگذاری...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white font-IranSans lg:px-4  lg:max-w-xl lg:container lg:mx-auto">
      <div className="px-4">
        <div className="bg-white px-4  rounded-3xl mt-4">
          <div className="flex flex-wrap items-center w-full justify-center">
            <div className="aspect-[1] relative w-16 h-auto ml-4">
              <CheckmarkCircle01Icon size={80} color="green"/>
            </div>
            <h3 className="w-full text-center my-4 text-lg lg:text-3xl text-[#101117] font-bold">پرداخت شما با موفقیت انجام شد</h3>
          </div>
        </div>
      </div>
      {paymentStatus && (
        <div className="px-4 text-center">
          <div className="my-4 ">
            <div className="text-[#6B6C70] text-base lg:text-xl"> کد پیگیری سفارش:</div>
            <div className="text-base lg:text-xl my-4 font-bold">{ paymentStatus?.trackId || "-"}</div>
          </div>
          {paymentStatus?.status && (
            <div className="px-4 text-center my-4">
              <div className="text-[#6B6C70] text-base lg:text-2xl"> مبلغ سفارش:</div>
              <div className="text-base lg:text-2xl font-bold my-4">{paymentStatus?.amount?.toLocaleString()} تومان</div>
            </div>
          )}
           <div className="my-4 ">
            <div className="text-[#6B6C70] text-base lg:text-xl">تاریخ  پرداخت:</div>
            <div className="text-base lg:text-xl my-4 font-bold">{moment(paymentStatus?.paidAt).locale("fa").format("YYYY/MM/DD ساعت HH:mm:ss") || "-"}</div>
          </div>
        </div>
      )}

      <div className="px-4 w-full lg:my-4   flex justify-center  bg-white  py-5">
        <Button onClick={moveToGateway} type="submit" className="bg-[#416CEA] text-white rounded-3xl py-6 px-12 w-full">
           پروفایل 
        </Button>
      </div>
    </div>
  );
}

