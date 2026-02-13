"use client"

export const dynamic = 'force-dynamic'
import SuggestionCard from "../components/SuggestionCard";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function BlogCategory() {
     const searchParams = useSearchParams();
     const categoryName = searchParams.get("category") || "";
     const categoryIdParam = searchParams.get("id");
     const [posts,setPosts] = useState<any>([])
     const [isLoading, setIsLoading] = useState(true);
     
     const getCategoryWithId = (categoryId:number) => {
         if (!categoryId) return;
         setIsLoading(true);
         instance.get(ApiHelper.get("SearchCategoryWithId") + "?id=" +  categoryId).then((res:any) => {
             if(res) {
                 setPosts(res?.CategoryPosts);
             }
             setIsLoading(false);
         }).catch((err: any) => {
             console.error("Error fetching category posts:", err);
             setIsLoading(false);
         })
     }
        
     useEffect(() => {
         if (categoryIdParam) {
             const id = Number(categoryIdParam);
             getCategoryWithId(id);
         }
     }, [categoryIdParam])
       
        const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : "";
        
        if (isLoading) {
            return (
                <div className="px-4 font-IranSans py-8 text-center">
                    <p className="text-[#55565A]">در حال بارگذاری...</p>
                </div>
            );
        }
        
        return (
        <div className="px-4 font-IranSans py-4">
            <Breadcrumb 
              items={[
                { label: "خانه", href: "/" },
                { label: "بلاگ", href: "/blog" },
                ...(decodedCategoryName ? [{ label: decodedCategoryName }] : [])
              ]}
              className="mb-4"
            />
            
            {decodedCategoryName && (
                <h1 className="text-2xl md:text-3xl font-bold text-[#101117] mb-6">
                    {decodedCategoryName}
                </h1>
            )}
            
            <div className="flex justify-center flex-wrap">
                <div className="grid grid-cols-4 gap-4 w-full">
                    {posts && posts.length > 0 ? (
                        <>
                            {posts.map((item:any) => (
                                <SuggestionCard 
                                    key={item?.Id}
                                    date={item?.CreatedOn} 
                                    title={item?.Title} 
                                    imageSrc={"https://api.carmacheck.com/" + item?.ImagePath} 
                                    link={`/blog/${item?.Id}`} 
                                />
                            ))}
                        </>
                    ) : (
                        <div className="col-span-4 text-center py-8 text-[#55565A]">
                            هیچ بلاگی برای این دسته بندی وجود ندارد
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
