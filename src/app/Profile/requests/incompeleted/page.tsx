import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft01Icon } from "hugeicons-react"

export default function IncompeletedRequesDetail() {
    return (
        <div className="py-6 font-IranSans px-4">
           <figure className="  rounded-2xl font-IranSans bg-[#FBFBFB] border border-[#DFDFDF] my-4">
 

 <figcaption className="mt-4 px-4" key={1}>
   <span className="px-1 text-sm rounded-4xl py-1 mb-2  bg-[#FEF4E6] text-[#F8A94D]">تکمیل نشده</span>
   <h5 className="text-[#416CEA] text-sm my-2"> کار شناسی ماشین    سمند سورن </h5>
   {/* <h5 className="text-[#101117] text-base my-2"> وضعیت سفارش : لغو شده </h5> */}
   {/* <strong className="text-sm text-[#101117] font-light">عدم پرداخت</strong> */}
   {/* <div className="w-full">
   <Button className="rounded-3xl w-1/2 my-4 bg-[#3456bb] text-white">جزییات سفارش</Button>
   </div> */}

 </figcaption>
</figure>



<Link href="/" className="w-full flex justify-between my-6 py-4 border-b border-[#DFDFDF]">
<span className="text-[#101117]">تکمیل درخواست</span>
<ArrowLeft01Icon className="mb-1 mx-1" color="#1434CB" size={20} />
</Link>
<div  className="w-full flex justify-between my-6 py-4 border-b border-[#DFDFDF]">
<span className="text-[#A6A6A6]">گزارش کارشناسی</span>
<ArrowLeft01Icon className="mb-1 mx-1" color="#1434CB" size={20} />
</div>
<Link href="/" className="w-full flex justify-between my-6 py-4 border-b border-[#DFDFDF]">
<span className="text-[#55565A]">لغو درخواست</span>
<ArrowLeft01Icon className="mb-1 mx-1" color="#1434CB" size={20} />
</Link>
        </div>
    )
} 