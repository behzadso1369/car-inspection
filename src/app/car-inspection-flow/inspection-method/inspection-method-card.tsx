"use client";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";


export default function InspectionMethodCard({inspectionType,data, selected, onSelect}:any) {
    const [showMore,setShowMore] = useState(false);
      const isSelected = selected === inspectionType;
    return (
        <div
          onClick={() => onSelect(inspectionType)}
           className={`px-2 cursor-pointer border rounded-3xl transition-colors ${
        isSelected ? " border-[#416CEA]" : "border-[#DFDFDF]"
      }`}
      dir="rtl">
            <div className="py-4 border-b border-[#DFDFDF]">
<div className="flex items-center gap-3 text-[#101117] text-sm">
        <RadioGroupItem value={String(data.Id)} id={String(data.Id)} />
        <Label htmlFor={String(data.Id)}>{data.InspectionTypeName}</Label>
      </div>
      
      <div className="px-6 grid grid-cols-2 text-xs font-light text-[#55565A]">
       {data.Features.slice(0,6).map((item:any) => (
        <span className="my-1">
          {item.Name}
        </span>
       ))}
        {(!showMore && data.Features.length > 6) && <span className="my-1" onClick={() => setShowMore(true)}>
               مشاهده بیشتر
        </span>}
      
       

      </div>
      {showMore &&   <div className="px-6 grid grid-cols-2 text-xs font-light text-[#55565A]" >
          {data.Features.slice(6,data.Features.length - 1).map((item:any) => (
        <span className="my-1">
          {item.Name}
        </span>
       ))}
          
      </div>}
            </div>
            <div className="flex justify-between px-4 py-3">
                <div className="flex flex-col">
                    <span className="text-[#101117] font-medium text-sm">قیمت بازار</span>
                    <div className="flex">
      <span className="text-[#55565A] text-m font-light">{ data.MarketPrice.toLocaleString()} </span>
                    <span className="text-[#55565A] text-m font-light">تومان</span>
                    </div>
              
                </div>
                {data?.AdditionalCost > 0 &&      <div className="text-[11px] lg:text-base flex items-center">
                  <span className="text-[#416CEA] font-bold bg-[#F0F2F4] p-2 rounded-3xl"> {data?.AdditionalCost.toLocaleString()}+ تومان</span>
                </div>}
           
                <div className="flex flex-col">
                    <span className="text-[#101117] font-medium text-sm">قیمت کارماچک</span>
                      <div className="flex">
                         <span className="text-[#55565A] text-m font-light">{data?.AdditionalCost > 0 ? (data.OurPrice + data.AdditionalCost).toLocaleString() : data.OurPrice.toLocaleString()} </span>
                    <span className="text-[#55565A] text-m font-light">تومان </span>
                      </div>
                   
                </div>

            </div>


    
        </div>
    )

}