"use client";

import { Button } from "@/components/ui/button";
import { onlinePayButtonSizeClass } from "@/components/payment/checkoutPayButton";
import { fetchInstallmentQuote, startDigipayInstallment } from "@/lib/payment/digipay";
import { formatToman } from "@/lib/wallet";
import type { InstallmentQuote, VehicleKind } from "@/types/digipay";
import { ArrowLeft01Icon, CreditCardIcon } from "hugeicons-react";
import { useEffect, useState } from "react";

type Props = {
  orderId: number;
  vehicleKind?: VehicleKind;
  disabled?: boolean;
  onlineAmountHint?: number | null;
  initialQuote?: InstallmentQuote | null;
  walletSnapshot?: { useWallet: boolean; gatewayAmount: number } | null;
  className?: string;
  variant?: "premium" | "compact";
  onPayingChange?: (paying: boolean) => void;
};

function resolveOrderId(propId: number) {
  if (propId) return propId;
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem("OrderId") || 0);
}

function buildSurchargeNote(quote: InstallmentQuote | null): string {
  if (!quote) return "";
  const fromApi = quote.displayText?.trim();
  if (fromApi) return fromApi;
  const pct = quote.surchargePercent;
  if (pct != null && pct > 0) {
    return `با انتخاب پرداخت اقساطی، ${pct}٪ به مبلغ اضافه می‌شود`;
  }
  return "";
}

export function DigipayInstallmentActions({
  orderId: orderIdProp,
  vehicleKind = 1,
  disabled = false,
  onlineAmountHint: _onlineAmountHint,
  initialQuote,
  walletSnapshot,
  className,
  variant = "premium",
  onPayingChange,
}: Props) {
  const [quote, setQuote] = useState<InstallmentQuote | null>(initialQuote ?? null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    setOrderId(resolveOrderId(orderIdProp));
  }, [orderIdProp]);

  useEffect(() => {
    onPayingChange?.(paying);
  }, [paying, onPayingChange]);

  useEffect(() => {
    if (initialQuote) {
      setQuote(initialQuote);
      return;
    }
    if (!orderId) return;
    let cancelled = false;
    setQuoteLoading(true);
    fetchInstallmentQuote(orderId, vehicleKind)
      .then((res) => {
        if (!cancelled) setQuote(res);
      })
      .finally(() => {
        if (!cancelled) setQuoteLoading(false);
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

  const installmentAmount =
    quote?.payableAmount ?? quote?.installmentAmount ?? null;
  const surchargeNote = buildSurchargeNote(quote);

  const pay = async () => {
    const id = resolveOrderId(orderIdProp);
    if (!id || disabled || paying) return;
    setPaying(true);
    try {
      await startDigipayInstallment(id, vehicleKind);
    } finally {
      setPaying(false);
    }
  };

  const payDisabled = disabled || paying || !orderId;

  const amountLabel =
    paying
      ? null
      : installmentAmount != null
        ? formatToman(installmentAmount)
        : quoteLoading
          ? "در حال محاسبه..."
          : null;

  if (variant === "compact") {
    return (
      <div className={className}>
        {surchargeNote ? (
          <p className="mb-2 text-center text-xs leading-6 text-[#0f766e]">{surchargeNote}</p>
        ) : null}
        <Button
          onClick={pay}
          disabled={payDisabled}
          type="button"
          className={`${onlinePayButtonSizeClass} flex !h-auto min-h-0 w-full items-center justify-between gap-2 border-0 bg-gradient-to-l from-[#0d9488] via-[#0f766e] to-[#115e59] px-3 text-white shadow-[0_4px_14px_rgba(15,118,110,0.35)] transition hover:from-[#0f766e] hover:to-[#134e4a] disabled:opacity-50`}
        >
          <span className="shrink-0 rounded bg-white/20 px-1.5 py-px text-[10px] font-bold">
            دیجی‌پی
          </span>
          <span className="min-w-0 flex-1 truncate text-center text-sm font-medium">
            {paying ? "در حال آماده‌سازی..." : "پرداخت اقساطی"}
          </span>
          {amountLabel ? (
            <span className="shrink-0 text-[11px] font-semibold tabular-nums">{amountLabel}</span>
          ) : null}
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-3xl border border-[#14b8a6]/30 bg-gradient-to-b from-[#f0fdfa] via-white to-[#ecfeff] p-3 shadow-[0_8px_28px_rgba(13,148,136,0.12)] ${className ?? ""}`}
    >
      {surchargeNote ? (
        <p className="mb-3 text-center text-xs leading-6 text-[#0f766e]">{surchargeNote}</p>
      ) : null}

      <Button
        onClick={pay}
        disabled={payDisabled}
        type="button"
        className="group relative h-auto w-full overflow-hidden rounded-2xl border-0 bg-gradient-to-l from-[#0d9488] via-[#0f766e] to-[#115e59] py-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_rgba(15,118,110,0.4)] transition hover:from-[#0f766e] hover:to-[#134e4a] disabled:opacity-50"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-white/10"
        />
        <span className="relative flex w-full items-center gap-3 px-1">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
            <CreditCardIcon size={22} color="#fff" strokeWidth={1.75} />
          </span>
          <span className="min-w-0 flex-1 text-right">
            <span className="mb-1 inline-flex rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wide">
              دیجی‌پی
            </span>
            <span className="block text-base font-bold leading-snug">
              {paying ? "در حال آماده‌سازی..." : "پرداخت اقساطی"}
            </span>
            {!paying ? (
              <span className="mt-1 block text-xs font-medium leading-snug text-white/90">
                برای پرداخت قسطی کلیک کنید
              </span>
            ) : null}
            {amountLabel ? (
              <span className="mt-1 block text-lg font-extrabold leading-none tabular-nums">
                {amountLabel}
              </span>
            ) : null}
          </span>
          {!paying ? (
            <ArrowLeft01Icon size={22} className="shrink-0 opacity-90" color="#fff" />
          ) : null}
        </span>
      </Button>
    </div>
  );
}
