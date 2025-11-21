"use client";
import { useEffect, useRef, useState } from "react";
import Banner from "../../components/mobile/Home/Banner";
import CallAction from "../../components/mobile/Home/CallAction";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { Input } from "@/components/ui/input";
import { SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Tick01Icon } from "hugeicons-react";
import OpenSheet from "../CarGroupSheet";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import FiveStepSolidGauge from "../GuageChart";
import SimpleGauge from "../GuageChart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header } from "@/app/components/mobile/Home/Header";
import OurCustomer from "./slider/page";
import Statistics from "@/app/components/mobile/Home/Statistics";

export default function CarInspectionFlow() {
    const [data,setData] = useState<any>([]);
     const ref = useRef(null);
     const [openModal,setOpenModal] = useState<boolean>(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end -200%"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-100%", "650%"]);
  
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
    
  },[inputValue])
  const moveToInspectionMethod = () => {
  
    instance.post(ApiHelper.get("CreateOrder"),{
        carGroupId:inputValue.value
    }).then((res:any) => {
        if(res?.orderId) {
            localStorage.setItem("OrderId",res?.orderId);
           router.push(`./inspection-method`);
        }
    })
  }

 
  
    return (
   

        <div className="bg-white font-IranSans">
                  <Banner data={data?.MasterSiteData?.NavbarPhoneNumber}/>
                 <div className="hidden lg:block px-20 mb-6 bg-transparent sticky  top-11 z-10">
     <Header data={data?.MasterSiteData?.PhoneNumbers} />
     </div>
       
            <div className="px-4 w-full lg:w-2/5 lg:mx-24 lg:py-10">
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
                     <Dialog open={openModal}>

                        <Label onClick={() => setOpenModal(true)} className="my-2">نام خودرو</Label>
                                    <Input  onClick={() => setOpenModal(true)}   value={inputValue.name}        readOnly       placeholder="نام خودرو را انتخاب کنید" className="items-center !py-4 border w-full border-[#DFDFDF] rounded-full text-[#55565A]  text-xs h-11"/>

   

                                    <Button onClick={moveToInspectionMethod} className="bg-[#416CEA] text-white w-full h-11 rounded-3xl mt-4">رزرو کارشناسی</Button>
 <OpenSheet openModal={openModal} setOpenModal={setOpenModal} inputValue={inputValue} setInputValue={setInputValue}/>
</Dialog>

                

                </div>

            </div>
                <div className="w-full    bg-[#416CEA] relative mt-28 lg:mt-0   py-8 lg:py-28">
                        <div className="absolute left-1/2 lg:left-0 -top-2 lg:-top-2/3 -translate-y-1/2 -translate-x-1/2 lg:translate-0 -rotate-y-180">
                        <div className="w-[353px] lg:w-[739px] relative aspect-[2.09]">
           <Image alt="flow-car" src="/flow-car.png" fill className="object-cover"/>
                        </div>
                 

                        </div>
                        <div className="mt-24 lg:mt-14 px-4 lg:px-24 text-white w-full lg:w-1/2">
                             <h3 className="text-lg font-medium">سرویس‌های کارشناسی کارچک</h3>
                        <p className="text-base leading-8">
                            ما تمامی خدمات کارشناسی خودرو را هم در محل مورد نظر شما و هم درب مغازه به‌صورت کامل انجام می‌دهیم. موارد شامل:
                        </p> 
                           </div>
                        <div className="grid grid-cols-3 gap-3 w-full lg:w-1/2  px-4 lg:px-24 text-white">
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
                                <span>تست رانندگی</span>

                            </p> 
                            <p className="flex col-span-3">
                                <Tick01Icon size={24}/>
                                <span>تنظیم رایگان قولنامه رسمی و عقد قرارداد</span>

                            </p> 
                        </div>
                     
                        
                       


                    </div>
         

                    <div className="px-4 py-16 flex flex-wrap justify-center font-medium " ref={ref}>
                        <h3 className="font-bold w-full text-center">انتخاب محل کارشناسی خودرو با شما</h3>
                        <div className="px-3 w-full lg:w-1/3  mx-4 border border-[#DCDCDC] shadow-[8px_4px_24px_0px_#EAEAEA40] py-4 mt-4 rounded-3xl">
                            <h2 className="text-sm text-[#101117] font-light">اعزام کارشناس به محل انتخابی شما</h2>
                            <h3 className="text-base text-[#55565A] my-1 font-light">شهر تهران</h3>
                            <h4 className="text-[#55565A] text-sm font-light">در این سرویس کارشناس برای انجام کارشناسی به محلی که شما تعیین کرده‌اید مراجعه می‌کند.</h4>

                        </div>
                        <div className="px-3 w-full lg:w-1/3  mx-4 border border-[#DCDCDC] shadow-[8px_4px_24px_0px_#EAEAEA40] py-4 mt-4 rounded-3xl">
                            <h2 className="text-sm text-[#101117] font-light">اعزام کارشناس به محل انتخابی شما</h2>
                            <h3 className="text-base text-[#55565A] my-1 font-light">شهر تهران</h3>
                            <h4 className="text-[#55565A] text-sm font-light">در این سرویس کارشناس برای انجام کارشناسی به محلی که شما تعیین کرده‌اید مراجعه می‌کند.</h4>

                        </div>
                    </div>
                    <div className="bg-[#F0F2F4] py-16 lg:pt-12 flex flex-wrap justify-center relative px-4 lg:px-96">
                        <h2 className="font-bold bg-[#F0F2F4] py-4 z-40">فرآیند انجام کارشناسی</h2>
                        <div className="w-full my-4">
                            <div className="flex flex-col w-2/5 pl-5">
                                <span className="text-sm text-[#101117] lg:text-2xl">ثبت درخواست</span>
                                <span className="text-xs text-[#55565A] lg:text-base">  ثبت درخواست کارشناسی خودرو از طریق وب‌سایت، اپلیکیشن و تماس تلفنی</span>

                            </div>

                        </div>
                        <div className="w-full flex justify-end my-4 ">
                            <div className="flex flex-col w-2/5 pr-5">
                                <span className="text-sm text-[#101117] lg:text-2xl">ثبت درخواست</span>
                                        <span className="text-xs text-[#55565A] lg:text-base">
                                                             ثبت درخواست کارشناسی خودرو از طریق وب‌سایت، اپلیکیشن و تماس تلفنی

                                        </span>
               
                            </div>

                        </div>
                        <div className="w-full my-4">
                            <div className="flex flex-col w-2/5 pl-5">
                                <span className="text-sm text-[#101117] lg:text-2xl">ثبت درخواست</span>
                                        <span className="text-xs text-[#55565A] lg:text-base">
                                                                    ثبت درخواست کارشناسی خودرو از طریق وب‌سایت، اپلیکیشن و تماس تلفنی
                                        </span>
        

                            </div>

                        </div>
                        <div className="w-full flex justify-end my-4">
                            <div className="flex flex-col w-2/5 pr-5">
                                <span className="text-sm text-[#101117]">ثبت درخواست</span>
                                        <span className="text-xs text-[#55565A]">          ثبت درخواست کارشناسی خودرو از طریق وب‌سایت، اپلیکیشن و تماس تلفنی</span>
                      

                            </div>

                        </div>
                        <div className="absolute w-16  top-24 h-[calc(100%-96px)] bg-way bg-cover" >
                            <motion.img src="/car-way.png" alt="car-way" width={45} height={117}  style={{ y }}  className={`absolute -top-16 left-1/2 -translate-x-1/2`} />

                        </div>
                         

                             

        </div>
          <div className="h-[800px] ">
            <OurCustomer/>
          </div>
          <Statistics data={data?.StatisticsData}/>
                  
        </div>
    )
}