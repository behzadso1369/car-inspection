"use client";
import { Call02Icon, UserCircle02Icon } from "hugeicons-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo, useEffect } from "react"
import { useRouter } from "next/navigation"
import NavigationLink from "@/components/ui/navigation-link"

export const Header = memo(({data}:any) => {
    const pathname = usePathname();
    const router = useRouter();
    
    // Prefetch صفحات مهم در background
    useEffect(() => {
        router.prefetch("/");
        router.prefetch("/car-inspection-flow/select-car-group");
        router.prefetch("/services");
        router.prefetch("/contact-us");
        router.prefetch("/about-us");
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
    
    return (
        <header className="w-full shadow-[0px_4px_32px_0px_#CBD5E099] px-8 py-4 bg-white rounded-b-3xl font-IranSans">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Image 
                        alt="کارچک" 
                        width={62} 
                        height={57} 
                        src={"https://api.carmacheck.com/" + data?.MasterSiteData?.ImagePath}
                        priority
                        loading="eager"
                    />
                    <h1 className="font-IranSans-UltraLight text-4xl text-black mx-1 font-semibold">
                        {data?.MasterSiteData?.CompanyName}
                    </h1>
                </div>

                <ul className="flex text-base">
                    <li className={`mx-4 ${isActive("/") ? "text-[#3456bb]" : ""}`}>
                        <NavigationLink href="/" prefetch={true}>خانه</NavigationLink>
                    </li>
                    <li className={`mx-4 ${isActive("/car-inspection-flow/select-car-group") ? "text-[#3456bb]" : ""}`}>
                        <NavigationLink href="/car-inspection-flow/select-car-group" prefetch={true}>
                            کارشناسی خودرو
                        </NavigationLink>
                    </li>
                    <li className={`mx-4 ${isActive("/services") ? "text-[#3456bb]" : ""}`}>
                        <NavigationLink href="/services" prefetch={true}>خدمات کارچک</NavigationLink>
                    </li>
                    <li className={`mx-4 ${isActive("/contact-us") ? "text-[#3456bb]" : ""}`}>
                        <NavigationLink href="/contact-us" prefetch={true}>ارتباط با ما</NavigationLink>
                    </li>
                    <li className={`mx-4 ${isActive("/about-us") ? "text-[#3456bb]" : ""}`}>
                        <NavigationLink href="/about-us" prefetch={true}>درباره ما</NavigationLink>
                    </li>
                </ul>
                
                <span className="text-[#101117] flex items-center font-IranSans">
                    <a 
                        className="rounded-3xl font-IranSans-UltraLight border border-white px-2" 
                        href={`tel:${data?.MasterSiteData?.NavbarPhoneNumber}`}
                    >
                        {data?.MasterSiteData?.NavbarPhoneNumber}
                    </a>
                    <Call02Icon size={16}/>
                    <NavigationLink href="/Profile" prefetch={true} className="mx-2">
                        <UserCircle02Icon size={24}/>
                    </NavigationLink>
                </span>
            </div>
        </header>
    )
});

Header.displayName = 'Header';