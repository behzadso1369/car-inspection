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

export default function CarInspectionFlow() {
    const [data,setData] = useState<any>([]);
        const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    instance.get(ApiHelper.get("GetMasterPageData"))
      .then((res: any) => {
        setData(res);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
  }, []);

 
  
    return (
   

        <div className="bg-white font-IranSans">
                  <Banner data={data?.MasterSiteData?.NavbarPhoneNumber}/>
                  <CallAction data={data?.MasterSiteData?.PhoneNumbers}/>
            <div className="px-4">
                <div className="bg-white shadow-[8px_4px_24px_0px_#EAEAEA40] border border-[#DCDCDC] px-4 py-6 rounded-3xl my-6">
                    <h1 className="text-black text-lg my-2 font-medium">کارشناسی خودرو</h1>
                    <h2 className="text-[#55565A] font-light text-base">جهت شروع فرآیند کارشناسی اطلاعات زیر را وارد کنید.</h2>
                    <div className="flex">
                        <div>chart</div>
                        <div>
       <h3 className="text-base text-black my-2 font-medium">مرحله اول :مشخصات اولیه خودرو</h3>
       <h4 className="text-[#55565A] font-light text-sm"> بعدی: انتخاب روش کارشناسی</h4>
       
        {/* <SheetTrigger asChild> */}

      {/* </SheetTrigger> */}

                        </div>
                 
                    </div>
                    <Label className="my-2">نام خودرو</Label>
                                    <Input                 onClick={() => setIsOpen(true)} placeholder="نام خودرو را انتخاب کنید" className="items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs"/>
                

                </div>

            </div>
                <div className="w-full h-96 bg-[#416CEA] relative mt-[200px] flex flex-wrap justify-center">
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
                             <OpenSheet isOpen={isOpen} setIsOpen={setIsOpen}  />

        </div>
    )
}