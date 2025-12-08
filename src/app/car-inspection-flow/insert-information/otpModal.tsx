import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OtpMoldal({openModal,setOpnModal}:any) {
      const [timer, setTimer] = useState(60);
       const router = useRouter();
     
         const moveToInspectionLocation = () => {
         instance.post(ApiHelper.get("MoveOrder"), {
            "isBack": true,
              "orderId": Number(localStorage.getItem("OrderId")),
              "userId": localStorage.getItem("userId"),

         })
        .then((res:any) => {
          if(res) {
   router.push("./inspection-location")
          }
         
           
          
        
            
        }).catch((err:any) => {
          console.log(err)
        })
       }
        
      
       
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
      }
      // Cookie helper function
      const setCookie = (name: string, value: string, days: number = 30) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
      };

      const verifyOtp = (e:any) => {
      console.log(e)
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
      } 
        })
    }
    return (
          <>
              <DialogContent className="sm:max-w-[425px] bg-white font-IranSans px-2 py-8">
          <DialogHeader>
            <DialogTitle className="text-base text-[#101117] font-medium text-center">کد تایید را وارد کنید</DialogTitle>
            <DialogDescription className="text-sm text-[#101117] font-light text-center">
              کد تایید برای شماره {localStorage.getItem("phoneNumber")} ارسال گردید
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
           
            <div className="w-full flex justify-center">
                  <InputOTP   onComplete={verifyOtp}  className="w-auto"  maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
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

            <span className="text-xs font-extralight text-[#55565A] text-center"> {formatTime(timer)}مانده تا دریافت مجدد کد</span>

          </div>
          
        </DialogContent>
          </>
        
    
     
    )
}