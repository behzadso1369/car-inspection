"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Clock, Eye } from "lucide-react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TableOfContents } from "@/components/blog/TableOfContents";
import type { TocItem } from "@/lib/blog-content";
import {
  RelatedPosts,
  type RelatedPost,
} from "../components/RelatedPosts";
import "../blog-article.css";

interface BlogDetailClientProps {
  id: string;
  blogData: any;
  processedContent: string;
  tocItems: TocItem[];
  relatedPosts?: RelatedPost[];
  readingTime: number;
}

export function BlogDetailClient({
  id,
  blogData,
  processedContent,
  tocItems,
  relatedPosts = [],
  readingTime,
}: BlogDetailClientProps) {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);

  useEffect(() => {
    if (!blogData?.CategoryId) return;
    const catId = blogData.CategoryId;
    instance
      .post(ApiHelper.get("SearchWithTermsCategory"), { terms: "" })
      .then((categoryRes: any) => {
        if (categoryRes?.CategoryItems?.length > 0) {
          const category = categoryRes.CategoryItems.find((cat: any) => cat.Id === catId);
          if (category) {
            setCategoryName(category.Name);
            setCategoryId(category.Id);
          }
        }
      })
      .catch(() => {});
  }, [blogData?.CategoryId]);

  useEffect(() => {
    if (!processedContent) return;
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 300);
    }
  }, [processedContent]);

  const { Title, ImagePath, Excerpt, CreatedDate, CreatedOn } = blogData;
  const publishedAt = CreatedDate || CreatedOn;
  const views = Number(blogData.viewCount ?? blogData.ViewCount);
  const hasViews = Number.isFinite(views);

  return (
    <div className="px-4 font-IranSans py-4 max-w-6xl mx-auto">
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "بلاگ", href: "/blog" },
          ...(categoryName ? [{ label: categoryName, href: `/blog/blog-category?category=${categoryName}&id=${categoryId}` }] : []),
          { label: Title },
        ]}
        className="mb-4"
      />

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-[#101117] my-6">{Title}</h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#55565A] mb-6">
            {publishedAt && (
              <span>
                تاریخ انتشار: {new Date(publishedAt).toLocaleDateString("fa-IR")}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden />
              {readingTime.toLocaleString("fa-IR")} دقیقه مطالعه
            </span>
            {hasViews && (
              <span className="inline-flex items-center gap-1.5">
                <Eye className="w-4 h-4" aria-hidden />
                {views.toLocaleString("fa-IR")} بازدید
              </span>
            )}
          </div>

          {ImagePath && (
            <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
              <Image
                src={`https://api.carmacheck.com/${ImagePath}`}
                alt={Title || "تصویر مقاله"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          {Excerpt && (
            <p className="text-lg text-[#55565A] mb-6 leading-relaxed">{Excerpt}</p>
          )}

          {processedContent && (
            <div
              className="blog-article-content prose prose-lg max-w-full text-[#101117] [&_a]:text-blue-600 [&_h2]:scroll-mt-20 !leading-9"
              dangerouslySetInnerHTML={{ __html: processedContent }}
              style={{ direction: "rtl", textAlign: "right" }}
            />
          )}
        </div>

        {tocItems.length > 0 && (
          <div className="lg:w-64 flex-shrink-0">
            <TableOfContents items={tocItems} />
          </div>
        )}
      </div>

      {(publishedAt || readingTime || hasViews) && (
        <div className="mt-8 pt-6 border-t border-[#DFDFDF]">
          <p className="text-sm text-[#55565A] flex flex-wrap items-center gap-x-4 gap-y-1">
            {publishedAt && (
              <span>
                تاریخ انتشار: {new Date(publishedAt).toLocaleDateString("fa-IR")}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden />
              {readingTime.toLocaleString("fa-IR")} دقیقه مطالعه
            </span>
            {hasViews && (
              <span className="inline-flex items-center gap-1.5">
                <Eye className="w-4 h-4" aria-hidden />
                {views.toLocaleString("fa-IR")} بازدید
              </span>
            )}
          </p>
        </div>
      )}

      <RelatedPosts posts={relatedPosts} />
    </div>
  );
}
