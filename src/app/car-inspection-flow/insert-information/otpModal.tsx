"use client";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OtpMoldal({openModal,setOpnModal,remainingSeconds}:any) {
      const [timer, setTimer] = useState(remainingSeconds ? remainingSeconds : 120);
      const [isResending, setIsResending] = useState(false);
      const [isVerifying, setIsVerifying] = useState(false);
      const [phoneNumber, setPhoneNumber] = useState("");
       const router = useRouter();

      useEffect(() => {
        if (!openModal || typeof window === "undefined") return;
        setPhoneNumber(localStorage.getItem("phoneNumber") || "");
      }, [openModal]);     
         const moveToInspectionLocation = () => {
         instance.post(ApiHelper.get("MoveOrder"), {
            "isBack": false,
              "orderId": Number(localStorage.getItem("OrderId")),
              "userId": localStorage.getItem("userId"),

         })
        .then((res:any) => {
          if(res) {
   router.push("./inspection-location")
          } else {
            setIsVerifying(false);
          }
         
           
          
        
            
        }).catch((err:any) => {
          console.log(err)
          setIsVerifying(false);
        })
       }
        
      
       
      // ⏳ Countdown effect
      useEffect(() => {
        
        if (timer <= 0) return;
        const interval = setInterval(() => {
          setTimer((prev:any) => prev - 1);
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
      }
      // Cookie helper function
      const setCookie = (name: string, value: string, days: number = 30) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
      };

      const resendOtp = () => {
        const phoneNumber = localStorage.getItem("phoneNumber");
        if (!phoneNumber) {
          console.error("Phone number not found");
          return;
        }

        setIsResending(true);
        instance.post(ApiHelper.get("CheckPhoneNumber"), {
          phoneNumber: phoneNumber
        }).then((res: any) => {
          if (res?.isRegistered) {
            localStorage.setItem("userId", res?.userId);
          }
          // Reset timer
          setTimer(remainingSeconds ? remainingSeconds : 120);
          setIsResending(false);
        }).catch((err: any) => {
          console.error("Error resending OTP:", err);
          setIsResending(false);
        });
      };

      const verifyOtp = (e:any) => {
        setIsVerifying(true);
        instance.post(ApiHelper.get("UserVerify"),{
            userId:localStorage.getItem("userId"),
            otpCode:e
        }).then((res:any) => {
            if (res) {
              
              localStorage.setItem("token",res.accessToken)
              
              // Set refresh token in cookie if provided by API
              if (res?.refreshToken) {
                setCookie("refreshToken", res.refreshToken);
              }
              
              // بررسی redirectUrl و هدایت به آن صفحه
              const redirectUrl = typeof window !== 'undefined' ? localStorage.getItem("redirectUrl") : null;
              if (redirectUrl) {
                localStorage.removeItem("redirectUrl");
                router.push(redirectUrl);
              } else {
                moveToInspectionLocation();
              }
      } else {
        setIsVerifying(false);
      }
        }).catch((err:any) => {
          console.log(err);
          setIsVerifying(false);
        })
    }
    return (
          <>
              <DialogContent className="sm:max-w-[425px] bg-white font-IranSans px-2 py-8">
          <div className="relative">
          {isVerifying && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-lg bg-white/85">
              <div className="mb-3 h-12 w-12 animate-spin rounded-full border-b-2 border-[#416CEA]" />
              <span className="text-sm font-light text-[#55565A]">در حال تایید کد...</span>
            </div>
          )}
          <DialogHeader>
            <DialogTitle className="text-base text-[#101117] font-medium text-center">کد تایید را وارد کنید</DialogTitle>
            <DialogDescription className="text-sm text-[#101117] font-light text-center">
              کد تایید برای شماره {phoneNumber || "..."} ارسال گردید
            </DialogDescription>          </DialogHeader>
          <div className="grid gap-4">
           
            <div className="w-full flex justify-center">
                  <InputOTP disabled={isVerifying} onComplete={verifyOtp} className="w-auto" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup dir="ltr" >
        <InputOTPSlot index={0} className="mr-2 border border-[#B1B1B3] w-10 h-10 !rounded-[8px]"   />
      
        <InputOTPSlot index={1} className="mr-2 border border-[#B1B1B3] w-10 h-10 !rounded-[8px]"   />
    
        <InputOTPSlot   index={2} className="mr-2 border border-[#B1B1B3] w-10 h-10 !rounded-[8px]"   />
      
        <InputOTPSlot  index={3} className="mr-2 border border-[#B1B1B3] w-10 h-10 !rounded-[8px]"  />
  
        <InputOTPSlot   index={4} className="mr-2 border border-[#B1B1B3] w-10 h-10 !rounded-[8px]"  />
     
        <InputOTPSlot   index={5} className="mr-2 border border-[#B1B1B3] w-10 h-10 !rounded-[8px]"  />
      </InputOTPGroup>
    </InputOTP>
            </div>

            {timer > 0 ? (
              <span className="text-xs font-extralight text-[#55565A] text-center"> {formatTime(timer)}مانده تا دریافت مجدد کد</span>
            ) : (
              <Button 
                onClick={resendOtp}
                disabled={isResending || isVerifying}
                className="bg-[#416CEA] text-white w-full h-11 rounded-3xl mt-4 disabled:opacity-50"
              >
                {isResending ? 'در حال ارسال...' : 'ارسال مجدد کد'}
              </Button>
            )}

          </div>
          </div>
          
        </DialogContent>
          </>
        
    
     
    )
}