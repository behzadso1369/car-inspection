"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";


export default function InspectionTimeCard({inspectionType,data, selected, onSelect}:any) {
  
      const isSelected = selected === inspectionType;
      
      
    return (
        <div
          
          onClick={() => {
            
            if(!data.IsDisabled){
onSelect(inspectionType)
            }
          }}
           className={`px-2 cursor-pointer  rounded-3xl transition-colors  my-2 ${data?.IsDisabled ?  "bg-[#DFDFDF] !text-[#A6A6A6]":"bg-[#F0F2F4] text-[#101117]"} ${
        isSelected ? "border-[#416CEA] border-2 " : "border-[#DFDFDF] "
      }`}
      
      dir="rtl">
            <div className="py-3 px-2">
<div  className="flex justify-between items-center   text-sm ">
        <RadioGroupItem  className={`${data?.IsDisabled ? "text-[#A6A6A6]" : "text-[#1434CB]"}`} value={String(data.Id)} id={String(data.Id)} />
         {data?.IsDisabled && <Button className="bg-[#F0F2F4] text-[#A6A6A6] rounded-4xl text-xs px-1  !py-0 h-6">{data?.DisabledReason}</Button>}
        <Label htmlFor={String(data.Id)}>{data.Display}</Label>
      </div>
      {Number(data.AdditionalCost) > 0 &&    <div className="flex justify-center w-full mt-2">
          <Button className={`${data.IsDisabled ? "bg-[#bec3c5] text-[#555555]"  :"bg-[#416CEA] text-white"}  rounded-4xl text-xs px-2  !py-0 h-6`}>{data.AdditionalCost} تومان</Button>
      </div>}
   
    
      
     
            </div>
          


    
        </div>
    )

}