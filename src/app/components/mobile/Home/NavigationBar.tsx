"use client";
import { Home01Icon } from "hugeicons-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavigationBar = () => {
    const pathname = usePathname();
    
    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        if (href === "/car-inspection-flow/select-car-group") {
            return pathname.startsWith("/car-inspection-flow");
        }
        return pathname.startsWith(href);
    };

    return (


        <nav className="fixed font-IranSans w-11/12 left-1/2 transform -translate-x-1/2 bottom-8 h-16 px-8 bg-[#f6f6f6] rounded-2xl shadow-[0px_4px_8px_0px_#00000014] flex justify-between items-center">
        <Link className={`flex flex-col ${isActive("/") ? "text-[#3456bb]" : "text-[#999A9C]"}`} href="/">
        <Home01Icon size={24}/>
        <span className="text-xs my-1">خانه</span>
        </Link>
        <Link className={`flex flex-col items-center justify-between ${isActive("/car-inspection-flow/select-car-group") ? "text-[#3456bb]" : "text-[#999A9C]"}`} href="/car-inspection-flow/select-car-group" prefetch={false}>
        <div style={isActive("/car-inspection-flow/select-car-group") ? { filter: "brightness(0) saturate(100%) invert(20%) sepia(100%) saturate(2000%) hue-rotate(220deg) brightness(0.73) contrast(1.2)" } : { filter: "brightness(0) saturate(100%) invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" }}>
        <Image alt="کارشناسی خودرو" src="/car-inspection.svg" width={24} height={24}/>
        </div>
        <span className="text-xs my-1">کارشناسی خودرو</span>
        </Link>
        <Link className={`flex flex-col   justify-between items-center ${isActive("/services") ? "text-[#3456bb]" : "text-[#999A9C]"}`} href="/services" prefetch={false}>
        <div style={isActive("/services") ? { filter: "brightness(0) saturate(100%) invert(20%) sepia(100%) saturate(2000%) hue-rotate(220deg) brightness(0.73) contrast(1.2)" } : { filter: "brightness(0) saturate(100%) invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" }}>
        <Image alt="کارشناسی خودرو" src="/car-service.svg" width={24} height={24}/>
        </div>
        <span className="text-xs my-1">خدمات کارچک</span>
        </Link>
        <Link className={`flex flex-col justify-between items-center ${isActive("/Profile") ? "text-[#3456bb]" : "text-[#999A9C]"}`} href="/Profile" prefetch={false}>
        <div style={isActive("/Profile") ? { filter: "brightness(0) saturate(100%) invert(20%) sepia(100%) saturate(2000%) hue-rotate(220deg) brightness(0.73) contrast(1.2)" } : { filter: "brightness(0) saturate(100%) invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" }}>
        <Image alt="کارشناسی خودرو" src="/profile.svg" width={24} height={24}/>
        </div>
        <span className="text-xs my-1">پروفایل</span>
        </Link>
        </nav>
    )
}