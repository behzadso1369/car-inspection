"use client"
import { Call02Icon, Edit01Icon } from "hugeicons-react";
import { ArrowLeft, ArrowRight, Edit3Icon } from "lucide-react";
import Image from "next/image";
import Requests from "./components/Requests";
import Link from "next/link";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useRouter } from "next/navigation";

export default function Profile() {
    const [orders,setOrders] = useState<any>([]);
    const router = useRouter();
  useEffect(() => {
    instance.get(ApiHelper.get("GetOrders"))
      .then((res: any) => {
        setOrders(res);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  const logOut = () => {
    instance.post(ApiHelper.get("Logout"))
      .then((res: any) => {
        localStorage.clear();
        router.push("/");
       
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
  }
 
    return (


        <div className="font-IranSans pb-16">
            
        <div className="flex justify-between px-8 items-center py-3 ">
            <div className="flex flex-col">
                <span>محیا محمودی</span>
                <span>09364845873</span>
            </div>
            <Edit3Icon/>
        </div>
        <div className="grid grid-cols-3 gap-4">
 <Requests data={orders}/>
        <div className="col-span-3 lg:col-span-1 lg:order-0 lg:border lg:border-[#D9D9D9]">           
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
        <div className="text-[#101117] flex" onClick={logOut}>
            <Image alt="کارشناسی خودرو" src="/car-inspection.svg" width={24} height={24}/>
            <span className="mx-1 text-base" >خروج</span>
            </div>
        <ArrowLeft/>

        </h6>
        </div>
        </div>
       

                       
        </div>
     
   

    )
}