import { Metadata } from "next";
import { PAGE_SEO } from "@/lib/seo";
import { pageMetadata } from "@/lib/page-metadata";
import {
  blogPostHref,
  fetchBlogCategories,
  fetchPublishedBlogPosts,
} from "@/lib/blog-list";
import BlogClient from "./BlogClient";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata(PAGE_SEO.blog.path, {
  title: PAGE_SEO.blog.title,
  description: PAGE_SEO.blog.description,
  keywords: PAGE_SEO.blog.keywords,
});

export default async function Blog() {
  const [posts, categories] = await Promise.all([
    fetchPublishedBlogPosts(3600),
    fetchBlogCategories(3600),
  ]);

  return (
    <>
      <BlogClient initialPosts={posts} initialCategories={categories} />
      {posts.length > 0 ? (
        <noscript>
          <nav aria-label="فهرست مقالات">
            <ul>
              {posts.map((post) => (
                <li key={String(post.BlogPostId ?? post.Id ?? post.Title)}>
                  <a href={blogPostHref(post)}>{post.Title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </noscript>
      ) : null}
    </>
  );
}
