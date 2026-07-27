'use client'
import { Button } from "@/components/ui/button";
import {  Call02Icon, Car02Icon } from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";

export default function CallAction ({data}:any) {
    
    return (
        <section className=" top-11 z-20 bg-secondary p-4 h-11 text-black flex justify-between items-center sticky      shadow-[0px_4px_8px_0px_#00000014]">
            <div className="flex items-center">
            <Link href="/" prefetch={true} aria-label="صفحه اصلی کارماچک">
                <Image alt="کارماچک" width={130} height={30} src={"https://api.carmacheck.com/" + data?.ImagePath}/>
            </Link>
            </div>
            
            <span className="text-[#101117] flex items-center font-IranSans">
                
                
                     <a  className="rounded-3xl font-IranSans-UltraLight border border-white px-2" href={`tel:${data?.NavbarPhoneNumber}`}>{data?.NavbarPhoneNumber}</a>
                
                <Call02Icon size={16}/>
            </span>
                
            
          

        </section>
    )
}