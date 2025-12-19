"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import InspectionDateTypeCar from "./inspectionDateTypeCar";
import { RadioGroup } from "@/components/ui/radio-group";
import InspectionTimeCard from "./inspectionTimeCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ClientWrapper() {
  const [selected, setSelected] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [carInspectionDateType, setCarInspectionDateType] = useState<any>([]);
  const [carInspectionDateTime, setCarInspectionDateTime] = useState<any>([]);
  const router = useRouter();
  const [defaultTab, setDefaultTab] = useState<string>("");

  useEffect(() => {
    router.prefetch('./final-confirm');
  }, [router]);

  const moveToFinalConfirm = () => {
    const params: any = {
      "isBack": false,
      "orderId": Number(localStorage.getItem("OrderId")),
      "carInspectionDateTypeId": Number(selected)
    };

    if (!carInspectionDateType?.filter((item: any) => item.Id == selected)?.[0]?.MaxMinutes) {
      params["scheduledDate"] = carInspectionDateTime?.filter((item: any) => item.Id == defaultTab)?.[0]?.Hours.filter((item: any) => item.Id == selectedTime)[0].Time;
      params["scheduledTime"] = carInspectionDateTime?.filter((item: any) => item.Id == defaultTab)?.[0]?.Hours.filter((item: any) => item.Id == selectedTime)[0].Display;
    }

    instance.post(ApiHelper.get("MovePrivateOrder"), params)
      .then((res: any) => {
        if (res) {
             if(res?.isEndFlow) {
        
           router.push(res?.paymentUrl);
      }else {
     router.push("./final-confirm");
      }
     
        }
      }).catch((err: any) => {
        console.log(err);
      });
  };

  const GetCarInspectionDateTime = () => {
    instance.get(ApiHelper.get("GetCarInspectionDateAndTime"))
      .then((res: any) => {
        setCarInspectionDateTime(res);
        if (res?.length > 0) {
          const firstEnabled = res?.[0]?.Hours.filter((item: any) => item.IsDisabled == false);
          setSelectedTime(String(firstEnabled[0].Id));
          setDefaultTab(res[0].Id);
        }
      }).catch((err: any) => {
        console.log(err);
      });
  };

  const GetCarInspectionDateType = () => {
    instance.get(ApiHelper.get("GetCarInspectionDateType"))
      .then((res: any) => {
        setCarInspectionDateType(res?.CarInspectionDateTypes);
        if (res?.CarInspectionDateTypes?.length > 0) {
          setSelected(String(res?.CarInspectionDateTypes?.[0]?.Id));
        }
      }).catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetCarInspectionDateType();
  }, []);

  // بررسی اینکه آیا نوع انتخاب شده کارشناسی فوری است (دارای MaxMinutes)
  const selectedType = carInspectionDateType?.find((item: any) => String(item.Id) === String(selected));
  // اگر MaxMinutes در object وجود داشته باشد و مقدار truthy داشته باشد، یعنی کارشناسی فوری است
  // بررسی می‌کنیم که MaxMinutes وجود داشته باشد و نه null، undefined، یا empty string باشد
  const hasMaxMinutes = selectedType && 
    selectedType.hasOwnProperty('MaxMinutes') && 
    selectedType.MaxMinutes !== null && 
    selectedType.MaxMinutes !== undefined && 
    selectedType.MaxMinutes !== "" &&
    (typeof selectedType.MaxMinutes === 'number' ? selectedType.MaxMinutes >= 0 : true);
  const shouldShowTimeTabs = selected && !hasMaxMinutes;

  // فراخوانی GetCarInspectionDateTime فقط زمانی که نوع انتخاب شده کارشناسی عادی باشد
  useEffect(() => {
    if (selected && !hasMaxMinutes && carInspectionDateTime.length === 0) {
      GetCarInspectionDateTime();
    }
  }, [selected, hasMaxMinutes]);
  
  // برای دیباگ - می‌توانید این خط را بعداً حذف کنید
  if (selected && selectedType) {
    console.log('Selected Type:', selectedType);
    console.log('MaxMinutes:', selectedType.MaxMinutes);
    console.log('hasMaxMinutes:', hasMaxMinutes);
    console.log('shouldShowTimeTabs:', shouldShowTimeTabs);
  }

  return (
    <div className="bg-white font-IranSans lg:relative">
      <div className="px-4">
        <div className="bg-white px-4 py-6 rounded-3xl my-6">
          <div className="flex">
             <div className="aspect-[2] relative w-16 h-8 ml-4">
                          <Image src="/step5.png" alt="step5.png" fill className="object-fill" />
                        </div>
            <div>
              <h3 className="text-base text-black my-2 font-medium">مرحله پنجم: زمان کارشناسی</h3>
              <h4 className="text-[#55565A] font-light text-sm"> بعدی: تایید نهایی</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <RadioGroup value={selected} onValueChange={setSelected}>
          {carInspectionDateType.map((item: any) => (
            <InspectionDateTypeCar
              key={item.Id}
              selected={selected}
              onSelect={setSelected}
              inspectionType={String(item.Id)}
              data={item}
            />
          ))}
        </RadioGroup>
      </div>

      {shouldShowTimeTabs && (
        <Tabs value={defaultTab} onValueChange={setDefaultTab} className="w-full mt-4 bg-white py-6 font-IranSans" dir="rtl">
          <TabsList className="w-full">
            {carInspectionDateTime.map((item: any) => (
              <TabsTrigger key={item.Id} className="flex flex-col text-[#55565A] data-[state=active]:text-[#416CEA] data-[state=active]:!border-b pb-6 data-[state=active]:border-b-[#416CEA] px-2 mx-1" value={item.Id}>
                {item.Title.split(" ").map((word: string, idx: number) => (<span key={idx}>{word}</span>))}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={defaultTab} className="grid grid-cols-2 px-2 gap-2 pb-20">
            {carInspectionDateTime?.filter((item: any) => item.Id == defaultTab)?.[0]?.Hours.map((item: any) => (
              <div key={item.Id} className="px-2">
                <RadioGroup value={selectedTime} onValueChange={setSelectedTime}>
                  <InspectionTimeCard
                    selected={selectedTime}
                    onSelect={setSelectedTime}
                    inspectionType={String(item.Id)}
                    data={item}
                  />
                </RadioGroup>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      )}

      <div className="px-4 w-full lg:my-4 lg:sticky lg:bg-white lg:mt-8 fixed flex justify-center bottom-0 bg-white shadow-[0px_4px_32px_0px_#CBD5E0] py-5">
        <Button onClick={moveToFinalConfirm} type="submit" className="bg-[#416CEA] text-white rounded-3xl py-6 px-12 w-full">
          تایید و ادامه
        </Button>
      </div>
    </div>
  );
}

