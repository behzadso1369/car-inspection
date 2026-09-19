"use client";

import { Button } from "@/components/ui/button";
import {
  formatSignedToman,
  formatToman,
  transactionAmountClass,
  walletApi,
} from "@/lib/wallet";
import type { WalletBalance, WalletTransaction } from "@/types/wallet";
import { WalletIcon } from "@/components/WalletIcon";
import moment from "jalali-moment";
import { useEffect, useState } from "react";

const PAGE_SIZE = 20;

export default function WalletClient() {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadBalance = () => {
    return walletApi.getBalance().then((res) => {
      if (res?.walletId != null || res?.balance != null) {
        setBalance(res);
      }
    });
  };

  const loadTransactions = (pageNumber: number, append = false) => {
    return walletApi.getTransactions(pageNumber, PAGE_SIZE).then((res) => {
      const rows = Array.isArray(res) ? res : [];
      setTransactions((prev) => (append ? [...prev, ...rows] : rows));
      setHasMore(rows.length >= PAGE_SIZE);
    });
  };

  useEffect(() => {
    Promise.all([loadBalance(), loadTransactions(1)])
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    const next = page + 1;
    setLoadingMore(true);
    loadTransactions(next, true)
      .then(() => setPage(next))
      .catch(() => undefined)
      .finally(() => setLoadingMore(false));
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-white font-IranSans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#416CEA] mx-auto mb-4" />
          <p className="text-[#55565A]">در حال بارگذاری کیف‌پول...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-IranSans pb-28 px-4 lg:px-0 lg:max-w-2xl lg:mx-auto">
      <div className="mt-6 rounded-3xl bg-gradient-to-l from-[#416CEA] to-[#3456bb] px-5 py-6 text-white shadow-[0_8px_28px_rgba(65,108,234,0.28)]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <WalletIcon size={26} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-white/80">موجودی کیف‌پول</p>
            <p className="text-2xl font-extrabold mt-1">
              {formatToman(balance?.balance ?? 0)}
            </p>
          </div>
        </div>
        {/* شارژ دستی کیف‌پول — فعلا غیرفعال
        <Button
          asChild
          className="mt-5 w-full rounded-3xl bg-white text-[#3456bb] hover:bg-white/95 py-6"
        >
          <Link href="/wallet/charge">شارژ کیف‌پول</Link>
        </Button>
        */}
      </div>

      <h2 className="mt-8 mb-3 text-base font-medium text-[#101117]">
        تاریخچه تراکنش‌ها
      </h2>

      {transactions.length === 0 ? (
        <div className="rounded-2xl border border-[#DFDFDF] px-4 py-8 text-center text-sm text-[#55565A]">
          هنوز تراکنشی ثبت نشده است.
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="rounded-2xl border border-[#EAEAEA] bg-white px-4 py-3 shadow-[0px_4px_24px_0px_#EAEAEA]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#101117]">{tx.typeTitle}</p>
                  {tx.description ? (
                    <p className="text-xs text-[#6B6C70] mt-1">{tx.description}</p>
                  ) : null}
                  <p className="text-[11px] text-[#9AA0A6] mt-1">
                    {tx.createdOn
                      ? moment(tx.createdOn).locale("fa").format("YYYY/MM/DD HH:mm")
                      : ""}
                  </p>
                </div>
                <div className="text-left shrink-0">
                  <p className={`text-sm font-bold ${transactionAmountClass(tx.amount)}`}>
                    {formatSignedToman(tx.amount)}
                  </p>
                  <p className="text-[11px] text-[#9AA0A6] mt-1">
                    موجودی: {formatToman(tx.balanceAfter)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore ? (
        <Button
          disabled={loadingMore}
          onClick={loadMore}
          variant="outline"
          className="mt-4 w-full rounded-3xl py-6"
        >
          {loadingMore ? "در حال بارگذاری..." : "مشاهده بیشتر"}
        </Button>
      ) : null}
    </div>
  );
}
