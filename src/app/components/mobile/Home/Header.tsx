"use client";
import { Call02Icon } from "hugeicons-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Header = ({data}:any) => {
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



        <header  className="w-full shadow-[0px_4px_32px_0px_#CBD5E099] px-8 py-4 bg-white rounded-b-3xl font-IranSans">
     
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                                                        <Image alt="کارچک" width={62} height={57} src={"/assets/images/logo.svg"}/>
                            <h1 className="font-IranSans-UltraLight text-4xl text-black mx-1 font-semibold">{data?.MasterSiteData?.CompanyName}</h1>
                        </div>

                            <ul className="flex text-base">
                                <li className={`mx-4 ${isActive("/") ? "text-[#3456bb]" : ""}`}>
                                    <Link href="/" prefetch={false}>خانه</Link>
                                </li>
                                <li className={`mx-4 ${isActive("/car-inspection-flow/select-car-group") ? "text-[#3456bb]" : ""}`}>
                                    <Link href="/car-inspection-flow/select-car-group" prefetch={false}>کارشناسی خودرو</Link>
                                </li>
                                <li className={`mx-4 ${isActive("/services") ? "text-[#3456bb]" : ""}`}>
                                    <Link href="/services" prefetch={false}>خدمات کارچک</Link>
                                </li>
                                <li className={`mx-4 ${isActive("/contact-us") ? "text-[#3456bb]" : ""}`}>
                                    <Link href="/contact-us" prefetch={false}>ارتباط با ما</Link>
                                </li>
                                <li className={`mx-4 ${isActive("/about-us") ? "text-[#3456bb]" : ""}`}>
                                      <Link href="/about-us" prefetch={false}>درباره ما</Link>
                                </li>
                            </ul>
                                              <span className="text-[#101117] flex items-center font-IranSans">
                
                
                     <a  className="rounded-3xl font-IranSans-UltraLight border border-white px-2" href={`tel:${data?.MasterSiteData?.NavbarPhoneNumber}`}>{data?.MasterSiteData?.NavbarPhoneNumber}</a>
             
                <Call02Icon size={16}/>
            </span>
                            </div>
            


          
            
        </header>
    )
}