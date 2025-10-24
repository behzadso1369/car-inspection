import { Button } from "@/components/ui/button"
import { ArrowLeft01Icon, ArrowLeft02Icon } from "hugeicons-react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export const ProductCard = ({Id,ImagePath,Title,Description,DurationTime}:any) => {
    return (
        <figure className="border border-[#DCDCDC]  rounded-3xl font-IranSans">
     <div className="relative">
     <Image className="w-full rounded-3xl h-52" src={"https://api.carmacheck.com/" + ImagePath} alt={Title}  height={100} width={100} />
     <div className="bg-white absolute w-14 h-16 bottom-0 left-6 translate-y-1/2 rounded-full py-1 flex justify-center">
     <button className="bg-[#416CEA]  w-12 h-12 text-white flex justify-center rounded-full items-center">
        <ArrowLeft01Icon color="white" size={24} />

     </button>
     
     </div>

     </div>

  <div className="bg-white absolute"></div>
  <figcaption className="mt-4 px-4" key={Id}>
    <h4 className="text-[#101117] text-lg">{Title}</h4>
    <h5 className="text-sm text-[#55565A]">میانگین زمان انجام: {DurationTime} دقیقه</h5>
    <strong className="text-sm text-[#55565A] font-normal">{Description}</strong>
    <Button className="rounded-3xl w-full my-4 bg-[#416CEA] text-white">رزرو کارشناسی</Button>
  </figcaption>
</figure>
       
    )
}