"use client";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import { Call02Icon } from "hugeicons-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutUs() {
  const [aboutUs, setAboutUs] = useState<{ __html: string }>({ __html: "" });

  const getAboutUs = () => {
    instance.get(ApiHelper.get("GetAboutUsPageData")).then((res: any) => {
      setAboutUs({
        __html: res?.AboutUs?.[0]?.Content || ""
      });
    });
  };

  useEffect(() => {
    getAboutUs();
  }, []);

  return <div className="font-IranSans" >
      <div className="bg-white font-IranSans">
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
                 <div className="py-4 px-4" dangerouslySetInnerHTML={aboutUs}></div>
                  
                  </div>
  </div>;
}
