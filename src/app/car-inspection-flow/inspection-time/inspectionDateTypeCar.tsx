"use client";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";


export default function InspectionDateTypeCar({inspectionType,data, selected, onSelect}:any) {
  
      const isSelected = selected === inspectionType;
      
    return (
        <div
          onClick={() => onSelect(inspectionType)}
           className={`px-2 cursor-pointer border rounded-3xl transition-colors ${
        isSelected ? " border-[#416CEA]" : "border-[#DFDFDF]"
      }`}
      dir="rtl">
            <div className="py-4 border-b border-[#DFDFDF]">
<div className="flex justify-between items-center  text-[#101117] text-sm">
  <div className="flex items-center gap-3 h-auto">
  <RadioGroupItem value={String(data.Id)} id={String(data.Id)} />
  <Label htmlFor={String(data.Id)} className="text-[#101117]">{data.Name}</Label>
  </div>
    
        {data?.MaxMinutes === 0 &&      <div className="text-sm flex items-center">
                  <span className="text-[#416CEA] font-bold bg-[#F0F2F4] px-2 py-1 rounded-3xl"> {data?.AdditionalCost.toLocaleString()}+ تومان</span>
                </div>}
      </div>
    
      <div className="text-[#55565A] my-2 text-sm flex">
        {data.InspectionTypeDescription}
    
      </div>
      
     
            </div>
          


    
        </div>
    )

}