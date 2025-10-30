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
      const verifyOtp = (e:any) => {
      console.log(e)
        instance.post(ApiHelper.get("UserVerify"),{
            userId:localStorage.getItem("userId"),
            otpCode:e
        }).then((res:any) => {
            if (res) {
              debugger
              localStorage.setItem("token",res.accessToken)
              
        router.push("/Profile");
      } 
        })
    }
    return (
          <>
              <DialogContent className="sm:max-w-[425px] bg-white font-IranSans">
          <DialogHeader>
            <DialogTitle className="text-base text-[#101117] font-medium">کد تایید را وارد کنید</DialogTitle>
            <DialogDescription className="text-sm text-[#101117] font-light">
              کد تایید برای شماره {localStorage.getItem("phoneNumber")} ارسال گردید
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
           
            <div className="w-full flex justify-center">
                  <InputOTP   onComplete={verifyOtp}  className="w-auto"  maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup dir="ltr" >
        <InputOTPSlot index={0} className="mr-3 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"   />
      
        <InputOTPSlot index={1} className="mr-3 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"   />
    
        <InputOTPSlot   index={2} className="mr-3 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"   />
      
        <InputOTPSlot  index={3} className="mr-3 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"  />
  
        <InputOTPSlot   index={4} className="mr-3 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"  />
     
        <InputOTPSlot   index={5} className="mr-3 border border-[#B1B1B3] w-12 h-12 !rounded-[8px]"  />
      </InputOTPGroup>
    </InputOTP>
            </div>

            <span className="text-xs font-extralight text-[#55565A] text-center"> {formatTime(timer)}مانده تا دریافت مجدد کد</span>

          </div>
          
        </DialogContent>
          </>
        
    
     
    )
}