import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/blog/blog-category", {
  title: "دسته‌بندی مقالات | مجله کارماچک",
  description: "مقالات کارشناسی خودرو بر اساس دسته‌بندی موضوعی",
});

export default function BlogCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
