"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";

interface InspectCtaButtonProps {
  /** نام نمایشی خودرو، مثل «پژو ۲۰۷» */
  carName: string;
  /**
   * عبارت جستجو برای پیدا کردن گروه خودرو در بک‌اند (مثل «پژو 207»).
   * اگر مقدار نداشته باشد، دکمه فقط به فرم کارشناسی لینک می‌دهد.
   */
  searchTerm?: string;
  className?: string;
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
  className = "",
}: InspectCtaButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const startInspection = async () => {
    // اگر عبارت جستجو نداریم، امن‌ترین رفتار: هدایت به فرم کارشناسی
    if (!searchTerm) {
      router.push("/car-inspection");
      return;
    }

    setLoading(true);
    try {
      // ۱) پیدا کردن گروه خودرو (اولین نتیجه‌ای که برند نیست)
      const searchRes: any = await instance.get(
        `${ApiHelper.get("GetAllData")}?terms=${encodeURIComponent(searchTerm)}`,
      );
      const group = (searchRes?.Results || []).find(
        (item: any) => item.IsCarBrand === 0,
      );

      if (!group?.Id) {
        // اگر گروه پیدا نشد، به فرم کارشناسی برو تا کاربر دستی انتخاب کند
        router.push("/car-inspection");
        return;
      }

      localStorage.setItem("CarGroupId", String(group.Id));
      localStorage.setItem("CarGroupName", String(group.Name));

      // ۲) ساخت سفارش
      const orderRes: any = await instance.post(ApiHelper.get("CreateOrder"), {
        carGroupId: group.Id,
      });

      if (orderRes?.orderId) {
        localStorage.setItem("OrderId", orderRes.orderId);
        router.push("/car-inspection/inspection-method");
      } else {
        router.push("/car-inspection");
      }
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
      {loading ? "در حال آماده‌سازی..." : `شروع کارشناسی ${carName}`}
    </Button>
  );
}
