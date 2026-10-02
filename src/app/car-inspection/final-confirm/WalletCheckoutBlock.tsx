"use client";

import { WalletIcon } from "@/components/WalletIcon";
import { formatToman, walletApi } from "@/lib/wallet";
import type { CheckoutPreview } from "@/types/wallet";
import { useEffect } from "react";

type WalletCheckoutBlockProps = {
  orderId: number;
  preview: CheckoutPreview | null;
  onPreviewChange: (preview: CheckoutPreview | null) => void;
};

function setUseWalletFlag(useWallet: boolean) {
  localStorage.setItem("useWallet", String(useWallet));
}

export function WalletCheckoutBlock({
  orderId,
  preview,
  onPreviewChange,
}: WalletCheckoutBlockProps) {
  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;

    walletApi
      .getCheckoutPreview(orderId)
      .then(async (res) => {
        if (cancelled || res?.orderId == null) {
          if (!cancelled) onPreviewChange(null);
          return;
        }

        const shouldAutoApply =
          Boolean(res.allowWalletPayment) &&
          (res.walletBalance ?? 0) > 0 &&
          !res.useWallet;

        if (shouldAutoApply) {
          try {
            const applied = await walletApi.applyToOrder(orderId, true);
            if (cancelled) return;
            if (applied?.orderId != null) {
              setUseWalletFlag(Boolean(applied.useWallet));
              onPreviewChange(applied);
              return;
            }
          } catch {
            // اگر اعمال خودکار شکست خورد، همان پیش‌نمایش اولیه را نشان می‌دهیم
          }
        }

        if (cancelled) return;
        setUseWalletFlag(Boolean(res.useWallet));
        onPreviewChange(res);
      })
      .catch(() => {
        if (!cancelled) onPreviewChange(null);
      });

    return () => {
      cancelled = true;
    };
  }, [orderId, onPreviewChange]);

  if (!preview?.useWallet) return null;

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-start gap-3 rounded-2xl border border-[#86EFAC]/60 bg-gradient-to-l from-[#ECFDF5] via-[#F0FDF4] to-[#F7FEF9] px-4 py-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#16A34A]/15 text-[#16A34A]">
          <WalletIcon size={20} />
        </div>
        <div className="min-w-0 flex-1 text-right">
          <p className="text-sm font-bold text-[#14532D]">
            کسر خودکار از کیف‌پول
          </p>
          <p className="mt-0.5 text-xs leading-5 text-[#166534]">
            موجودی فعلی: {formatToman(preview.walletBalance)}
          </p>
        </div>
      </div>

      <div className="space-y-2 rounded-2xl border border-[#EAEAEA] px-4 py-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[#6B6C70]">مبلغ سفارش</span>
          <span>{formatToman(preview.payable)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B6C70]">کسر از کیف‌پول</span>
          <span className="font-semibold text-[#157347]">
            {formatToman(preview.walletCanCover)}
          </span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>قابل پرداخت در درگاه</span>
          <span className="text-[#416CEA]">
            {formatToman(preview.gatewayAmount)}
          </span>
        </div>
        {preview.canPayFullyByWallet ? (
          <p className="text-xs text-[#157347]">
            کل مبلغ از کیف‌پول پرداخت می‌شود؛ به درگاه نمی‌روید.
          </p>
        ) : null}
      </div>
    </div>
  );
}
