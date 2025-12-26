"use client";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Call02Icon } from "hugeicons-react";
import { usePathname } from "next/navigation";

export default function ProfileLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
     const [data,setData] = useState<any>([]);
       const pathname = usePathname();
  const isBaseFlow = pathname === "/car-inspection-flow/select-car-group";

  const handleBack = () => {
    const userId = localStorage.getItem("userId");
    const orderId = localStorage.getItem("OrderId");
    
    if (userId && orderId) {
      instance.post(ApiHelper.get("MoveOrder"), {
        "isBack": true,
        "orderId": Number(orderId),
        "userId": userId,
      })
      .then((res: any) => {
        if (res) {
          window.history.back();
        }
      })
      .catch((err: any) => {
        console.error("Error moving order:", err);
        // در صورت خطا هم به عقب برگرد
        window.history.back();
      });
    } else {
      // اگر userId یا orderId وجود نداشت، فقط به عقب برگرد
      window.history.back();
    }
  };
  const getMasterData = () => {
    instance.get(ApiHelper.get("GetMasterPageData")).then((res:any) => {
      setData(res);
    })
  }
  useEffect(() => {
    getMasterData();
  },[])
    return (


  <div className={`bg-white font-IranSans  ${!isBaseFlow ? "lg:max-w-xl lg:container lg:mx-auto lg:my-10 lg:pt-8" : ""}   shadow-[0px_4px_24px_0px_#EAEAEA]`}>
                       {!isBaseFlow && (
                       <div className="px-8 py-3 flex justify-between  shadow-[0px_6px_20px_-2px_#10182814] lg:shadow-none">
                   <ArrowRight onClick={handleBack}/>
                <div className="flex items-center">
            <Image 
                alt="کارماچک" 
                width={32} 
                height={30} 
                src={data?.MasterSiteData?.ImagePath ? `https://api.carmacheck.com/${data.MasterSiteData.ImagePath}` : "/assets/images/logo.svg"}
            />
            <h1 className="font-IranSans-UltraLight text-xl text-black mx-1 font-semibold">
                {data?.MasterSiteData?.CompanyName || "کارماچک"}
            </h1>
            </div>
            <span className="text-[#101117] flex items-center font-IranSans">
                
                
                <a  className="rounded-3xl font-IranSans-UltraLight border border-white px-2" href={`tel:${data?.MasterSiteData?.NavbarPhoneNumber}`}>{data?.MasterSiteData?.NavbarPhoneNumber}</a>
           
           <Call02Icon size={16}/>
       </span>


        </div>
                       )}
                  {children}
                  
                  </div>
    )

  }