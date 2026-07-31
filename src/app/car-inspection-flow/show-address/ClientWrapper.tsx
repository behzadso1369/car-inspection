"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Location01Icon, Tick01Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import {
  ON_SITE_ADDRESS_KEY,
  type SavedOnSiteAddress,
} from "../inspection-location/InLocation";

export default function ShowAddressClient() {
  const router = useRouter();
  const [address, setAddress] = useState<SavedOnSiteAddress | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ON_SITE_ADDRESS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as SavedOnSiteAddress & { Id?: number };
      const addressId = parsed.AddressId ?? parsed.Id;
      if (addressId) setAddress({ ...parsed, AddressId: addressId });
    } catch {
      setAddress(null);
    }
  }, []);

  return (
    <div className="bg-white font-IranSans min-h-screen pb-24">
      <div className="px-4 py-6">
        <h1 className="text-lg font-semibold text-[#101117]">تایید آدرس محل کارشناسی</h1>
        <p className="text-sm text-[#55565A] mt-1">آدرس ثبت‌شده برای اعزام کارشناس</p>
      </div>

      {address ? (
        <div className="px-4">
          <div className="rounded-2xl border-2 border-[#416CEA]/40 bg-gradient-to-br from-[#EEF2FD] to-white p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#416CEA] px-2.5 py-0.5 text-xs text-white">
                <Tick01Icon size={14} />
                انتخاب شده
              </span>
              <Location01Icon size={18} color="#416CEA" />
            </div>
            <p className="font-medium text-[#101117]">{address.Title}</p>
            <p className="text-sm text-[#55565A] mt-2 leading-7">
              {address.City}، {address.Street}، پلاک {address.Plaque}
            </p>
          </div>
        </div>
      ) : (
        <p className="px-4 text-[#55565A]">آدرسی ثبت نشده. به مرحله قبل برگردید و آدرس را ثبت کنید.</p>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0px_4px_32px_0px_#CBD5E0] py-5 px-4 flex justify-between items-center">
        <Button
          onClick={() => router.push("../inspection-location")}
          variant="outline"
          className="rounded-3xl py-6 px-8"
        >
          ویرایش آدرس
        </Button>
        <Button
          onClick={() => router.push("../inspection-time")}
          disabled={!address}
          className="bg-[#416CEA] text-white rounded-3xl py-6 px-12"
        >
          تایید و ادامه
        </Button>
      </div>
    </div>
  );
}
