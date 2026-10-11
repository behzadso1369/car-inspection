import Image from "next/image";
import { Card } from "@/components/ui/card";
import { CheckmarkCircle01Icon } from "hugeicons-react";
import { NavigationBar } from "../components/mobile/Home/NavigationBar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";
import { Metadata } from "next";
import { serverApiHelper } from "@/helper/server-fetcher";

// ISR - Incremental Static Regeneration (revalidate هر 1 ساعت)
// صفحه درباره ما محتوای نسبتاً ثابتی دارد که گاهی آپدیت می‌شود
export const revalidate = 3600; // 1 hour

// SEO Metadata
export const metadata: Metadata = {
  title: "درباره کارماچک | کارشناسی خودرو در تهران",
  description:
    "آشنایی با کارماچک، خدمات کارشناسی خودرو در محل و مرکز شرق تهران، تیم کارشناسان و روش ارائه گزارش شفاف پیش از معامله.",
  keywords: [
    "درباره کارماچک",
    "تاریخچه کارماچک",
    "کارشناسان کارماچک",
    "تجربه کارشناسی",
    "کارشناسی خودرو",
    "کارماچک",
    "carmacheck",
    "تیم کارماچک",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/about-us`,
  },
  openGraph: {
    title: "درباره کارماچک | کارشناسی خودرو در تهران",
    description:
      "کارماچک؛ کارشناسی خودرو در محل و مرکز شرق تهران با گزارش شفاف برای خریدار و فروشنده.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/about-us`,
    siteName: "کارماچک",
    locale: "fa_IR",
    type: "website",
    // تصویر OG به‌صورت داینامیک از app/opengraph-image.tsx تولید می‌شود
  },
  twitter: {
    card: "summary_large_image",
    title: "درباره کارماچک",
    description: "تیم و خدمات کارشناسی خودرو کارماچک در تهران",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Server-side data fetching با استفاده از serverApiHelper
async function getMasterPageData() {
  return await serverApiHelper.get("GetMasterPageData", 3600);
}

const experts = [
  {
    name: "بهنام زارعی",
    title: "کارشناس  حرفه ای فنی و بدنه خودرو",
    img: "/expert1.png",
  },
  {
    name: "حمید حاجی قبادلو",
    title: "کارشناس فنی خودرو",
    img: "/expert2.png",
  }
];

export default async function AboutUsPage() {
  const data = await getMasterPageData();

  return (
    <main dir="rtl" className="bg-white font-IranSans w-full">
      <section className="px-4 lg:px-16 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-right text-[#101117]">
              درباره کارماچک
            </h1>
            <div className="space-y-4 text-right text-gray-700 text-base lg:text-lg leading-8 mb-6">
              <p>
                کارماچک سرویس کارشناسی خودرو در محل و مرکز شرق تهران است. هدف ما
                این است که پیش از خرید یا فروش، وضعیت واقعی خودرو — از رنگ و بدنه
                تا بخش‌های فنی — در قالب گزارشی روشن و قابل استفاده در معامله
                ارائه شود.
              </p>
              <p>
                برای آشنایی با خدمات و مسیر رزرو،{" "}
                <Link href="/" className="font-semibold text-[#3456bb] hover:underline">
                  صفحه اصلی کارماچک
                </Link>{" "}
                را ببینید یا مستقیماً{" "}
                <Link href="/car-inspection" className="font-semibold text-[#3456bb] hover:underline">
                  درخواست کارشناسی
                </Link>{" "}
                ثبت کنید.
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

      <section className="bg-[#F0F2F4] py-8 lg:py-12 px-4 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl lg:text-3xl font-bold mb-4 text-[#101117]">
            تمرکز ما روی کارشناسی قبل از معامله است
          </h2>
          <p className="text-gray-600 text-base lg:text-lg leading-8 mb-8 max-w-3xl mx-auto">
            گزارش کارشناسی باید به شما کمک کند بفهمید کدام ایراد اهمیت بیشتری
            دارد و وضعیت خودرو چه اثری بر قیمت و تصمیم خرید یا فروش می‌گذارد.
          </p>
          <Link href="/car-inspection" className="inline-block bg-[#3456bb] hover:bg-[#3563E9] text-white rounded-3xl px-6 lg:px-36 py-2 lg:py-4 text-lg mb-8">
            ثبت درخواست کارشناسی
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-right">
            <Card className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm">
              <p className="text-lg font-bold text-[#101117] mb-2">گزارش شفاف</p>
              <p className="text-[#55565A] leading-7 text-sm lg:text-base">
                توضیح یافته‌ها به زبان ساده تا بتوانید در مذاکره و تصمیم‌گیری
                از آن استفاده کنید.
              </p>
            </Card>
            <Card className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm">
              <p className="text-lg font-bold text-[#101117] mb-2">کارشناسی در محل</p>
              <p className="text-[#55565A] leading-7 text-sm lg:text-base">
                اعزام کارشناس به آدرس شما در تهران و شرق تهران، بدون نیاز به
                جابه‌جایی خودرو.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Experts Section */}
      <section className="bg-white text-[#101117] py-12 lg:py-16 px-4 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center">
            کارشناسان حرفه‌ای
          </h2>
          <p className="max-w-3xl mx-auto text-center text-[#101117] text-base lg:text-lg leading-8 mb-12">
            کارشناسی خودرو توسط کارشناسان مجرب انجام می‌شود؛ از بررسی رنگ و بدنه
            تا بخش‌های فنی متناسب با نوع خدمت انتخابی.
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

      {/* Mobile Navigation Bar */}
      <div className="block lg:hidden">
        <NavigationBar activePath="/about-us" />
      </div>
    </main>
  );
}
