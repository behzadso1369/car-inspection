import { Metadata } from "next";
import {
  BASE_URL,
  getCanonicalUrl,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import CarInstallmentLanding from "./CarInstallmentLanding";
import {
  CAR_INSTALLMENT_DESCRIPTION,
  CAR_INSTALLMENT_FAQS,
  CAR_INSTALLMENT_H1,
  CAR_INSTALLMENT_KEYWORDS,
  CAR_INSTALLMENT_PATH,
  CAR_INSTALLMENT_STEPS,
  CAR_INSTALLMENT_TITLE,
} from "./car-installment-data";

export const revalidate = 86400;

const canonical = getCanonicalUrl(CAR_INSTALLMENT_PATH);

export const metadata: Metadata = {
  title: { absolute: CAR_INSTALLMENT_TITLE },
  description: CAR_INSTALLMENT_DESCRIPTION,
  keywords: [...CAR_INSTALLMENT_KEYWORDS],
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
    title: CAR_INSTALLMENT_TITLE,
    description: CAR_INSTALLMENT_DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: CAR_INSTALLMENT_H1,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CAR_INSTALLMENT_TITLE,
    description: CAR_INSTALLMENT_DESCRIPTION,
  },
};

function generateWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: CAR_INSTALLMENT_TITLE,
    description: CAR_INSTALLMENT_DESCRIPTION,
    inLanguage: "fa-IR",
    isPartOf: { "@id": `${BASE_URL}/#website` },
  };
}

function generateHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "مراحل ثبت کارشناسی اقساطی خودرو در کارماچک",
    description: CAR_INSTALLMENT_DESCRIPTION,
    step: CAR_INSTALLMENT_STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

export default function CarInspectionInstallmentPage() {
  const schema = [
    generateWebPageSchema(),
    generateHowToSchema(),
    generateBreadcrumbSchema([
      { name: "خانه", path: "/" },
      { name: "کارشناسی قسطی خودرو", path: CAR_INSTALLMENT_PATH },
    ]),
    generateFAQSchema([...CAR_INSTALLMENT_FAQS]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <CarInstallmentLanding />
    </>
  );
}