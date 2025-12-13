import { Button } from "@/components/ui/button"
import { ArrowLeft01Icon, ArrowLeft02Icon } from "hugeicons-react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export const BlogCard = ({Title,ImagePath,Excerpt}:any) => {
    return (
        <figure className="border border-[#DCDCDC] rounded-3xl font-IranSans mb-4 pb-8 col-span-4 lg:col-span-1 flex flex-col h-full relative">
     <div className="relative h-52 flex-shrink-0 bg-gray-50 rounded-t-3xl overflow-hidden">
     <Image 
        className="w-full h-full rounded-t-3xl object-contain" 
        src={"https://api.carmacheck.com/"+ImagePath} 
        alt="کارشناسی فنی"  
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
     />
     </div>

     <div className="bg-white absolute z-30 w-18 h-18 top-48 left-6 -translate-y-1/2 rounded-full py-1 flex justify-center">
     <button className="bg-[#416CEA]  w-16 h-16 text-white flex justify-center rounded-full items-center">
        <ArrowLeft01Icon color="white" size={32} />

     </button>
     
     </div>

  <figcaption className="px-4 flex-1 flex flex-col relative z-10">
    <h4 className="text-[#101117] text-lg mb-2 line-clamp-2">{Title}</h4>
    <h5 className="text-sm text-[#55565A] mb-2">میانگین زمان انجام: 60-90 دقیقه</h5>
    <strong className="text-sm text-[#55565A] font-normal line-clamp-2">{Excerpt}</strong>
    
  </figcaption>
</figure>
       
    )
}