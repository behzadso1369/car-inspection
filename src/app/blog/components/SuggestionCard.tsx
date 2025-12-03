import Image from "next/image";
import Link from "next/link";

export default function SuggestionCard({title,imageSrc,link,date}:any) {
    return (
        <Link prefetch={false} href={link}   className="flex flex-col items-center w-full col-span-4 lg:col-span-1">
            
                <figure className="my-4">
                    <div className="relative  aspect-[1.77] w-full">
                    <Image
          src={imageSrc}
          alt={title}
           fill
    className="object-cover rounded-2xl"
        />
        
                    </div>
  
        <figcaption className="my-4">
            <h3 className="my-4">{title}</h3>
            <span className="text-sm text-[#55565A]">{date}</span>
        </figcaption>
      </figure>
        </Link>
    )
}