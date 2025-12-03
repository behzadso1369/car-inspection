'use client'

import { ArrowLeft01Icon } from "hugeicons-react"
import { ProductCard } from "./ProductCard"
import { BlogCard } from "./BlogCard"
import Link from "next/link"

export default function BlogShort({data}:any) {
    return (
        <section className="bg-white  py-16 px-4 font-IranSans">
            <div className="flex w-full justify-between">
                <span>خواندنی ها</span>
                <p className="text-[#1434CB] flex items-center">
                    <Link href="./blog" prefetch={false}>نمایش بلاگ</Link>
                    <ArrowLeft01Icon className="mb-1 mx-1" color="#1434CB" size={20} />
                    
                </p>
              
            </div>
           <div className="my-4 grid grid-cols-3">
            {data?.map((item:any) => (
<BlogCard key={item.Title} Title={item.Title} ImagePath={item.ImagePath} Excerpt={item.Excerpt}/>
            ))}
           
         
           </div>
            
        </section>
    )
}