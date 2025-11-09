"use client"
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label";
import Link from "next/link";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function VerifyOtp() {
       const [value,setValue] = useState<any>("")
  const router = useRouter();
   const [timer, setTimer] = useState(120);
   
  // ⏳ Countdown effect
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // format timer as mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }; 
    const verifyOtp = (e:any) => {
        instance.post(ApiHelper.get("UserVerify"),{
            userId:localStorage.getItem("userId"),
            otpCode:e
        }).then((res:any) => {
            if (res) {
              localStorage.setItem("token",res?.accessToken)

        router.push("/profile");
      } 
        })
    }
    return (
         <div className="h-screen bg-[#fafdfe] flex justify-center px-4 font-IranSans lg:max-w-xl lg:container lg:mx-auto lg:pt-8  items-center ">



        <Card className="shadow-[0px_4px_24px_0px_#EAEAEA] px-4 h-[300px] w-full">
            <h1 className="text-[#101117] font-medium text-base text-center">کد تایید را وارد کنید</h1>
            <Label className="text-sm text-[#101117] font-light text-center">کد تایید برای شماره {localStorage.getItem("phoneNumber")} ارسال گردید</Label>
            <div className="w-full flex justify-center">
                  <InputOTP  onComplete={verifyOtp}  className="w-auto"  maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup dir="ltr">
        <InputOTPSlot index={0} className="lg:mr-3 mr-2 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"   />
      
        <InputOTPSlot index={1} className="lg:mr-3 mr-2 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"   />
    
        <InputOTPSlot   index={2} className="lg:mr-3 mr-2 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"   />
      
        <InputOTPSlot  index={3} className="lg:mr-3 mr-2 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"  />
  
        <InputOTPSlot   index={4} className="lg:mr-3 mr-2 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"  />
     
        <InputOTPSlot   index={5} className="lg:mr-3 mr-2 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"  />
      </InputOTPGroup>
    </InputOTP>
            </div>

            <span className="text-xs font-extralight text-[#55565A] text-center"> {formatTime(timer)}مانده تا دریافت مجدد کد</span>

        </Card>
    </div>
    )
   

}