import { Button } from "@/components/ui/button"
import { ArrowLeft01Icon, ArrowLeft02Icon } from "hugeicons-react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const RequestCard = ({Id,Title,Description,paymentStatus,CarName,Status,orderCreated}:any) => {
  
    return (
        <figure className="  rounded-3xl font-IranSans bg-[#FBFBFB] border border-[#DFDFDF] mt-4">
 

  <figcaption className="mt-4 px-4" key={Id}>
    <span className={`px-1 text-sm rounded-4xl py-1 mb-2  ${Status === "compepelted" ? "bg-[#E6FEE6] text-[#2CFF21] " : Status === "unknown" ? "bg-[#FEF4E6] text-[#F8A94D]" : "bg-[#FEF1E6] text-[#FF2121]"}`}>{Title}</span>
    <h5 className="text-[#416CEA] text-sm my-2"> کار شناسی ماشین  {CarName} </h5>
    <h5 className="text-[#101117] text-base my-2"> وضعیت سفارش : {paymentStatus} </h5>
    <h5 className="text-[#101117] text-base my-2"> شماره سفارش : {Id} </h5>
    <h5 className="text-[#101117] text-base my-2"> تاریخ سفارش : {orderCreated} </h5>
    <strong className="text-sm text-[#101117] font-light">{Description}</strong>
    <div className="w-full lg:flex lg:justify-end">
    <Link prefetch={false} href={`/Profile/requests/${Id}` } className="rounded-3xl inline-block py-2 px-1 text-center text-sm lg:w-1/4 w-1/2 my-4 bg-[#3456bb] text-white">جزییات سفارش</Link>
    </div>

  </figcaption>
</figure>
       
    )
}