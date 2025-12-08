"use client";
import { Home01Icon } from "hugeicons-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { memo, useEffect } from "react"
import { useRouter } from "next/navigation"
import NavigationLink from "@/components/ui/navigation-link"

export const NavigationBar = memo(() => {
    const pathname = usePathname();
    const router = useRouter();
    
    // Prefetch صفحات مهم
    useEffect(() => {
        router.prefetch("/");
        router.prefetch("/car-inspection-flow/select-car-group");
        router.prefetch("/services");
        router.prefetch("/Profile");
    }, [router]);
    
    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        if (href === "/car-inspection-flow/select-car-group") {
            return pathname.startsWith("/car-inspection-flow");
        }
        return pathname.startsWith(href);
    };

    const activeFilter = "brightness(0) saturate(100%) invert(20%) sepia(100%) saturate(2000%) hue-rotate(220deg) brightness(0.73) contrast(1.2)";
    const inactiveFilter = "brightness(0) saturate(100%) invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)";

    return (
        <nav className="fixed font-IranSans w-11/12 left-1/2 transform -translate-x-1/2 bottom-8 h-16 px-8 bg-[#f6f6f6] rounded-2xl shadow-[0px_4px_8px_0px_#00000014] flex justify-between items-center">
            <NavigationLink 
                href="/" 
                prefetch={true}
                className={`flex flex-col ${isActive("/") ? "text-[#3456bb]" : "text-[#999A9C]"}`}
            >
                <Home01Icon size={24}/>
                <span className="text-xs my-1">خانه</span>
            </NavigationLink>
            
            <NavigationLink 
                href="/car-inspection-flow/select-car-group" 
                prefetch={true}
                className={`flex flex-col items-center justify-between ${isActive("/car-inspection-flow/select-car-group") ? "text-[#3456bb]" : "text-[#999A9C]"}`}
            >
                <div style={{ filter: isActive("/car-inspection-flow/select-car-group") ? activeFilter : inactiveFilter }}>
                    <Image 
                        alt="کارشناسی خودرو" 
                        src="/car-inspection.svg" 
                        width={24} 
                        height={24}
                        loading="lazy"
                    />
                </div>
                <span className="text-xs my-1">کارشناسی خودرو</span>
            </NavigationLink>
            
            <NavigationLink 
                href="/services" 
                prefetch={true}
                className={`flex flex-col justify-between items-center ${isActive("/services") ? "text-[#3456bb]" : "text-[#999A9C]"}`}
            >
                <div style={{ filter: isActive("/services") ? activeFilter : inactiveFilter }}>
                    <Image 
                        alt="خدمات کارماچک" 
                        src="/car-service.svg" 
                        width={24} 
                        height={24}
                        loading="lazy"
                    />
                </div>
                <span className="text-xs my-1">خدمات کارماچک</span>
            </NavigationLink>
            
            <NavigationLink 
                href="/Profile" 
                prefetch={true}
                className={`flex flex-col justify-between items-center ${isActive("/Profile") ? "text-[#3456bb]" : "text-[#999A9C]"}`}
            >
                <div style={{ filter: isActive("/Profile") ? activeFilter : inactiveFilter }}>
                    <Image 
                        alt="پروفایل" 
                        src="/profile.svg" 
                        width={24} 
                        height={24}
                        loading="lazy"
                    />
                </div>
                <span className="text-xs my-1">پروفایل</span>
            </NavigationLink>
        </nav>
    )
});

NavigationBar.displayName = 'NavigationBar';