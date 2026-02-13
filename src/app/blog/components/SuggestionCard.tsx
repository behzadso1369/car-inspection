import Image from "next/image";
import Link from "next/link";
import   moment from "jalali-moment";

export default function SuggestionCard({title,imageSrc,link,date}:any) {
    return (
        <Link prefetch={false} href={link}   className=" px-2 rounded-2xl mt-4 flex-col items-center w-full col-span-4 lg:col-span-1 hover:border hover:border-[#B1B1B3] hover:shadow-[0px_8px_16px_0px_#0000000F]">
            
                <figure className="my-4">
                    <div className="relative h-52 flex-shrink-0 bg-gray-50 rounded-t-3xl overflow-hidden">
                    <Image
          src={imageSrc}
          alt={title}
           fill
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
           className="w-full h-full rounded-3xl object-cover" 
        />
        
                    </div>
  
        <figcaption className="my-4">
 

            <h3 className="my-1 text-[#1E2A38] text-base font-medium">{title}</h3>
            <h3 className=" text-[#6B6C70] text-sm">{title}</h3>
            <span className="text-sm text-[#55565A] my-4 inline-block">{moment(date).locale("fa").format("YYYY/MM/DD") || "-"}</span>
        </figcaption>
      </figure>
        </Link>
    )
}