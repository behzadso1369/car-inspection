"use client";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon, Clock, ChevronLeft } from "lucide-react";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import moment from "jalali-moment";

const IMG = (path?: string) =>
  path ? "https://api.carmacheck.com/" + path : "/placeholder-blog.jpg";
const faDate = (d?: string) => {
  try {
    return d ? moment(d).locale("fa").format("D MMMM YYYY") : "";
  } catch {
    return "";
  }
};
// slug را از BlogPostCanonical درمی‌آورد؛ اگر معتبر نبود به id عددی برمی‌گردد (سازگاری قدیمی)
const slugOf = (item: any) => {
  const c = String(item?.BlogPostCanonical ?? "");
  const m = c.match(/\/blog\/([^/?#]+)\/?$/);
  if (m && m[1] && !/^\d+$/.test(m[1])) return m[1];
  return String(item?.BlogPostId ?? item?.Id ?? "");
};
const postLink = (item: any) => `/blog/${slugOf(item)}`;

/* ---------- عنوان بخش با خط زیر ---------- */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center my-8">
      <h2 className="text-lg lg:text-2xl font-bold text-[#1E2A38]">{children}</h2>
      <span className="mt-2 h-[3px] w-16 rounded-full bg-[#3456bb]" />
    </div>
  );
}

/* ---------- دکمه مشاهده همه ---------- */
function SeeAll({ href = "/blog/blog-category" }: { href?: string }) {
  return (
    <div className="flex justify-center my-8">
      <Link
        href={href}
        prefetch={false}
        className="rounded-full border border-[#3456bb] text-[#3456bb] px-8 py-2 text-sm hover:bg-[#3456bb] hover:text-white transition-colors"
      >
        مشاهده همه
      </Link>
    </div>
  );
}

/* ---------- کارت فیچر (عکس + عنوان روی گرادیان) ---------- */
function FeatureCard({ item, className = "" }: { item: any; className?: string }) {
  if (!item) return null;
  return (
    <Link
      prefetch={false}
      href={postLink(item)}
      className={`relative block overflow-hidden rounded-3xl group ${className}`}
    >
      <Image
        src={IMG(item?.ImagePath)}
        alt={item?.Title ?? ""}
        fill
        sizes="(max-width:1024px) 100vw, 40vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <h3 className="absolute bottom-4 right-4 left-4 text-white text-sm lg:text-base font-medium leading-relaxed">
        {item?.Title}
      </h3>
    </Link>
  );
}

/* ---------- ردیف کوچک مقاله (تاریخ/عنوان/نویسنده + تصویر) ---------- */
function ArticleRow({ item }: { item: any }) {
  if (!item) return null;
  return (
    <Link
      prefetch={false}
      href={postLink(item)}
      className="flex items-center gap-4 py-4 border-b border-[#EFEFEF] group"
    >
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-xs text-[#9A9CA1]">{faDate(item?.CreatedOn)}</span>
        <h3 className="text-sm lg:text-base font-medium text-[#1E2A38] leading-relaxed mt-1 line-clamp-2 group-hover:text-[#3456bb]">
          {item?.Title}
        </h3>
        <div className="flex items-center text-xs text-[#55565A] mt-2">
          <Clock className="w-3.5 h-3.5 ml-1" />
          <span>{item?.AuthorName ?? item?.CreatedBy ?? "کارماچک"}</span>
        </div>
      </div>
      <div className="relative w-[110px] h-[80px] flex-shrink-0">
        <Image
          src={IMG(item?.ImagePath)}
          alt={item?.Title ?? ""}
          fill
          sizes="110px"
          className="object-cover rounded-2xl"
        />
      </div>
    </Link>
  );
}

/* ---------- کارت عمودی (تازه‌ترین/پیشنهادی) ---------- */
function VerticalCard({ item, highlighted = false }: { item: any; highlighted?: boolean }) {
  if (!item) return null;
  return (
    <Link
      prefetch={false}
      href={postLink(item)}
      className={`block rounded-3xl p-3 transition-shadow ${
        highlighted
          ? "border border-[#B1B1B3] shadow-[0px_8px_16px_0px_#0000000F]"
          : "hover:border hover:border-[#B1B1B3] hover:shadow-[0px_8px_16px_0px_#0000000F] border border-transparent"
      }`}
    >
      <div className="relative h-48 w-full rounded-2xl overflow-hidden">
        <Image
          src={IMG(item?.ImagePath)}
          alt={item?.Title ?? ""}
          fill
          sizes="(max-width:1024px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-4 text-[#1E2A38] text-sm lg:text-base font-medium leading-relaxed line-clamp-2">
        {item?.Title}
      </h3>
      <p className="mt-2 text-[#6B6C70] text-xs lg:text-sm leading-relaxed line-clamp-2">
        {item?.Excerpt}
      </p>
      <span className="block mt-3 text-xs text-[#9A9CA1]">{faDate(item?.CreatedOn)}</span>
    </Link>
  );
}

export default function BlogClient() {
  const router = useRouter();
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [heroIndex, setHeroIndex] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState<string>("all");
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategory = () => {
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
      .post(ApiHelper.get("SiteBlogSearchWithTerms"), { terms: "", take: 1000, skip: 0 })
      .then((res: any) => {
        setPosts(res?.SearchItems ?? []);
      })
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getCategory();
    getAllBlogs();
  }, []);

  useEffect(() => {
    if (!heroApi) return;
    const onSelect = () => setHeroIndex(heroApi.selectedScrollSnap());
    heroApi.on("select", onSelect);
    onSelect();
    return () => {
      heroApi.off("select", onSelect);
    };
  }, [heroApi]);

  // برش داده‌ها برای بخش‌های مختلف
  const hero = posts.slice(0, 5);
  const featured = posts[0];
  const latestList = posts.slice(1, 5);
  const suggested = posts.slice(0, 6);

  return (
    <div className="font-IranSans max-w-6xl mx-auto px-4 py-4" dir="rtl">
      {/* ===== فیلتر دسته‌بندی + جستجو ===== */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-[#101117] text-sm whitespace-nowrap hidden lg:inline">
            پربازدیدترین‌ها:
          </span>
          <span className="text-[#101117] text-sm whitespace-nowrap lg:hidden">
            دسته‌بندی‌ها:
          </span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveCat("all")}
              className={`rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-colors ${
                activeCat === "all"
                  ? "bg-[#3456bb] text-white border-[#3456bb]"
                  : "text-[#A6A6A6] border-[#A6A6A6] hover:text-[#3456bb] hover:border-[#3456bb]"
              }`}
            >
              همه
            </button>
            {categories.map((c) => (
              <button
                key={c.Id}
                onClick={() =>
                  router.push(
                    `/blog/blog-category?category=${encodeURIComponent(c.Name)}&id=${c.Id}`
                  )
                }
                className="rounded-full border border-[#A6A6A6] text-[#A6A6A6] px-4 py-1.5 text-sm whitespace-nowrap hover:text-[#3456bb] hover:border-[#3456bb] transition-colors"
              >
                {c.Name}
              </button>
            ))}
          </div>
        </div>

        <InputGroup className="px-4 w-full lg:w-72 flex items-center !py-0 border border-[#DFDFDF] rounded-full text-[#55565A]">
          <InputGroupInput placeholder="جستجو در مقاله‌ها" />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="w-4 h-4" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-[#55565A]">در حال بارگذاری...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-[#55565A]">هیچ مقاله‌ای یافت نشد</div>
      ) : (
        <>
          {/* ===== فیچر (دسکتاپ: گرید ۲+۳ / موبایل: کاروسل) ===== */}
          {/* دسکتاپ */}
          <div className="hidden lg:grid grid-cols-6 gap-4 mt-6">
            <FeatureCard item={hero[0]} className="col-span-3 h-64" />
            <FeatureCard item={hero[1]} className="col-span-3 h-64" />
            <FeatureCard item={hero[2]} className="col-span-2 h-56" />
            <FeatureCard item={hero[3]} className="col-span-2 h-56" />
            <FeatureCard item={hero[4]} className="col-span-2 h-56" />
          </div>
          {/* موبایل */}
          <div className="lg:hidden mt-6">
            <Carousel
              setApi={setHeroApi}
              opts={{ direction: "rtl", align: "start", loop: true }}
            >
              <CarouselContent>
                {hero.map((item, i) => (
                  <CarouselItem key={i}>
                    <FeatureCard item={item} className="h-52 w-full" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="flex justify-center gap-1.5 mt-3">
              {hero.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === heroIndex ? "w-4 bg-[#3456bb]" : "w-1.5 bg-[#D9D9D9]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ===== جدیدترین مقالات ===== */}
          <SectionTitle>جدیدترین‌های مقالات</SectionTitle>

          {/* دسکتاپ: لیست (راست) + فیچر بزرگ (چپ) */}
          <div className="hidden lg:grid grid-cols-2 gap-8">
            <div>
              {latestList.map((item, i) => (
                <ArticleRow key={i} item={item} />
              ))}
            </div>
            {featured && (
              <Link prefetch={false} href={postLink(featured)} className="block group">
                <div className="relative w-full h-64 rounded-3xl overflow-hidden">
                  <Image
                    src={IMG(featured?.ImagePath)}
                    alt={featured?.Title ?? ""}
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="block mt-4 text-xs text-[#9A9CA1]">
                  {faDate(featured?.CreatedOn)}
                </span>
                <h3 className="mt-2 text-lg font-bold text-[#1E2A38] group-hover:text-[#3456bb]">
                  {featured?.Title}
                </h3>
                <p className="mt-2 text-sm text-[#6B6C70] leading-relaxed line-clamp-4">
                  {featured?.Excerpt}
                </p>
                <span className="mt-3 inline-flex items-center text-sm text-[#3456bb]">
                  مشاهده بیشتر <ChevronLeft className="w-4 h-4" />
                </span>
              </Link>
            )}
          </div>

          {/* موبایل: فقط لیست */}
          <div className="lg:hidden">
            {latestList.map((item, i) => (
              <ArticleRow key={i} item={item} />
            ))}
          </div>

          <SeeAll />

          {/* ===== تازه‌ترین مقاله‌ها / مطالب پیشنهادی ===== */}
          <SectionTitle>تازه‌ترین مقاله‌ها</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {suggested.map((item, i) => (
              <VerticalCard key={i} item={item} highlighted={i === 2} />
            ))}
          </div>
          <SeeAll />
        </>
      )}
    </div>
  );
}
