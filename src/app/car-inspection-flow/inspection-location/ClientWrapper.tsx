"use client";

import { useEffect, useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import InWorkShop from "./InWorkShop";
import InLocation from "./InLocation";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useRouter } from "next/navigation";
import { Car02Icon } from "hugeicons-react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  name?: string;
  userPhoneNumber?: string;
}

export default function ClientWrapper() {
  const [locations, setLocations] = useState<any>([]);
  const [defaultTab, setDefaultTab] = useState<string>("");
  const router = useRouter();
   const token:any = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  useEffect(() => {
    router.prefetch('./inspection-time');
  }, [router]);

  const moveToCarInspectionTime = () => {
    const params: any = {
      "isBack": false,
      "orderId": Number(localStorage.getItem("OrderId")),
      "carInspectionLocationTypeId": defaultTab
    };

    instance.post(ApiHelper.get("MovePrivateOrder"), params)
      .then((res: any) => {
        if (res) {
          router.push("./inspection-time");
        }
      }).catch((err: any) => {
        console.log(err);
      });
  };

  const getCarInspectionLocationData = () => {
    instance.get(ApiHelper.get("GetCarInspectionLocationData")).then((res: any) => {
      setDefaultTab(res?.CarInspectionLocationPage[0].Id);
      setLocations(res?.CarInspectionLocationPage);
    });
  };

  useEffect(() => {
    getCarInspectionLocationData();
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
              <h4 className="text-[#55565A] font-light text-sm"> بعدی: انتخاب زمان کارشناسی</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="flex px-4">
        <Image src="/sample-car.png" width={74} height={74} alt="کارشناسی خودرو" />
        <div className="flex flex-col text-base text-[#101117] mx-4">
          <span>خودرو سواری {typeof window !== 'undefined' && localStorage.getItem("CarGroupName")}</span>
          <span>مالک :  {token ? (jwtDecode<CustomJwtPayload>(token)?.name || "") : ""}</span>
        </div>
      </div>

      <div className="overflow-x-hidden">
        {/* <h1>رزرو کارشناسی</h1> */}
        <Tabs value={defaultTab} onValueChange={setDefaultTab} className="w-full bg-white py-6 font-IranSans px-2 lg:px-4" dir="rtl">
          <TabsList className="px-2 w-full overflow-x-auto scrollbar-hide flex-nowrap">
            {locations.map((item: any) => (
              <TabsTrigger key={item.Id} className="text-[#404040] !px-0 !mx-0 data-[state=active]:!border-b data-[state=active]:border-b-[#416CEA]  whitespace-nowrap flex-shrink-0" value={item.Id}>
                {item.Name}
              </TabsTrigger>
            ))}
            <TabsTrigger disabled className="text-[#2C2C2C] data-[state=active]:!border-b data-[state=active]:border-b-[#416CEA] mx-1 flex items-center gap-1.5 relative disabled:text-black disabled:opacity-100 whitespace-nowrap flex-shrink-0" value="0">
              <span>در محل شما</span>
              <span className="relative rounded-xl bg-gradient-to-r from-[#D63031] via-[#E74C3C] to-[#C0392B] text-white text-xs font-bold px-2.5 py-1  whitespace-nowrap flex items-center gap-1 shadow-lg shadow-[#E74C3C]/40 animate-pulse">
                {/* <Car02Icon size={16} className="w-3 h-3 animate-bounce" style={{ animationDuration: '1.5s' }} /> */}
                به زودی
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></span>
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="0">
            <InLocation />
          </TabsContent>
          {locations.map((item: any) => (
            <TabsContent key={item.Id} value={item.Id}>
              <InWorkShop LocationTypeDescription={item.LocationTypeDescription} />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="px-4 lg:my-4 w-full fixed lg:static lg:mt-8 flex justify-between bottom-0 bg-white shadow-[0px_4px_32px_0px_#CBD5E0] py-5">
        <Button onClick={moveToCarInspectionTime} type="submit" className="bg-[#416CEA] text-white rounded-3xl py-6 px-12">
          تایید محل کارشناسی
        </Button>
        <div className="flex flex-col">
          <span className="text-[#101117] font-medium text-sm">{localStorage.getItem("inspectionMethod")}</span>
          <div className="flex">
            <span className="text-[#55565A] text-m font-light">
              {typeof window !== 'undefined' && localStorage.getItem("inspectionPrice") 
                ? Number(localStorage.getItem("inspectionPrice")).toLocaleString('fa-IR')
                : '0'}
            </span>
            <span className="text-[#55565A] text-m font-light">تومان </span>
          </div>
        </div>
      </div>
    </div>
  );
}

