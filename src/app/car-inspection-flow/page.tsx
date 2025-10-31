"use client";
import { useEffect, useState } from "react";
import Banner from "../components/mobile/Home/Banner";
import CallAction from "../components/mobile/Home/CallAction";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { Input } from "@/components/ui/input";
import { SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Tick01Icon } from "hugeicons-react";
import OpenSheet from "./CarGroupSheet";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import FiveStepSolidGauge from "./GuageChart";
import SimpleGauge from "./GuageChart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CarInspectionFlow() {
    const [data,setData] = useState<any>([]);
     const router = useRouter();
      const [inputValue,setInputValue] = useState({
        name:"",
        value: 0
      });
            const GetMasterPageData = () => {
                instance.get(ApiHelper.get("GetMasterPageData"))
      .then((res: any) => {
        setData(res);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
            }
            
  useEffect(() => {
    GetMasterPageData();

    
  }, []);
  useEffect(() => {
    localStorage.setItem("CarGroupId",String(inputValue.value));
    localStorage.setItem("CarGroupName",String(inputValue.name));
    debugger
  },[inputValue])
  const moveToInspectionMethod = () => {
  
    instance.post(ApiHelper.get("CreateOrder"),{
        carGroupId:inputValue.value
    }).then((res:any) => {
        if(res?.orderId) {
            localStorage.setItem("OrderId",res?.orderId);
           router.push(`./car-inspection-flow/inspection-method`);
        }
    })
  }

 
  
    return (
   

        <div className="bg-white font-IranSans">
                  <Banner data={data?.MasterSiteData?.NavbarPhoneNumber}/>
                  <CallAction data={data?.MasterSiteData?.PhoneNumbers}/>
            <div className="px-4">
                <div className="bg-white shadow-[8px_4px_24px_0px_#EAEAEA40] border border-[#DCDCDC] px-4 py-6 rounded-3xl my-6">
                    <h1 className="text-black text-lg my-2 font-medium">کارشناسی خودرو</h1>
                    <h2 className="text-[#55565A] font-light text-base">جهت شروع فرآیند کارشناسی اطلاعات زیر را وارد کنید.</h2>
                    <div className="flex  items-center">
                        <div className="aspect-[2] relative w-16 h-8 ml-4">
                              <Image src="/step1.png" alt="step1.png" fill className="object-fill"/>
                        </div>
                        
                        <div>
       <h3 className="text-base text-black my-2 font-medium">مرحله اول :مشخصات اولیه خودرو</h3>
       <h4 className="text-[#55565A] font-light text-sm"> بعدی: انتخاب روش کارشناسی</h4>
       
        {/* <SheetTrigger asChild> */}

      {/* </SheetTrigger> */}

                        </div>
                 
                    </div>
                     <Dialog >
<DialogTrigger className="w-full">
                        <Label className="my-2">نام خودرو</Label>
                                    <Input   value={inputValue.name}        readOnly       placeholder="نام خودرو را انتخاب کنید" className="items-center !py-4 border w-full border-[#DFDFDF] rounded-full text-[#55565A]  text-xs h-11"/>

   
</DialogTrigger>
                                    <Button onClick={moveToInspectionMethod} className="bg-[#416CEA] text-white w-full h-11 rounded-3xl mt-4">رزرو کارشناسی</Button>
 <OpenSheet inputValue={inputValue} setInputValue={setInputValue}/>
</Dialog>

                

                </div>

            </div>
                <div className="w-full h-96 bg-[#416CEA] relative mt-28 flex flex-wrap justify-center">
                        <div className="absolute -top-2 -translate-y-1/2 -rotate-360">
                            <Image alt="flow-car" src="/flow-car.png" className="!w-full" width={300} height={167}/>

                        </div>
                        <div className="mt-24 px-4 text-white w-full">
                             <h3 className="text-lg font-medium">سرویس‌های کارشناسی کارچک</h3>
                        <p className="text-base leading-8">
                            ما تمامی خدمات کارشناسی خودرو را هم در محل مورد نظر شما و هم درب مغازه به‌صورت کامل انجام می‌دهیم. موارد شامل:
                        </p> 
                           </div>
                        <div className="grid grid-cols-3 gap-3 w-full px-4 text-white">
                            <p className="flex">
                                <Tick01Icon size={24}/>
                                <span>فنی و موتور</span>

                            </p>
                            <p className="flex">
                                <Tick01Icon size={24}/>
                                <span>قیمت‌گذاری</span>

                            </p>
                            <p className="flex">
                                <Tick01Icon size={24}/>
                                <span>رنگ بدنه</span>

                            </p>
                            <p className="flex">
                                <Tick01Icon size={24}/>
                                <span>تست دیباگ</span>

                            </p>
                            <p className="flex">
                                <Tick01Icon size={24}/>
                                <span>تست‌ آپشن</span>

                            </p>
                            <p className="flex">
                                <Tick01Icon size={24}/>
                                <span></span>

                            </p> 
                            <p className="flex">
                                <Tick01Icon size={24}/>
                                <span>تنظیم رایگان قولنامه رسمی و عقد قرارداد</span>

                            </p> 
                        </div>
                     
                        
                       


                    </div>
                    <div className="mt-16">
                        <h3>انتخاب محل کارشنا   سی خودرو با شما</h3>
                    </div>
                             

        </div>
    )
}