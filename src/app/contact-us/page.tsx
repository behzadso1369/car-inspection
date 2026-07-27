import { BubbleChatIcon, CallRinging04Icon, Clock01Icon, Location01Icon, SmartPhone01Icon } from "hugeicons-react";
import { Metadata } from "next";
import { serverApiHelper } from "@/helper/server-fetcher";

// ISR - same as footer: contact info from GetMasterPageData
export const revalidate = 3600; // 1 hour

async function getMasterPageData() {
  return await serverApiHelper.get("GetMasterPageData", 3600);
}

// SEO Metadata (fallbacks; page can override with dynamic data if needed)
export const metadata: Metadata = {
  title: "تماس با کارماچک | ۰۲۱-۹۱۰۰۱۷۴۰",
  description: "تماس با کارماچک: ۰۲۱-۹۱۰۰۱۷۴۰ | آدرس: میدان رسالت,خیابان هنگام,نبش خیابان دوازدهم,پلاک497(نمایندگی زارعی)",
  keywords: [
    "تماس با کارماچک",
    "شماره تماس کارشناسی",
    "آدرس کارماچک",
    "ساعات کاری",
    "کارشناسی خودرو",
    "پشتیبانی کارماچک",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/contact-us`,
  },
  openGraph: {
    title: "تماس با کارماچک | ۰۲۱-۹۱۰۰۱۷۴۰",
    description: "تماس با کارماچک: ۰۲۱-۹۱۰۰۱۷۴۰ | آدرس: میدان رسالت,خیابان هنگام,نبش خیابان دوازدهم,پلاک497(نمایندگی زارعی)",
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

export default async function ContactUs() {
  const data = await getMasterPageData();
  const master = data?.MasterSiteData;
  const address = master?.Address ?? "میدان رسالت,خیابان هنگام,نبش خیابان دوازدهم,پلاک497(نمایندگی زارعی)";
  const workingHours = master?.WorkingHours ?? "شنبه تا چهارشنبه از ساعت 15-17";
  const phoneNumbers = master?.PhoneNumbers ?? "02191001740 - 09981982905";

  return (
    <div className="px-4 bg-white font-IranSans lg:flex  lg:py-16  lg:max-w-7xl lg:container lg:mx-auto  ">
      <div className="lg:order-1 lg:mx-16">
        <h2 className="text-[#101117] text-sm">راه های ارتباطی</h2>
        <div className="flex justify-between mt-4 mb-8">
          <div className="py-4 px-12 lg:px-20 lg:py-8 lg:mx-4 rounded-2xl bg-[#f1f3f7] flex flex-col items-center">
            <CallRinging04Icon className="my-2" size={24} color="#1434CB"/>
            <span className="text-[#101117] lg:text-xl my-2">تماس با ما</span>
            <span className="text-[#27292D] my-2">{phoneNumbers}</span>
          </div>
          <div className="py-4 px-12 lg:px-20  lg:py-8 lg:mx-4   rounded-2xl  bg-[#f1f3f7] flex flex-col items-center">
            <BubbleChatIcon className="my-2" size={24} color="#1434CB"/>
            <span className="text-[#101117] my-2 lg:text-xl">گفتگوی آنلاین</span>
            <span className="text-[#27292D] font-IranSans my-2">{workingHours}</span>
          </div>
        </div>
      </div>
      <div className="lg:order-0">
        <h1 className="text-[#101117] lg:text-3xl">اطلاعات کارماچک</h1>
        <h3 className="text-[#55565A] lg:text-base my-2">ما به شما کمک می‌کنیم تا بهترین کارشناسی خودرو را با بهترین قیمت تهیه کنید.</h3>
        <div className="my-4">
          <div className="flex my-3">
            <Location01Icon size={24}/>
            <span className="text-base mx-2 leading-8">{address}</span>
          </div>
          <div className="flex my-3">
            <Clock01Icon size={24}/>
            <span className="text-base mx-2">{workingHours}</span>
          </div>
          <div className="flex my-3">
            <SmartPhone01Icon size={24}/>
            <span className="text-base mx-2">{phoneNumbers}</span>
          </div>
        </div>
      </div>
    </div>
  );
}