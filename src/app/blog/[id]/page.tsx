'use client'
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import SuggestionCard from "../components/SuggestionCard";

export default function BlogCategory() {
        return (
        <div className="px-4 font-IranSans py-4">
          
      <InputGroup  className="px-4 flex items-center !py-0 border border-[#DFDFDF] rounded-full text-[#55565A]">
  <InputGroupInput placeholder="جستجو در مقاله‌ها" />

  <InputGroupAddon align="inline-end">
  <SearchIcon />
  </InputGroupAddon>
</InputGroup>
<div>
    <div className="flex justify-center flex-wrap">

   
<div className="flex justify-center flex-wrap">
<h2 className="w-auto border-b py-2 text-center inline-block m-auto">کارشناسی خودرو</h2>
  <SuggestionCard date="۲۵ بهمن ۱۴۰۳" title="۵ اشتباه رایج مدیران تازه‌کار و روش‌های جلوگیری از آن‌ها" imageSrc="/suggestionCard1.png" link="/" />
  <SuggestionCard date="۲۵ بهمن ۱۴۰۳" title="۵ اشتباه رایج مدیران تازه‌کار و روش‌های جلوگیری از آن‌ها" imageSrc="/suggestionCard2.jpg" link="/" />
  <SuggestionCard date="۲۵ بهمن ۱۴۰۳" title="۵ اشتباه رایج مدیران تازه‌کار و روش‌های جلوگیری از آن‌ها" imageSrc="/suggestionCard3.jpg" link="/" />
  <SuggestionCard date="۲۵ بهمن ۱۴۰۳" title="۵ اشتباه رایج مدیران تازه‌کار و روش‌های جلوگیری از آن‌ها" imageSrc="/suggestionCard1.png" link="/" />
</div>
    </div>


</div>

    
     
    
            
        </div>
    )
}
