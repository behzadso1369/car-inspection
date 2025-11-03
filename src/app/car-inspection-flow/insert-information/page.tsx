"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import OpenSheet from "../CarGroupSheet";
import { RadioGroup } from "@/components/ui/radio-group";
import { Edit3Icon } from "lucide-react";
import Link from "next/link";
import OtpMoldal from "./otpModal";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";

export default function InsertInformation() {
     const [openModal, setOpenModal] = useState(false);
     const router = useRouter();
     const formSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
})
       const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: ""
    },
  })
      
          const login = (value:any) => {
        instance.post(ApiHelper.get("CheckPhoneNumber"),{
            phoneNumber:value
        }).then((res:any) => {
            if (res?.isRegistered) {
                localStorage.setItem("userId",res?.userId);
               
                 
                
      
           
      } else {
   
        router.push("/register");
      }
        })
    }
        function onSubmit(values: z.infer<typeof formSchema>) {
            console.log(values);
 instance.post(ApiHelper.get("UserRegister"),values)
        .then((res:any) => {
          if(res) {
                 if (res?.isRegistered) {
                    login(values.phoneNumber);

                 }else {

                 }
            setOpenModal(true)
          }else {
            
               setOpenModal(true)
          }
        
            
        }).catch((err:any) => {
          console.log(err)
        })
  }
    return (
          <div className="bg-white font-IranSans">
              
            <div className="px-4">
                <div className="bg-white  px-4 py-6 rounded-3xl my-6">

                    <div className="flex items-center">
                       <div className="aspect-[2] relative w-16 h-8 ml-4">
                                                                          <Image src="/step2.png" alt="step2.png" fill className="object-fill"/>
                                                                    </div>
                        <div>
       <h3 className="text-base text-black my-2 font-medium">مرحله دوم :  روش کارشناسی</h3>
       <h4 className="text-[#55565A] font-light text-sm"> بعدی:   وارد کردن اطلاعات</h4>
       

                        </div>
                 
                    </div>

                

                </div>

            </div>
             <div className="px-4">
                  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem >
              <FormLabel className="text-sm text-[#101117] font-light my-2">نام  و نام خانوادگی * </FormLabel>
              <FormControl>
                       <Input {...field} placeholder="محمد اسدی" className="px-4 h-12  items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs"/>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-[#101117] font-light my-2">شماره موبایل</FormLabel>
              <FormControl>
              <Input {...field} placeholder="09124845873" className="px-4 h-12   items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs"/>
              </FormControl>
              <FormDescription>
               لطفا شماره را همراه با صفر وارد کنید
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       <div className="px-4 w-full fixed flex justify-center  bottom-0 b-white   shadow-[0px_4px_32px_0px_#CBD5E0] py-5">
                     <Dialog open={openModal}>

              <OtpMoldal  openModal={openModal} setOpnModal={setOpenModal}/>
             </Dialog>
                   <Button type="submit" className="bg-[#416CEA] text-white rounded-3xl py-6 px-12 w-full" >
                ارسال پیامک
              </Button>
                    
           
                

            </div>
      </form>
    </Form>

 


             </div>
            
                
             
                 
          </div>
    )
}