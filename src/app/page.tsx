import { Slider } from "./components/mobile/Home/Slider";
import Introduction from "./components/mobile/Home/Introduction";
import Services from "./components/mobile/Home/Services";
import QualityBox from "./components/mobile/Home/QualityBox";
import Statistics from "./components/mobile/Home/Statistics";
import BlogShort from "./components/mobile/Home/BlogShort";
import { NavigationBar } from "./components/mobile/Home/NavigationBar";
import { Metadata } from "next";
import Link from "next/link";
import { serverApiHelper } from "@/helper/server-fetcher";
import { LOCAL_AREAS } from "@/lib/local-areas";

// ISR - Incremental Static Regeneration (revalidate هر 10 دقیقه)
// صفحه اصلی محتوای دینامیک دارد (بلاگ‌ها، سرویس‌ها) اما نیازی به fetch در هر request نیست
export const revalidate = 600; // 10 minutes

// SEO Metadata
export const metadata: Metadata = {
  title: "کارماچک | کارشناسی خودرو شرق تهران، تهرانپارس، نارمک و رسالت",
  description: "کارشناسی خودرو در محل، شرق تهران (تهرانپارس، نارمک، رسالت، فرجام) و سراسر تهران | ۹۰٪ دقت، بیش از ۲۵ هزار کارشناسی موفق | گزارش فوری",
  keywords: [
    "کارشناسی خودرو",
    "کارشناسی ماشین",
    "خرید خودرو",
    "خرید ماشین",
    "کارماچک",
    "carmacheck",
    "کارشناسی خودرو تهران",
    "کارشناسی ماشین تهران",
    "کارشناسی خودرو شرق تهران",
    "کارشناسی ماشین شرق تهران",
    "کارشناسی خودرو تهرانپارس",
    "کارشناسی خودرو نارمک",
    "کارشناسی خودرو فرجام",
    "کارشناسی خودرو میدان رسالت",
    "کارشناسی آنلاین",
    "کارشناسی در محل",
    "قیمت کارشناسی خودرو",
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com",
  },
  openGraph: {
    title: "کارماچک | کارشناسی تخصصی خودرو با کارشناسان مجرب",
    description: "کارشناسی تخصصی خودرو با ۹۰٪ دقت | بیش از ۲۵ هزار کارشناسی موفق",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com",
    siteName: "کارماچک",
    locale: "fa_IR",
    type: "website",
    // تصویر OG به‌صورت داینامیک از app/opengraph-image.tsx تولید می‌شود
  },
  twitter: {
    card: "summary_large_image",
    title: "کارماچک | کارشناسی تخصصی خودرو",
    description: "کارشناسی تخصصی خودرو با ۹۰٪ دقت",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Server-side data fetching با استفاده از serverApiHelper
async function getMasterPageData() {
  return await serverApiHelper.get("GetMasterPageData", 600);
}

export default async function Home() {
  
  console.log('🏠 Home page rendering - Server Side');
  console.log('⏰ Time:', new Date().toISOString());

  const data = await getMasterPageData();
  
  
  console.log('📊 Data fetched:', data ? 'Success' : 'Failed');
  console.log('📊 Data fetched:', data);

 
  return (
   <div className="bg-white">
      <Slider data={data?.Sliders}/>
      <Introduction data={data?.WhyWe}/>
      <Services data={data?.CarInspectionServices}/>
      <QualityBox data={data?.SecretOfOurServiceQualities?.[0]}/>
      <Statistics data={data?.StatisticsData}/>
      <BlogShort data={data?.BlogPosts}/>

      {/* بخش سئوی محلی — مناطق تحت پوشش شرق تهران */}
      <section className="font-IranSans max-w-6xl mx-auto px-4 py-10" dir="rtl">
        <h2 className="text-lg lg:text-2xl font-bold text-[#1E2A38] text-center">
          کارشناسی خودرو در شرق تهران
        </h2>
        <p className="mt-3 text-center text-[#6B6C70] leading-8 max-w-3xl mx-auto text-sm lg:text-base">
          کارماچک خدمات <strong>کارشناسی خودرو</strong> و <strong>کارشناسی ماشین</strong> را
          به‌صورت در محل در سراسر تهران و به‌ویژه شرق تهران — تهرانپارس، نارمک، فرجام و
          میدان رسالت — با ۹۰٪ دقت و گزارش فوری ارائه می‌دهد.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {LOCAL_AREAS.map((a) => (
            <Link
              key={a.slug}
              href={`/car-inspection-tehran/${a.slug}`}
              className="rounded-full border border-[#A6A6A6] text-[#55565A] px-4 py-1.5 text-sm hover:text-[#3456bb] hover:border-[#3456bb] transition-colors"
            >
              کارشناسی خودرو {a.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="block lg:hidden">
         <NavigationBar/>
      </div>
   </div>
  );
}
