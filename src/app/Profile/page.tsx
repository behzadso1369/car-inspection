"use client"
import { ArrowLeft01Icon, Call02Icon, Edit01Icon, Edit02Icon, Location01Icon, Logout01Icon, Logout02Icon, Logout03Icon, LogoutSquare01Icon } from "hugeicons-react";
import { ArrowLeft, ArrowRight, Edit3Icon } from "lucide-react";
import Image from "next/image";
import Requests from "./components/Requests";
import Link from "next/link";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { handleLogout } from "@/helper/logout";

// CSR - Client Side Rendering
// صفحه پروفایل باید CSR باشد چون:
// 1. نیاز به احراز هویت (token در localStorage)
// 2. داده‌های شخصی کاربر (نباید pre-render شوند)
// 3. تعاملات زیاد (logout، ویرایش، نمایش درخواست‌ها)
export default function Profile() {
    const [orders, setOrders] = useState<any>([]);
    const [decoded, setDecoded] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    
    // Decode token safely in useEffect (client-side only)
    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem("token");
                if (token && token.trim() !== "") {
                    try {
                        const decodedToken = jwtDecode(token);
                        setDecoded(decodedToken);
                        console.log(decodedToken);
                        setIsLoading(false);
                    } catch (decodeError) {
                        console.error("Error decoding token:", decodeError);
                        // Token invalid - redirect to login
                        localStorage.removeItem("token");
                        router.push("/login");
                    }
                } else {
                    // اگر token نبود، به صفحه login redirect کن
                    router.push("/login");
                }
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error in Profile component:", error);
            setIsLoading(false);
            // در صورت خطا، به login redirect کن
            if (typeof window !== 'undefined') {
                router.push("/login");
            }
        }
    }, [router]);

    useEffect(() => {
        // فقط اگه decoded موجود بود، orders رو fetch کن
        if (decoded) {
            instance.get(ApiHelper.get("GetOrders"))
                .then((res: any) => {
                    setOrders(res);
                })
                .catch((err: any) => {
                    console.error("Error fetching data:", err);
                });
        }
    }, [decoded]);
  const logOut = () => {
    handleLogout("/");
  }

  // Loading state
  if (isLoading || !decoded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-IranSans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#416CEA] mx-auto mb-4"></div>
          <p className="text-[#55565A]">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }
 
    return (


        <div className="font-IranSans pb-16">
            
        <div className="flex justify-between lg:hidden px-8 items-center pt-6 pb-4 border-b border-[#DFDFDF]">
            <div className="flex flex-col">
                <span>{decoded?.name || "کاربر"}</span>
                <span>{decoded?.userPhoneNumber || ""}</span>
            </div>
            <Edit01Icon/>
        </div>
        <div className="grid grid-cols-3 gap-4 lg:my-12">
 <Requests data={orders}/>
        <div className="col-span-3 lg:col-span-1 lg:order-0 rounded-2xl lg:border lg:border-[#D9D9D9] lg:max-h-[243px]">           
        <h3 className="text-[#101117] font-normal my-6 px-4">تنظیمات حساب</h3>   
        <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
            <div className="text-[#101117] flex">
            <Image alt="کارشناسی خودرو" src="/car-inspection-icon.svg" width={24} height={24}/>
            <Link href={"/Profile/requests"} className="mx-2 text-base" prefetch={false}>تمامی درخواست ها  </Link>
            </div>
     
        <ArrowLeft01Icon/>

        </h6>
        {/* <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
        <div className="text-[#101117] flex">
           <Location01Icon size={24}/>
            <span className="mx-2 text-base">آدرس ها</span>
            </div>
        <ArrowLeft01Icon/>

        </h6> */}
        <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
        <div className="text-[#101117] flex" onClick={logOut}>
            <Logout03Icon size={24}/>
            <span className="mx-2 text-base" >خروج</span>
            </div>
        <ArrowLeft01Icon/>

        </h6>
        </div>
        </div>
       

                       
        </div>
     
   

    )
}