"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import { normalizeText } from "@/lib/car-price/text";

interface InspectCtaButtonProps {
  /** نام نمایشی خودرو، مثل «پژو ۲۰۷» */
  carName: string;
  /**
   * عبارت جستجو برای پیدا کردن گروه خودرو در بک‌اند (مثل «پژو 207»).
   * اگر خالی باشد، از خود carName استفاده می‌شود.
   */
  searchTerm?: string;
  carGroupId?: number;
  carGroupName?: string;
  className?: string;
  label?: string;
  showChevron?: boolean;
}

function searchTermsFromCarName(carName: string, searchTerm?: string) {
  const raw = [searchTerm, carName]
    .map((value) => String(value || "").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const normalized = raw.map((value) => normalizeText(value)).filter(Boolean);
  const shortened = normalized
    .map((value) => value.split(" ").slice(0, 2).join(" "))
    .filter(Boolean);

  return [...new Set([...raw, ...normalized, ...shortened])];
}

function pickCarGroup(groups: any[], carName: string, searchTerm?: string) {
  if (!groups.length) return null;

  const queries = [searchTerm, carName]
    .map((value) => normalizeText(value || ""))
    .filter(Boolean);

  let best = groups[0];
  let bestScore = -1;

  for (const item of groups) {
    const name = normalizeText(item.Name || "");
    if (!name) continue;

    let score = 0;
    for (const query of queries) {
      if (name === query) score = Math.max(score, 1000);
      else if (query.includes(name)) score = Math.max(score, 600 + name.length);
      else if (name.includes(query)) score = Math.max(score, 500 + query.length);
      else {
        const overlap = query.split(" ").filter((token) => name.includes(token)).length;
        score = Math.max(score, overlap * 40);
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return bestScore > 0 ? best : groups[0];
}

/**
 * دکمه‌ی «شروع کارشناسی همین خودرو».
 * این خودرو را دقیقاً مثل انتخاب دستی در فرم کارشناسی «انتخاب» می‌کند:
 * ۱) گروه خودرو را از بک‌اند پیدا می‌کند
 * ۲) CarGroupId/Name را در localStorage ذخیره می‌کند
 * ۳) سفارش می‌سازد و OrderId را ذخیره می‌کند
 * ۴) کاربر را مستقیم به مرحله‌ی انتخاب روش کارشناسی می‌برد
 */
export default function InspectCtaButton({
  carName,
  searchTerm,
  carGroupId,
  carGroupName,
  className = "",
  label,
  showChevron = false,
}: InspectCtaButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const startInspection = async () => {
    const term = (searchTerm || carName).trim();
    if (!carGroupId && !term) {
      router.push("/car-inspection");
      return;
    }

    setLoading(true);
    try {
      if (carGroupId) {
        localStorage.setItem("CarGroupId", String(carGroupId));
        localStorage.setItem("CarGroupName", carGroupName || carName);
        try {
          const orderRes: any = await instance.post(ApiHelper.get("CreateOrder"), {
            carGroupId,
          });
          if (orderRes?.orderId) {
            localStorage.setItem("OrderId", orderRes.orderId);
          }
        } catch (orderErr) {
          console.error("Error creating order:", orderErr);
        }
        router.push("/car-inspection/inspection-method");
        return;
      }

      let groups: any[] = [];
      for (const candidate of searchTermsFromCarName(carName, term)) {
        const searchRes: any = await instance.get(
          `${ApiHelper.get("GetAllData")}?terms=${encodeURIComponent(candidate)}`,
        );
        groups = (searchRes?.Results || []).filter(
          (item: any) => item.IsCarBrand === 0,
        );
        if (groups.length) break;
      }

      const group = pickCarGroup(groups, carName, term);

      if (!group?.Id) {
        router.push("/car-inspection");
        return;
      }

      localStorage.setItem("CarGroupId", String(group.Id));
      localStorage.setItem("CarGroupName", String(group.Name));

      try {
        const orderRes: any = await instance.post(ApiHelper.get("CreateOrder"), {
          carGroupId: group.Id,
        });
        if (orderRes?.orderId) {
          localStorage.setItem("OrderId", orderRes.orderId);
        }
      } catch (orderErr) {
        console.error("Error creating order:", orderErr);
      }

      router.push("/car-inspection/inspection-method");
    } catch (err) {
      console.error("Error starting inspection:", err);
      router.push("/car-inspection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={startInspection}
      disabled={loading}
      className={`bg-[#416CEA] text-white w-full h-12 rounded-3xl disabled:opacity-60 text-base font-medium ${className}`}
    >
      {loading ? (
        "در حال آماده‌سازی..."
      ) : (
        <>
          {label || `شروع کارشناسی ${carName}`}
          {showChevron ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M7.5 2.5 4 6l3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </>
      )}
    </Button>
  );
}
