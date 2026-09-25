// SSR - Server Side Rendering
// این صفحه با traffic بالا حالا SSR است برای:
// 1. SEO بهتر
// 2. Initial Load سریع‌تر
// 3. Google indexing
// Client interactions در ClientWrapper نگهداری می‌شوند

import { Metadata } from "next";
import { getFaqsByCategoryName } from "@/lib/faq-data";
import {
  BASE_URL,
  COMPANY,
  getCanonicalUrl,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import ClientWrapper from "./ClientWrapper";

const CAR_INSPECTION_PATH = "/car-inspection";
const CAR_INSPECTION_CANONICAL = getCanonicalUrl(CAR_INSPECTION_PATH);
const CAR_INSPECTION_DESCRIPTION =
  "کارشناسی خودرو در محل با اعزام کارشناس به آدرس شما در تهران و شرق تهران؛ بررسی رنگ، بدنه، شاسی، موتور، گیربکس و دیاگ همراه با گزارش کامل. رزرو آنلاین در کارماچک.";

// مراحل فرآیند کارشناسی در محل (منطبق با متن دیده‌شده در صفحه)
const INSPECTION_STEPS = [
  { name: "ثبت مشخصات خودرو", text: "اطلاعات اولیهٔ خودرو (برند، مدل و سال) را در فرم رزرو وارد کنید." },
  { name: "انتخاب نوع، محل و زمان", text: "پکیج کارشناسی، آدرس محل حضور کارشناس و زمان دلخواه را انتخاب کنید." },
  { name: "بررسی هزینه پیش از ثبت", text: "هزینهٔ نهایی بر اساس پکیج و منطقه پیش از ثبت رزرو به شما نمایش داده می‌شود." },
  { name: "حضور کارشناس در محل خودرو", text: "کارشناس کارماچک در زمان تعیین‌شده به محل شما اعزام می‌شود و خودرو را بررسی می‌کند." },
  { name: "تحویل گزارش کارشناسی", text: "گزارش کامل کارشناسی شامل وضعیت رنگ، بدنه، شاسی، فنی و دیاگ به شما تحویل داده می‌شود." },
];

function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "کارشناسی خودرو در محل",
    serviceType: "کارشناسی خودرو در محل",
    description: CAR_INSPECTION_DESCRIPTION,
    url: CAR_INSPECTION_CANONICAL,
    provider: {
      "@type": "AutomotiveBusiness",
      name: COMPANY.name,
      telephone: COMPANY.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.streetAddress,
        addressLocality: COMPANY.addressLocality,
        addressRegion: COMPANY.addressRegion,
        addressCountry: COMPANY.addressCountry,
      },
    },
    areaServed: [
      { "@type": "City", name: "تهران" },
      { "@type": "Place", name: "شرق تهران" },
    ],
    offers: {
      "@type": "Offer",
      url: CAR_INSPECTION_CANONICAL,
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
    },
  };
}

function generateHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "مراحل کارشناسی خودرو در محل با کارماچک",
    description:
      "فرآیند رزرو و انجام کارشناسی خودرو در محل توسط کارماچک؛ از ثبت مشخصات خودرو تا تحویل گزارش کامل.",
    totalTime: "PT1H",
    step: INSPECTION_STEPS.map((s, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

function generateWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${CAR_INSPECTION_CANONICAL}#webpage`,
    url: CAR_INSPECTION_CANONICAL,
    name: "کارشناسی خودرو در محل | اعزام سریع کارشناس در محل | کارماچک",
    description: CAR_INSPECTION_DESCRIPTION,
    inLanguage: "fa-IR",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@type": "Thing", name: "کارشناسی خودرو در محل" },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2"],
    },
  };
}

// ISR برای این صفحه
export const revalidate = 600; // 10 minutes

// SEO Metadata
export const metadata: Metadata = {
  title: "کارشناسی خودرو در محل | اعزام سریع کارشناس در محل",
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-inspection`,
  },
  openGraph: {
    title: "کارشناسی خودرو در محل | اعزام سریع کارشناس در محل | کارماچک",
    description:
      "کارشناسی خودرو در محل تهران با اعزام کارشناس به تهران و شرق تهران؛ بررسی فنی، رنگ و بدنه، شاسی و دیاگ. رزرو آنلاین، هزینه شفاف و گزارش کامل کارشناسی.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-inspection`,
    siteName: "کارماچک",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "کارشناسی خودرو در محل | کارماچک",
    description:
      "اعزام کارشناس به محل شما در تهران و شرق تهران؛ بررسی فنی، رنگ، شاسی و دیاگ با گزارش کامل.",
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

  const schema: Array<Record<string, unknown>> = [
    generateWebPageSchema(),
    generateLocalBusinessSchema({ path: CAR_INSPECTION_PATH }),
    generateServiceSchema(),
    generateHowToSchema(),
    generateBreadcrumbSchema([
      { name: "خانه", path: "/" },
      { name: "کارشناسی خودرو در محل", path: CAR_INSPECTION_PATH },
    ]),
  ];

  // FAQPage فقط وقتی اضافه می‌شود که سؤالات واقعی از API آمده باشند
  if (inspectionFaqs.length > 0) {
    schema.push(
      generateFAQSchema(
        inspectionFaqs.map((faq) => ({
          question: faq.Question,
          answer: faq.Answer,
        }))
      )
    );
  }

  return (
    <>
      <JsonLd data={schema} />
      <ClientWrapper inspectionFaqs={inspectionFaqs} />
    </>
  );
}