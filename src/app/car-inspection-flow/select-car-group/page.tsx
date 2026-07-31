// SSR - Server Side Rendering
// این صفحه با traffic بالا حالا SSR است برای:
// 1. SEO بهتر
// 2. Initial Load سریع‌تر
// 3. Google indexing
// Client interactions در ClientWrapper نگهداری می‌شوند

import { Metadata } from "next";
import { getFaqsByCategoryName } from "@/lib/faq-data";
import ClientWrapper from "./ClientWrapper";

// ISR برای این صفحه
export const revalidate = 600; // 10 minutes

// SEO Metadata
export const metadata: Metadata = {
  title: "کارشناسی خودرو در محل | اعزام سریع کارشناس در محل | کارماچک",
  description:
    "کارشناسی خودرو در محل تهران با اعزام کارشناس به تهران و شرق تهران؛ بررسی فنی، رنگ و بدنه، شاسی و دیاگ. رزرو آنلاین، هزینه شفاف و گزارش کامل کارشناسی.",
  keywords: [
    "کارشناسی خودرو در محل",
    "اعزام کارشناس خودرو",
    "کارشناسی خودرو تهران",
    "کارشناسی خودرو شرق تهران",
    "کارشناسی فنی خودرو",
    "کارشناسی رنگ و بدنه",
    "کارشناسی شاسی",
    "دیاگ خودرو",
    "رزرو کارشناسی آنلاین",
    "کارماچک",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-inspection-flow/select-car-group`,
  },
  openGraph: {
    title: "کارشناسی خودرو در محل | اعزام سریع کارشناس در محل | کارماچک",
    description:
      "کارشناسی خودرو در محل تهران با اعزام کارشناس به تهران و شرق تهران؛ بررسی فنی، رنگ و بدنه، شاسی و دیاگ. رزرو آنلاین، هزینه شفاف و گزارش کامل کارشناسی.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-inspection-flow/select-car-group`,
    siteName: "کارماچک",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "کارشناسی خودرو در محل | کارماچک",
    description:
      "اعزام کارشناس به محل شما در تهران و شرق تهران — بررسی فنی، رنگ، شاسی و دیاگ با گزارش کامل.",
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

// Server-side data fetching
async function getInspectionFaqs() {
  return getFaqsByCategoryName("کارشناسی خودرو", 600);
}

export default async function CarInspectionFlow() {
  const inspectionFaqs = await getInspectionFaqs();

  return <ClientWrapper inspectionFaqs={inspectionFaqs} />;
}