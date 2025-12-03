'use client'
import { Button } from "@/components/ui/button";
import {  Car02Icon } from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";

export default function Banner ({data}:any) {

    
    return (
        <header className="bg-primary z-20 banner-bg-pattern py-2 px-4 h-11 text-white flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center">
            <Image src={"/car-approved.svg"} width="24" height="24" alt="رزرو کارشناس"/>
            <strong className="font-IranSans-UltraLight text-[#FFFBFB] text-sm mx-1 font-normal">کارشناسی خودرو در کمترین زمان</strong>
            </div>
            <Link   className="rounded-3xl font-IranSans-UltraLight border border-white px-2" href="./car-inspection-flow/select-car-group">رزرو کارشناس</Link>
            {/* <Button size="sm" variant="outline"  className="rounded-3xl font-IranSans-UltraLight">
             
            </Button> */}
                
            
          

        </header>
    )
}