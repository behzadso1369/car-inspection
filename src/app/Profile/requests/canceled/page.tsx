import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft01Icon } from "hugeicons-react"

export default function DoneRequestDetail() {
    return (
        <div className="py-6 font-IranSans px-4">
           <figure className="  rounded-2xl font-IranSans bg-[#FBFBFB] border border-[#DFDFDF] my-4">
 

 <figcaption className="mt-4 px-4" key={1}>
   <span className="px-1 text-sm rounded-4xl py-1 mb-2  bg-[#FEF1E6] text-[#FF2121]">لغو شده</span>
   <h5 className="text-[#416CEA] text-sm my-2"> کار شناسی ماشین    سمند سورن </h5>
   <h5 className="text-[#101117] text-base my-2"> وضعیت سفارش : لغو شده </h5>
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
        <span className="text-[#101117] text-base font-medium">1402/04/23</span>
    </div>
</div>
<div className="my-6 border-b border-[#DFDFDF] box-content w-full">
    <div className="flex justify-between text-sm my-2">
    <span className="text-[#55565A]">مبلغ:</span>
    <span className="text-[#101117] text-base font-medium">5,028,000 تومان</span>
    </div>
    <div className="flex justify-between text-sm my-2">
    <span className="text-[#55565A]">نوع کارشناسی:</span>
    <span className="text-[#101117] text-base font-medium">حضور در محل شما</span>
    </div>
    <div className="flex justify-between text-sm my-2">
    <span className="text-[#55565A]">زمان کارشناسی:</span>
    <span className="text-[#101117] text-base font-medium">کارشناسی فوری</span>
    </div>
</div>
<div className="flex ">
    <Image src="/sample-car.png" width={74} height={74} alt="کارشناسی خودرو"/> 
    <div className="flex flex-col text-base text-[#101117] mx-4">
        <span>خودرو سواری 206 اتومات</span>
        <span>مالک : محیا محمودی</span>
    </div>

</div>
{/* <Link href="/" className="w-full flex justify-between my-12">
<span>گزارش کارشناسی</span>
<ArrowLeft01Icon className="mb-1 mx-1" color="#1434CB" size={20} />
</Link> */}
        </div>
    )
} 