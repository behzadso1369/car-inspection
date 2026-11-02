"use client";

import { Button } from "@/components/ui/button";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import { startDigipayInstallment } from "@/lib/payment/digipay";
import type { VehicleKind } from "@/types/digipay";
import { Payment02Icon } from "hugeicons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FlowStepFooter } from "@/components/flow/FlowStepFooter";
import { DiscountPriceDisplay } from "@/app/car-inspection/components/DiscountPriceDisplay";

type Props = {
  vehicleKind?: VehicleKind;
  orderImageAlt: string;
};

export function OrderPaymentClient({ vehicleKind = 1, orderImageAlt }: Props) {
  const [orderDetail, setOrderDetail] = useState<any>([]);
  const [payingOnline, setPayingOnline] = useState(false);
  const [payingDigipay, setPayingDigipay] = useState(false);

  const moveApi =
    vehicleKind === 2
      ? ApiHelper.get("MoveMotorcyclePrivateOrder")
      : ApiHelper.get("MovePrivateOrder");

  const getUserOrderDetails = () => {
    instance
      .get(
        ApiHelper.get("GetUserOrderDetails") +
          "?OrderId=" +
          localStorage.getItem("OrderId")
      )
      .then((res: any) => {
        setOrderDetail(res);
      });
  };

  const payOnline = () => {
    setPayingOnline(true);
    const params: any = {
      isBack: false,
      orderId: Number(localStorage.getItem("OrderId")),
      useWallet: localStorage.getItem("useWallet") === "true",
    };
    instance
      .post(moveApi, params)
      .then((res: any) => {
        if (res?.paidFullyByWallet) {
          const q = vehicleKind === 2 ? "&vehicleKind=2" : "";
          window.location.assign(`/payment/success?orderId=${res.orderId}${q}`);
          return;
        }
        if (res?.isEndFlow && res?.requiresPayment && res?.paymentUrl) {
          window.location.assign(res.paymentUrl);
          return;
        }
        if (res?.isEndFlow && res?.paymentUrl) {
          window.location.assign(res.paymentUrl);
          return;
        }
        setPayingOnline(false);
      })
      .catch(() => setPayingOnline(false));
  };

  const payDigipay = async () => {
    const orderId = Number(localStorage.getItem("OrderId"));
    if (!orderId) return;
    setPayingDigipay(true);
    try {
      await startDigipayInstallment(orderId, vehicleKind);
    } finally {
      setPayingDigipay(false);
    }
  };

  const busy = payingOnline || payingDigipay;

  useEffect(() => {
    getUserOrderDetails();
  }, []);

  return (
    <div className="bg-white font-IranSans lg:px-4 lg:py-4 pb-28">
      <div className="px-4">
        <div className="bg-white px-4 py-6 rounded-3xl mt-6">
          <div className="flex flex-wrap items-center w-full justify-center">
            <Payment02Icon color="#416CEA" size={80} />
            <h3 className="w-full text-center my-4 text-base text-[#101117] font-bold">
              پرداخت سفارش
            </h3>
          </div>
        </div>
      </div>

      <div className="px-4 border-b border-[#DFDFDF] py-2">
        <div className="flex justify-between">
          <span className="text-[#6B6C70] text-sm">تاریخ ثبت سفارش:</span>
          <span>{orderDetail?.orderCreated}</span>
        </div>
      </div>

      <div className="px-4 border-b border-[#DFDFDF] py-2">
        <div className="flex my-4 justify-between items-center">
          <span className="text-[#6B6C70] text-sm">مبلغ :</span>
          <DiscountPriceDisplay
            fullPrice={orderDetail?.totalPrice ?? 0}
            discountedPrice={orderDetail?.finalPrice ?? orderDetail?.totalPrice ?? 0}
            variant="summary"
          />
        </div>
        <div className="flex my-4 justify-between">
          <span className="text-[#6B6C70] text-sm">زمان کارشناسی:</span>
          <span className="text-sm">{orderDetail?.inspectionType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B6C70] text-sm">محل کارشناسی:</span>
          <span>{orderDetail?.carInspectionLocationType}</span>
        </div>
        <div className="flex my-4 justify-between items-center">
          <span className="text-[#6B6C70] text-sm">قابل پرداخت:</span>
          <DiscountPriceDisplay
            fullPrice={orderDetail?.totalPrice ?? 0}
            discountedPrice={orderDetail?.finalPrice ?? orderDetail?.totalPrice ?? 0}
            variant="summary"
          />
        </div>
      </div>

      <div className="flex px-4 my-4">
        <Image src="/sample-car.png" width={120} height={120} alt={orderImageAlt} />
        <div className="flex flex-col text-base text-[#101117] mx-4">
          <span>خودرو سواری {orderDetail?.carGroup}</span>
          <span>مالک : {orderDetail?.username}</span>
        </div>
      </div>

      <FlowStepFooter className="flex-col gap-3 items-stretch">
        <div className="flex justify-between items-center w-full px-1">
          <DiscountPriceDisplay
            fullPrice={orderDetail?.totalPrice ?? 0}
            discountedPrice={orderDetail?.finalPrice ?? orderDetail?.totalPrice ?? 0}
          />
        </div>
        <Button
          onClick={payOnline}
          disabled={busy}
          type="button"
          className="bg-[#416CEA] text-white rounded-3xl py-6 w-full"
        >
          {payingOnline ? "در حال انتقال به درگاه..." : "پرداخت آنلاین"}
        </Button>
        <div className="w-full">
          <Button
            onClick={payDigipay}
            disabled={busy}
            type="button"
            variant="outline"
            className="border-[#0f766e] text-[#0f766e] rounded-3xl py-6 w-full hover:bg-[#e6f5f3]"
          >
            {payingDigipay ? "در حال آماده‌سازی..." : "پرداخت اقساطی با دیجی‌پی"}
          </Button>
          <p className="text-center text-xs text-[#6B6C70] mt-2">
            پرداخت با اعتبار، اقساط یا کیف‌پول دیجی‌پی
          </p>
        </div>
      </FlowStepFooter>
    </div>
  );
}
