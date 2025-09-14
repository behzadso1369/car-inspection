import { NextSeo } from "next-seo";
import Image from "next/image";
import Banner from "./components/mobile/Home/Banner";
import { Slider } from "./components/mobile/Home/Slider";
import CallAction from "./components/mobile/Home/CallAction";
import Introduction from "./components/mobile/Home/Introduction";

export default function Home() {
  return (
   <div className="bg-main-background">
 
      <Banner/>
      <CallAction/>
      <Slider/>
      <Introduction/>
   </div>
  );
}
