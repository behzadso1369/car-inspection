import Image from "next/image"
import { apiAssetUrl } from "@/lib/media"

function ArrowLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6 9 12l6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const BlogCard = ({Title,ImagePath,Excerpt,Id,Slug}:any) => {
    const href = `/blog/${Slug || Id}`
   
    return (
        <figure className="border border-[#DCDCDC] rounded-3xl font-IranSans mb-4 pb-8 col-span-4 lg:col-span-1 flex flex-col h-full relative">
     <div className="relative h-52 flex-shrink-0 bg-gray-50 rounded-t-3xl overflow-hidden">
     <Image 
        className="w-full h-full rounded-3xl object-cover" 
        src={apiAssetUrl(ImagePath)} 
        alt={Title || "بلاگ کارماچک"}  
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
     />
     </div>

     <div className="bg-white absolute  w-14 h-14 top-44 left-4  rounded-full  flex justify-center items-center">
     <a href={href} aria-label={`مطالعه مطلب: ${Title || "بلاگ کارماچک"}`} className="bg-[#416CEA]  w-12 h-12 text-white flex justify-center rounded-full items-center">
        <ArrowLeftIcon />
     </a>
     
     </div>

  <figcaption className="px-4 flex-1 flex flex-col relative mt-6">
    <h3 className="text-[#101117] text-lg mb-2 line-clamp-2">{Title}</h3>
    <strong className="text-sm text-[#55565A] font-normal line-clamp-3">{Excerpt}</strong>
    
  </figcaption>
</figure>
       
    )
}
