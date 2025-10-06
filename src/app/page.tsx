import Banner from "./components/mobile/Home/Banner";
import { Slider } from "./components/mobile/Home/Slider";
import CallAction from "./components/mobile/Home/CallAction";
import Introduction from "./components/mobile/Home/Introduction";
import Services from "./components/mobile/Home/Services";
import QualityBox from "./components/mobile/Home/QualityBox";
import Statistics from "./components/mobile/Home/Statistics";
import BlogShort from "./components/mobile/Home/BlogShort";
import { NavigationBar } from "./components/mobile/Home/NavigationBar";

export default async function  Home() {
        const res = await fetch(`http://45.139.11.225:5533/api/Site/GetMasterPageData`,{
        cache: "no-store"
      });
  const products = await res.json();
 console.log(products);
 
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
      <NavigationBar/>
   </div>
  );
}
