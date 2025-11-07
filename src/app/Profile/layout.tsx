"use client";
import { Call02Icon } from "hugeicons-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { NavigationBar } from "../components/mobile/Home/NavigationBar";
import { Header } from "../components/mobile/Home/Header";
import Banner from "../components/mobile/Home/Banner";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";

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
        <div className="lg:max-w-7xl lg:container lg:mx-auto ">
          <div className="hidden lg:block  bg-white">
              <Banner data={data?.MasterSiteData?.NavbarPhoneNumber}/>
               <Header />
               </div>
               <div className="block lg:hidden">
                   <div className="px-8 py-3 flex justify-between  shadow-[0px_6px_20px_-2px_#10182814]">
           <ArrowRight onClick={() => window.history.back()}/>
                <div className="flex items-center">
            <Image alt="کارچک" width={32} height={30} src={"/assets/images/logo.svg"}/>
            <h1 className="font-IranSans-UltraLight text-xl text-black mx-1 font-semibold">کارچک</h1>
            </div>
            <span className="text-[#101117] flex items-center font-IranSans">
               
                <Call02Icon size={16}/>
            </span>


        </div>
               </div>
              
        {children}
              <div className="block lg:hidden">
  <NavigationBar/>
      </div>
        </div>
    )
}