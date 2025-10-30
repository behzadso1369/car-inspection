"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import OpenSheet from "../CarGroupSheet";
import InspectionMethodCard from "./inspection-method-card";
import { RadioGroup } from "@/components/ui/radio-group";

export default function InspectionMethod() {
     const [isOpen, setIsOpen] = useState(false);
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
       
        {/* <SheetTrigger asChild> */}

      {/* </SheetTrigger> */}

                        </div>
                 
                    </div>
                    <Label className="my-2">نام خودرو</Label>
                                    <Input                 onClick={() => setIsOpen(true)} placeholder="نام خودرو را انتخاب کنید" className="items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs"/>
                

                </div>

            </div>
            <div className="px-4">
                 <RadioGroup defaultValue="1" value={selected} onValueChange={setSelected}>
     <InspectionMethodCard
          selected={selected}
        onSelect={setSelected} inspectionType="1" data={[]} />
                <InspectionMethodCard     selected={selected}
        onSelect={setSelected} inspectionType="2" data={[]} />
                 </RadioGroup>
           
            </div>
                  <OpenSheet isOpen={isOpen} setIsOpen={setIsOpen}  />
          </div>
    )
}