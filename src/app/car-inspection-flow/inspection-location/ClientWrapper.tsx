"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import InWorkShop from "./InWorkShop";
import InLocation from "./InLocation";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useRouter } from "next/navigation";
import { StoredInspectionPriceDisplay } from "../components/DiscountPriceDisplay";
import { toast } from "sonner";
import { readStoredAddressId } from "@/helper/create-user-address";

/** Id=1 در API: «اعزام کارشناس به محل انتخابی شما» — کارشناسی در محل */
const ON_SITE_LOCATION_TYPE_ID = 1;

interface LocationType {
  Id: number;
  Name: string;
  LocationTypeDescription?: string;
}

function isOnSiteTab(locationTypeId: string | number) {
  return Number(locationTypeId) === ON_SITE_LOCATION_TYPE_ID;
}

export default function ClientWrapper() {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [defaultTab, setDefaultTab] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const router = useRouter();

  const isOnSite = isOnSiteTab(defaultTab);

  useEffect(() => {
    router.prefetch("./inspection-time");
  }, [router]);

  const moveToCarInspectionTime = () => {
    if (isOnSite && !selectedAddressId) {
      toast("Error", { description: "لطفاً آدرس محل کارشناسی را انتخاب کنید" });
      return;
    }

    setLoading(true);
    const params: Record<string, unknown> = {
      isBack: false,
      orderId: Number(localStorage.getItem("OrderId")),
      carInspectionLocationTypeId: Number(defaultTab),
    };

    if (isOnSite && selectedAddressId) {
      params.addressId = selectedAddressId;
      params.AddressId = selectedAddressId;
    }

    instance
      .post(ApiHelper.get("MovePrivateOrder"), params)
      .then((res: unknown) => {
        setLoading(false);
        if (res) {
          if (isOnSite) {
            localStorage.setItem("IsOnSite", "true");
            localStorage.setItem("AddressId", String(selectedAddressId));
          } else {
            localStorage.removeItem("IsOnSite");
            localStorage.removeItem("AddressId");
          }
          router.push("./inspection-time");
        }
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    instance.get(ApiHelper.get("GetCarInspectionLocationData")).then((res: any) => {
      const list = res?.CarInspectionLocationPage ?? [];
      setLocations(list);
      if (list.length > 0) setDefaultTab(String(list[0].Id));
    });
  }, []);

  useEffect(() => {
    const id = readStoredAddressId();
    if (id) {
      setSelectedAddressId(id);
    } else {
      localStorage.removeItem("AddressId");
    }
  }, []);

  return (
    <div className="bg-white font-IranSans lg:px-4 lg:py-4 overflow-x-hidden max-w-full">
      <div className="px-4">
        <div className="bg-white px-4 py-6 rounded-3xl my-6">
          <div className="flex items-center">
            <div className="aspect-[2] relative w-16 h-8 ml-4">
              <Image src="/step4.png" alt="step4.png" fill className="object-fill" />
            </div>
            <div>
              <h3 className="text-base text-black my-2 font-medium">مرحله چهارم: محل کارشناسی</h3>
              <h4 className="text-[#55565A] font-light text-sm">بعدی: انتخاب زمان کارشناسی</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="flex px-4">
        <Image src="/sample-car.png" width={74} height={74} alt="کارشناسی خودرو" />
        <div className="flex flex-col text-base text-[#101117] mx-4">
          <span className="font-medium">
            خودرو سواری {typeof window !== "undefined" && localStorage.getItem("CarGroupName")}
          </span>
        </div>
      </div>

      <div className="overflow-x-hidden">
        <Tabs
          value={defaultTab}
          onValueChange={setDefaultTab}
          className="w-full bg-white py-6 font-IranSans px-2 lg:px-4"
          dir="rtl"
        >
          <TabsList className="px-2 w-full overflow-x-auto scrollbar-hide flex-nowrap">
            {locations.map((item) => (
              <TabsTrigger
                key={item.Id}
                className="text-[#404040] !px-0 !mx-0 data-[state=active]:!border-b data-[state=active]:border-b-[#416CEA] flex-shrink-0"
                value={String(item.Id)}
              >
                {item.Name}
              </TabsTrigger>
            ))}
          </TabsList>

          {locations.map((item) => (
            <TabsContent key={item.Id} value={String(item.Id)}>
              {isOnSiteTab(item.Id) ? (
                <InLocation
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={setSelectedAddressId}
                  locationTypeDescription={item.LocationTypeDescription}
                />
              ) : (
                <InWorkShop LocationTypeDescription={item.LocationTypeDescription} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="px-4 lg:my-4 w-full fixed lg:static lg:mt-8 flex justify-between bottom-0 bg-white shadow-[0px_4px_32px_0px_#CBD5E0] py-5">
        <Button
          disabled={loading || (isOnSite && !selectedAddressId)}
          onClick={moveToCarInspectionTime}
          type="submit"
          className="bg-[#416CEA] text-white rounded-3xl py-6 px-12"
        >
          {loading ? "لطفا منتظر بمانید..." : "تایید محل کارشناسی"}
        </Button>
        <StoredInspectionPriceDisplay />
      </div>
    </div>
  );
}
