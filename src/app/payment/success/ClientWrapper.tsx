"use client";

import { Button } from "@/components/ui/button";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import { WalletIcon } from "@/components/WalletIcon";
import { paymentSuccessUrl, verifyDigipayInstallment } from "@/lib/payment/digipay";
import { formatToman, walletApi } from "@/lib/wallet";
import { toast } from "sonner";
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
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [verifying, setVerifying] = useState(false);

  const gateway = searchParams.get("gateway");
  const isDigipay =
    gateway === "digipay" || paymentStatus?.gateway === "Digipay";

  const getPaymentStatus = () => {
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      setLoading(false);
      return;
    }

    const vehicleKind = searchParams.get("vehicleKind") === "2" ? "2" : "1";
    const url = `${ApiHelper.get("Payment")}/${orderId}?vehicleKind=${vehicleKind}`;

    instance.get(url).then((res: any) => {
      setPaymentStatus(res);
      setOrderDetail(res);
      setDiscountCode(res?.discountCode || res?.trackingCode || "");
      setLoading(false);
    }).catch((error: any) => {
      console.error("Error fetching payment status:", error);
      setLoading(false);
    });

    walletApi.getBalance().then((res) => {
      if (res?.balance != null) setWalletBalance(res.balance);
    }).catch(() => undefined);
  };

  const moveToGateway = () => {
    router.push("/Profile");
  };

  const checkDigipayPayment = async () => {
    const orderId = Number(searchParams.get("orderId"));
    const vehicleKind = searchParams.get("vehicleKind") === "2" ? 2 : 1;
    if (!orderId) return;

    setVerifying(true);
    try {
      const body: {
        paymentId?: number;
        providerId?: string;
        trackingCode?: string;
        type?: number;
      } = {};
      if (paymentStatus?.paymentId) body.paymentId = paymentStatus.paymentId;
      if (paymentStatus?.providerId) body.providerId = paymentStatus.providerId;
      if (paymentStatus?.trackId) body.trackingCode = String(paymentStatus.trackId);
      if (paymentStatus?.ticketType != null) body.type = paymentStatus.ticketType;

      if (!body.paymentId && !body.providerId && paymentStatus?.trackId) {
        await walletApi.verifyPayment(paymentStatus.trackId);
      } else if (body.paymentId || body.providerId) {
        await verifyDigipayInstallment(body);
      } else {
        toast.error("اطلاعات پرداخت برای بررسی یافت نشد.");
        return;
      }
      window.location.assign(paymentSuccessUrl(orderId, vehicleKind));
    } catch {
      toast.error("بررسی پرداخت ناموفق بود. لطفاً دوباره تلاش کنید.");
    } finally {
      setVerifying(false);
    }
  };

  const showVerifyDigipay =
    isDigipay && paymentStatus && paymentStatus.hasPayment === false;

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
            <h3 className="w-full text-center my-4 text-lg lg:text-3xl text-[#101117] font-bold">
              {isDigipay ? "پرداخت اقساطی با موفقیت انجام شد" : "پرداخت شما با موفقیت انجام شد"}
            </h3>
            {isDigipay && paymentStatus?.ticketTypeTitle ? (
              <p className="w-full text-center text-sm text-[#6B6C70]">
                روش پرداخت: {paymentStatus.ticketTypeTitle}
              </p>
            ) : null}
            {!isDigipay && paymentStatus?.gateway === "Digipay" ? (
              <p className="w-full text-center text-sm text-[#6B6C70]">درگاه: دیجی‌پی</p>
            ) : null}
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
          {walletBalance != null ? (
            <div className="my-4">
              <div className="text-[#6B6C70] text-base lg:text-xl">موجودی کیف‌پول:</div>
              <div className="text-base lg:text-xl my-4 font-bold">{formatToman(walletBalance)}</div>
            </div>
          ) : null}
        </div>
      )}

      <div className="px-4 w-full lg:my-4   flex justify-center  bg-white  py-5 gap-3 flex-col">
        {showVerifyDigipay ? (
          <Button
            onClick={checkDigipayPayment}
            disabled={verifying}
            type="button"
            className="bg-[#0f766e] text-white rounded-3xl py-6 px-12 w-full"
          >
            {verifying ? "در حال بررسی..." : "بررسی پرداخت"}
          </Button>
        ) : null}
        <Button onClick={moveToGateway} type="submit" className="bg-[#416CEA] text-white rounded-3xl py-6 px-12 w-full">
           پروفایل 
        </Button>
        <Button onClick={() => router.push("/wallet")} type="button" className="bg-white text-[#416CEA] border border-[#416CEA] rounded-3xl py-6 px-12 w-full inline-flex items-center justify-center gap-2">
           <WalletIcon size={20} />
           کیف‌پول
        </Button>
      </div>
    </div>
  );
}

