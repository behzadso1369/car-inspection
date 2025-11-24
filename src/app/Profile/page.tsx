"use client"
import { ArrowLeft01Icon, Call02Icon, Edit01Icon, Edit02Icon, Location01Icon, Logout01Icon, Logout02Icon, Logout03Icon, LogoutSquare01Icon } from "hugeicons-react";
import { ArrowLeft, ArrowRight, Edit3Icon } from "lucide-react";
import Image from "next/image";
import Requests from "./components/Requests";
import Link from "next/link";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
    const [orders,setOrders] = useState<any>([]);
    const decoded:any = jwtDecode(localStorage.getItem("token") || "");
    const router = useRouter();
  useEffect(() => {
    console.log(decoded);
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
            
        <div className="flex justify-between lg:hidden px-8 items-center pt-6 pb-4 border-b border-[#DFDFDF]">
            <div className="flex flex-col">
                <span>{decoded?.name}</span>
                <span>{decoded?.userPhoneNumber}</span>
            </div>
            <Edit01Icon/>
        </div>
        <div className="grid grid-cols-3 gap-4 lg:my-12">
 <Requests data={orders}/>
        <div className="col-span-3 lg:col-span-1 lg:order-0 rounded-2xl lg:border lg:border-[#D9D9D9] lg:max-h-[243px]">           
        <h3 className="text-[#101117] font-normal my-6 px-4">تنظیمات حساب</h3>   
        <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
            <div className="text-[#101117] flex">
            <Image alt="کارشناسی خودرو" src="/car-inspection-icon.svg" width={24} height={24}/>
            <Link href={"/Profile/requests"} className="mx-2 text-base" prefetch={false}>تمامی درخواست ها  </Link>
            </div>
     
        <ArrowLeft01Icon/>

        </h6>
        <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
        <div className="text-[#101117] flex">
           <Location01Icon size={24}/>
            <span className="mx-2 text-base">آدرس ها</span>
            </div>
        <ArrowLeft01Icon/>

        </h6>
        <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
        <div className="text-[#101117] flex" onClick={logOut}>
            <Logout03Icon size={24}/>
            <span className="mx-2 text-base" >خروج</span>
            </div>
        <ArrowLeft01Icon/>

        </h6>
        </div>
        </div>
       

                       
        </div>
     
   

    )
}