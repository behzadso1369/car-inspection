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
        <RadioGroupItem value={inspectionType} id={inspectionType} />
        <Label htmlFor={inspectionType}>{inspectionType}</Label>
      </div>
      
      <div className="px-6 grid grid-cols-2 text-xs font-light text-[#55565A]">
        <span className="my-1">
            بررسی رنگ و بدنه
        </span>
        <span className="my-1">
            بررسی رنگ و بدنه
        </span>
        <span className="my-1">
            بررسی رنگ و بدنه
        </span>
        <span className="my-1">
            بررسی رنگ و بدنه
        </span>
        <span className="my-1">
            بررسی رنگ و بدنه
        </span>
        <span className="my-1">
            بررسی رنگ و بدنه
        </span>
        <span className="my-1">
            بررسی رنگ و بدنه
        </span>
        <span className="my-1">
            بررسی رنگ و بدنه
        </span>
        {!showMore && <span className="my-1" onClick={() => setShowMore(true)}>
               مشاهده بیشتر
        </span>}
      
       

      </div>
      {showMore &&   <div className="px-6 grid grid-cols-2 text-xs font-light text-[#55565A]" >
          <span className="my-1">
            بررسی رنگ و بدنه
        </span>
          <span className="my-1">
            بررسی رنگ و بدنه
        </span>
          <span className="my-1">
            بررسی رنگ و بدنه
        </span>
          <span className="my-1">
            بررسی رنگ و بدنه
        </span>
          <span className="my-1">
            بررسی رنگ و بدنه
        </span>
      </div>}
            </div>
            <div className="flex justify-between px-4 py-3">
                <div className="flex flex-col">
                    <span className="text-[#101117] font-medium text-sm">قیمت بازار</span>
                    <div className="flex">
      <span className="text-[#55565A] text-m font-light">5,028,000 </span>
                    <span className="text-[#55565A] text-m font-light">تومان</span>
                    </div>
              
                </div>
                <div className="flex flex-col">
                    <span className="text-[#101117] font-medium text-sm">قیمت کارچک</span>
                      <div className="flex">
                         <span className="text-[#55565A] text-m font-light">5,028,000 </span>
                    <span className="text-[#55565A] text-m font-light">تومان </span>
                      </div>
                   
                </div>

            </div>


    
        </div>
    )

}