// SSR - Server Side Rendering
// این صفحه با traffic بالا حالا SSR است برای:
// 1. SEO بهتر
// 2. Initial Load سریع‌تر
// 3. Google indexing
// Client interactions در ClientWrapper نگهداری می‌شوند

import { Metadata } from "next";
import { getFaqsByCategoryName, type FaqItem } from "@/lib/faq-data";
import {
  BASE_URL,
  COMPANY,
  getCanonicalUrl,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { parseBrandPreset } from "@/lib/popular-brands";
import ClientWrapper from "./ClientWrapper";

const MOTORCYCLE_INSPECTION_PATH = "/motorcycle-inspection";
const MOTORCYCLE_INSPECTION_CANONICAL = getCanonicalUrl(MOTORCYCLE_INSPECTION_PATH);
const MOTORCYCLE_INSPECTION_TITLE =
  "کارشناسی موتورسیکلت؛ مراحل، هزینه و چک‌لیست قبل از خرید موتور دست دوم";
const MOTORCYCLE_INSPECTION_DESCRIPTION =
  "کارشناسی موتورسیکلت در محل شامل چه مواردی است؟ راهنمای بررسی شاسی، موتور، ترمز، گیربکس و مدارک، هزینه کارشناسی و نکات خرید موتور دست دوم را بخوانید.";

const MOTORCYCLE_INSPECTION_PAGE_FAQS: FaqItem[] = [
  {
    Question: "کارشناسی موتورسیکلت در محل شامل چه مواردی است؟",
    Answer:
      "بسته به خدمت انتخابی، بررسی مشخصات و مدارک، شاسی و بدنه، انجین، انتقال قدرت، ترمز، تعلیق، چرخ‌ها و برق را پوشش می‌دهد. دیاگ و تست حرکت به سازگاری ابزار، شرایط وسیله و توافق خدمت بستگی دارند.",
  },
  {
    Question: "آیا موتورسیکلت صفر هم به بررسی نیاز دارد؟",
    Answer:
      "بررسی تطابق مشخصات، وضعیت ظاهری هنگام تحویل، قطعات و عملکردهای قابل آزمون می‌تواند مفید باشد. دامنه بررسی باید با شرایط تحویل و گارانتی سازگار باشد و بازکردن قطعات بدون هماهنگی انجام نشود.",
  },
  {
    Question: "آیا موتورسیکلت زمین‌خورده ارزش خرید دارد؟",
    Answer:
      "به شدت و محل ضربه، سلامت اجزای ساختاری، کیفیت تعمیر و قیمت بستگی دارد. خط روی فلاپ به‌تنهایی به معنی آسیب شاسی نیست؛ نبود خط هم نبود تصادف را ثابت نمی‌کند.",
  },
  {
    Question: "آیا دیاگ کارکرد واقعی موتورسیکلت را قطعی مشخص می‌کند؟",
    Answer:
      "برای همه مدل‌ها خیر. اطلاعات قابل دریافت متفاوت است و باید با سوابق سرویس و وضعیت استهلاک مقایسه شود. عدد نمایشگر یا یک خروجی دیاگ به‌تنهایی برای تأیید قطعی کافی نیست.",
  },
  {
    Question: "کارشناسی موتورسیکلت چقدر طول می‌کشد؟",
    Answer:
      "مدت بررسی به مدل، دامنه خدمت، دسترسی به قطعات، وضعیت موتور و امکان تست حرکت بستگی دارد. زمان تقریبی را پس از اعلام مشخصات وسیله بپرسید.",
  },
  {
    Question: "آیا بدون تست رانندگی می‌توان خرید کرد؟",
    Answer:
      "بخشی از بررسی‌ها در حالت ثابت انجام می‌شود، اما بعضی ایرادهای عملکردی ممکن است دیده نشوند. اگر تست حرکت انجام نشده، این محدودیت باید ثبت شود و درباره نیاز به بررسی تکمیلی تصمیم بگیرید.",
  },
  {
    Question: "کارشناسی در محل بهتر است یا تعمیرگاه؟",
    Answer:
      "برای بازدید اولیه، محل مناسب می‌تواند کافی باشد. اگر ابزار ثابت، بازکردن قطعه یا اندازه‌گیری تخصصی لازم است، مراجعه به مرکز مجهز یا تعمیرگاه متخصص همان مدل انتخاب مناسب‌تری است.",
  },
];

const INSPECTION_STEPS = [
  {
    name: "اعلام مشخصات",
    text: "برند، مدل، سال ساخت، کارکرد اعلام‌شده، نوع انتقال قدرت و ایرادهای شناخته‌شده را به کارشناس بگویید.",
  },
  {
    name: "توافق بر دامنه خدمت",
    text: "مشخص کنید بدنه و شاسی، فنی، دیاگ، تست رانندگی و گزارش در خدمت انتخابی چه پوششی دارند.",
  },
  {
    name: "آماده‌کردن محل",
    text: "فضای روشن، سطح مناسب، تهویه و دسترسی اطراف وسیله فراهم باشد. مدارک و کلیدها را آماده کنید.",
  },
  {
    name: "بازدید و ارزیابی",
    text: "بررسی‌های ثابت انجام می‌شوند و در صورت ایمن‌بودن وسیله، اجازه مالک و فراهم‌بودن شرایط، تست حرکت صورت می‌گیرد.",
  },
  {
    name: "تحویل نتیجه",
    text: "ایرادها، موارد بررسی‌نشده و آزمایش‌های لازم برای تصمیم نهایی ثبت می‌شوند.",
  },
];

function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "کارشناسی موتورسیکلت در محل",
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
    name: "مراحل کارشناسی موتورسیکلت در محل",
    description:
      "فرآیند کارشناسی موتورسیکلت در محل؛ از اعلام مشخصات و توافق دامنه خدمت تا بازدید، ارزیابی و تحویل گزارش.",
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
    name: `${MOTORCYCLE_INSPECTION_TITLE} | کارماچک`,
    description: MOTORCYCLE_INSPECTION_DESCRIPTION,
    inLanguage: "fa-IR",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@type": "Thing", name: "کارشناسی موتورسیکلت در محل" },
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
  title: `${MOTORCYCLE_INSPECTION_TITLE} | کارماچک`,
  description: MOTORCYCLE_INSPECTION_DESCRIPTION,
  keywords: [
    "کارشناسی موتورسیکلت",
    "کارشناسی موتورسیکلت در محل",
    "خرید موتور دست دوم",
    "چک‌لیست کارشناسی موتور",
    "هزینه کارشناسی موتورسیکلت",
    "کارشناسی شاسی موتور",
    "کارشناسی رنگ موتورسیکلت",
    "کارماچک",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/motorcycle-inspection`,
  },
  openGraph: {
    title: `${MOTORCYCLE_INSPECTION_TITLE} | کارماچک`,
    description: MOTORCYCLE_INSPECTION_DESCRIPTION,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/motorcycle-inspection`,
    siteName: "کارماچک",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${MOTORCYCLE_INSPECTION_TITLE} | کارماچک`,
    description: MOTORCYCLE_INSPECTION_DESCRIPTION,
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
  return MOTORCYCLE_INSPECTION_PAGE_FAQS;
}

export default async function MotorcycleInspectionFlow({
  searchParams,
}: {
  searchParams: Promise<{ brandId?: string; brand?: string }>;
}) {
  const inspectionFaqs = await getInspectionFaqs();
  const preset = parseBrandPreset(await searchParams);

  const schema: Array<Record<string, unknown>> = [
    generateWebPageSchema(),
    generateLocalBusinessSchema({ path: MOTORCYCLE_INSPECTION_PATH }),
    generateServiceSchema(),
    generateHowToSchema(),
    generateBreadcrumbSchema([
      { name: "خانه", path: "/" },
      { name: "کارشناسی موتورسیکلت در محل", path: MOTORCYCLE_INSPECTION_PATH },
    ]),
  ];

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
      <ClientWrapper
        inspectionFaqs={inspectionFaqs}
        initialBrandId={preset.brandId}
        initialBrandName={preset.brandName}
      />
    </>
  );
}