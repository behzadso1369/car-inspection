"use client";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";


export default function InspectionTimeCard({inspectionType,data, selected, onSelect}:any) {
      const isSelected = selected === inspectionType;
      
      
    return (
        <div
          onClick={() => onSelect(inspectionType)}
           className={`px-2 cursor-pointer  rounded-3xl transition-colors bg-[#F0F2F4] my-2 ${
        isSelected ? "border-[#416CEA] border-2 " : "border-[#DFDFDF] "
      }`}
      dir="rtl">
            <div className="py-4 border-b border-[#DFDFDF]">
<div className="flex items-center gap-3 text-[#101117] text-sm">
        <RadioGroupItem disabled={data.IsDisabled} value={String(data.Id)} id={String(data.Id)} />
        <Label htmlFor={String(data.Id)}>{data.Display}</Label>
      </div>
      
     
            </div>
          


    
        </div>
    )

}