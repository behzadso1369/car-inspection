
"use client"
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

export default   function  Home() {
const [data,setData] = useState<any>([]);
  useEffect(() => {
    instance.get(ApiHelper.get("GetMasterPageData"))
      .then((res: any) => {
        console.log(res);
        setData(res);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
  }, []);

 
  return (
   <div className="bg-main-background">
 
      <Banner data={data?.MasterSiteData?.NavbarPhoneNumber}/>
      <CallAction data={data?.MasterSiteData?.PhoneNumbers}/>
      <Slider data={data?.MasterSiteData?.Sliders}/>
      <Introduction/>
      <Services data={data?.CarInspectionServices}/>
      <QualityBox data={data?.SecretOfOurServiceQualities?.[0]}/>
      <Statistics data={data?.StatisticsData}/>
      <BlogShort/>
      <NavigationBar/>
   </div>
  );
}
