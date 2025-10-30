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

export default function InsertInformation() {
     const [openModal, setOpenModal] = useState(false);
       const [selected, setSelected] = useState("1");
    return (
          <div className="bg-white font-IranSans">
              
            <div className="px-4">
                <div className="bg-white  px-4 py-6 rounded-3xl my-6">

                    <div className="flex">
                        <div>chart</div>
                        <div>
       <h3 className="text-base text-black my-2 font-medium">مرحله دوم :  روش کارشناسی</h3>
       <h4 className="text-[#55565A] font-light text-sm"> بعدی:   وارد کردن اطلاعات</h4>
       

                        </div>
                 
                    </div>

                

                </div>

            </div>
             <div className="px-4">

            <Label className="text-sm text-[#101117] font-light my-2">  نام  و نام خانوادگی *  </Label>
            <Input placeholder="09124845873" className="px-4 h-12  items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs"/>
            <Label className="text-sm text-[#101117] font-light my-2"> شماره موبایل    </Label>
            <Input placeholder="09124845873" className="px-4 h-12   items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs"/>

             </div>
             <Dialog>
<DialogTrigger>
                <Button onClick={() => setOpenModal(true)}>
                    click
                </Button>
             </DialogTrigger>
              <OtpMoldal openModal={openModal} setOpnModal={setOpenModal}/>
             </Dialog>
             
                 
          </div>
    )
}