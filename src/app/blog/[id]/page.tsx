import { Metadata } from "next";
import { ApiHelper } from "@/helper/api-request";
import { serverFetch } from "@/helper/server-fetcher";
import { BlogDetailClient } from "./BlogDetailClient";

const BLOG_REVALIDATE = 3600;

async function getBlogDetail(id: string) {
  const endpoint = `${ApiHelper.get("GetBlogDetail")}?id=${id}`;
  const data = await serverFetch<{ PostDetails?: any[] }>(endpoint, {
    next: { revalidate: BLOG_REVALIDATE },
  });
  return data?.PostDetails?.[0] ?? null;
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { id } = await params;
  const post = await getBlogDetail(id);
  console.log("post is werwer    "+`https://api.carmacheck.com/${post.ImagePath}`);
  
  if (!post) {
    return { title: "مقاله یافت نشد" };
  }

  const title = post.BlogPostTitle ?? post.Title ?? "مقالات کارشناسی خودرو";
  const description = post.BlogPostDescription ?? post.Excerpt ?? undefined;
  const keywords = post.BlogPostKeyword ?? undefined;
  const canonical = post.BlogPostCanonical ?? undefined;
  const siteURL =  "https://carmacheck.com";

  return {
    title,
    description: description?.slice?.(0, 160) ?? description,
    keywords: keywords ? (typeof keywords === "string" ? keywords.split(/[،,]/).map((k) => k.trim()) : keywords) : undefined,
    alternates: canonical ? { canonical } : { canonical: `${siteURL}/blog/${id}` },
    openGraph: {
      title,
      description: description?.slice?.(0, 160) ?? description,
      url: `${siteURL}/blog/${id}`,
      siteName: "کارماچک",
      locale: "fa_IR",
      type: "article",
      images: post.ImagePath
        ? [
            {
              url: `https://api.carmacheck.com/${post.ImagePath}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}


export default async function BlogDetailPage({ params }: Props) {
  
  const { id } = await params;
  const blogData = await getBlogDetail(id);

  if (!blogData) {
    return (
      <div className="px-4 font-IranSans py-8 text-center">
        <p className="text-[#55565A]">مقاله مورد نظر یافت نشد.</p>
      </div>
    );
  }

  return <BlogDetailClient id={id} blogData={blogData} />;
}
