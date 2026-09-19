"use client";

// import { Button } from "@/components/ui/button";
import { WalletIcon } from "@/components/WalletIcon";
// import { formatToman, redirectToGateway, walletApi } from "@/lib/wallet";
// import type { ChargePlan } from "@/types/wallet";
import { useState } from "react";

export default function ChargeClient() {
  // شارژ دستی کیف‌پول — فعلا غیرفعال
  // const [plans, setPlans] = useState<ChargePlan[]>([]);
  const [loading] = useState(false);
  // const [submittingId, setSubmittingId] = useState<number | null>(null);

  // useEffect(() => {
  //   walletApi
  //     .getChargePlans()
  //     .then((res) => {
  //       const rows = Array.isArray(res) ? res : [];
  //       setPlans([...rows].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)));
  //     })
  //     .catch(() => undefined)
  //     .finally(() => setLoading(false));
  // }, []);

  // const startCharge = (planId: number) => {
  //   setSubmittingId(planId);
  //   walletApi
  //     .startCharge(planId)
  //     .then((res) => {
  //       if (res?.paymentUrl) {
  //         redirectToGateway(res.paymentUrl);
  //         return;
  //       }
  //       setSubmittingId(null);
  //     })
  //     .catch(() => setSubmittingId(null));
  // };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center font-IranSans">
        <p className="text-[#55565A]">در حال بارگذاری پلن‌ها...</p>
      </div>
    );
  }

  return (
    <div className="font-IranSans pb-28 px-4 lg:px-0 lg:max-w-2xl lg:mx-auto">
      <h1 className="mt-6 flex items-center gap-2 text-lg font-bold text-[#101117]">
        <WalletIcon size={24} className="text-[#416CEA]" />
        شارژ کیف‌پول
      </h1>
      <p className="mt-2 text-sm text-[#55565A]">
        شارژ مستقیم کیف‌پول فعلاً در دسترس نیست.
      </p>

      {/* شارژ دستی کیف‌پول — فعلا غیرفعال
      {plans.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-[#DFDFDF] px-4 py-8 text-center text-sm text-[#55565A]">
          در حال حاضر پلن شارژ فعالی وجود ندارد.
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-3xl border border-[#EAEAEA] bg-white px-4 py-4 shadow-[0px_4px_24px_0px_#EAEAEA]"
            >
              ...
            </div>
          ))}
        </div>
      )}
      */}
    </div>
  );
}
