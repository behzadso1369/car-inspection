import { Button } from "@/components/ui/button"
import { ArrowLeft01Icon, ArrowLeft02Icon } from "hugeicons-react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export const BlogCard = ({Title,ImagePath,Excerpt}:any) => {
    return (
        <figure className="border border-[#DCDCDC]  rounded-3xl font-IranSans mb-4 pb-8">
     <div className="relative">
     <Image className="w-full rounded-3xl" src={"https://api.carmacheck.com/"+ImagePath} alt="کارشناسی فنی"  height={100} width={100} />
     <div className="bg-white absolute w-18 h-18 bottom-0 left-6 translate-y-1/2 rounded-full py-1 flex justify-center">
     <button className="bg-[#416CEA]  w-16 h-16 text-white flex justify-center rounded-full items-center">
        <ArrowLeft01Icon color="white" size={32} />

     </button>
     
     </div>

     </div>

  <div className="bg-white absolute"></div>
  <figcaption className="mt-4 px-4">
    <h4 className="text-[#101117] text-lg">{Title}</h4>
    <h5 className="text-sm text-[#55565A]">میانگین زمان انجام: 60-90 دقیقه</h5>
    <strong className="text-sm text-[#55565A] font-normal">{Excerpt}</strong>
    
  </figcaption>
</figure>
       
    )
}