'use client'
import { Button } from "@/components/ui/button";
import {  Car02Icon } from "hugeicons-react";
import Image from "next/image";

export default function CallAction () {
    return (
        <section className="bg-secondary py-3 px-4 h-11 text-black flex justify-between items-center">
            <div className="flex items-center">
            <Image alt="کارچک" width={32} height={30} src={"/assets/images/logo.svg"}/>
            <h1 className="font-IranSans-UltraLight text-xl text-black mx-1">کارچک</h1>
            </div>
            <Button size="sm" variant="outline"  className="rounded-3xl">
                رزرو کارشناس
            </Button>
                
            
          

        </section>
    )
}