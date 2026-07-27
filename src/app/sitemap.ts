import { MetadataRoute } from 'next';
import { serverApiHelper } from '@/helper/server-fetcher';
import { CARS } from '@/app/car-inspection/carsData';
import { LOCAL_AREAS } from '@/lib/local-areas';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://carmacheck.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes با priority و changeFrequency
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/regulations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/car-inspection-flow/select-car-group`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/car-inspection`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // صفحات کارشناسی خودروها (معایب و مزایا) — عالی برای جذب ترافیک ارگانیک
  const carInspectionRoutes: MetadataRoute.Sitemap = CARS.map((car) => ({
    url: `${SITE_URL}/car-inspection/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // صفحات فرود محلی (سئوی محلی شرق تهران)
  const localRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/car-inspection-tehran`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...LOCAL_AREAS.map((a) => ({
      url: `${SITE_URL}/car-inspection-tehran/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ];

  // Dynamic blog routes — مقالات واقعی بلاگ (نه دسته‌بندی‌ها)
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    // استفاده از همون BASE_URL که در interceptor هست
    const BASE_URL = "https://api.carmacheck.com/api/";
    const response = await fetch(`${BASE_URL}SiteBlog/SearchWithTerms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ terms: "", take: 1000, skip: 0 }),
      next: { revalidate: 3600 } // Cache برای 1 ساعت
    });

    if (response.ok) {
      const data = await response.json();
      const posts = data?.SearchItems || data?.resultObject?.SearchItems || [];

      // slug را از BlogPostCanonical درمی‌آوریم؛ اگر نبود از id عددی استفاده می‌کنیم
      const slugOf = (post: any): string => {
        const c = String(post?.BlogPostCanonical ?? "");
        const m = c.match(/\/blog\/([^/?#]+)\/?$/);
        if (m && m[1] && !/^\d+$/.test(m[1])) return m[1];
        return String(post?.BlogPostId);
      };

      blogRoutes = posts
        .filter((post: any) => post?.BlogPostId != null)
        .map((post: any) => ({
          url: `${SITE_URL}/blog/${slugOf(post)}`,
          lastModified: post.ModifiedDate ? new Date(post.ModifiedDate) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }));
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // ترکیب تمام routes
  return [...staticRoutes, ...localRoutes, ...carInspectionRoutes, ...blogRoutes];
}

