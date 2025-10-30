"use client";
import { useEffect, useState } from "react";
import Banner from "../components/mobile/Home/Banner";
import CallAction from "../components/mobile/Home/CallAction";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Call02Icon } from "hugeicons-react";

export default function ProfileLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
     const [data,setData] = useState<any>([]);
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
                       <div className="px-8 py-3 flex justify-between  shadow-[0px_6px_20px_-2px_#10182814]">
           <ArrowRight/>
                <div className="flex items-center">
            <Image alt="کارچک" width={32} height={30} src={"/assets/images/logo.svg"}/>
            <h1 className="font-IranSans-UltraLight text-xl text-black mx-1 font-semibold">کارچک</h1>
            </div>
            <span className="text-[#101117] flex items-center font-IranSans">
               
                <Call02Icon size={16}/>
            </span>


        </div>
                  {children}
                  
                  </div>
    )

  }