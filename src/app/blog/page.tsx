"use client"

export const dynamic = 'force-dynamic'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import ArticleCard from "./components/BlogCard";
import { Button } from "@/components/ui/button";
import SuggestionCard from "./components/SuggestionCard";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";

export default function Blog () {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [suggestedPost,setSuggestedPost] = useState<any>([]);
    const [newPost,setNewPost] = useState<any>([]);
    const getBlogData = () => {
      instance.get(ApiHelper.get("GetMasterBlogPageData")).then((res:any) => {
        setNewPost(res?.NewPosts);
        setSuggestedPost(res?.SuggestedPosts);
      })
    }
    useEffect(() => {
      getBlogData();
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
    {newPost.map((item:any) => (    <ArticleCard title={item?.Title} imageSrc={"https://api.carmacheck.com/" + item?.ImagePath} author="حسین احمدی" category={item.CategoryName} date="۱۶ اردیبهشت ۱۴۰۴" />))}
  <Button>مشاهده همه</Button>
</div>
<div className="flex justify-center flex-wrap">
<h2 className="w-auto border-b py-2 text-center inline-block m-auto">مطالب پیشنهادی</h2>
{suggestedPost.map((item:any) => (    <SuggestionCard title={item?.Title} imageSrc={"https://api.carmacheck.com/" + item?.ImagePath} link="/" date="۱۶ اردیبهشت ۱۴۰۴" />))}

</div>
    </div>


</div>

    
     
    
 
    )
}