import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Register() {
    return (
         <div className="h-screen bg-[#fafdfe] flex justify-center pt-32 px-4 font-IranSans ">



        <Card className="shadow-[0px_4px_24px_0px_#EAEAEA] px-4 h-[300px] w-full">
            <h1 className="text-[#101117] font-medium text-base">ثبت نام کاربر</h1>
            <Label className="text-sm text-[#101117] font-light">  نام    </Label>
            <Input placeholder="09124845873" className="px-4  items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs"/>
            <Label className="text-sm text-[#101117] font-light"> شماره موبایل    </Label>
            <Input placeholder="09124845873" className="px-4  items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs"/>
                <Link prefetch={false} href={"./verify-otp"}  className="w-full rounded-3xl inline-block py-2 px-1 text-center text-sm  w-1/2 my-4 bg-[#3456bb] text-white">ورود</Link>

        </Card>
    </div>
    )
   

}