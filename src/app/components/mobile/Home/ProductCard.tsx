import { Button } from "@/components/ui/button"
import { ArrowLeft01Icon, ArrowLeft02Icon } from "hugeicons-react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const ProductCard = ({Id,ImagePath,Title,Description,DurationTime}:any) => {
    return (
        <figure className="border border-[#DCDCDC] rounded-3xl font-IranSans flex flex-col h-full relative">
     <div className="relative h-52 overflow-hidden">
     <Image className="w-full rounded-3xl h-full object-cover" src={"https://api.carmacheck.com/" + ImagePath} alt={Title}  height={256} width={256} />
     </div>
     
     <div className="bg-white absolute w-14 h-16 left-6 top-52 -translate-y-1/2 rounded-full py-1 flex justify-center z-30">
     <Link href="./car-inspection-flow/select-car-group" prefetch={false} className="bg-[#416CEA]  w-12 h-12 text-white flex justify-center rounded-full items-center">
        <ArrowLeft01Icon color="white" size={24} />

     </Link>
     
     </div>
     
  

  <div className="bg-white absolute"></div>
  <figcaption className="mt-10 px-4 flex-1 flex flex-col justify-between relative z-10" key={Id}>
    <h4 className="text-[#101117] text-lg line-clamp-1">{Title}</h4>
    <h5 className="text-sm text-[#55565A] line-clamp-1">میانگین زمان انجام: {DurationTime} دقیقه</h5>
    <strong className="text-sm text-[#55565A] font-normal line-clamp-2">{Description}</strong>
    <Link href="./car-inspection-flow/select-car-group" prefetch={false} className="rounded-3xl w-full my-4 bg-[#416CEA] text-white px-4 py-2 text-center mt-4">رزرو کارشناسی</Link>
  </figcaption>
</figure>
       
    )
}