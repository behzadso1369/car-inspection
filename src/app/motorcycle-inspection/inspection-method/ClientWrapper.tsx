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
import {
  MOTORCYCLE_GROUP_ID_KEY,
  MOTORCYCLE_GROUP_NAME_KEY,
  MOTORCYCLE_INSPECTION_TYPE_ID_KEY,
} from "@/lib/motorcycle-inspection-storage";
import {
  buildMotorcycleMoveBody,
  packageFieldsFromItem,
} from "@/lib/motorcycle-order-move";
import { DiscountPriceDisplay } from "../components/DiscountPriceDisplay";
import { getInspectionPrices, persistInspectionPrices } from "../lib/pricing";
import InspectionMethodCard from "./inspection-method-card";

interface ClientWrapperProps {
  initialData: { MotorcycleInspectionPage?: unknown[] };
}

export default function ClientWrapper({ initialData }: ClientWrapperProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [inspectionPackages, setInspectionPackages] = useState<any[]>(
    (initialData?.MotorcycleInspectionPage as any[]) || []
  );
  const [selected, setSelected] = useState("");
  const [groupName, setGroupName] = useState("");

  const allFeatures = useMemo(() => {
    const features = inspectionPackages.flatMap((item: any) =>
      Array.isArray(item.Features) ? item.Features : []
    );

    return Array.from(
      new Map(
        features.map((feature: any) => [
          feature.Id != null ? `id:${feature.Id}` : `name:${feature.Name}`,
          feature,
        ])
      ).values()
    );
  }, [inspectionPackages]);

  const fetchMotorcycleInspectionData = () => {
    const motorcycleGroupId =
      typeof window !== "undefined"
        ? localStorage.getItem(MOTORCYCLE_GROUP_ID_KEY)
        : null;
    if (!motorcycleGroupId) return;

    instance
      .get(
        `${ApiHelper.get("GetMotorcycleInspectionData")}?MotorcycleGroupId=${motorcycleGroupId}`
      )
      .then((res: any) => {
        const page = res?.MotorcycleInspectionPage ?? [];
        setInspectionPackages(page);
        if (page.length > 0) {
          setSelected(String(page[0].Id));
        }
      })
      .catch((err: unknown) => {
        console.error("Error fetching motorcycle inspection data:", err);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGroupName(localStorage.getItem(MOTORCYCLE_GROUP_NAME_KEY) || "");
    }
    if (
      !initialData?.MotorcycleInspectionPage ||
      initialData.MotorcycleInspectionPage.length === 0
    ) {
      fetchMotorcycleInspectionData();
    } else {
      const page = initialData.MotorcycleInspectionPage as any[];
      setInspectionPackages(page);
      setSelected(String(page[0]?.Id));
    }
  }, [initialData]);

  useEffect(() => {
    router.prefetch("./inspection-location");
    router.prefetch("./insert-information");
  }, [router]);

  useEffect(() => {
    const selectedItem = inspectionPackages.find(
      (item: any) => String(item.Id) === selected
    );
    if (!selectedItem) return;
    const { fullPrice, discountedPrice } = getInspectionPrices(selectedItem);
    persistInspectionPrices(
      fullPrice,
      discountedPrice,
      selectedItem.InspectionTypeName ?? ""
    );
    if (selectedItem.InspectionTypeId) {
      localStorage.setItem(
        MOTORCYCLE_INSPECTION_TYPE_ID_KEY,
        String(selectedItem.InspectionTypeId)
      );
    }
  }, [selected, inspectionPackages]);

  const ensureOrderAndMovePackage = async (selectedItem: {
    Id: number;
    InspectionTypeId: number;
  }) => {
    const motorcycleGroupId = Number(
      localStorage.getItem(MOTORCYCLE_GROUP_ID_KEY)
    );
    if (!motorcycleGroupId) {
      throw new Error("MotorcycleGroupId missing");
    }

    let orderId = Number(localStorage.getItem("OrderId") || 0);
    if (!orderId) {
      const createRes = (await instance.post(
        ApiHelper.get("CreateMotorcycleOrder"),
        { motorcycleGroupId }
      )) as { orderId?: number };
      if (!createRes?.orderId) {
        throw new Error("Create motorcycle order failed");
      }
      orderId = createRes.orderId;
      localStorage.setItem("OrderId", String(orderId));
    }

    return instance.post(
      ApiHelper.get("MoveMotorcycleOrder"),
      buildMotorcycleMoveBody(packageFieldsFromItem(selectedItem))
    );
  };

  const moveToInsertInformation = () => {
    const selectedItem = inspectionPackages.find(
      (item: any) => String(item.Id) === selected
    );
    if (!selectedItem) return;

    setLoading(true);
    ensureOrderAndMovePackage(selectedItem)
      .then((res: any) => {
        setLoading(false);
        localStorage.setItem(
          MOTORCYCLE_INSPECTION_TYPE_ID_KEY,
          String(selectedItem.InspectionTypeId)
        );
        const { fullPrice, discountedPrice } = getInspectionPrices(selectedItem);
        persistInspectionPrices(
          fullPrice,
          discountedPrice,
          selectedItem?.InspectionTypeName ?? ""
        );
        if (res?.finalPrice != null) {
          persistInspectionPrices(
            fullPrice,
            Number(res.finalPrice),
            selectedItem?.InspectionTypeName ?? ""
          );
        }
        if (!localStorage.getItem("userId")) {
          router.push("./insert-information");
        } else {
          router.push("./inspection-location");
        }
      })
      .catch((err: unknown) => {
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
              <Image
                src="/step2.png"
                alt="step2.png"
                fill
                sizes="64px"
                quality={70}
                className="object-fill"
              />
            </div>
            <div>
              <h3 className="text-base text-black my-2 font-medium">
                مرحله دوم: روش کارشناسی
              </h3>
              <h4 className="text-[#55565A] font-light text-sm">
                {" "}
                بعدی: وارد کردن اطلاعات
              </h4>
            </div>
          </div>
          <Label className="my-2">نام موتور</Label>
          <Input
            readOnly
            value={groupName}
            placeholder="مدل موتور را انتخاب کنید"
            className="items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A] text-base"
          />
        </div>
      </div>

      <div className="px-4 pb-[calc(7.5rem+env(safe-area-inset-bottom))] lg:pb-8">
        <RadioGroup value={selected} onValueChange={setSelected}>
          {inspectionPackages?.map((item: any, index: number) => (
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
        <Button
          disabled={loading || !selected}
          className="bg-[#416CEA] text-white rounded-3xl py-6 px-12"
          onClick={moveToInsertInformation}
        >
          {loading ? "لطفا منتظر بمانید..." : "تایید و ادامه"}
        </Button>
        <DiscountPriceDisplay
          {...getInspectionPrices(
            inspectionPackages.filter((item: any) => item.Id == selected)[0] ?? {
              OurPrice: 0,
            }
          )}
          label={
            inspectionPackages.filter((item: any) => item.Id == selected)[0]
              ?.InspectionTypeName
          }
        />
      </div>
    </div>
  );
}
