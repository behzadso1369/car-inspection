"use client"

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { NextSeo } from "next-seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { generateUUID } from "@/lib/uuid";

export default function BlogDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [blogData, setBlogData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [processedContent, setProcessedContent] = useState<string>("");
  const [tocItems, setTocItems] = useState<Array<{ id: string; text: string; level: number }>>([]);

  // Process HTML content to add IDs to h2 tags and extract TOC
  const processContent = (htmlContent: string) => {
    if (!htmlContent) return { processed: "", toc: [] };

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const h2Elements = doc.querySelectorAll("h2");
    const toc: Array<{ id: string; text: string; level: number }> = [];

    h2Elements.forEach((h2) => {
      const uuid = generateUUID();
      h2.id = uuid;
      const text = h2.textContent || "";
      toc.push({ id: uuid, text: text.trim(), level: 2 });
    });

    return {
      processed: doc.body.innerHTML,
      toc,
    };
  };

  useEffect(() => {
    const getBlogDetail = () => {
      if (!id) return;
      
      instance.get(ApiHelper.get("GetBlogDetail") + `?id=${id}`)
        .then((res: any) => {
          const postData = res?.PostDetails?.[0];
          setBlogData(postData);
          
          // Process content to add IDs to h2 tags
          if (postData?.Content) {
            const { processed, toc } = processContent(postData.Content);
            setProcessedContent(processed);
            setTocItems(toc);
          }
          
          // Get category ID from blog post
          const categoryId = postData?.CategoryId;
          
          // Fetch category name if categoryId exists
          if (categoryId) {
            instance.post(ApiHelper.get("SearchWithTermsCategory"), {
              terms: ""
            })
            .then((categoryRes: any) => {
              if (categoryRes?.CategoryItems && categoryRes.CategoryItems.length > 0) {
                const category = categoryRes.CategoryItems.find((cat: any) => cat.Id === categoryId);
                if (category) {
                  setCategoryName(category.Name);
                  setCategoryId(category.Id);
                }
              }
            })
            .catch((err: any) => {
              console.error("Error fetching category:", err);
            });
          }
          
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.error("Error fetching blog detail:", err);
          setIsLoading(false);
        });
    };

    getBlogDetail();
  }, [id]);

  // Handle scroll to section on page load if hash exists
  useEffect(() => {
    if (!isLoading && processedContent) {
      const hash = window.location.hash.substring(1); // Remove #
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 300); // Small delay to ensure content is rendered
      }
    }
  }, [isLoading, processedContent]);

  if (isLoading) {
    return (
      <div className="px-4 font-IranSans py-8 text-center">
        <p className="text-[#55565A]">در حال بارگذاری...</p>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="px-4 font-IranSans py-8 text-center">
        <p className="text-[#55565A]">مقاله مورد نظر یافت نشد.</p>
      </div>
    );
  }

  const {
    Title,
    Content,
    ImagePath,
    Excerpt,
    CreatedDate,
  } = blogData;

  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://carmacheck.com';
  const description = Excerpt || `${Title} | راهنمای کامل کارشناسی خودرو | نکات کارشناسی خودرو | مطالب آموزشی خرید ماشین`;

  return (
    <>
      <NextSeo
        title={`${Title} | مقالات کارشناسی خودرو`}
        description={description.slice(0, 160)}
        canonical={`${siteURL}/blog/${id}`}
        openGraph={{
          title: `${Title} | مقالات کارشناسی خودرو`,
          description: description.slice(0, 160),
          url: `${siteURL}/blog/${id}`,
          siteName: "کارماچک",
          locale: "fa_IR",
          type: "article",
          images: ImagePath ? [
            {
              url: `https://api.carmacheck.com/${ImagePath}`,
              width: 1200,
              height: 630,
              alt: Title,
            }
          ] : [],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: `${Title}, کارشناسی خودرو, مقالات خودرو, آموزش خرید ماشین, کارماچک, بلاگ خودرو`,
          },
        ]}
      />
      <div className="px-4 font-IranSans py-4 max-w-6xl mx-auto">
        <Breadcrumb 
          items={[
            { label: "خانه", href: "/" },
            { label: "بلاگ", href: "/blog" },
            ...(categoryName ? [{ label: categoryName,href: `/blog/blog-category?category=${categoryName}&id=${categoryId}` }] : []),
            { label: Title }
          ]}
          className="mb-4"
        />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* عنوان مقاله */}
            <h1 className="text-xl md:text-2xl font-bold text-[#101117] my-6">
              {Title}
            </h1>

            {/* تصویر مقاله */}
            {ImagePath && (
              <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={`https://api.carmacheck.com/${ImagePath}`}
                  alt={Title || 'تصویر مقاله'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}

            {/* خلاصه مقاله */}
            {Excerpt && (
              <p className="text-lg text-[#55565A] mb-6 leading-relaxed">
                {Excerpt}
              </p>
            )}

            {/* محتوای HTML مقاله */}
            {processedContent && (
              <div 
                className="prose prose-lg max-w-none text-[#101117]  [&_a]:text-blue-600 [&_h2]:scroll-mt-20 !leading-9"
                dangerouslySetInnerHTML={{ __html: processedContent }}
                style={{
                  direction: 'rtl',
                  textAlign: 'right',
                }}
              />
            )}
          </div>

          {/* Table of Contents Sidebar */}
          {tocItems.length > 0 && (
            <div className="lg:w-64 flex-shrink-0">
              <TableOfContents items={tocItems} />
            </div>
          )}
        </div>

        {/* تاریخ انتشار */}
        {CreatedDate && (
          <div className="mt-8 pt-6 border-t border-[#DFDFDF]">
            <p className="text-sm text-[#55565A]">
              تاریخ انتشار: {new Date(CreatedDate).toLocaleDateString('fa-IR')}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
