"use client"

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { NextSeo } from "next-seo";

export default function BlogDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [blogData, setBlogData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBlogDetail = () => {
      if (!id) return;
      
      instance.get(ApiHelper.get("GetBlogDetail") + `?id=${id}`)
        .then((res: any) => {
          setBlogData(res?.PostDetails?.[0]);
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.error("Error fetching blog detail:", err);
          setIsLoading(false);
        });
    };

    getBlogDetail();
  }, [id]);

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
      <div className="px-4 font-IranSans py-4 max-w-4xl mx-auto">
        {/* عنوان مقاله */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#101117] mb-4">
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
        {Content && (
          <div 
            className="prose prose-lg max-w-none text-[#101117] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: Content }}
            style={{
              direction: 'rtl',
              textAlign: 'right',
            }}
          />
        )}

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
