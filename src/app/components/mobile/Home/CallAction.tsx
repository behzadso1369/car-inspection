'use client'
import { Button } from "@/components/ui/button";
import {  Call02Icon, Car02Icon } from "hugeicons-react";
import Image from "next/image";

export default function CallAction () {
    return (
        <section className=" top-11 bg-secondary p-4 h-11 text-black flex justify-between items-center sticky z-10     shadow-[0px_4px_8px_0px_#00000014]">
            <div className="flex items-center">
            <Image alt="کارچک" width={32} height={30} src={"/assets/images/logo.svg"}/>
            <h1 className="font-IranSans-UltraLight text-xl text-black mx-1 font-semibold">کارچک</h1>
            </div>
            
            <span className="text-[#101117] flex items-center font-IranSans">
                
                021-22600039
                <Call02Icon size={16}/>
            </span>
                
            
          

        </section>
    )
}