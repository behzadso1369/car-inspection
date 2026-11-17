import { ApiHelper } from "@/helper/api-request";
import { serverFetch } from "@/helper/server-fetcher";

export type BlogListItem = {
  BlogPostId?: number | string;
  Id?: number | string;
  Title?: string;
  Excerpt?: string;
  ImagePath?: string;
  CreatedOn?: string;
  CreatedDate?: string;
  AuthorName?: string;
  CreatedBy?: string;
  BlogPostCanonical?: string;
  BlogCategotyId?: number;
  CategoryId?: number;
};

export function blogPostSlug(item: {
  BlogPostCanonical?: string;
  BlogPostId?: number | string;
  Id?: number | string;
}): string {
  const c = String(item?.BlogPostCanonical ?? "");
  const m = c.match(/\/blog\/([^/?#]+)\/?$/);
  if (m && m[1] && !/^\d+$/.test(m[1])) return m[1];
  return String(item?.BlogPostId ?? item?.Id ?? "");
}

export function blogPostHref(item: Parameters<typeof blogPostSlug>[0]) {
  return `/blog/${blogPostSlug(item)}`;
}

export async function fetchPublishedBlogPosts(
  revalidate = 3600
): Promise<BlogListItem[]> {
  const data = await serverFetch<{ SearchItems?: BlogListItem[] }>(
    ApiHelper.get("SiteBlogSearchWithTerms"),
    {
      method: "POST",
      body: { terms: "", take: 1000, skip: 0 },
      next: { revalidate },
    }
  );
  return data?.SearchItems ?? [];
}

export async function fetchBlogCategories(revalidate = 3600) {
  const data = await serverFetch<{ CategoryItems?: { Id: number; Name: string }[] }>(
    ApiHelper.get("SearchWithTermsCategory"),
    {
      method: "POST",
      body: { terms: "" },
      next: { revalidate },
    }
  );
  return data?.CategoryItems ?? [];
}
