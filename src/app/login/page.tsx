"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// CSR - Client Side Rendering
// صفحات احراز هویت باید CSR باشند چون:
// 1. نیاز به localStorage و session management دارند
// 2. فرم‌های تعاملی با validation لحظه‌ای
// 3. نیازی به SEO ندارند (صفحات خصوصی)
export default function Login() {
    const [value,setValue] = useState<any>("")
  const router = useRouter();
  const searchParams = useSearchParams();

  // دریافت redirectUrl از query params یا localStorage
  useEffect(() => {
    const redirectUrlFromQuery = searchParams.get("redirectUrl");
    if (redirectUrlFromQuery && typeof window !== 'undefined') {
      localStorage.setItem("redirectUrl", redirectUrlFromQuery);
    }
  }, [searchParams]);

    const login = () => {
        instance.post(ApiHelper.get("CheckPhoneNumber"),{
            phoneNumber:value
        }).then((res:any) => {
            if (res?.isRegistered) {
                localStorage.setItem("userId",res?.userId);
                localStorage.setItem("phoneNumber",value);
                   const expiryTimestamp = Date.now() + res?.remainingSeconds * 1000;
                
      
           router.push(`/verify-otp?expiry=${expiryTimestamp}`);
      } else {
   
        router.push("/register");
      }
        })
    }
    return (
         <div className="h-screen bg-[#fafdfe] flex justify-center px-4 font-IranSans lg:max-w-xl lg:container lg:mx-auto lg:pt-8  items-center ">



        <Card className="shadow-[0px_4px_24px_0px_#EAEAEA] px-4 h-[300px] w-full">
            <h1 className="text-[#101117] font-medium text-base">ورود کاربر</h1>
            <Label className="text-sm text-[#101117] font-light">لطفا شماره موبایل خود را وارد نمایید</Label>
            <Input onChange={(e:any) => {
                setValue(e.target.value)
            }} placeholder="09124845873" className="px-4  items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs"/>
            <span className="text-xs font-extralight text-[#55565A]">لطفا شماره را همراه با صفر وارد کنید</span>
            
                <Button onClick={login} className="w-full rounded-3xl inline-block py-2 px-1 text-center text-sm  my-4 bg-[#3456bb] text-white">ورود</Button>

        </Card>
    </div>
    )
   

}