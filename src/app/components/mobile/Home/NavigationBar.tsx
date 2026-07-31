"use client";
import { BookOpen02Icon, Home01Icon, Money03Icon } from "hugeicons-react"
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
        router.prefetch("/car-price");
        router.prefetch("/blog");
        router.prefetch("/Profile");
    }, [router]);
    
    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        if (href === "/car-inspection-flow/select-car-group") {
            return pathname.startsWith("/car-inspection-flow");
        }
        if (href === "/car-price") {
            return pathname.startsWith("/car-price");
        }
        return pathname.startsWith(href);
    };

    const activeFilter = "brightness(0) saturate(100%) invert(20%) sepia(100%) saturate(2000%) hue-rotate(220deg) brightness(0.73) contrast(1.2)";
    const inactiveFilter = "brightness(0) saturate(100%) invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)";

    const linkClass = (href: string) =>
        `flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 ${
            isActive(href) ? "text-[#3456bb]" : "text-[#999A9C]"
        }`;

    return (
        <nav className="fixed font-IranSans z-40 w-[calc(100%-1.5rem)] max-w-md left-1/2 transform -translate-x-1/2 bottom-6 h-[4.25rem] px-2 bg-[#f6f6f6] rounded-2xl shadow-[0px_4px_8px_0px_#00000014] flex justify-between items-center">
            <NavigationLink 
                href="/" 
                prefetch={true}
                className={linkClass("/")}
            >
                <Home01Icon size={22}/>
                <span className="text-[10px] leading-tight text-center">خانه</span>
            </NavigationLink>
            
            <NavigationLink 
                href="/car-inspection-flow/select-car-group" 
                prefetch={true}
                className={linkClass("/car-inspection-flow/select-car-group")}
            >
                <div style={{ filter: isActive("/car-inspection-flow/select-car-group") ? activeFilter : inactiveFilter }}>
                    <Image 
                        alt="کارشناسی خودرو" 
                        src="/car-inspection.svg" 
                        width={22} 
                        height={22}
                        loading="lazy"
                    />
                </div>
                <span className="text-[10px] leading-tight text-center">کارشناسی</span>
            </NavigationLink>

            <NavigationLink 
                href="/car-price" 
                prefetch={true}
                className={linkClass("/car-price")}
            >
                <Money03Icon size={22} strokeWidth={isActive("/car-price") ? 2.2 : 1.8} />
                <span className="text-[10px] leading-tight text-center">
                  قیمت‌گذاری
                  <br />
                  خودرو
                </span>
            </NavigationLink>
            
            <NavigationLink 
                href="/blog" 
                prefetch={true}
                className={linkClass("/blog")}
            >
                <BookOpen02Icon size={22} strokeWidth={isActive("/blog") ? 2.2 : 1.8} />
                <span className="text-[10px] leading-tight text-center">بلاگ</span>
            </NavigationLink>
            
            <NavigationLink 
                href="/Profile" 
                prefetch={true}
                className={linkClass("/Profile")}
            >
                <div style={{ filter: isActive("/Profile") ? activeFilter : inactiveFilter }}>
                    <Image 
                        alt="پروفایل" 
                        src="/profile.svg" 
                        width={22} 
                        height={22}
                        loading="lazy"
                    />
                </div>
                <span className="text-[10px] leading-tight text-center">پروفایل</span>
            </NavigationLink>
        </nav>
    )
});

NavigationBar.displayName = 'NavigationBar';