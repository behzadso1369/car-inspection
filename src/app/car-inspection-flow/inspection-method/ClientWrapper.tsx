"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import { DiscountPriceDisplay } from "../components/DiscountPriceDisplay";
import { getInspectionPrices, persistInspectionPrices } from "../lib/pricing";
import InspectionMethodCard from "./inspection-method-card";

interface ClientWrapperProps {
  initialData: any;
}

export default function ClientWrapper({ initialData }: ClientWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [carInspectionType, setCarInspectionType] = useState<any[]>(initialData?.CarInspectionPage || []);
  const [selected, setSelected] = useState("");
  const allFeatures = useMemo(() => {
    const features = carInspectionType.flatMap((item: any) =>
      Array.isArray(item.Features) ? item.Features : [],
    );

    return Array.from(
      new Map(
        features.map((feature: any) => [
          feature.Id != null ? `id:${feature.Id}` : `name:${feature.Name}`,
          feature,
        ]),
      ).values(),
    );
  }, [carInspectionType]);

  // Fetch data from API using instance
  const GetCarInspectionData = () => {
    const carGroupId = typeof window !== 'undefined' ? localStorage.getItem("CarGroupId") : null;
    if (!carGroupId) return;
    
    instance.get(ApiHelper.get("GetCarInspectionData") + "?CarGroupId=" + carGroupId)
      .then((res: any) => {
        setCarInspectionType(res?.CarInspectionPage || []);
        if (res?.CarInspectionPage?.length > 0) {
          setSelected(String(res.CarInspectionPage[0].Id));
        }
      })
      .catch((err: any) => {
        console.error("Error fetching car inspection data:", err);
      });
  };

  useEffect(() => {
    // اگر initialData خالی بود، از API fetch کن
    if (!initialData?.CarInspectionPage || initialData.CarInspectionPage.length === 0) {
      GetCarInspectionData();
    } else {
      setCarInspectionType(initialData.CarInspectionPage);
      setSelected(String(initialData.CarInspectionPage[0].Id));
    }
  }, [initialData]);

  useEffect(() => {
    router.prefetch('./inspection-location');
    router.prefetch('./insert-information');
  }, [router]);

  useEffect(() => {
    const selectedItem = carInspectionType.find((item: any) => String(item.Id) === selected);
    if (!selectedItem) return;
    const { fullPrice, discountedPrice } = getInspectionPrices(selectedItem);
    persistInspectionPrices(fullPrice, discountedPrice, selectedItem.InspectionTypeName ?? "");
  }, [selected, carInspectionType]);
  const moveToInspectionLocation = () => {
    setLoading(true);
    instance.post(ApiHelper.get("MoveOrder"), {
      "isBack": false,
      "orderId": localStorage.getItem("OrderId"),
      "carInspectionTypeId": carInspectionType.filter((item: any) => item.Id == selected)[0].InspectionTypeId,
      "carInspectionId": carInspectionType.filter((item: any) => item.Id == selected)[0].Id,
    }).then((res: any) => {
      if (res) {
        setLoading(false);
        router.push("./inspection-location");
      }
    }).catch((err: any) => {
      setLoading(false);
      console.log(err);
    });
  }

  const moveToInsertInformation = () => {
    setLoading(true);
    instance.post(ApiHelper.get("MoveOrder"), {
      "isBack": false,
      "orderId": localStorage.getItem("OrderId"),
      "carInspectionTypeId": carInspectionType.filter((item: any) => item.Id == selected)[0].InspectionTypeId,
      "carInspectionId": carInspectionType.filter((item: any) => item.Id == selected)[0].Id,
    }).then((res: any) => {
      setLoading(false);
      const selectedItem = carInspectionType.filter((item: any) => item.Id == selected)[0];
      const { fullPrice, discountedPrice } = getInspectionPrices(selectedItem);
      persistInspectionPrices(fullPrice, discountedPrice, selectedItem?.InspectionTypeName ?? "");
      if (!localStorage.getItem("userId")) {
        router.push("./insert-information");
        
      } else {
        moveToInspectionLocation();
      }
    }).catch((err: any) => {
      setLoading(false);
      console.log(err);
    });
  };

  return (
    <div className="bg-white font-IranSans lg:px-4 lg:py-4 ">
      <div className="px-4">
        <div className="bg-white px-4 py-6 rounded-3xl my-6">
          <div className="flex">
            <div className="aspect-[2] relative w-16 h-8 ml-4">
              <Image src="/step2.png" alt="step2.png" fill className="object-fill" />
            </div>
            <div>
              <h3 className="text-base text-black my-2 font-medium">مرحله دوم: روش کارشناسی</h3>
              <h4 className="text-[#55565A] font-light text-sm"> بعدی: وارد کردن اطلاعات</h4>
            </div>
          </div>
          <Label className="my-2">نام خودرو</Label>
          <Input readOnly value={typeof window !== 'undefined' ? localStorage?.getItem("CarGroupName") || '' : ''} onClick={() => setIsOpen(true)} placeholder="نام خودرو را انتخاب کنید" className="items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A] text-xs" />
        </div>
      </div>

      <div className="px-4 pb-[calc(7.5rem+env(safe-area-inset-bottom))] lg:pb-8">
        <RadioGroup value={selected} onValueChange={setSelected}>
          {carInspectionType?.map((item: any, index: number) => (
            <InspectionMethodCard
              key={item.Id}
              selected={selected}
              onSelect={setSelected}
              inspectionType={String(item.Id)}
              data={item}
              isFirst={index === 0}
              allFeatures={allFeatures}
            />
          ))}
        </RadioGroup>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 flex w-full justify-between bg-white px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0px_4px_32px_0px_#CBD5E0] lg:static lg:my-4 lg:mt-8 lg:pb-5">
        <Button disabled={loading} className="bg-[#416CEA] text-white rounded-3xl py-6 px-12" onClick={moveToInsertInformation}>
          {
            loading ? "لطفا منتظر بمانید..." : "تایید و ادامه"
          }
        </Button>
        <DiscountPriceDisplay
          {...getInspectionPrices(
            carInspectionType.filter((item: any) => item.Id == selected)[0] ?? {
              OurPrice: 0,
            }
          )}
          label={
            carInspectionType.filter((item: any) => item.Id == selected)[0]
              ?.InspectionTypeName
          }
        />
      </div>
    </div>
  );
}

