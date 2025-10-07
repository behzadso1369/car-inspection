'use client'
import { Button } from "@/components/ui/button";
import {  Call02Icon, Car02Icon } from "hugeicons-react";
import Image from "next/image";

export default function CallAction ({data}:any) {
    return (
        <section className=" top-11 bg-secondary p-4 h-11 text-black flex justify-between items-center sticky z-10     shadow-[0px_4px_8px_0px_#00000014]">
            <div className="flex items-center">
            <Image alt="کارچک" width={32} height={30} src={"/assets/images/logo.svg"}/>
            <h1 className="font-IranSans-UltraLight text-xl text-black mx-1 font-semibold">کارچک</h1>
            </div>
            
            <span className="text-[#101117] flex items-center font-IranSans">
                
                {data?.split("-").map((item:any) => (
                     <a  className="rounded-3xl font-IranSans-UltraLight border border-white px-2" href={`tel:${item}`}>{item}</a>
                ))}
                <Call02Icon size={16}/>
            </span>
                
            
          

        </section>
    )
}