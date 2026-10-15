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

const MOTORCYCLE_INSPECTION_PATH = "/motorcycle-inspection";
const MOTORCYCLE_INSPECTION_CANONICAL = getCanonicalUrl(MOTORCYCLE_INSPECTION_PATH);
const MOTORCYCLE_INSPECTION_DESCRIPTION =
  "کارشناسی موتورسیکلت در محل با اعزام کارشناس به آدرس شما در تهران و شرق تهران؛ بررسی فنی، بدنه، شاسی و سیستم برق همراه با گزارش کامل. رزرو آنلاین در کارماچک.";

const INSPECTION_STEPS = [
  { name: "ثبت مشخصات موتور", text: "برند و مدل موتورسیکلت را در فرم رزرو انتخاب کنید." },
  { name: "انتخاب نوع، محل و زمان", text: "پکیج کارشناسی، آدرس محل حضور کارشناس و زمان دلخواه را انتخاب کنید." },
  { name: "بررسی هزینه پیش از ثبت", text: "هزینهٔ نهایی بر اساس پکیج و منطقه پیش از ثبت رزرو به شما نمایش داده می‌شود." },
  { name: "حضور کارشناس در محل موتور", text: "کارشناس کارماچک در زمان تعیین‌شده به محل شما اعزام می‌شود و موتور را بررسی می‌کند." },
  { name: "تحویل گزارش کارشناسی", text: "گزارش کامل کارشناسی موتور شامل وضعیت بدنه، شاسی و فنی به شما تحویل داده می‌شود." },
];

function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "کارشناسی موتور در محل",
    serviceType: "کارشناسی موتورسیکلت در محل",
    description: MOTORCYCLE_INSPECTION_DESCRIPTION,
    url: MOTORCYCLE_INSPECTION_CANONICAL,
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
      url: MOTORCYCLE_INSPECTION_CANONICAL,
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
    },
  };
}

function generateHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "مراحل کارشناسی موتور در محل با کارماچک",
    description:
      "فرآیند رزرو و انجام کارشناسی موتورسیکلت در محل توسط کارماچک؛ از انتخاب مدل تا تحویل گزارش کامل.",
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
    "@id": `${MOTORCYCLE_INSPECTION_CANONICAL}#webpage`,
    url: MOTORCYCLE_INSPECTION_CANONICAL,
    name: "کارشناسی موتور در محل | اعزام سریع کارشناس در محل | کارماچک",
    description: MOTORCYCLE_INSPECTION_DESCRIPTION,
    inLanguage: "fa-IR",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@type": "Thing", name: "کارشناسی موتور در محل" },
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
  title: "کارشناسی موتور در محل | اعزام سریع کارشناس در محل",
  description:
    "کارشناسی موتورسیکلت در محل تهران با اعزام کارشناس؛ بررسی فنی، بدنه، شاسی و سیستم برق. رزرو آنلاین، هزینه شفاف و گزارش کامل.",
  keywords: [
    "کارشناسی موتور در محل",
    "کارشناسی موتورسیکلت",
    "کارشناسی موتور تهران",
    "اعزام کارشناس موتور",
    "کارشناسی فنی موتور",
    "رزرو کارشناسی موتور",
    "کارماچک",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/motorcycle-inspection`,
  },
  openGraph: {
    title: "کارشناسی موتور در محل | اعزام سریع کارشناس در محل | کارماچک",
    description:
      "کارشناسی موتورسیکلت در محل تهران؛ بررسی فنی، بدنه و شاسی. رزرو آنلاین در کارماچک.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/motorcycle-inspection`,
    siteName: "کارماچک",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "کارشناسی موتور در محل | کارماچک",
    description:
      "اعزام کارشناس به محل شما؛ بررسی فنی موتورسیکلت با گزارش کامل.",
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
  const motorcycleFaqs = await getFaqsByCategoryName("کارشناسی موتور", 600);
  if (motorcycleFaqs.length > 0) return motorcycleFaqs;
  return getFaqsByCategoryName("کارشناسی موتور", 600);
}

export default async function MotorcycleInspectionFlow() {
  const inspectionFaqs = await getInspectionFaqs();

  const schema: Array<Record<string, unknown>> = [
    generateWebPageSchema(),
    generateLocalBusinessSchema({ path: MOTORCYCLE_INSPECTION_PATH }),
    generateServiceSchema(),
    generateHowToSchema(),
    generateBreadcrumbSchema([
      { name: "خانه", path: "/" },
      { name: "کارشناسی موتور در محل", path: MOTORCYCLE_INSPECTION_PATH },
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