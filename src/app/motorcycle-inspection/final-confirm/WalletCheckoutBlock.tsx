"use client";

import { walletApi } from "@/lib/wallet";
import type { CheckoutPreview } from "@/types/wallet";
import { useEffect } from "react";

type WalletCheckoutBlockProps = {
  orderId: number;
  preview: CheckoutPreview | null;
  onPreviewChange: (preview: CheckoutPreview | null) => void;
  /** فقط پیش‌نمایش کیف‌پول را بارگذاری می‌کند؛ UI در جای دیگر (مثلاً شیت پرداخت) */
  hideUi?: boolean;
};

function setUseWalletFlag(useWallet: boolean) {
  localStorage.setItem("useWallet", String(useWallet));
}

export function WalletCheckoutBlock({
  orderId,
  preview: _preview,
  onPreviewChange,
  hideUi = false,
}: WalletCheckoutBlockProps) {
  void _preview;
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

  if (hideUi) return null;

  return null;
}
