import { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalAreaLanding from "@/components/local-seo/LocalAreaLanding";
import { JsonLd } from "@/components/seo/JsonLd";
import { LOCAL_AREAS, getAreaBySlug } from "@/lib/local-areas";
import {
  BASE_URL,
  COMPANY,
  getCanonicalUrl,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";

export const revalidate = 86400;

export function generateStaticParams() {
  return LOCAL_AREAS.map((a) => ({ area: a.slug }));
}

type Props = { params: Promise<{ area: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return { title: "منطقه یافت نشد" };

  const { content } = area;
  const path = `/car-inspection-tehran/${slug}`;
  const canonical = getCanonicalUrl(path);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: canonical,
      siteName: "کارماچک - کارشناسی خودرو",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: content.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
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
}

function generateHowToSchema(areaName: string, steps: { title: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `رزرو کارشناسی خودرو در ${areaName}`,
    description: `مراحل ثبت درخواست کارشناسی خودرو در محل در ${areaName}`,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

function generateServiceSchemaForArea(areaName: string, path: string, nearby: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `کارشناسی خودرو ${areaName}`,
    serviceType: "کارشناسی خودرو در محل",
    description: `خدمات کارشناسی خودرو و ماشین در ${areaName} شامل بررسی رنگ، بدنه، فنی و دیاگ`,
    url: getCanonicalUrl(path),
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
      { "@type": "Place", name: areaName },
      ...nearby.map((n) => ({ "@type": "Place", name: n })),
    ],
    offers: {
      "@type": "Offer",
      url: getCanonicalUrl("/car-inspection"),
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
    },
  };
}

function generateWebPageSchema(
  title: string,
  description: string,
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${getCanonicalUrl(path)}#webpage`,
    url: getCanonicalUrl(path),
    name: title,
    description,
    inLanguage: "fa-IR",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: {
      "@type": "Thing",
      name: "کارشناسی خودرو",
    },
  };
}

export default async function LocalAreaPage({ params }: Props) {
  const { area: slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const path = `/car-inspection-tehran/${slug}`;
  const { content } = area;

  const schema = [
    generateWebPageSchema(content.metaTitle, content.metaDescription, path),
    generateLocalBusinessSchema({
      area: area.name,
      path,
      extraAreas: [area.name, ...area.nearby],
    }),
    generateServiceSchemaForArea(area.name, path, area.nearby),
    generateHowToSchema(area.name, content.steps),
    generateBreadcrumbSchema([
      { name: "خانه", path: "/" },
      { name: "کارشناسی خودرو تهران", path: "/car-inspection-tehran" },
      { name: area.name, path },
    ]),
    generateFAQSchema(content.faqs),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <LocalAreaLanding area={area} />
    </>
  );
}
