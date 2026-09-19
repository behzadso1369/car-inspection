"use client";

import { walletApi } from "@/lib/wallet";
import type { WalletGiftPreview } from "@/types/wallet";
import { useEffect, useState } from "react";

type WalletGiftBannerProps = {
  carGroupId?: number | null;
  carInspectionTypeId?: number | null;
};

function readGiftAmount(res: WalletGiftPreview | Record<string, unknown> | null | undefined) {
  if (!res) return 0;
  const raw = (res as WalletGiftPreview).giftAmount ?? (res as { GiftAmount?: number }).GiftAmount;
  return Number(raw ?? 0);
}

function GiftBannerShell({
  amount,
  loading,
}: {
  amount?: number | null;
  loading?: boolean;
}) {
  return (
    <div className="wallet-gift-box relative overflow-hidden rounded-2xl border border-[#86EFAC] bg-gradient-to-l from-[#ECFDF5] via-[#D1FAE5] to-[#F0FDF4] px-3 py-2.5">
      <div
        aria-hidden
        className="wallet-gift-shimmer pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-transparent"
      />
      <div className="relative flex items-center gap-2.5">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
          <span aria-hidden className="wallet-gift-sparkle absolute -top-0.5 right-0 text-xs text-[#22C55E]">
            ✦
          </span>
          <span
            aria-hidden
            className="wallet-gift-sparkle wallet-gift-sparkle-delay absolute bottom-0 left-0 text-[10px] text-[#16A34A]"
          >
            ✦
          </span>
          <span className="wallet-gift-icon inline-block text-[1.7rem] leading-none">🎁</span>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-[#15803D]">هدیه بعد از پرداخت موفق</p>
          {loading ? (
            <div
              className="mt-1 flex h-6 items-center gap-2"
              aria-label="در حال بارگذاری مبلغ هدیه"
            >
              <span className="wallet-gift-spinner relative inline-flex h-[22px] w-[22px]">
                <span className="absolute inset-0 rounded-full border-[2.5px] border-[#BBF7D0]" />
                <span className="absolute inset-0 rounded-full border-[2.5px] border-transparent border-t-[#16A34A] border-r-[#4ADE80]" />
              </span>
              <span className="text-[11px] font-bold text-[#15803D]">تومان</span>
            </div>
          ) : (
            <p className="mt-0.5 text-xl font-black leading-none text-[#166534]">
              {Number(amount).toLocaleString("fa-IR")}
              <span className="mr-1 text-[11px] font-bold text-[#15803D]">تومان</span>
            </p>
          )}
          <p className="mt-1 text-[11px] font-medium text-[#166534]">
            به کیف‌پول شما اضافه می‌شود
          </p>
        </div>
      </div>
    </div>
  );
}

export function WalletGiftBanner({
  carGroupId,
  carInspectionTypeId,
}: WalletGiftBannerProps) {
  const [gift, setGift] = useState<WalletGiftPreview | null>(null);
  const [loading, setLoading] = useState(Boolean(carGroupId));

  useEffect(() => {
    if (!carGroupId) return;
    let cancelled = false;
    setLoading(true);
    walletApi
      .getGiftPreview(carGroupId, carInspectionTypeId)
      .then((res) => {
        if (cancelled) return;
        const giftAmount = readGiftAmount(res);
        if (giftAmount > 0) {
          setGift({ ...(res as WalletGiftPreview), giftAmount });
        } else {
          setGift(null);
        }
      })
      .catch(() => {
        if (!cancelled) setGift(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [carGroupId, carInspectionTypeId]);

  const amount = readGiftAmount(gift);
  if (!carGroupId) return null;
  if (loading) return <GiftBannerShell loading amount={amount || null} />;
  if (amount <= 0) return null;

  return <GiftBannerShell amount={amount} />;
}
