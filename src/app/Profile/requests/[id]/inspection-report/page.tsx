"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft01Icon, ArrowLeft02Icon } from "hugeicons-react"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useEffect, useState } from "react";
import { handleLogout } from "@/helper/logout";

export default function InspectionReport() {
    const params = useParams();
    const router = useRouter();
    const [orderDetail,setOrderDetail] = useState<any>({})
    const orderById = () => {
        
        instance.get(ApiHelper.get("GetUserOrderDetail") + "?OrderId=" + params.id).then((res:any) => {
            setOrderDetail(res);
        })

    }
      const getUserOirderDetailReport = () => {
        
        instance.get(ApiHelper.get("GetUserOirderDetailReport") + "?OrderId=" + params.id).then((res:any) => {
          
            downloadImage(res?.reportImage);
        })

    }
            useEffect(() => {
            orderById();
        },[])
            const logOut = () => {
    handleLogout("/");
  }
  const downloadImage = async (imageUrl: string, filename: string = "inspection-report") => {
    if (!imageUrl) {
        console.error("Image URL is missing");
        return;
    }
    
    const imgUrl = "https://api.carmacheck.com/" + imageUrl;
    try {
        // Fetch the image as a blob
        const response = await fetch(imgUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename || `inspection-report-${params.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the object URL
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Error downloading image:", error);
        // Fallback: open in new tab
        window.open(imgUrl, "_blank");
    }
}
    return (
          <div className="grid grid-cols-3 gap-4 pt-4 pb-20 lg:pb-0 font-IranSans">
          <div className="col-span-3 lg:col-span-1 order-1 lg:order-0 lg:border lg:border-[#D9D9D9] lg:max-h-[243px] rounded-2xl">           
                <h3 className="text-[#101117] font-normal my-6 px-4">تنظیمات حساب</h3>   
                <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
                    <div className="text-[#101117] flex">
                    <Image alt="کارشناسی خودرو" src="/car-inspection.svg" width={24} height={24}/>
                    <Link href={"/Profile/requests"} className="mx-1 text-base" prefetch={false}>تمامی درخواست ها  </Link>
                    </div>
             
                <ArrowLeft01Icon/>
        
                </h6>
                {/* <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
                <div className="text-[#101117] flex">
                    <Image alt="کارشناسی خودرو" src="/car-inspection.svg" width={24} height={24}/>
                    <span className="mx-1 text-base">آدرس ها</span>
                    </div>
                 <ArrowLeft01Icon/>
        
                </h6> */}
                <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
                <div className="text-[#101117] flex" onClick={logOut}>
                    <Image alt="کارشناسی خودرو" src="/car-inspection.svg" width={24} height={24}/>
                    <span className="mx-1 text-base" >خروج</span>
                    </div>
                 <ArrowLeft01Icon/>
        
                </h6>
                </div>
                {orderDetail?.id ?      <div className="py-6 font-IranSans px-4 order-0 lg-order-1 col-span-3 lg:col-span-2 lg:border lg:border-[#D9D9D9]  rounded-2xl">
                        {/* Car schematic and details */}
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                          
                            <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <div>نام خودرو:</div>
                                <div className="font-bold">{orderDetail?.carGroup}</div>
                                <div>تاریخ:</div>
                                <div className="font-bold">{orderDetail?.carInspectionDate?.split(" ")[0]}</div>
                                <div>ساعت:</div>
                                <div className="font-bold">{orderDetail?.carInspectionDate?.split(" ")[1]}</div>
                                {/* <div>شماره شاسی:</div>
                                <div className="font-bold">147V874</div>
                                <div>پلاک:</div>
                                <div className="font-bold">24 الای 12 ایران 11</div> */}
                            </div>
                              {/* <div className="flex-shrink-0 flex flex-col items-center w-full py-4 h-[250px]  relative">
                              
                                <Image src="/final-repot.png" alt="Car Schematic" fill className="object-cover" />
                            </div> */}
                        </div>
                        {/* Inspection results */}
                        {/* <div className="mb-6">
                            <h3 className="font-semibold mb-4">نتیجه کارشناسی</h3>
                         
                            <div className="border-2 border-green-300  p-3 mb-3 rounded-2xl">
                                <div className="font-semibold text-[#04A14B] bg-[#E6F7EE] mb-1 px-2 rounded-3xl w-24 py-1">قطعات سالم</div>
                                <ul className="list-disc pr-5 text-sm text-gray-700">
                                    <li>فاقد رنگ شدگی می باشد</li>
                                    <li>شاسی عقب و جلو سالم</li>
                                </ul>
                            </div>
                           
                            <div className="border-2 border-orange-300 rounded-2xl p-3 mb-3">
                                <div className="font-semibold text-[#F07E19] bg-[#FEE6D6] mb-1 w-24 px-2 rounded-3xl py-1">آسیب جزئی</div>
                                <ul className="list-disc pr-5 text-sm text-gray-700">
                                    <li>سینی پشت چراغ جلو سمت راست ضربه جزئی دارد</li>
                                </ul>
                            </div>
                          
                            <div className="border-2 border-red-300 rounded-2xl p-3 mb-3">
                                <div className="font-semibold bg-[#F7ECE6] text-[#E21515] mb-1 w-24 px-2 rounded-3xl py-1">آسیب مهم</div>
                                <ul className="list-disc pr-5 text-sm text-gray-700">
                                    <li>بدنه دارای 4 مورد آسیب و 2 مورد رنگ است.</li>
                                    <li>موتور و سیستم انتقال قدرت 1 مورد ایراد مهم دارد</li>
                                </ul>
                            </div>
                        </div> */}
                        {/* Notes and validity */}
                        <div className="text-sm text-gray-600 mb-6">
                            <div>اعتبار این کارشناسی از تاریخ صدور 24 ساعت می باشد.</div>
                            <div>دیگر نکته مواردی که باید به آن توجه کند اینجا می آید.</div>
                        </div>
                        {/* Print button */}
                        <div className="flex justify-end">
                            <button onClick={getUserOirderDetailReport} className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">چاپ گزارش کارشناسی</button>
                        </div>
        </div> : <div className="w-full flex items-center justify-center !text-yellow-600 text-lg py-6 font-IranSans px-4 order-0 lg-order-1 col-span-3 lg:col-span-2 lg:border lg:border-[#D9D9D9]  rounded-2xl">در حال حاضر هیچ گزارشی برای کارشناسی شما ثبت نشده است</div>}
            
                </div>
       
    )
} 