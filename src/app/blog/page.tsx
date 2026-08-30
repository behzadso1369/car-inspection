import { Metadata } from "next";
import { PAGE_SEO } from "@/lib/seo";
import { pageMetadata } from "@/lib/page-metadata";
import BlogClient from "./BlogClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = pageMetadata(PAGE_SEO.blog.path, {
  title: PAGE_SEO.blog.title,
  description: PAGE_SEO.blog.description,
  keywords: PAGE_SEO.blog.keywords,
});

export default function Blog() {
  return <BlogClient />;
}
