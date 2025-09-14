'use client'
import { Button } from "@/components/ui/button";
import {  Car02Icon } from "hugeicons-react";

export default function Banner () {
    return (
        <header className="bg-primary banner-bg-pattern py-3 px-4 h-11 text-white flex justify-between items-center">
            <div className="flex items-center">
            <Car02Icon size={24}/>
            <strong className="font-IranSans-UltraLight text-sm mx-1">کارشناسی خودرو در کمترین زمان</strong>
            </div>
            <Button size="sm" variant="outline"  className="rounded-3xl">
                رزرو کارشناس
            </Button>
                
            
          

        </header>
    )
}