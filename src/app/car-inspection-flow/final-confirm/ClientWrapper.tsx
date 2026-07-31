"use client";

import { Button } from "@/components/ui/button";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import { DiscountTag01Icon } from "hugeicons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DiscountPriceDisplay } from "../components/DiscountPriceDisplay";

export default function ClientWrapper() {
  const [orderDetail, setOrderDetail] = useState<any>([]);
  const router = useRouter();
   const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.prefetch('./payment-success');
  }, [router]);

  const getUserOrderDetails = () => {
    instance.get(ApiHelper.get("GetUserOrderDetails") + "?OrderId=" + localStorage.getItem("OrderId")).then((res: any) => {
      setOrderDetail(res);
    });
  };

  const moveToPaymentSucceed = () => {
    setLoading(true);
    const params: any = {
      "isBack": false,
      "orderId": Number(localStorage.getItem("OrderId"))
    };
    instance.post(ApiHelper.get("MovePrivateOrder"), params).then((res: any) => {
      setLoading(false);
      if (res) {
        if(res?.isEndFlow) {
        
           router.push(res?.paymentUrl);
      }
      }
    }).catch((err:any) => {
      console.log(err);
      setLoading(false);
    });
  };

  useEffect(() => {
    getUserOrderDetails();
  }, []);

  return (
    <div className="bg-white font-IranSans lg:px-4 lg:py-4 pb-24">
      <div className="px-4">
        <div className="bg-white px-4 py-6 rounded-3xl my-6">
          <div className="flex items-center">
            <div className="aspect-[2] relative w-16 h-8 ml-4">
              <Image src="/final-step.png" alt="final-step.png" fill className="object-fill"  />
            </div>
            <div>
              <h3 className="text-base text-black my-2 font-medium">
                مشاهده و تایید نهایی
              </h3>
              <h4 className="text-[#55565A] font-light text-sm"> بعدی: پرداخت</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <h1>خلاصه اطلاعات</h1>
        <div className="flex my-4 justify-between">
          <span className="text-[#6B6C70] text-sm">مدل ماشین:</span>
          <span className="text-sm">{orderDetail?.carGroup}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B6C70] text-sm">نام و نام خانوادگی:</span>
          <span>{orderDetail?.username}</span>
        </div>
      </div>

      <div className="px-4 shadow-[0px_4px_24px_0px_#EAEAEA] py-2 mx-2 text-xs my-4 rounded-2xl">
        <div className="text-[#6B6C70] my-2">آدرس کارشناسی</div>
        <span>{orderDetail?.carInspectionLocationTypeAddress}</span>
      </div>

      <div className="px-4">
        <h1>خلاصه سفارش</h1>
        <div className="flex my-4 justify-between items-center">
          <span className="text-[#6B6C70] text-sm">مبلغ کل:</span>
          <DiscountPriceDisplay
            fullPrice={orderDetail?.totalPrice ?? 0}
            discountedPrice={orderDetail?.finalPrice ?? orderDetail?.totalPrice ?? 0}
            variant="summary"
          />
        </div>

        {(orderDetail?.discount ?? 0) > 0 ? (
          <div className="my-4 flex items-center justify-between gap-3 rounded-2xl border border-[#86EFAC]/50 bg-gradient-to-l from-[#ECFDF5] via-[#F0FDF4] to-[#F7FEF9] px-4 py-3.5 shadow-[0_6px_20px_rgba(34,197,94,0.12)]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/15 text-[#16A34A]">
                <DiscountTag01Icon size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#101117]">تخفیف شما</span>
                <span className="text-xs font-light text-[#55565A]">مبلغ کسر شده از سفارش</span>
              </div>
            </div>
            <span className="whitespace-nowrap text-base font-extrabold text-[#16A34A]">
              {orderDetail?.discount?.toLocaleString()}− تومان
            </span>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className="text-[#6B6C70] text-sm">تخفیف:</span>
            <span>{orderDetail?.discount?.toLocaleString()} تومان</span>
          </div>
        )}

        <div className="flex my-4 justify-between">
          <span className="text-[#6B6C70] text-sm">نوع کارشناسی:</span>
          <span className="text-sm">{orderDetail?.inspectionType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B6C70] text-sm">محل کارشناسی:</span>
          <span>{orderDetail?.carInspectionLocationType}</span>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#416CEA]/25 bg-[#416CEA]/6 px-4 py-3.5">
          <span className="text-sm font-medium text-[#101117]">قابل پرداخت:</span>
          <span className="text-base font-extrabold text-[#416CEA]">
            {orderDetail?.finalPrice?.toLocaleString()} تومان
          </span>
        </div>
      </div>

      <div className="px-4 w-full lg:my-4 bg-white lg:static lg:mt-8 fixed flex justify-between bottom-0 b-white shadow-[0px_4px_32px_0px_#CBD5E0] py-5">
        <Button disabled={loading} onClick={moveToPaymentSucceed} type="submit" className="bg-[#416CEA] text-white rounded-3xl py-6 px-12">
           
            {
            loading ? "لطفا منتظر بمانید..." : "تایید و پرداخت"
          }
           
        </Button>
        <DiscountPriceDisplay
          fullPrice={orderDetail?.totalPrice ?? 0}
          discountedPrice={orderDetail?.finalPrice ?? orderDetail?.totalPrice ?? 0}
        />
      </div>
    </div>
  );
}

