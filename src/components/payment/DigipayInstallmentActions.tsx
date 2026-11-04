"use client";

import { Button } from "@/components/ui/button";
import { fetchInstallmentQuote, startDigipayInstallment } from "@/lib/payment/digipay";
import { formatToman } from "@/lib/wallet";
import type { InstallmentQuote, VehicleKind } from "@/types/digipay";
import { useEffect, useState } from "react";

type Props = {
  orderId: number;
  vehicleKind?: VehicleKind;
  disabled?: boolean;
  /** مبلغ درگاه آنلاین (بعد از کیف‌پول کارماچک) — اگر quote نیامد */
  onlineAmountHint?: number | null;
  initialQuote?: InstallmentQuote | null;
  /** بعد از اعمال کیف‌پول روی سفارش، quote دوباره گرفته می‌شود */
  walletSnapshot?: { useWallet: boolean; gatewayAmount: number } | null;
  className?: string;
};

export function DigipayInstallmentActions({
  orderId,
  vehicleKind = 1,
  disabled = false,
  onlineAmountHint,
  initialQuote,
  walletSnapshot,
  className,
}: Props) {
  const [quote, setQuote] = useState<InstallmentQuote | null>(initialQuote ?? null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (initialQuote) {
      setQuote(initialQuote);
      return;
    }
    if (!orderId) return;
    let cancelled = false;
    fetchInstallmentQuote(orderId, vehicleKind).then((res) => {
      if (!cancelled) setQuote(res);
    });
    return () => {
      cancelled = true;
    };
  }, [
    orderId,
    vehicleKind,
    initialQuote,
    walletSnapshot?.useWallet,
    walletSnapshot?.gatewayAmount,
  ]);

  const onlineAmount =
    onlineAmountHint ??
    quote?.onlineAmount ??
    quote?.baseAmount ??
    null;
  const installmentAmount =
    quote?.payableAmount ?? quote?.installmentAmount ?? null;
  const showSurchargeNote =
    quote != null && (quote.surchargePercent ?? 0) > 0 && Boolean(quote.displayText);

  const pay = async () => {
    if (!orderId || disabled || paying) return;
    setPaying(true);
    try {
      await startDigipayInstallment(orderId, vehicleKind);
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className={className}>
      {(onlineAmount != null || installmentAmount != null) && (
        <div className="mb-3 space-y-1 rounded-2xl border border-[#DFDFDF] bg-[#f8fafb] px-4 py-3 text-sm">
          {onlineAmount != null ? (
            <div className="flex justify-between text-[#55565A]">
              <span>پرداخت آنلاین</span>
              <span className="font-semibold text-[#101117]">{formatToman(onlineAmount)}</span>
            </div>
          ) : null}
          {installmentAmount != null ? (
            <div className="flex justify-between text-[#0f766e]">
              <span>پرداخت اقساطی</span>
              <span className="font-bold">{formatToman(installmentAmount)}</span>
            </div>
          ) : null}
          {showSurchargeNote ? (
            <p className="pt-1 text-xs leading-6 text-[#6B6C70]">{quote!.displayText}</p>
          ) : null}
        </div>
      )}
      <Button
        onClick={pay}
        disabled={disabled || paying || !orderId}
        type="button"
        variant="outline"
        className="w-full rounded-3xl border-[#0f766e] py-6 text-[#0f766e] hover:bg-[#e6f5f3] disabled:opacity-50"
      >
        {paying ? "در حال آماده‌سازی..." : "پرداخت اقساطی با دیجی‌پی"}
      </Button>
      {installmentAmount != null ? (
        <p className="mt-2 text-center text-xs font-medium text-[#0f766e]">
          {formatToman(installmentAmount)}
        </p>
      ) : (
        <p className="mt-2 text-center text-xs text-[#6B6C70]">
          پرداخت با اعتبار، اقساط یا کیف‌پول دیجی‌پی
        </p>
      )}
    </div>
  );
}
