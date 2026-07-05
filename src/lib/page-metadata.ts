import type { Metadata } from "next";
import { getCanonicalUrl } from "./seo";

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
  return {
    ...(options.title ? { title: options.title } : {}),
    ...(options.description ? { description: options.description } : {}),
    ...(options.keywords ? { keywords: options.keywords } : {}),
    alternates: {
      canonical: getCanonicalUrl(path),
    },
    ...(options.robots ? { robots: options.robots } : {}),
  };
}
