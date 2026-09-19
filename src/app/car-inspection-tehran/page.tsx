import { Metadata } from "next";
import { LOCAL_AREAS } from "@/lib/local-areas";
import {
  BASE_URL,
  COMPANY,
  getCanonicalUrl,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import TehranHubLanding from "./TehranHubLanding";
import {
  TEHRAN_HUB_DESCRIPTION,
  TEHRAN_HUB_FAQS,
  TEHRAN_HUB_H1,
  TEHRAN_HUB_KEYWORDS,
  TEHRAN_HUB_PATH,
  TEHRAN_HUB_STEPS,
  TEHRAN_HUB_TITLE,
  TEHRAN_HUB_TITLE_FULL,
} from "./tehran-hub-data";

export const revalidate = 86400;

const canonical = getCanonicalUrl(TEHRAN_HUB_PATH);

export const metadata: Metadata = {
  title: TEHRAN_HUB_TITLE,
  description: TEHRAN_HUB_DESCRIPTION,
  keywords: TEHRAN_HUB_KEYWORDS,
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
    title: TEHRAN_HUB_TITLE_FULL,
    description: TEHRAN_HUB_DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: TEHRAN_HUB_H1,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TEHRAN_HUB_TITLE_FULL,
    description: TEHRAN_HUB_DESCRIPTION,
  },
};

function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "کارشناسی خودرو تهران",
    serviceType: "کارشناسی خودرو در محل",
    description: TEHRAN_HUB_DESCRIPTION,
    url: canonical,
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
      ...LOCAL_AREAS.map((a) => ({ "@type": "Place", name: a.name })),
    ],
    offers: {
      "@type": "Offer",
      url: getCanonicalUrl("/car-inspection"),
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
    },
  };
}

function generateHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "رزرو کارشناسی خودرو در تهران",
    description:
      "مراحل ثبت درخواست کارشناسی خودرو در محل در تهران و شرق تهران",
    step: TEHRAN_HUB_STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

function generateWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: TEHRAN_HUB_TITLE_FULL,
    description: TEHRAN_HUB_DESCRIPTION,
    inLanguage: "fa-IR",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: {
      "@type": "Thing",
      name: "کارشناسی خودرو تهران",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".quick-answer", "h1"],
    },
  };
}

export default function CarInspectionTehranHub() {
  const schema = [
    generateWebPageSchema(),
    generateLocalBusinessSchema({
      path: TEHRAN_HUB_PATH,
      extraAreas: ["تهران", "شرق تهران", ...LOCAL_AREAS.map((a) => a.name)],
    }),
    generateServiceSchema(),
    generateHowToSchema(),
    generateBreadcrumbSchema([
      { name: "خانه", path: "/" },
      { name: "کارشناسی خودرو تهران", path: TEHRAN_HUB_PATH },
    ]),
    generateFAQSchema([...TEHRAN_HUB_FAQS]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "مناطق کارشناسی خودرو شرق تهران",
      itemListElement: LOCAL_AREAS.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `کارشناسی خودرو ${a.name}`,
        url: getCanonicalUrl(`/car-inspection-tehran/${a.slug}`),
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <TehranHubLanding />
    </>
  );
}
