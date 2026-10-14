import { Metadata } from "next";
import {
  BASE_URL,
  getCanonicalUrl,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import DealersLanding from "./DealersLanding";
import {
  DEALERS_HUB_DESCRIPTION,
  DEALERS_HUB_FAQS,
  DEALERS_HUB_H1,
  DEALERS_HUB_KEYWORDS,
  DEALERS_HUB_PATH,
  DEALERS_HUB_STEPS,
  DEALERS_HUB_TITLE,
  DEALERS_HUB_TITLE_FULL,
} from "./dealer-hub-data";

export const revalidate = 86400;

const canonical = getCanonicalUrl(DEALERS_HUB_PATH);

export const metadata: Metadata = {
  title: DEALERS_HUB_TITLE,
  description: DEALERS_HUB_DESCRIPTION,
  keywords: [...DEALERS_HUB_KEYWORDS],
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
    title: DEALERS_HUB_TITLE_FULL,
    description: DEALERS_HUB_DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: DEALERS_HUB_H1,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEALERS_HUB_TITLE_FULL,
    description: DEALERS_HUB_DESCRIPTION,
  },
};

function generateWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: DEALERS_HUB_TITLE_FULL,
    description: DEALERS_HUB_DESCRIPTION,
    inLanguage: "fa-IR",
    isPartOf: { "@id": `${BASE_URL}/#website` },
  };
}

function generateHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "ثبت‌نام نمایشگاه‌دار در کارماچک",
    description: DEALERS_HUB_DESCRIPTION,
    step: DEALERS_HUB_STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

export default function CarInspectionDealersPage() {
  const schema = [
    generateWebPageSchema(),
    generateHowToSchema(),
    generateBreadcrumbSchema([
      { name: "خانه", path: "/" },
      { name: "ثبت‌نام نمایشگاه‌دار", path: DEALERS_HUB_PATH },
    ]),
    generateFAQSchema([...DEALERS_HUB_FAQS]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <DealersLanding />
    </>
  );
}
