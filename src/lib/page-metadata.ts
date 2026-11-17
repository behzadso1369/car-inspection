import type { Metadata } from "next";
import { COMPANY, getCanonicalUrl } from "./seo";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  keywords?: string | string[];
  robots?: Metadata["robots"];
};

export function pageMetadata(
  path: string,
  options: PageMetadataOptions = {}
): Metadata {
  const canonical = getCanonicalUrl(path);
  const title = options.title
    ? options.title.includes("کارماچک")
      ? { absolute: options.title }
      : options.title
    : undefined;
  return {
    ...(title ? { title } : {}),
    ...(options.description ? { description: options.description } : {}),
    ...(options.keywords ? { keywords: options.keywords } : {}),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: canonical,
      siteName: "کارماچک - کارشناسی خودرو",
      ...(options.title ? { title: options.title } : {}),
      ...(options.description ? { description: options.description } : {}),
      images: [
        {
          url: COMPANY.ogImage,
          width: 1200,
          height: 630,
          alt: options.title || "کارماچک",
        },
      ],
    },
    ...(options.robots ? { robots: options.robots } : {}),
  };
}
