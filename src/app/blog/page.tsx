"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";
import SuggestionCard from "./components/SuggestionCard";

// این صفحه باید CSR بماند چون تعامل زیادی با کاربر دارد (search, tabs, carousel)
// و نیاز به state management در client دارد
export default function Blog() {
     const router = useRouter();
     const [api, setApi] = useState<CarouselApi>();
     const [carouselTabData,setCategoryTabData] = useState<any>([]);
     const [activeTab, setActiveTab] = useState<string>("all");
     const [allPosts, setAllPosts] = useState<any>([]);
     const [isLoading, setIsLoading] = useState(false);
     
     const getCategory = () => {
         instance.post(ApiHelper.get("SearchWithTermsCategory"),{
             terms: ""
         }).then((res:any) => {
             if(res && res?.CategoryItems && res?.CategoryItems.length > 0) {
                 setCategoryTabData(res?.CategoryItems);
             }
         })
     }
     
     const getAllBlogs = () => {
         setIsLoading(true);
         // Call SiteBlogSearchWithTerms for "همه" tab
         instance.post(ApiHelper.get("SiteBlogSearchWithTerms"), {
             terms: ""
         })
             .then((res:any) => {
                 if(res) {
                     // The response structure might be different, adjust based on actual API response
                     setAllPosts(res?.SearchItems);
                 }
                 setIsLoading(false);
             })
             .catch((err: any) => {
                 console.error("Error fetching all blogs:", err);
                 setIsLoading(false);
             })
     }
    
     useEffect(() => {
         getCategory();
         getAllBlogs(); // Load all blogs initially
         if (!api) {
             return
         }
     }, [api])
     
     useEffect(() => {
         if (activeTab === "all") {
             getAllBlogs();
         }
     }, [activeTab])
       
        return (
        <div className="px-4 font-IranSans py-4 max-w-6xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "خانه", href: "/" },
                { label: "بلاگ" }
              ]}
              className="mb-4"
            />
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full bg-white font-IranSans" dir="rtl">
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 w-full">
                <InputGroup  className="px-4 mb-4 lg:mb-0 w-full lg:w-1/3 flex items-center !py-0 border border-[#DFDFDF] rounded-full text-[#55565A] order-1 lg:order-2">
                  <InputGroupInput placeholder="جستجو در مقاله‌ها" />

                  <InputGroupAddon align="inline-end">
                  <SearchIcon />
                  </InputGroupAddon>
                </InputGroup>
                <TabsList  className="px-2 w-full lg:flex-1 order-2 lg:order-1" >
                        <Carousel  setApi={setApi}  className="w-full max-w-full my-4" opts={{
                  direction: "rtl",
                  align:"start",
                  loop:false
              }}  >
          <CarouselContent>
            {/* همه tab */}
            <CarouselItem className="basis-auto">
              <TabsTrigger 
                className="rounded-4xl text-[#A6A6A6] border data-[state=active]:bg-[#3456bb] data-[state=active]:border-none  data-[state=active]:text-white  border-[#A6A6A6] px-4 mx-2" 
                value="all"
              >
                همه
              </TabsTrigger>
            </CarouselItem>
            
            {/* Category tabs */}
            {carouselTabData?.map((item:any, index:number) => (
              <CarouselItem key={index} className="basis-auto" >
            <TabsTrigger 
              key={index} 
              className="rounded-4xl text-[#A6A6A6] border data-[state=active]:bg-[#3456bb] data-[state=active]:border-none  data-[state=active]:text-white  border-[#A6A6A6] px-4 mx-2" 
              value={String(item.Id)}
              onClick={() => {
                const categoryName = encodeURIComponent(item.Name);
                router.push(`/blog/blog-category?category=${categoryName}&id=${item.Id}`);
              }}
            >
              {item.Name}
            </TabsTrigger>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        </TabsList>
              </div>
              
              {/* Show all blogs when "همه" tab is active */}
              {activeTab === "all" && (
                <div className="mt-6">
                  <div className="flex justify-center flex-wrap">
                    <div className="grid grid-cols-4 gap-4 w-full">
                      {isLoading ? (
                        <div className="col-span-4 text-center py-8 text-[#55565A]">
                          در حال بارگذاری...
                        </div>
                      ) : allPosts && allPosts.length > 0 ? (
                        <>
                          {allPosts.map((item:any) => (
                            <SuggestionCard 
                              key={item?.Id}
                              date={item?.CreatedOn} 
                              excerpt={item?.Excerpt}
                              title={item?.Title} 
                              imageSrc={"https://api.carmacheck.com/" + item?.ImagePath} 
                              link={`../blog/${item?.BlogPostId}`} 
                            />
                          ))}
                        </>
                      ) : (
                        <div className="col-span-4 text-center py-8 text-[#55565A]">
                          هیچ بلاگی یافت نشد
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
      </Tabs>
        </div>
    )
}
