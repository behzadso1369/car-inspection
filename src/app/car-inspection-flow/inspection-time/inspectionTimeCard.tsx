"use client";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";


export default function InspectionTimeCard({inspectionType,data, selected, onSelect,desc}:any) {
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
        <div>{desc}</div>
      </div>
            </div>
          


    
        </div>
    )

}