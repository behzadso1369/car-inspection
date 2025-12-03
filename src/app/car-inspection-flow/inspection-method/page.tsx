"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import OpenSheet from "../CarGroupSheet";
import InspectionMethodCard from "./inspection-method-card";
import { RadioGroup } from "@/components/ui/radio-group";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function InspectionMethod() {
     const [isOpen, setIsOpen] = useState(false);
          const router = useRouter();

       const [carInspectionType,setCarInspectionType] = useState<any[]>([])
              const [selected, setSelected] = useState("");
              
              

       const GetCarInspectionData = () => {
        instance.get(ApiHelper.get("GetCarInspectionData") + "?CarGroupId=" + localStorage.getItem("CarGroupId"))
        .then((res:any) => {
            setCarInspectionType(res?.CarInspectionPage);
              if (res?.CarInspectionPage?.length > 0) {
        setSelected(String(res.CarInspectionPage[0].Id));
      }
            
        }).catch((err:any) => {
          console.log(err)
        })
       }
       useEffect(()=>{
        GetCarInspectionData();
       },[])
       const moveToInsertInformation = () => {
         instance.post(ApiHelper.get("MoveOrder"), {
            "isBack": false,
              "orderId": localStorage.getItem("OrderId"),
                "carInspectionTypeId": carInspectionType.filter((item:any) => item.Id == selected)[0].InspectionTypeId,
                "carInspectionId":carInspectionType.filter((item:any) => item.Id == selected)[0].Id,

         })
        .then((res:any) => {
          if(!localStorage.getItem("userId")) {
            router.push("./insert-information")
          }else {
              router.push("./inspection-location")
          }
        
            
        }).catch((err:any) => {
          console.log(err)
        })
       }
    return (
          <div className="bg-white font-IranSans lg:px-4 lg:py-4 ">
              
            <div className="px-4">
                <div className="bg-white  px-4 py-6 rounded-3xl my-6">

                    <div className="flex">
                         <div className="aspect-[2] relative w-16 h-8 ml-4">
                                                      <Image src="/step2.png" alt="step2.png" fill className="object-fill"/>
                                                </div>
                        <div>
       <h3 className="text-base text-black my-2 font-medium">مرحله دوم :  روش کارشناسی</h3>
       <h4 className="text-[#55565A] font-light text-sm"> بعدی:   وارد کردن اطلاعات</h4>
       
        {/* <SheetTrigger asChild> */}

      {/* </SheetTrigger> */}

                        </div>
                 
                    </div>
                    <Label className="my-2">نام خودرو</Label>
                                    <Input  readOnly value={localStorage?.getItem("CarGroupName")!}               onClick={() => setIsOpen(true)} placeholder="نام خودرو را انتخاب کنید" className="items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs"/>
                

                </div>

            </div>
            <div className="px-4">
                 <RadioGroup  value={selected} onValueChange={setSelected}>
                  {
                    carInspectionType?.map((item:any,index:number) => (
                      
     <InspectionMethodCard
          selected={selected}
        onSelect={setSelected} inspectionType={String(item.Id)} data={item} />
                    ))
                  }
                 </RadioGroup>
           
            </div>
            

            <div className="px-4 lg:my-4 w-full fixed  lg:static lg:mt-8 flex justify-between  bottom-0 b-white   shadow-[0px_4px_32px_0px_#CBD5E0] py-5">
              <Button  className="bg-[#416CEA] text-white rounded-3xl py-6 px-12" onClick={moveToInsertInformation}>
                تایید و ادامه
              </Button>
                  <div className="flex flex-col">
                    <span className="text-[#101117] font-medium text-sm">{carInspectionType.filter((item:any) => item.Id == selected)[0]?.InspectionTypeName}</span>
                      <div className="flex">
                         <span className="text-[#55565A] text-m font-light">{carInspectionType.filter((item:any) => item.Id == selected)[0]?.OurPrice} </span>
                    <span className="text-[#55565A] text-m font-light">تومان </span>
                      </div>
                   
                </div>

            </div>
          </div>
    )
}