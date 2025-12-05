import { Metadata } from 'next';
import { serverApiHelper } from '@/helper/server-fetcher';

// ISR - Incremental Static Regeneration (revalidate هر 1 ساعت)
// قوانین و مقررات نادراً تغییر می‌کنند، پس ISR مناسب است
export const revalidate = 3600; // 1 hour

// SEO Metadata
export const metadata: Metadata = {
  title: "قوانین و مقررات | شرایط استفاده از خدمات کارچک",
  description: "قوانین و مقررات استفاده از خدمات کارشناسی کارچک، حریم خصوصی، شرایط پرداخت، ضمانت و قوانین لغو یا تغییر نوبت کارشناسی",
  keywords: [
    "قوانین کارچک",
    "مقررات کارشناسی",
    "شرایط استفاده",
    "حریم خصوصی",
    "ضمانت کارشناسی",
    "کارشناسی خودرو",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/regulations`,
  },
  openGraph: {
    title: "قوانین و مقررات کارچک",
    description: "قوانین و مقررات استفاده از خدمات کارشناسی خودرو",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/regulations`,
    siteName: "کارچک",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "قوانین و مقررات کارچک",
    description: "شرایط استفاده از خدمات کارشناسی",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Server-side data fetching با استفاده از serverApiHelper
async function getRegulationsData() {
  const data = await serverApiHelper.get("GetRegulationsData", 3600);
  return data || { Regulations: [] };
}

async function getMasterPageData() {
  return await serverApiHelper.get("GetMasterPageData", 3600);
}

export default async function RegulationsPage() {
  const [regulationsResponse, masterData] = await Promise.all([
    getRegulationsData(),
    getMasterPageData()
  ]);
  
  const regulationsData = regulationsResponse?.Regulations || [];

  return (
    <div dir="rtl" className="w-full max-w-6xl mx-auto px-4 font-IranSans">
      {/* Header */}
      <div className="my-6 py-2">
        <h1 className="text-base lg:text-3xl font-bold text-[#101117] mb-2">قوانین و مقررات کارچک</h1>
        <p className="text-gray-600">ورود شما از طریق شماره همراه به منزله تایید قوانین ومقررات کارچک می باشد.</p>
      </div>
      <div className='my-4'>{regulationsData?.[0]?.Content}</div>
    </div>
  );
}
