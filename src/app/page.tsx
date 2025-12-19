import { Slider } from "./components/mobile/Home/Slider";
import Introduction from "./components/mobile/Home/Introduction";
import Services from "./components/mobile/Home/Services";
import QualityBox from "./components/mobile/Home/QualityBox";
import Statistics from "./components/mobile/Home/Statistics";
import BlogShort from "./components/mobile/Home/BlogShort";
import { NavigationBar } from "./components/mobile/Home/NavigationBar";
import { Metadata } from "next";
import { serverApiHelper } from "@/helper/server-fetcher";

// ISR - Incremental Static Regeneration (revalidate هر 10 دقیقه)
// صفحه اصلی محتوای دینامیک دارد (بلاگ‌ها، سرویس‌ها) اما نیازی به fetch در هر request نیست
export const revalidate = 600; // 10 minutes

// SEO Metadata
export const metadata: Metadata = {
  title: "کارماچک | کارشناسی تخصصی خودرو با کارشناسان مجرب",
  description: "کارشناسی تخصصی خودرو با ۹۰٪ دقت | بیش از ۲۵ هزار کارشناسی موفق | کارشناسی در محل یا مرکز | دریافت گزارش فوری | تهران",
  keywords: [
    "کارشناسی خودرو",
    "کارشناسی ماشین",
    "خرید خودرو",
    "خرید ماشین",
    "کارماچک",
    "carmacheck",
    "کارشناسی خودرو تهران",
    "کارشناسی آنلاین",
    "کارشناسی در محل",
    "قیمت کارشناسی خودرو",
    "بهترین کارشناس خودرو",
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
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: "کارماچک - کارشناسی خودرو",
      },
    ],
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
  // لاگ در Terminal (server-side)
  console.log('🏠 Home page rendering - Server Side');
  console.log('⏰ Time:', new Date().toISOString());

  const data = await getMasterPageData();
  debugger
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
      <div className="block lg:hidden">
  <NavigationBar/>
      </div>
   </div>
  );
}
