import { MetadataRoute } from 'next';
import { serverApiHelper } from '@/helper/server-fetcher';

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
  ];

  // Dynamic blog routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  
  try {
    // فچ کردن لیست دسته‌بندی‌های بلاگ با استفاده از BASE_URL درست
    // استفاده از همون BASE_URL که در interceptor هست
    const BASE_URL = "https://api.carmacheck.com/api/";
    const response = await fetch(`${BASE_URL}SiteBlog/SearchWithTermsCategory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ terms: "" }),
      next: { revalidate: 3600 } // Cache برای 1 ساعت
    });

    if (response.ok) {
      const data = await response.json();
      const categories = data?.CategoryItems || [];

      blogRoutes = categories.map((category: any) => ({
        url: `${SITE_URL}/blog/${category.Id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching blog categories for sitemap:', error);
  }

  // ترکیب تمام routes
  return [...staticRoutes, ...blogRoutes];
}

