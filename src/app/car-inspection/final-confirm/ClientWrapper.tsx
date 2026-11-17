"use client";

import { Button } from "@/components/ui/button";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import {
  PaymentMethodSelector,
  type CheckoutPaymentMethod,
} from "@/components/payment/PaymentMethodSelector";
import {
  applyInstallmentSurcharge,
  fetchInstallmentQuote,
  startDigipayInstallment,
} from "@/lib/payment/digipay";
import {
  handleOrderMoveResult,
  readCheckoutContext,
  walletApi,
} from "@/lib/wallet";
import type { CheckoutPreview, OrderMoveResult } from "@/types/wallet";
import type { InstallmentQuote } from "@/types/digipay";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RegulationsTermsViewer } from "./RegulationsTermsViewer";
import {
  FlowStepFooter,
  flowStepScrollPaddingClass,
} from "@/components/flow/FlowStepFooter";
import { WalletCheckoutBlock } from "./WalletCheckoutBlock";
import { WalletIcon } from "@/components/WalletIcon";
import { FESTIVAL_DISCOUNT } from "@/app/car-inspection/lib/pricing";

function formatAmountFa(amount: number | null | undefined) {
  return Number(amount ?? 0).toLocaleString("fa-IR");
}

export default function ClientWrapper() {
  const [orderDetail, setOrderDetail] = useState<any>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [regulationsOpen, setRegulationsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<CheckoutPaymentMethod>("online");
  const [digipayPaying, setDigipayPaying] = useState(false);
  const [installmentQuote, setInstallmentQuote] =
    useState<InstallmentQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [walletPreview, setWalletPreview] = useState<CheckoutPreview | null>(
    null,
  );
  const [checkoutContext, setCheckoutContext] = useState({
    orderId: 0,
    carGroupId: 0,
    carInspectionTypeId: null as number | null,
  });
  const [walletBalanceHint, setWalletBalanceHint] = useState<number | null>(
    null,
  );

  useEffect(() => {
    router.prefetch("/payment/success");
    setCheckoutContext(readCheckoutContext());
  }, [router]);

  const getUserOrderDetails = () => {
    instance
      .get(
        ApiHelper.get("GetUserOrderDetails") +
          "?OrderId=" +
          localStorage.getItem("OrderId"),
      )
      .then((res: any) => {
        setOrderDetail(res);
      });
  };

  const moveToPaymentSucceed = () => {
    setLoading(true);
    const params: any = {
      isBack: false,
      orderId: Number(localStorage.getItem("OrderId")),
      useWallet: Boolean(walletPreview?.useWallet),
    };
    const movePrivate = () =>
      instance.post(
        ApiHelper.get("MovePrivateOrder"),
        params,
      ) as Promise<OrderMoveResult>;

    movePrivate()
      .then((first) => {
        if (handleOrderMoveResult(first)) return;
        return movePrivate().then((second) => {
          if (!handleOrderMoveResult(second)) {
            setLoading(false);
          }
        });
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserOrderDetails();
  }, []);

  useEffect(() => {
    walletApi
      .getBalance()
      .then((res) => {
        if (res?.balance != null) setWalletBalanceHint(Number(res.balance));
      })
      .catch(() => {});
  }, []);

  const orderId = checkoutContext.orderId;

  const payBusy = loading || digipayPaying;
  const showDigipay =
    !walletPreview ||
    !walletPreview.canPayFullyByWallet ||
    walletPreview.gatewayAmount > 0;

  const isOnlineCheckout =
    !showDigipay || paymentMethod === "online";

  useEffect(() => {
    if (!orderId) return;

    if (showDigipay && paymentMethod === "digipay") {
      walletApi
        .applyToOrder(orderId, false)
        .then((applied) => {
          if (applied?.orderId != null) {
            localStorage.setItem("useWallet", "false");
            setWalletPreview(applied);
          }
        })
        .catch(() => {});
      return;
    }

    if (
      walletPreview?.allowWalletPayment &&
      (walletPreview.walletBalance ?? 0) > 0 &&
      !walletPreview.useWallet
    ) {
      walletApi
        .applyToOrder(orderId, true)
        .then((applied) => {
          if (applied?.orderId != null) {
            localStorage.setItem(
              "useWallet",
              String(Boolean(applied.useWallet)),
            );
            setWalletPreview(applied);
          }
        })
        .catch(() => {});
    }
  }, [
    paymentMethod,
    orderId,
    showDigipay,
    walletPreview?.allowWalletPayment,
    walletPreview?.walletBalance,
    walletPreview?.useWallet,
  ]);

  useEffect(() => {
    if (!orderId || paymentMethod !== "digipay" || !showDigipay) {
      setInstallmentQuote(null);
      return;
    }
    let cancelled = false;
    setQuoteLoading(true);
    fetchInstallmentQuote(orderId, 1)
      .then((res) => {
        if (!cancelled) setInstallmentQuote(res);
      })
      .finally(() => {
        if (!cancelled) setQuoteLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orderId, paymentMethod, showDigipay, walletPreview?.gatewayAmount]);

  const carmacheckDiscount = Number(
    walletPreview?.discount ?? orderDetail?.discount ?? 0,
  );

  const onlinePayable =
    isOnlineCheckout && walletPreview?.useWallet
      ? walletPreview.gatewayAmount
      : (walletPreview?.payable ??
        orderDetail?.finalPrice ??
        orderDetail?.totalPrice ??
        0);

  const isDigipayCheckout = showDigipay && paymentMethod === "digipay";
  const detailsPayableBase =
    isOnlineCheckout && walletPreview?.useWallet
      ? (walletPreview.gatewayAmount ?? 0)
      : Number(
          walletPreview?.payable ??
            orderDetail?.finalPrice ??
            orderDetail?.totalPrice ??
            0,
        );
  const detailsPayable = isDigipayCheckout
    ? applyInstallmentSurcharge(detailsPayableBase, installmentQuote)
    : detailsPayableBase;
  const displayedDiscount = isDigipayCheckout
    ? Math.max(carmacheckDiscount, FESTIVAL_DISCOUNT)
    : carmacheckDiscount;
  const displayedTotalPrice = isDigipayCheckout
    ? detailsPayable + FESTIVAL_DISCOUNT
    : Number(orderDetail?.totalPrice ?? 0);

  const footerAmount = isDigipayCheckout ? detailsPayable : onlinePayable;

  const payDisabled = payBusy || !acceptedTerms;

  const startDigipayPay = async () => {
    const id = orderId || Number(localStorage.getItem("OrderId") || 0);
    if (!id || payDisabled || digipayPaying) return;
    setDigipayPaying(true);
    try {
      await startDigipayInstallment(id, 1);
    } finally {
      setDigipayPaying(false);
    }
  };

  return (
    <div
      className={`bg-white font-IranSans lg:px-4 lg:py-2 ${flowStepScrollPaddingClass}`}
    >
      <div className="flex items-center px-4 py-3">
        <div className="relative ml-4 aspect-[2] h-8 w-16">
          <Image
            src="/final-step.png"
            alt="final-step.png"
            fill
            sizes="64px"
            quality={70}
            className="object-fill"
          />
        </div>
        <div>
          <h3 className="text-base font-medium text-black">
            مشاهده و تایید نهایی
          </h3>
          <h4 className="text-sm font-light text-[#55565A]">بعدی: پرداخت</h4>
        </div>
      </div>

      {showDigipay ? (
        <div className="px-4 pb-2">
          <PaymentMethodSelector
            value={paymentMethod}
            onChange={setPaymentMethod}
            disabled={payBusy}
            walletBalance={
              walletPreview?.walletBalance ?? walletBalanceHint
            }
            onlineHint="استفاده از کیف پول کارماچک"
            digipayHint="4 قسط با دیجی پی"
          />
        </div>
      ) : null}

      <div className="space-y-3 px-4 pb-2">
        <WalletCheckoutBlock
          orderId={checkoutContext.orderId}
          preview={walletPreview}
          onPreviewChange={setWalletPreview}
          hideUi
        />

        <h2 className="mb-3 pt-2 text-sm font-semibold text-[#101117]">
          جزییات سفارش
        </h2>

        <div className="mt-3 flex justify-between gap-3">
          <span className="shrink-0 text-sm text-[#6B6C70]">نوع وسیله:</span>
          <span className="min-w-0 text-left text-sm text-[#101117]">
            {orderDetail?.carGroup}
          </span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="shrink-0 text-sm text-[#6B6C70]">نام و نام خانوادگی:</span>
          <span className="min-w-0 text-left text-sm text-[#101117]">
            {orderDetail?.username}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <span className="pt-1 text-sm text-[#6B6C70]">مبلغ کل:</span>
            <div className="text-left">
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-base font-black text-[#101117]">
                  {displayedTotalPrice.toLocaleString("fa-IR")}
                </span>
                <span className="text-xs font-medium text-[#55565A]">تومان</span>
              </div>
            </div>
          </div>
          {isOnlineCheckout && walletPreview?.useWallet ? (
            <div className="flex items-start justify-between gap-3">
              <span className="pt-1 text-sm text-[#6B6C70]">کسر کیف پول:</span>
              <div className="text-left">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-base font-black tabular-nums text-[#B45309]">
                    {(walletPreview.walletCanCover ?? 0).toLocaleString("fa-IR")}
                  </span>
                  <span className="text-xs font-medium text-[#B45309]">تومان</span>
                </div>
              </div>
            </div>
          ) : null}
          {displayedDiscount > 0 ? (
            <div className="flex items-start justify-between gap-3">
              <span className="pt-1 text-sm text-[#6B6C70]">تخفیف کارماچک:</span>
              <div className="text-left">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-base font-black tabular-nums text-[#16A34A]">
                    {displayedDiscount.toLocaleString("fa-IR")}
                  </span>
                  <span className="text-xs font-medium text-[#55565A]">تومان</span>
                </div>
              </div>
            </div>
          ) : null}
          {(isOnlineCheckout && walletPreview?.useWallet) ||
          displayedDiscount > 0 ||
          isDigipayCheckout ? (
            <div className="flex items-start justify-between gap-3">
              <span className="pt-1 text-sm text-[#6B6C70]">مبلغ قابل پرداخت:</span>
              <div className="text-left">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-base font-black tabular-nums text-[#416CEA]">
                    {detailsPayable.toLocaleString("fa-IR")}
                  </span>
                  <span className="text-xs font-medium text-[#416CEA]">تومان</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-sm text-[#6B6C70]">نوع کارشناسی:</span>
          <span className="text-sm">{orderDetail?.inspectionType}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="shrink-0 text-sm text-[#6B6C70]">محل کارشناسی:</span>
          <span className="min-w-0 text-left text-sm leading-6 text-[#101117]">
            {orderDetail?.carInspectionLocationTypeAddress ||
              orderDetail?.carInspectionLocationType}
          </span>
        </div>
      </div>

      <FlowStepFooter className="flex-col space-y-2 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:pb-4">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-7 text-[#55565A]">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 size-6 shrink-0 rounded-[6px] border border-[#C5C9D3] accent-[#416CEA] lg:size-5"
          />
          <span>
            <button
              type="button"
              className="font-medium text-[#416CEA] underline-offset-2 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setRegulationsOpen(true);
              }}
            >
              قوانین و مقررات کارماچک
            </button>{" "}
            را می‌پذیرم.
          </span>
        </label>

        <div className="space-y-3 rounded-2xl border border-[#E8ECF4] bg-[#F8FAFC] px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {showDigipay && paymentMethod === "digipay" ? (
              <Button
                disabled={
                  payDisabled || !installmentQuote || quoteLoading
                }
                onClick={startDigipayPay}
                type="button"
                className="inline-flex h-auto shrink-0 items-center gap-1.5 rounded-2xl border-0 bg-[#003eff] px-4 py-3 text-sm font-bold leading-none text-white shadow-[0_4px_14px_rgba(0,62,255,0.35)] hover:bg-[#0036e0] disabled:opacity-50"
              >
                {!digipayPaying ? (
                  <WalletIcon size={22} className="shrink-0 text-white" />
                ) : null}
                {digipayPaying
                  ? "لطفا منتظر بمانید..."
                  : "پرداخت اقساطی دیجی‌پی"}
              </Button>
            ) : (
              <Button
                disabled={payDisabled}
                onClick={moveToPaymentSucceed}
                type="button"
                className="h-auto shrink-0 rounded-2xl bg-[#416CEA] px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
              >
                {loading
                  ? "لطفا منتظر بمانید..."
                  : walletPreview?.canPayFullyByWallet
                    ? "پرداخت با کیف‌پول"
                    : "پرداخت آنلاین"}
              </Button>
            )}

            <div className="min-w-0 shrink text-left">
              {quoteLoading && paymentMethod === "digipay" ? (
                <span className="text-sm text-[#6B6C70]">در حال محاسبه...</span>
              ) : (
                <>
                  <span className="text-lg font-extrabold tabular-nums text-[#101117]">
                    {formatAmountFa(footerAmount)}
                  </span>
                  <span className="mr-1 text-xs font-medium text-[#55565A]">
                    تومان
                  </span>
                </>
              )}
            </div>
          </div>

        </div>
      </FlowStepFooter>

      <RegulationsTermsViewer
        open={regulationsOpen}
        onOpenChange={setRegulationsOpen}
      />
    </div>
  );
}
