"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckmarkCircle01Icon } from "hugeicons-react";
import Banner from "../components/mobile/Home/Banner";
import { Header } from "../components/mobile/Home/Header";
import CallAction from "../components/mobile/Home/CallAction";
import { Footer } from "../components/mobile/Home/Footer";
import { NavigationBar } from "../components/mobile/Home/NavigationBar";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";

const experts = [
  {
    name: "صالح حردانی",
    title: "برق کار خودرو",
    img: "/expert1.png",
  },
  {
    name: "مهران احمدی",
    title: "تکنسین تعمیر بدنه",
    img: "/expert2.png",
  },
  {
    name: "علیرضا کوشکی",
    title: "تکنسین صافکاری",
    img: "/expert3.png",
  },
  {
    name: "روزبه چشمی",
    title: "تکنسین لاستیک و بالانس",
    img: "/expert4.png",
  },
  {
    name: "روزبه چشمی",
    title: "تکنسین لاستیک و بالانس",
    img: "/expert4.png",
  },
];

export default function AboutUsPage() {
  const [data, setData] = useState<any>([]);
  
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
    <div dir="rtl" className="bg-white font-IranSans w-full">
      <Banner data={data?.MasterSiteData?.NavbarPhoneNumber} />
      
      {/* Mobile Header */}
      <div className="block lg:hidden">
        <CallAction data={data?.MasterSiteData?.PhoneNumbers} />
      </div>
    
          <div className="hidden lg:block px-20 mb-6 bg-transparent sticky  top-11 z-10">
               <Header data={data} />
               </div>

      {/* About Us Section */}
      <section className="px-4 lg:px-16 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Image */}
       
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-right text-[#101117]">
              درباره ما
            </h2>
            
            <div className="space-y-4 text-right text-gray-700 text-base lg:text-lg leading-8 mb-6">
              <p>
                ما تیمی با تجربه و کارآمد داریم که با دقت و تعهد کار می‌کنه تا مطمئن بشیم خودروی شما همیشه در بهترین وضعیت ممکن قرار داره. در هر سرویس دوره‌ای چراغ‌ها، سیستم برق و سایر قطعاتی که ممکنه دچار استهلاک بشن رو بررسی می‌کنیم.
              </p>
            </div>
            
            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-right">
                <CheckmarkCircle01Icon color="#416CEA" size={24} />
                <span className="text-lg text-[#101117]">کیفیت بالا</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <CheckmarkCircle01Icon color="#416CEA" size={24} />
                <span className="text-lg text-[#101117]">قابل اعتماد</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <CheckmarkCircle01Icon color="#416CEA" size={24} />
                <span className="text-lg text-[#101117]">رضایت مشتریان</span>
              </div>
            </div>
          </div>
             <div className="w-full lg:w-1/2">
            <Image
              src="/about-us-main-page.jpg"
              alt="مکانیک در حال کار"
              width={600}
              height={400}
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-[#F0F2F4] py-8 lg:py-12 px-4 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl lg:text-3xl font-bold mb-4 text-[#101117]">
            با بیش از ۲۵ سال تجربه تخصصی در خدمات خودرو
          </h3>
          
          <p className="text-gray-600 text-base lg:text-lg leading-8 mb-8 max-w-3xl mx-auto">
            ارزش یعنی خدمت همراه با اعتماد. اعتمادی که مشتریان به شما دارند. اعتمادی که شما به تیم، استراتژی‌ها و سیستم‌های خود دارید و اینکه همیشه مطابق انتظار نتیجه را تحویل دهید.
          </p>
          
          <Link href="./car-inspection-flow/select-car-group" className="bg-[#3456bb] hover:bg-[#3563E9] text-white rounded-3xl px-36 py-4 text-lg mb-8">
            ثبت درخواست
          </Link>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16  flex items-center justify-center mb-4">
                 <Image src={"/دقت در گزارش.png"} alt="دقت در گزارش" height={62} width={56} />
                </div>
                <div className="text-lg lg:text-3xl  text-[#55565A] mb-2">
                  بیش از 
                </div>
                <div className="text-4xl lg:text-3xl font-bold text-[#101117] mb-2">
                   90% 
                </div>
                <div className="text-lg lg:text-base text-[#55565A]">
                  دقت در گزارش کارشناسی
                </div>
              </div>
            </Card>
            
            <Card className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                 <Image src={"/کارشناسان موفق.png"} alt="کارشناسان موفق" height={62} width={56} />
                </div>
                <div className="text-lg lg:text-3xl  text-[#55565A] mb-2">
                  بیش از 
                </div>
                  <div className="text-4xl lg:text-3xl font-bold text-[#101117] mb-2">
                25000
                </div>
                <div className="text-lg lg:text-3xl  text-[#55565A] mb-2">
                  کارشناسی موفق
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Experts Section */}
      <section className="bg-white text-[#101117] py-12 lg:py-16 px-4 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-center">
            کارشناسان حرفه ای
          </h3>
          
          <p className="max-w-3xl mx-auto text-center text-[#101117] text-base lg:text-lg leading-8 mb-12">
            از مدت‌ها پیش ثابت شده که وقتی یک خواننده به چیدمان و طراحی یک صفحه نگاه می‌کند، محتوای قابل خواندن صفحه او را از تمرکز اصلی‌اش منحرف می‌کند. دلیل استفاده از متن لورم ایپسوم این است که توزیع حروف در آن تقریباً شبیه به یک متن معمولی است.
          </p>
          
          <div className="w-full ">
              <Carousel   className="w-full max-w-full " opts={{
                direction: "rtl",
                align:"center",
                loop:true
            }}  >
        <CarouselContent>
          {experts?.map((item:any, index:number) => (
            <CarouselItem key={index} className="basis-4/5 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5" >
              
 <div key={index} className="flex flex-col items-center w-full">
                <div className="w-full  lg:w-40 lg:h-40 rounded-2xl overflow-hidden mb-4 ">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-bold text-base lg:text-lg mb-2 text-center">
                  {item.name}
                </div>
                <div className="text-sm lg:text-base text-gray-400 text-center">
                  {item.title}
                </div>
              </div>
              
           
            </CarouselItem>
          ))}
        </CarouselContent>
    
      </Carousel>
          
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Mobile Navigation Bar */}
      <div className="block lg:hidden">
        <NavigationBar />
      </div>
    </div>
  );
}
