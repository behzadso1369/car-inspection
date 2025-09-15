import { NextSeo } from "next-seo";
import Image from "next/image";
import Banner from "./components/mobile/Home/Banner";
import { Slider } from "./components/mobile/Home/Slider";
import CallAction from "./components/mobile/Home/CallAction";
import Introduction from "./components/mobile/Home/Introduction";
import Services from "./components/mobile/Home/Services";
import QualityBox from "./components/mobile/Home/QualityBox";
import Statistics from "./components/mobile/Home/Statistics";
import BlogShort from "./components/mobile/Home/BlogShort";

export default function Home() {
  return (
   <div className="bg-main-background">
 
      <Banner/>
      <CallAction/>
      <Slider/>
      <Introduction/>
      <Services/>
      <QualityBox/>
      <Statistics/>
      <BlogShort/>
   </div>
  );
}
