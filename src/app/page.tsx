
"use client"

export const dynamic = 'force-dynamic'
import Banner from "./components/mobile/Home/Banner";
import { Slider } from "./components/mobile/Home/Slider";
import CallAction from "./components/mobile/Home/CallAction";
import Introduction from "./components/mobile/Home/Introduction";
import Services from "./components/mobile/Home/Services";
import QualityBox from "./components/mobile/Home/QualityBox";
import Statistics from "./components/mobile/Home/Statistics";
import BlogShort from "./components/mobile/Home/BlogShort";
import { NavigationBar } from "./components/mobile/Home/NavigationBar";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useEffect, useState } from "react";
import { Footer } from "./components/mobile/Home/Footer";
import { Header } from "./components/mobile/Home/Header";

export default   function  Home() {
const [data,setData] = useState<any>([]);
  useEffect(() => {
    instance.get(ApiHelper.get("GetMasterPageData"))
      .then((res: any) => {
        setData(res);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
  }, []);

 
  return (
   <div className="bg-white lg:container lg:mx-auto">
 
      <Banner data={data?.MasterSiteData?.NavbarPhoneNumber}/>
       <div className="block lg:hidden">
  <CallAction data={data?.MasterSiteData?.PhoneNumbers}/>
       </div>
          <div className="hidden lg:block px-20 mb-6 bg-white">
     <Header data={data?.MasterSiteData?.PhoneNumbers} />
     </div>
    
      <Slider data={data?.Sliders}/>
      <Introduction/>
      <Services data={data?.CarInspectionServices}/>
      <QualityBox data={data?.SecretOfOurServiceQualities?.[0]}/>
      <Statistics data={data?.StatisticsData}/>
      <BlogShort data={data?.BlogPosts}/>
      <div className="block lg:hidden">
  <NavigationBar/>
      </div>
       
      <Footer/>
     
   </div>
  );
}
