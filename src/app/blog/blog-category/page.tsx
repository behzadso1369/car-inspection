"use client";

export const dynamic = "force-dynamic";
import SuggestionCard from "../components/SuggestionCard";
import { Suspense, useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { relatedPostSlug } from "../components/RelatedPosts";

function BlogCategoryContent() {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category") || "";
  const categoryIdParam = searchParams.get("id");
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isAll = !categoryIdParam;
  const decodedCategoryName = categoryName
    ? decodeURIComponent(categoryName)
    : "";
  const heading = isAll ? "همه مقالات" : decodedCategoryName || "مقالات";

  const getCategories = () => {
    instance
      .post(ApiHelper.get("SearchWithTermsCategory"), { terms: "" })
      .then((res: any) => {
        if (res?.CategoryItems?.length) setCategories(res.CategoryItems);
      })
      .catch(() => {});
  };

  const getAllBlogs = () => {
    setIsLoading(true);
    instance
      .post(ApiHelper.get("SiteBlogSearchWithTerms"), {
        terms: "",
        take: 1000,
        skip: 0,
      })
      .then((res: any) => {
        setPosts(res?.SearchItems ?? []);
      })
      .catch((err: any) => {
        console.error("Error fetching blogs:", err);
        setPosts([]);
      })
      .finally(() => setIsLoading(false));
  };

  const getCategoryWithId = (categoryId: number) => {
    if (!categoryId) return;
    setIsLoading(true);
    instance
      .get(ApiHelper.get("SearchCategoryWithId") + "?id=" + categoryId)
      .then((res: any) => {
        setPosts(res?.CategoryPosts ?? []);
      })
      .catch((err: any) => {
        console.error("Error fetching category posts:", err);
        setPosts([]);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categoryIdParam && /^\d+$/.test(categoryIdParam)) {
      getCategoryWithId(Number(categoryIdParam));
    } else {
      getAllBlogs();
    }
  }, [categoryIdParam]);

  const chipClass = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-colors ${
      active
        ? "bg-[#3456bb] text-white border-[#3456bb]"
        : "text-[#A6A6A6] border-[#A6A6A6] hover:text-[#3456bb] hover:border-[#3456bb]"
    }`;

  return (
    <div className="px-4 font-IranSans py-4 max-w-6xl mx-auto" dir="rtl">
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "بلاگ", href: "/blog" },
          { label: heading },
        ]}
        className="mb-4"
      />

      <h1 className="text-lg md:text-xl w-auto border-b-2 py-2 border-blue-100 font-bold text-[#101117] mb-6">
        {heading}
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-[#101117] text-sm whitespace-nowrap">
          دسته‌بندی‌ها:
        </span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          <Link href="/blog/blog-category" prefetch={false} className={chipClass(isAll)}>
            همه
          </Link>
          {categories.map((c) => (
            <Link
              key={c.Id}
              href={`/blog/blog-category?category=${encodeURIComponent(c.Name)}&id=${c.Id}`}
              prefetch={false}
              className={chipClass(String(c.Id) === String(categoryIdParam))}
            >
              {c.Name}
            </Link>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-[#55565A]">در حال بارگذاری...</div>
      ) : (
        <div className="flex justify-center flex-wrap">
          <div className="grid grid-cols-4 gap-4 w-full">
            {posts.length > 0 ? (
              posts.map((item: any) => (
                <SuggestionCard
                  key={item?.BlogPostId ?? item?.Id}
                  date={item?.CreatedOn ?? item?.CreatedDate}
                  title={item?.Title ?? item?.BlogPostTitle}
                  excerpt={item?.Excerpt ?? item?.BlogPostDescription}
                  imageSrc={
                    item?.ImagePath
                      ? "https://api.carmacheck.com/" + item.ImagePath
                      : "/placeholder-blog.jpg"
                  }
                  link={`/blog/${relatedPostSlug(item)}`}
                />
              ))
            ) : (
              <div className="col-span-4 text-center py-8 text-[#55565A]">
                هیچ بلاگی برای این دسته بندی وجود ندارد
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BlogCategory() {
  return (
    <Suspense
      fallback={
        <div className="px-4 font-IranSans py-8 text-center">
          <p className="text-[#55565A]">در حال بارگذاری...</p>
        </div>
      }
    >
      <BlogCategoryContent />
    </Suspense>
  );
}
