// app/components/ArticleCard.tsx
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ArticleCardProps {
  date: string;
  category: string;
  title: string;
  author: string;
  imageSrc: string;
}

export default function ArticleCard({
  date,
  category,
  title,
  author,
  imageSrc,
}: ArticleCardProps) {
  return (
    <Card className="flex  !shadow-none !flex-row w-full items-center gap-4 p-3 !border-b border-[#DFDFDF] py-4">
            <div className="relative w-[131px] aspect-[1.1]">
        <Image
          src={imageSrc}
          alt={title}
           fill
    className="object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex items-center  text-xs text-gray-500">
   
          <span className="bg-red-100  text-red-600 px-2 py-0.5 rounded-full text-[11px] font-medium ml-2">
            {category}
          </span>
          <span className="border-r px-2">{date}</span>
        </div>

        <h3 className="text-base font-medium text-gray-800 leading-relaxed mt-2">
          {title}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mt-3">
          <Clock className="w-4 h-4 ml-2" />
          <span>{author}</span>
        </div>
      </div>

  
    </Card>
  );
}
