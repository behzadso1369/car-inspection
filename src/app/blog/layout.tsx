import { Call02Icon } from "hugeicons-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import BlogFooter from "./components/BlogFooter";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { serverApiHelper } from "@/helper/server-fetcher";
import { BlogHeader } from "./components/BlogHeader";
import Banner from "../components/mobile/Home/Banner";
import { BlogMobileHeader } from "./components/BlogMobileHeader";

export default async function BlogLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
        let initialData = null;
         
         try {
           const data = await serverApiHelper.get("GetMasterPageData", 3600);
           initialData = data?.MasterSiteData;
         } catch (error) {
           console.error("Error fetching master data in layout:", error);
         }
    return (
        <div>
           <Banner data={[]}/>
             <div className="hidden lg:block mb-2 bg-transparent sticky top-11 z-10">
             
                  <BlogHeader data={initialData} />
                </div>
                <div className="block lg:hidden mb-2 bg-transparent sticky top-11 z-10">
             
                  <BlogMobileHeader data={initialData} />
                </div>
        {children}
        </div>
    )
}