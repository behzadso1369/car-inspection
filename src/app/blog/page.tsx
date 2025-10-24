'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import ArticleCard from "./components/BlogCard";
import { Button } from "@/components/ui/button";
import SuggestionCard from "./components/SuggestionCard";

export default function Blog () {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    useEffect(() => {
      if (!api) {
        return
      }
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])
    const carouselTabData = [
        {id:1,title:"همه",link:""},
        {id:2,title:"کارشناسی خودرو",link:""},
        {id:3,title:"تعمیر خودرو",link:""},
        {id:4,title:"کارشناسی خودرو",link:""},
        {id:5,title:"تعمیر خودرو",link:""}
    ]

    return (
        <div className="px-4 font-IranSans">
             
              <Tabs defaultValue="همه" className="w-full bg-[#fbfbfc] py-6 font-IranSans px-4" dir="rtl">
              <TabsList  className="px-2 w-full" >
                      <Carousel  setApi={setApi}  className="w-full max-w-full my-4" opts={{
                direction: "rtl",
                align:"start",
                loop:false
            }}  >
        <CarouselContent>
          {carouselTabData?.map((item:any, index:number) => (
            <CarouselItem key={index} className="basis-auto" >
              

      
          <TabsTrigger className="rounded-4xl text-[#A6A6A6] border data-[state=active]:bg-[#3456bb] data-[state=active]:border-none  data-[state=active]:text-white  border-[#A6A6A6] px-4 mx-2" value={item.title}>{item.title}</TabsTrigger>

        
       
              
           
            </CarouselItem>
            
          ))}
        </CarouselContent>
    
   
      </Carousel>
      </TabsList>
      <TabsContent value="">
            1
            
        </TabsContent>
        <TabsContent value="انجام شده">
         2
        </TabsContent>
        <TabsContent value="لغو شده">
          3
        </TabsContent>
      </Tabs>
      <InputGroup  className="px-4 flex items-center !py-0 border border-[#DFDFDF] rounded-full text-[#55565A]">
  <InputGroupInput placeholder="جستجو در مقاله‌ها" />

  <InputGroupAddon align="inline-end">
  <SearchIcon />
  </InputGroupAddon>
</InputGroup>
<div className="blog-banner bg-cover rounded-2xl my-8 w-full  h-[358px]">
    

</div>
<div>
    <div className="flex justify-center flex-wrap">
    <h2 className="w-auto border-b py-2 text-center inline-block m-auto">جدیدترین‌های مقالات</h2>
    <ArticleCard title="موبایل‌هایی که برای ارتباط آنلاین
با هوش مصنوعی استفاده می‌شوند." imageSrc="/articel1.png" author="حسین احمدی" category="کارشناسی" date="۱۶ اردیبهشت ۱۴۰۴" />
    <ArticleCard title="موبایل‌هایی که برای ارتباط آنلاین
با هوش مصنوعی استفاده می‌شوند." imageSrc="/articel1.png" author="حسین احمدی" category="کارشناسی" date="۱۶ اردیبهشت ۱۴۰۴" />
    <ArticleCard title="موبایل‌هایی که برای ارتباط آنلاین
با هوش مصنوعی استفاده می‌شوند." imageSrc="/articel1.png" author="حسین احمدی" category="کارشناسی" date="۱۶ اردیبهشت ۱۴۰۴" />
    <ArticleCard title="موبایل‌هایی که برای ارتباط آنلاین
با هوش مصنوعی استفاده می‌شوند." imageSrc="/articel1.png" author="حسین احمدی" category="کارشناسی" date="۱۶ اردیبهشت ۱۴۰۴" />
<div className="flex w-full justify-center">
  <Button>مشاهده همه</Button>
</div>
<div className="flex justify-center flex-wrap">
<h2 className="w-auto border-b py-2 text-center inline-block m-auto">مطالب پیشنهادی</h2>
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