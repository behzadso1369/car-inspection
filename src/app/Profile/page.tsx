"use client"
import { Call02Icon, Edit01Icon } from "hugeicons-react";
import { ArrowLeft, ArrowRight, Edit3Icon } from "lucide-react";
import Image from "next/image";
import Requests from "./components/Requests";
import Link from "next/link";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";

export default function Profile() {
    const [data,setData] = useState<any>([]);
  useEffect(() => {
    instance.get(ApiHelper.get("GetOrders"))
      .then((res: any) => {
        setData(res);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
  }, []);
    const requests = [
        {Id:1,Title:"تکمیل شده",CarName:"سمند سورن",paymentStatus:"تکمیل سفارش",Description:"کارشناسی ماشین انجام شده است.",status: "compepelted"},
        {Id:1,Title:"تکمیل نشده",CarName:"پژو 206",paymentStatus:"منتظر پرداخت",Description:"پرداخت خود را تکمیل کنید.",status: "unknown"},
        {Id:1,Title:"لغو شده",CarName:"ماکسیما",paymentStatus:"لغو شده",Description:"درخواست لغو شده است",status: "cenceled"},
        {Id:1,Title:"تکمیل شده",CarName:"پژو 405",paymentStatus:"تکمیل سفارش",Description:"کارشناسی ماشین انجام شده است.",status: "compepelted"},
        {Id:1,Title:"تکمیل نشده",CarName:"پرشیا",paymentStatus:"منتظر پرداخت",Description:"پرداخت خود را تکمیل کنید.",status: "unknown"},
        {Id:1,Title:" لغو شده",CarName:"تیبا 2",paymentStatus:"لغو شده",Description:"درخواست لغو شده است",status: "cenceled"},
    ]
    return (


        <div className="font-IranSans">
            
        <div className="flex justify-between px-8 items-center py-3">
            <div className="flex flex-col">
                <span>محیا محمودی</span>
                <span>09364845873</span>
            </div>
            <Edit3Icon/>
        </div>
        <Requests data={requests}/>
        <div>           
        <h3 className="text-[#101117] font-normal my-6 px-4">تنظیمات حساب</h3>   
        <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
            <div className="text-[#101117] flex">
            <Image alt="کارشناسی خودرو" src="/car-inspection.svg" width={24} height={24}/>
            <Link href={"/Profile/requests"} className="mx-1 text-base" prefetch={false}>تمامی درخواست ها  </Link>
            </div>
     
        <ArrowLeft/>

        </h6>
        <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
        <div className="text-[#101117] flex">
            <Image alt="کارشناسی خودرو" src="/car-inspection.svg" width={24} height={24}/>
            <span className="mx-1 text-base">آدرس ها</span>
            </div>
        <ArrowLeft/>

        </h6>
        <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
        <div className="text-[#101117] flex">
            <Image alt="کارشناسی خودرو" src="/car-inspection.svg" width={24} height={24}/>
            <span className="mx-1 text-base">خروج</span>
            </div>
        <ArrowLeft/>

        </h6>
        </div>

                       
        </div>
     
   

    )
}