import { BubbleChatIcon, Call02Icon, CallRinging04Icon, Clock01Icon, Location01Icon, SmartPhone01Icon } from "hugeicons-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";

// SSG - Static Site Generation
// این صفحه اطلاعات ثابت تماس را نمایش می‌دهد و نیازی به fetch در هر request ندارد

// SEO Metadata
export const metadata: Metadata = {
  title: "تماس با کارماچک | ۰۲۱-۹۱۰۰۱۷۴۰",
  description: "تماس با کارماچک: ۰۲۱-۹۱۰۰۱۷۴۰ | آدرس: تهران، ونک، ملاصدرا، بن‌بست صدر، پلاک ۶ | ساعات کاری: شنبه تا چهارشنبه ۹-۱۸",
  keywords: [
    "تماس با کارماچک",
    "شماره تماس کارشناسی",
    "آدرس کارماچک",
    "ساعات کاری",
    "کارشناسی خودرو",
    "تهران ونک",
    "پشتیبانی کارماچک",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/contact-us`,
  },
  openGraph: {
    title: "تماس با کارماچک | ۰۲۱-۹۱۰۰۱۷۴۰",
    description: "تماس با کارماچک: ۰۲۱-۹۱۰۰۱۷۴۰ | آدرس: تهران، ونک، ملاصدرا",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/contact-us`,
    siteName: "کارماچک",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "تماس با کارماچک",
    description: "راه‌های ارتباطی با کارماچک",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactUs() {
    return (
        <div className="px-4 bg-white font-IranSans lg:flex  lg:py-16  lg:max-w-7xl lg:container lg:mx-auto  ">
  <div className="lg:order-1 lg:mx-16">
  <h2 className="text-[#101117] text-sm">راه های ارتباطی</h2>
 <div className="flex justify-between mt-4 mb-8">
    <div className="py-4 px-12 lg:px-20 lg:py-8 lg:mx-4 rounded-2xl bg-[#f1f3f7] flex flex-col items-center">
        <CallRinging04Icon className="my-2" size={24} color="#1434CB"/>
        <span className="text-[#101117] lg:text-xl my-2">تماس با ما</span>
        <span className="text-[#27292D] my-2">۰۲۱۹۱۰۰۱۷۴۰</span>
    </div>
    <div className="py-4 px-12 lg:px-20  lg:py-8 lg:mx-4   rounded-2xl  bg-[#f1f3f7] flex flex-col items-center">
        <BubbleChatIcon className="my-2" size={24} color="#1434CB"/>
        <span className="text-[#101117] my-2 lg:text-xl">گفتگوی آنلاین</span>
        <span className="text-[#27292D] font-IranSans my-2">09:00-18:00</span>
    </div>

 </div>
  </div>
  <div className="lg:order-0">
  <h1 className="text-[#101117] lg:text-3xl">اطلاعات کارماچک</h1>
 <h3 className="text-[#55565A] lg:text-base my-2">ما به شما کمک می‌کنیم تا بهترین کارشناسی خودرو را با بهترین قیمت تهیه کنید.</h3>
 <div className="my-4">
 <div className="flex my-3">
            <Location01Icon size={24}/>
            <span className="text-base mx-2">تهران،ونک،ملاصدرا،بن‌بست صدر، پلاک ۶ واحد ۴</span>
          </div>
          <div className="flex my-3">
            <Clock01Icon size={24}/>
            <span className="text-base mx-2">شنبه تا چهارشنبه از ساعت 15-17</span>
          </div>
          <div className="flex my-3">
            <SmartPhone01Icon size={24}/>
            <span className="text-base mx-2">02191001740 - 09981982905</span>
          </div>
 </div>
  </div>
 



        </div>
        

    )
}