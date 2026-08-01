"use client";

import { Car02Icon, UserIcon } from "hugeicons-react";
import { useCallback, useEffect, useState } from "react";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import type { OrderExpertStatus } from "@/types/on-site";
import {
  EXPERT_STATUS_STEPS,
  normalizeOrderExpertStatus,
} from "@/types/on-site";

const STATUS_ORDER = EXPERT_STATUS_STEPS.map((step) => step.key);

interface ExpertStatusTrackerProps {
  orderId: string | number;
}

export default function ExpertStatusTracker({
  orderId,
}: ExpertStatusTrackerProps) {
  const [status, setStatus] = useState<OrderExpertStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(() => {
    instance
      .get(`${ApiHelper.get("GetOrderExpertStatus")}?OrderId=${orderId}`)
      .then((res: unknown) => setStatus(normalizeOrderExpertStatus(res)))
      .catch(() => setStatus(null))
      .finally(() => setLoading(false));
  }, [orderId]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#DFDFDF] p-4 my-4 animate-pulse h-24 bg-[#FBFBFB]" />
    );
  }

  if (!status) return null;

  const currentIdx = STATUS_ORDER.indexOf(status.Status);
  const isStopped =
    status.Status === "Rejected" || status.Status === "Cancelled";

  return (
    <div className="rounded-2xl border border-[#416CEA]/20 bg-gradient-to-b from-[#F8FAFF] to-white p-4 my-4">
      <div className="flex items-center gap-2 mb-3">
        <Car02Icon size={20} color="#416CEA" />
        <h4 className="font-medium text-[#101117]">پیگیری اعزام کارشناس</h4>
      </div>
      <p
        className={`text-sm font-medium mb-1 ${
          isStopped ? "text-[#E21515]" : "text-[#416CEA]"
        }`}
      >
        {status.StatusText ||
          (status.HasAssignment
            ? "وضعیت اعزام کارشناس در حال به‌روزرسانی است."
            : "سفارش شما در صف تخصیص کارشناس قرار دارد.")}
      </p>
      {status.ExpertName && (
        <p className="text-xs text-[#55565A] flex items-center gap-1 mb-4">
          <UserIcon size={14} />
          کارشناس: {status.ExpertName}
        </p>
      )}
      {!isStopped && (
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 mt-4">
          {EXPERT_STATUS_STEPS.map((step, idx) => {
            const stepIdx = STATUS_ORDER.indexOf(step.key);
            const isDone = currentIdx >= stepIdx;
            const isCurrent = status.Status === step.key;
            return (
              <div
                key={step.key}
                className="flex flex-col items-center min-w-[52px]"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    isDone
                      ? "bg-[#416CEA] text-white"
                      : "bg-[#E8ECF4] text-[#9DB0C9]"
                  } ${isCurrent ? "ring-2 ring-[#416CEA]/40" : ""}`}
                >
                  {idx + 1}
                </div>
                <span className="text-[10px] text-[#55565A] mt-1 text-center leading-tight">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
