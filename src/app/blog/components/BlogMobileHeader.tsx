"use client";
import { Call02Icon, Menu01Icon, UserCircle02Icon } from "hugeicons-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo, useEffect } from "react"
import { useRouter } from "next/navigation"
import NavigationLink from "@/components/ui/navigation-link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const BlogMobileHeader = memo(({data}:any) => {
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
        
        <header className="w-full shadow-[0px_4px_32px_0px_#CBD5E099] px-2 py-2 bg-white  !font-IranSans">
            <div className="flex items-center justify-between">
                
                    <Sheet>
    <SheetTrigger asChild>
     
        <Menu01Icon  size={30}/>

    </SheetTrigger>
    <SheetContent side="right" className="bg-white" dir="rtl">
      <SheetHeader className="!p-0">
        <SheetTitle className="border-b border-gray-300 w-full py-4">
             <div className="flex items-center">
                    <Link href="/" prefetch={true} aria-label="صفحه اصلی کارماچک">
                        <Image 
                            alt="کارماچک" 
                            width={140} 
                            height={57} 
                            src={"https://api.carmacheck.com/" + data?.ImagePath}
                            priority
                            loading="eager"
                        />
                    </Link>
                 
                </div>
        </SheetTitle>
      </SheetHeader>
      <ul className="flex flex-col gap-4" dir="rtl">
          <li className={`mx-4 ${isActive("/") ? "text-[#3456bb]" : ""}`}>
                             <NavigationLink href="/" prefetch={true}>خانه</NavigationLink>
                         </li>
                         <li className={`mx-4 ${isActive("/car-inspection-flow/select-car-group") ? "text-[#3456bb]" : ""}`}>
                             <NavigationLink href="/car-inspection-flow/select-car-group" prefetch={true}>
                                 کارشناسی خودرو
                             </NavigationLink>
                         </li>
                         {/* <li className={`mx-4 ${isActive("/services") ? "text-[#3456bb]" : ""}`}>
                             <NavigationLink href="/services" prefetch={true}>خدمات کارماچک</NavigationLink>
                         </li> */}
                         <li className={`mx-4 ${isActive("/contact-us") ? "text-[#3456bb]" : ""}`}>
                             <NavigationLink href="/contact-us" prefetch={true}>ارتباط با ما</NavigationLink>
                         </li>
                         <li className={`mx-4 ${isActive("/about-us") ? "text-[#3456bb]" : ""}`}>
                             <NavigationLink href="/about-us" prefetch={true}>درباره ما</NavigationLink>
                         </li>
      </ul>
    </SheetContent>
  </Sheet>
  <div className="flex items-center">
                    <Link href="/" prefetch={true} aria-label="صفحه اصلی کارماچک">
                        <Image 
                            alt="کارماچک" 
                            width={140} 
                            height={57} 
                            src={"https://api.carmacheck.com/" + data?.ImagePath}
                            priority
                            loading="eager"
                        />
                    </Link>
                   
                </div>

             
                
             
            </div>
          
        </header>
    )
});

BlogMobileHeader.displayName = 'BlogMobileHeader';