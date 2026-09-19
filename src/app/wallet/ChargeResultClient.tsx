"use client";

import { Button } from "@/components/ui/button";
import { formatToman, walletApi } from "@/lib/wallet";
import { WalletIcon } from "@/components/WalletIcon";
import { CancelCircleIcon, CheckmarkCircle01Icon } from "hugeicons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ChargeResultInner({ success }: { success: boolean }) {
  const searchParams = useSearchParams();
  const [balance, setBalance] = useState<number | null>(null);
  const message = searchParams.get("message");
  const trackId = searchParams.get("trackId");

  useEffect(() => {
    if (!success) return;

    const verifyThenBalance = async () => {
      if (trackId) {
        try {
          await walletApi.verifyPayment(trackId);
        } catch {
          // تایید اختیاری است؛ موجودی را در هر حال می‌خوانیم
        }
      }
      try {
        const res = await walletApi.getBalance();
        setBalance(res?.balance ?? 0);
      } catch {
        setBalance(null);
      }
    };

    verifyThenBalance();
  }, [success, trackId]);

  return (
    <div className="font-IranSans px-4 pb-28 lg:max-w-xl lg:mx-auto">
      <div className="mt-8 flex flex-col items-center text-center">
        {success ? (
          <CheckmarkCircle01Icon size={80} color="green" />
        ) : (
          <CancelCircleIcon size={80} color="red" />
        )}
        <h1 className="mt-4 text-lg font-bold text-[#101117]">
          {success ? "شارژ کیف‌پول با موفقیت انجام شد" : "شارژ کیف‌پول ناموفق بود"}
        </h1>
        {!success && message ? (
          <p className="mt-3 text-sm text-[#DC2626]">{message}</p>
        ) : null}
        {success && balance != null ? (
          <p className="mt-4 text-base font-semibold text-[#3456bb]">
            موجودی فعلی: {formatToman(balance)}
          </p>
        ) : null}
      </div>

      <div className="mt-8 space-y-3">
        {success ? (
          <Button asChild className="w-full rounded-3xl bg-[#416CEA] py-6 text-white">
            <Link href="/wallet" className="inline-flex items-center justify-center gap-2">
              <WalletIcon size={20} />
              مشاهده موجودی
            </Link>
          </Button>
        ) : (
          <Button asChild className="w-full rounded-3xl bg-[#416CEA] py-6 text-white">
            <Link href="/wallet/charge">تلاش دوباره</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default function ChargeResultClient({ success }: { success: boolean }) {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center font-IranSans text-[#55565A]">در حال بارگذاری...</div>
      }
    >
      <ChargeResultInner success={success} />
    </Suspense>
  );
}
