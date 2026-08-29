import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiHelper } from "@/helper/api-request";
import { serverFetch, serverApiHelper } from "@/helper/server-fetcher";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { processBlogContent } from "@/lib/blog-content";
import { getReadingTime } from "@/lib/reading-time";
import { BlogDetailClient } from "./BlogDetailClient";
import {
  normalizeRelatedPosts,
  relatedPostSlug,
  type RelatedPost,
} from "../components/RelatedPosts";

const BLOG_REVALIDATE = 3600;
const API_BASE_URL = "https://api.carmacheck.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com";

/**
 * پارامتر روت یک slug است (مثل khodro-moshkel-dar-bad-az-kharid).
 * برای سازگاری با لینک‌های قدیمی، اگر مقدار کاملاً عددی باشد همان را به‌عنوان id برمی‌گردانیم.
 * در غیر این صورت از لیست بلاگ‌ها، آیتمی که canonical آن به همین slug ختم می‌شود را پیدا می‌کنیم.
 */
async function resolvePostId(param: string): Promise<string | null> {
  const decoded = decodeURIComponent(param);
  if (/^\d+$/.test(decoded)) return decoded;

  const data = await serverApiHelper.post<{ SearchItems?: any[] }>(
    "SiteBlogSearchWithTerms",
    { terms: "", take: 1000, skip: 0 },
    BLOG_REVALIDATE
  );
  const items = data?.SearchItems ?? [];

  const found = items.find((it: any) => {
    const canonical = String(it?.BlogPostCanonical ?? "");
    const m = canonical.match(/\/blog\/([^/?#]+)\/?$/);
    return m && decodeURIComponent(m[1]) === decoded;
  });

  return found?.BlogPostId != null ? String(found.BlogPostId) : null;
}

async function getPost(param: string) {
  const id = await resolvePostId(param);
  if (!id) return null;
  const endpoint = `${ApiHelper.get("GetBlogDetail")}?id=${id}`;
  const data = await serverFetch<{ PostDetails?: any[] }>(endpoint, {
    next: { revalidate: BLOG_REVALIDATE },
  });
  const post = data?.PostDetails?.[0] ?? null;
  console.log(post);
  return post ? { ...post, __resolvedId: id } : null;
}

function excludeCurrentPost(posts: RelatedPost[], postId: string) {
  return posts.filter(
    (item) => String(item.BlogPostId ?? item.Id ?? "") !== String(postId)
  );
}

async function fetchRelatedFromApi(postId: string, take: number) {
  const endpoint = `${ApiHelper.get("GetRelatedPosts")}?PostId=${postId}&Take=${take}`;
  const data = await serverFetch(endpoint, {
    next: { revalidate: BLOG_REVALIDATE },
  });
  return excludeCurrentPost(normalizeRelatedPosts(data), postId);
}

async function getRelatedPosts(
  postId: string,
  categoryId?: number
): Promise<RelatedPost[]> {
  // بعضی پست‌ها با Take=5 در API JSON ناقص می‌دهند؛ اگر خالی بود با Take=1 تکرار می‌کنیم.
  let fromApi = await fetchRelatedFromApi(postId, 5);
  if (fromApi.length === 0) {
    fromApi = await fetchRelatedFromApi(postId, 1);
  }

  const seen = new Set<string>([String(postId)]);
  for (const item of fromApi) {
    seen.add(String(item.BlogPostId ?? item.Id ?? ""));
    seen.add(relatedPostSlug(item));
  }

  if (fromApi.length >= 5) return fromApi.slice(0, 5);

  const list = await serverApiHelper.post<{ SearchItems?: RelatedPost[] }>(
    "SiteBlogSearchWithTerms",
    { terms: "", take: 20, skip: 0 },
    BLOG_REVALIDATE
  );
  const others = (list?.SearchItems ?? []).filter((item: any) => {
    const id = String(item.BlogPostId ?? item.Id ?? "");
    const slug = relatedPostSlug(item);
    return !seen.has(id) && !seen.has(slug);
  });
  const sameCategory = others.filter((item: any) => {
    if (categoryId == null) return true;
    return item.BlogCategotyId === categoryId || item.CategoryId === categoryId;
  });
  const fill = (sameCategory.length > 0 ? sameCategory : others).slice(
    0,
    5 - fromApi.length
  );
  return [...fromApi, ...fill].slice(0, 5);
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "مقاله یافت نشد" };
  }

  const title = post.BlogPostTitle ?? post.Title ?? "مقالات کارشناسی خودرو";
  const description = post.BlogPostDescription ?? post.Excerpt ?? undefined;
  const keywords = post.BlogPostKeyword ?? undefined;

  // canonical همیشه آدرس واقعی همین صفحه (slug) است تا صفحه خودش را canonical کند
  const pageUrl = `${SITE_URL}/blog/${slug}`;

  return {
    title,
    description: description?.slice?.(0, 160) ?? description,
    keywords: keywords
      ? typeof keywords === "string"
        ? keywords.split(/[،,]/).map((k) => k.trim())
        : keywords
      : undefined,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description: description?.slice?.(0, 160) ?? description,
      url: pageUrl,
      siteName: "کارماچک",
      locale: "fa_IR",
      type: "article",
      images: post.ImagePath
        ? [
            {
              url: `${API_BASE_URL}/${post.ImagePath}`,
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
  const { id: slug } = await params;
  const blogData = await getPost(slug);

  if (!blogData) {
    notFound();
  }

  // پردازش محتوا در سمت سرور تا در HTML اولیه (SSR) حاضر و قابل خزش باشد
  const [{ processed, toc }, relatedPosts] = await Promise.all([
    Promise.resolve(processBlogContent(blogData.Content ?? "")),
    getRelatedPosts(blogData.__resolvedId, blogData.CategoryId),
  ]);

  const title = blogData.BlogPostTitle ?? blogData.Title ?? "";
  const description = blogData.BlogPostDescription ?? blogData.Excerpt ?? "";
  const image = blogData.ImagePath
    ? `${API_BASE_URL}/${blogData.ImagePath}`
    : undefined;
  const readingTime = getReadingTime(blogData.Content ?? "");

  const articleSchema = generateArticleSchema({
    title,
    description,
    path: `/blog/${slug}`,
    datePublished:
      blogData.CreatedDate ?? blogData.CreatedOn ?? new Date().toISOString(),
    dateModified:
      blogData.ModifiedDate ?? blogData.CreatedDate ?? blogData.CreatedOn,
    image,
    timeRequiredMinutes: readingTime,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "خانه", path: "/" },
    { name: "بلاگ", path: "/blog" },
    { name: title, path: `/blog/${slug}` },
  ]);

  const relatedListSchema =
    relatedPosts.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "مقالات مرتبط",
          itemListElement: relatedPosts.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/blog/${relatedPostSlug(item)}`,
            name: item.Title ?? item.BlogPostTitle ?? "",
          })),
        }
      : null;

  return (
    <>
      <JsonLd
        data={[
          articleSchema,
          breadcrumbSchema,
          ...(relatedListSchema ? [relatedListSchema] : []),
        ]}
      />
      <BlogDetailClient
        id={blogData.__resolvedId}
        blogData={blogData}
        processedContent={processed}
        tocItems={toc}
        relatedPosts={relatedPosts}
        readingTime={readingTime}
      />
    </>
  );
}
