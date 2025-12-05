import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import SuggestionCard from "../components/SuggestionCard";
import { Metadata } from "next";
import { serverApiHelper } from "@/helper/server-fetcher";

// ISR - Incremental Static Regeneration
// صفحات جزئیات بلاگ با ISR بهینه می‌شوند
export const revalidate = 1800; // 30 minutes

// این function برای pre-rendering صفحات محبوب بلاگ استفاده می‌شود
export async function generateStaticParams() {
  try {
    const data = await serverApiHelper.post("SearchWithTermsCategory", { terms: "" });
    const categories = data?.CategoryItems || [];
    
    // فقط 10 صفحه اول را pre-render می‌کنیم
    return categories.slice(0, 10).map((category: any) => ({
      id: String(category.Id),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Dynamic Metadata برای هر صفحه بلاگ
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://carmacheck.com';
  
  // Await params در Next.js 15
  const { id } = await params;
  
  try {
    // فچ کردن اطلاعات دسته‌بندی با استفاده از serverApiHelper
    const data = await serverApiHelper.get(`SearchCategoryWithId?id=${id}`, 1800);
    const categoryName = data?.CategoryName || 'مقاله';
    const posts = data?.CategoryPosts || [];
    
    // تولید description از تعداد مقالات
    const postsCount = posts.length;
    const description = `${postsCount} مقاله در دسته‌بندی ${categoryName} | راهنمای کامل ${categoryName} | نکات کارشناسی خودرو | مطالب آموزشی خرید ماشین`;
    
    return {
      title: `${categoryName} | مقالات کارشناسی خودرو`,
      description: description.slice(0, 160), // محدود به 160 کاراکتر
      keywords: [
        categoryName,
        "کارشناسی خودرو",
        "مقالات خودرو",
        "آموزش خرید ماشین",
        "کارچک",
        "بلاگ خودرو",
      ],
      alternates: {
        canonical: `${siteURL}/blog/${id}`,
      },
      openGraph: {
        title: `${categoryName} | مقالات کارشناسی خودرو`,
        description: description.slice(0, 160),
        url: `${siteURL}/blog/${id}`,
        siteName: "کارچک",
        locale: "fa_IR",
        type: "article",
        images: posts[0]?.ImagePath ? [
          {
            url: `https://api.carmacheck.com/${posts[0].ImagePath}`,
            width: 1200,
            height: 630,
            alt: categoryName,
          }
        ] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${categoryName} | کارچک`,
        description: description.slice(0, 160),
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    // در صورت خطا، metadata پیش‌فرض
    return {
      title: "مقاله | کارشناسی خودرو کارچک",
      description: "مقالات تخصصی کارشناسی خودرو و خرید ماشین",
      alternates: {
        canonical: `${siteURL}/blog/${id}`,
      },
    };
  }
}

export default function BlogCategory({ params }: { params: Promise<{ id: string }> }) {
        return (
        <div className="px-4 font-IranSans py-4">
          
      <InputGroup  className="px-4 flex items-center !py-0 border border-[#DFDFDF] rounded-full text-[#55565A]">
  <InputGroupInput placeholder="جستجو در مقاله‌ها" />

  <InputGroupAddon align="inline-end">
  <SearchIcon />
  </InputGroupAddon>
</InputGroup>
<div>
    <div className="flex justify-center flex-wrap">

   
<div className="flex justify-center flex-wrap">
<h2 className="w-auto border-b py-2 text-center inline-block m-auto">کارشناسی خودرو</h2>
  <SuggestionCard date="۲۵ بهمن ۱۴۰۳" title="۵ اشتباه رایج مدیران تازه‌کار و روش‌های جلوگیری از آن‌ها" imageSrc="/suggestionCard1.png" link="/" />
  <SuggestionCard date="۲۵ بهمن ۱۴۰۳" title="۵ اشتباه رایج مدیران تازه‌کار و روش‌های جلوگیری از آن‌ها" imageSrc="/suggestionCard2.jpg" link="/" />
  <SuggestionCard date="۲۵ بهمن ۱۴۰۳" title="۵ اشتباه رایج مدیران تازه‌کار و روش‌های جلوگیری از آن‌ها" imageSrc="/suggestionCard3.jpg" link="/" />
  <SuggestionCard date="۲۵ بهمن ۱۴۰۳" title="۵ اشتباه رایج مدیران تازه‌کار و روش‌های جلوگیری از آن‌ها" imageSrc="/suggestionCard1.png" link="/" />
</div>
    </div>


</div>

    
     
    
            
        </div>
    )
}
