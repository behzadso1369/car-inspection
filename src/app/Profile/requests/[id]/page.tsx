"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft01Icon } from "hugeicons-react"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function RequestDetail() {
    const params = useParams();
    const router = useRouter();
    const [orderDetail,setOrderDetail] = useState<any>({})
    const orderById = () => {
        
        instance.get(ApiHelper.get("GetUserOrderDetail") + "?OrderId=" + params.id).then((res:any) => {
            setOrderDetail(res);
            debugger
        })

    }
            useEffect(() => {
            orderById();
        },[])
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
          <div className="grid grid-cols-3 gap-4 py-4">
        <div className="col-span-3 lg:col-span-1 order-1 lg:order-0 lg:border lg:border-[#D9D9D9] lg:max-h-[300px]">           
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
                 <div className="py-6 font-IranSans px-4 order-0 lg-order-1 lg:col-span-2 lg:border lg:border-[#D9D9D9]">
           <figure className="  rounded-2xl font-IranSans bg-[#FBFBFB] border border-[#DFDFDF] my-4">
 

 <figcaption className="mt-4 px-4" key={1}>
   <span className={`px-1 text-sm rounded-4xl py-1 mb-2  ${orderDetail?.isComplete ?  "bg-[#E6FEE6] text-[#2CFF21] " : "bg-[#FEF4E6] text-[#F8A94D]" }`}>{orderDetail?.isComplete ? "تکمیل شده" : "تکمیل نشده"}</span>
   <h5 className="text-[#416CEA] text-sm my-2"> کار شناسی ماشین     {orderDetail?.carGroup} </h5>
   <h5 className="text-[#101117] text-base my-2"> وضعیت سفارش :  {orderDetail?.flowState} </h5>
   <strong className="text-sm text-[#101117] font-light">عدم پرداخت</strong>
   {/* <div className="w-full">
   <Button className="rounded-3xl w-1/2 my-4 bg-[#3456bb] text-white">جزییات سفارش</Button>
   </div> */}

 </figcaption>
</figure>
<div className="my-6 border-b border-[#DFDFDF] box-border  w-full">
    <div className="flex justify-between text-sm my-2">
        <span className="text-[#55565A]">کد پیگیری سفارش:</span>
        <span className="text-[#101117] text-base font-medium">524235</span>
    </div>
    <div className="flex justify-between text-sm my-2 w-full">
        <span className="text-[#55565A]">تاریخ  ثبت سفارش:</span>
        <span className="text-[#101117] text-base font-medium">{orderDetail?.orderCreated}</span>
    </div>
</div>
<div className="my-6 border-b border-[#DFDFDF] box-content w-full">
    <div className="flex justify-between text-sm my-2">
    <span className="text-[#55565A]">مبلغ:</span>
    <span className="text-[#101117] text-base font-medium">{orderDetail?.totalPrice} تومان</span>
    </div>
    <div className="flex justify-between text-sm my-2">
    <span className="text-[#55565A]">نوع کارشناسی:</span>
    <span className="text-[#101117] text-base font-medium">{orderDetail?.inspectionType}</span>
    </div>
    {/* <div className="flex justify-between text-sm my-2">
    <span className="text-[#55565A]">زمان کارشناسی:</span>
    <span className="text-[#101117] text-base font-medium">کارشناسی فوری</span>
    </div> */}
</div>
<div className="flex ">
    <Image src="/sample-car.png" width={74} height={74} alt="کارشناسی خودرو"/> 
    <div className="flex flex-col text-base text-[#101117] mx-4">
        <span>خودرو سواری  {orderDetail?.carGroup}</span>
        <span>مالک :  {orderDetail?.username}</span>
    </div>

</div>
{/* <Link href="/" className="w-full flex justify-between my-12">
<span>گزارش کارشناسی</span>
<ArrowLeft01Icon className="mb-1 mx-1" color="#1434CB" size={20} />
</Link> */}
        </div>
                </div>
       
    )
} 