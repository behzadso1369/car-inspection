"use client";

import { WalletIcon } from "@/components/WalletIcon";

export function WalletNotAllowedNotice() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3.5">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E5E7EB]/80 text-[#9CA3AF]">
        <WalletIcon size={20} />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1 flex items-center justify-center"
        >
          <span className="h-[2px] w-[130%] rotate-[-35deg] rounded-full bg-[#DC2626]" />
        </span>
      </div>
      <p className="text-right text-sm leading-6 text-[#6B6C70]">
        در این نوع پرداخت شما اجازه استفاده از کیف‌پول را ندارید.
      </p>
    </div>
  );
}
