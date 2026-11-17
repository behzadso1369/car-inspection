import { Metadata } from "next";
import {
  BASE_URL,
  getCanonicalUrl,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import MotorcycleInstallmentLanding from "./MotorcycleInstallmentLanding";
import {
  MOTORCYCLE_INSTALLMENT_DESCRIPTION,
  MOTORCYCLE_INSTALLMENT_FAQS,
  MOTORCYCLE_INSTALLMENT_H1,
  MOTORCYCLE_INSTALLMENT_KEYWORDS,
  MOTORCYCLE_INSTALLMENT_PATH,
  MOTORCYCLE_INSTALLMENT_STEPS,
  MOTORCYCLE_INSTALLMENT_TITLE,
} from "./motorcycle-installment-data";

export const revalidate = 86400;

const canonical = getCanonicalUrl(MOTORCYCLE_INSTALLMENT_PATH);

export const metadata: Metadata = {
  title: { absolute: MOTORCYCLE_INSTALLMENT_TITLE },
  description: MOTORCYCLE_INSTALLMENT_DESCRIPTION,
  keywords: [...MOTORCYCLE_INSTALLMENT_KEYWORDS],
  alternates: { canonical },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: canonical,
    siteName: "کارماچک - کارشناسی خودرو",
    title: MOTORCYCLE_INSTALLMENT_TITLE,
    description: MOTORCYCLE_INSTALLMENT_DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: MOTORCYCLE_INSTALLMENT_H1,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: MOTORCYCLE_INSTALLMENT_TITLE,
    description: MOTORCYCLE_INSTALLMENT_DESCRIPTION,
  },
};

function generateWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: MOTORCYCLE_INSTALLMENT_TITLE,
    description: MOTORCYCLE_INSTALLMENT_DESCRIPTION,
    inLanguage: "fa-IR",
    isPartOf: { "@id": `${BASE_URL}/#website` },
  };
}

function generateHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "مراحل ثبت کارشناسی اقساطی موتورسیکلت در کارماچک",
    description: MOTORCYCLE_INSTALLMENT_DESCRIPTION,
    step: MOTORCYCLE_INSTALLMENT_STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

export default function MotorcycleInspectionInstallmentPage() {
  const schema = [
    generateWebPageSchema(),
    generateHowToSchema(),
    generateBreadcrumbSchema([
      { name: "خانه", path: "/" },
      { name: "کارشناسی قسطی موتورسیکلت", path: MOTORCYCLE_INSTALLMENT_PATH },
    ]),
    generateFAQSchema([...MOTORCYCLE_INSTALLMENT_FAQS]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <MotorcycleInstallmentLanding />
    </>
  );
}