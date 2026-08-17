import { MetadataRoute } from 'next';
import { CARS } from '@/app/car-inspection-most-popular/carsData';
import { LOCAL_AREAS } from '@/lib/local-areas';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://carmacheck.com';

/**
 * آخرین تغییر واقعی محتوای صفحات ثابت (از تاریخ commit محتوایی، نه زمان ساخت sitemap).
 * بعد از آپدیت واقعی متن/ساختار صفحه، همین تاریخ را به‌روز کن.
 */
const PAGE_LASTMOD: Record<string, string> = {
  '/': '2026-08-10',
  '/about-us': '2026-08-08',
  '/services': '2026-07-11',
  '/contact-us': '2026-07-27',
  '/blog': '2026-07-05',
  '/faq': '2026-07-31',
  '/regulations': '2026-08-05',
  '/car-inspection': '2026-08-08',
  '/car-inspection-most-popular': '2026-08-08',
  '/car-inspection-tehran': '2026-08-10',
  '/car-price': '2026-08-02',
};

const CARS_LASTMOD = '2026-08-08';
const LOCAL_LASTMOD = '2026-08-10';

function parseDate(value: unknown): Date | undefined {
  if (value == null || value === '') return undefined;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }
  const normalized = String(value).trim().replace(/(\.\d{3})\d+/, '$1');
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

/** تاریخ واقعی مقاله از CMS؛ هرگز به «الان» fallback نمی‌شود. */
function blogLastModified(post: any): Date | undefined {
  return (
    parseDate(post.ModifiedDate) ??
    parseDate(post.ModifiedOn) ??
    parseDate(post.UpdatedOn) ??
    parseDate(post.CreatedOn) ??
    parseDate(post.CreatedDate)
  );
}

function urlEntry(
  path: string,
  lastModified: Date | undefined,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
    ...(lastModified ? { lastModified } : {}),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    urlEntry('/', parseDate(PAGE_LASTMOD['/']), 'daily', 1.0),
    urlEntry('/about-us', parseDate(PAGE_LASTMOD['/about-us']), 'monthly', 0.8),
    urlEntry('/services', parseDate(PAGE_LASTMOD['/services']), 'weekly', 0.9),
    urlEntry('/contact-us', parseDate(PAGE_LASTMOD['/contact-us']), 'monthly', 0.7),
    urlEntry('/blog', parseDate(PAGE_LASTMOD['/blog']), 'daily', 0.8),
    urlEntry('/faq', parseDate(PAGE_LASTMOD['/faq']), 'monthly', 0.6),
    urlEntry('/regulations', parseDate(PAGE_LASTMOD['/regulations']), 'monthly', 0.5),
    urlEntry('/car-inspection', parseDate(PAGE_LASTMOD['/car-inspection']), 'weekly', 0.9),
    urlEntry('/car-price', parseDate(PAGE_LASTMOD['/car-price']), 'weekly', 0.9),
    urlEntry(
      '/car-inspection-most-popular',
      parseDate(PAGE_LASTMOD['/car-inspection-most-popular']),
      'weekly',
      0.8,
    ),
  ];

  const carInspectionRoutes: MetadataRoute.Sitemap = CARS.map((car) =>
    urlEntry(
      `/car-inspection-most-popular/${car.slug}`,
      parseDate(CARS_LASTMOD),
      'monthly',
      0.8,
    ),
  );

  const localRoutes: MetadataRoute.Sitemap = [
    urlEntry(
      '/car-inspection-tehran',
      parseDate(PAGE_LASTMOD['/car-inspection-tehran']),
      'weekly',
      0.9,
    ),
    ...LOCAL_AREAS.map((a) =>
      urlEntry(`/car-inspection-tehran/${a.slug}`, parseDate(LOCAL_LASTMOD), 'weekly', 0.85),
    ),
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  let newestBlogDate: Date | undefined;

  try {
    const BASE_URL = 'https://api.carmacheck.com/api/';
    const response = await fetch(`${BASE_URL}SiteBlog/SearchWithTerms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ terms: '', take: 1000, skip: 0 }),
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const data = await response.json();
      const posts = data?.SearchItems || data?.resultObject?.SearchItems || [];

      const slugOf = (post: any): string => {
        const c = String(post?.BlogPostCanonical ?? '');
        const m = c.match(/\/blog\/([^/?#]+)\/?$/);
        if (m && m[1] && !/^\d+$/.test(m[1])) return m[1];
        return String(post?.BlogPostId);
      };

      blogRoutes = posts
        .filter((post: any) => post?.BlogPostId != null)
        .map((post: any) => {
          const lastModified = blogLastModified(post);
          if (lastModified && (!newestBlogDate || lastModified > newestBlogDate)) {
            newestBlogDate = lastModified;
          }
          return urlEntry(`/blog/${slugOf(post)}`, lastModified, 'monthly', 0.7);
        });
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  if (newestBlogDate) {
    const blogIndex = staticRoutes.findIndex((r) => r.url === `${SITE_URL}/blog`);
    if (blogIndex >= 0) {
      staticRoutes[blogIndex] = urlEntry('/blog', newestBlogDate, 'daily', 0.8);
    }
  }

  return [...staticRoutes, ...localRoutes, ...carInspectionRoutes, ...blogRoutes];
}
