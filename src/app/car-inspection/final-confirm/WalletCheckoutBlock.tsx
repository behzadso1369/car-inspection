"use client";

import { WalletIcon } from "@/components/WalletIcon";
import { formatToman, walletApi } from "@/lib/wallet";
import type { CheckoutPreview } from "@/types/wallet";
import { useEffect, useState } from "react";

type WalletCheckoutBlockProps = {
  orderId: number;
  preview: CheckoutPreview | null;
  onPreviewChange: (preview: CheckoutPreview | null) => void;
};

export function WalletCheckoutBlock({
  orderId,
  preview,
  onPreviewChange,
}: WalletCheckoutBlockProps) {
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    walletApi
      .getCheckoutPreview(orderId)
      .then((res) => {
        if (res?.orderId != null) {
          localStorage.setItem("useWallet", String(Boolean(res.useWallet)));
          onPreviewChange(res);
        }
      })
      .catch(() => onPreviewChange(null));
  }, [orderId, onPreviewChange]);

  const showToggle =
    Boolean(preview?.allowWalletPayment) && (preview?.walletBalance ?? 0) > 0;

  const onToggle = (checked: boolean) => {
    if (!orderId || applying) return;
    setApplying(true);
    walletApi
      .applyToOrder(orderId, checked)
      .then((res) => {
        if (res?.orderId != null) {
          onPreviewChange(res);
          localStorage.setItem("useWallet", String(Boolean(res.useWallet)));
        }
      })
      .catch(() => undefined)
      .finally(() => setApplying(false));
  };

  if (!preview) return null;

  return (
    <div className="mt-5 space-y-3">
      {showToggle ? (
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#416CEA]/25 bg-[#416CEA]/6 px-4 py-3.5">
          <input
            type="checkbox"
            checked={Boolean(preview.useWallet)}
            disabled={applying}
            onChange={(e) => onToggle(e.target.checked)}
            className="mt-0.5 size-6 shrink-0 rounded-[6px] border border-[#C5C9D3] accent-[#416CEA] lg:size-5"
          />
          <span className="text-sm leading-7 text-[#101117]">
            <span className="inline-flex items-center gap-1.5">
              <WalletIcon size={18} className="text-[#416CEA]" />
              از موجودی کیف‌پول استفاده شود
            </span>
            <span className="block text-xs font-light text-[#55565A]">
              موجودی فعلی: {formatToman(preview.walletBalance)}
            </span>
          </span>
        </label>
      ) : null}

      {preview.useWallet ? (
        <div className="rounded-2xl border border-[#EAEAEA] px-4 py-3 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-[#6B6C70]">مبلغ سفارش</span>
            <span>{formatToman(preview.payable)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B6C70]">کسر از کیف‌پول</span>
            <span className="text-[#157347]">{formatToman(preview.walletCanCover)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>قابل پرداخت در درگاه</span>
            <span className="text-[#416CEA]">{formatToman(preview.gatewayAmount)}</span>
          </div>
          {preview.canPayFullyByWallet ? (
            <p className="text-xs text-[#157347]">
              کل مبلغ از کیف‌پول پرداخت می‌شود؛ به درگاه نمی‌روید.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
