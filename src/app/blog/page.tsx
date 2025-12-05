"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import SuggestionCard from "./components/SuggestionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { NextSeo } from "next-seo";

// این صفحه باید CSR بماند چون تعامل زیادی با کاربر دارد (search, tabs, carousel)
// و نیاز به state management در client دارد
export default function Blog() {
     const [api, setApi] = useState<CarouselApi>();
       const [carouselTabData,setCategoryTabData] = useState<any>([]);
       const [firstCategoryData,setFirstCategoryData] = useState<number>(1);
       const [categoryId,setCategoryId] = useState<any>(null);
       const [posts,setPosts] = useState<any>([])
        const getCategory = () => {
            instance.post(ApiHelper.get("SearchWithTermsCategory"),{
                terms: ""
            }).then((res:any) => {
                if(res) {
   setCategoryTabData(res?.CategoryItems);
                setFirstCategoryData(res?.CategoryItems[0]?.Id);
                setCategoryId(res?.CategoryItems[0]?.Id);
                }
             
                
            })
        }
        const getCategoryWithId = (categoryId:number) => {
            instance.get(ApiHelper.get("SearchCategoryWithId") + "?id=" +  categoryId).then((res:any) => {
                if(res) {
   setPosts(res?.CategoryPosts);
                }
             
                
            })
        }
      useEffect(() => {
        getCategory();
      
          if (!api) {
            return
          }
          
        }, [api])
        useEffect(() => {
            getCategoryWithId(firstCategoryData);
        },[firstCategoryData])
       
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://carmacheck.com';
       
        return (
        <>
          <NextSeo
            title="مقالات کارشناسی خودرو | مجله کارچک"
            description="مقالات تخصصی درباره کارشناسی خودرو، نکات خرید ماشین، بررسی عیوب رایج، راهنمای خرید خودرو و مطالب آموزشی برای خریداران"
            canonical={`${baseUrl}/blog`}
            openGraph={{
              title: "مقالات کارشناسی خودرو | مجله کارچک",
              description: "مقالات تخصصی درباره کارشناسی خودرو و خرید ماشین",
              url: `${baseUrl}/blog`,
              siteName: "کارچک",
              locale: "fa_IR",
              type: "website",
            }}
            additionalMetaTags={[
              {
                name: "keywords",
                content: "مقالات خودرو,آموزش خرید ماشین,نکات کارشناسی,مجله خودرو,کارشناسی خودرو,بلاگ خودرو",
              },
            ]}
          />
        <div className="px-4 font-IranSans py-4">
          
      <InputGroup  className="px-4 flex items-center !py-0 border border-[#DFDFDF] rounded-full text-[#55565A]">
  <InputGroupInput placeholder="جستجو در مقاله‌ها" />

  <InputGroupAddon align="inline-end">
  <SearchIcon />
  </InputGroupAddon>
</InputGroup>
 <Tabs onValueChange={(e:any) => {
   console.log(e);
   setFirstCategoryData(Number(e))
 }} defaultValue={String(firstCategoryData)} className="w-full bg-[#fbfbfc] py-6 font-IranSans" dir="rtl">
              <TabsList  className="px-2 w-full" >
                      <Carousel  setApi={setApi}  className="w-full max-w-full my-4" opts={{
                direction: "rtl",
                align:"start",
                loop:false
            }}  >
        <CarouselContent>
          {carouselTabData?.map((item:any, index:number) => (
            <CarouselItem key={index} className="basis-auto" >
              

      
          <TabsTrigger key={index} className="rounded-4xl text-[#A6A6A6] border data-[state=active]:bg-[#3456bb] data-[state=active]:border-none  data-[state=active]:text-white  border-[#A6A6A6] px-4 mx-2" value={String(item.Id)}>{item.Name}</TabsTrigger>

        
       
              
           
            </CarouselItem>
            
          ))}
        </CarouselContent>
    
   
      </Carousel>
      </TabsList>
     {carouselTabData?.map((item:any, index:number) => (
   <TabsContent key={item.Id} value={String(item.Id)}>
           <div className="flex justify-center flex-wrap">

   
<div className="grid grid-cols-4 gap-4">
    {posts && posts.length > 0 ? <>
    {posts.map((item:any) => (
  <SuggestionCard date="۲۵ بهمن ۱۴۰۳" title={item?.Title} imageSrc={"https://api.carmacheck.com/" + item?.ImagePath} link="/" />
    ))}
    </> : <div className="col-span-4">هیچ بلاگی برای این دسته بندی وجود ندارد</div>}
    
</div>
    </div>
            
        </TabsContent>
       ))}
      </Tabs>
<div>
    


</div>

    
     
    
            
        </div>
        </>
    )
}
