/**
 * SEO Utilities & Configurations for Car Inspection Website
 * استانداردهای SEO:
 * - Title: 50-60 کاراکتر (حداکثر 70)
 * - Description: 150-160 کاراکتر (حداکثر 165)
 * - Keywords: 5-10 کلمه کلیدی مرتبط
 * - Canonical: URL کامل و یکتا
 */

// Base URL سایت - باید از environment variable بیاید
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://carmacheck.com';

/**
 * تولید Canonical URL استاندارد
 */
export function getCanonicalUrl(path: string): string {
  // حذف اسلش اضافی از ابتدا
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // حذف اسلش از انتها (به جز root)
  const normalizedPath = cleanPath.length > 1 && cleanPath.endsWith('/') 
    ? cleanPath.slice(0, -1) 
    : cleanPath;
  
  return `${BASE_URL}${normalizedPath}`;
}

/**
 * تولید متا تگ‌های Open Graph
 */
export function generateOGTags(config: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}) {
  return {
    type: config.type || 'website',
    locale: 'fa_IR',
    url: getCanonicalUrl(config.path),
    title: config.title,
    description: config.description,
    siteName: 'کارچک - کارشناسی خودرو',
    images: [
      {
        url: config.image || `${BASE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: config.title,
      },
    ],
  };
}

/**
 * تولید Schema.org JSON-LD
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'کارچک',
    alternateName: 'CarmaCheck',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/images/logo.svg`,
    description: 'ارائه‌دهنده خدمات تخصصی کارشناسی خودرو در ایران',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'تهران، ونک، ملاصدرا، بن‌بست صدر، پلاک ۶ واحد ۴',
      addressLocality: 'تهران',
      addressCountry: 'IR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+98-21-91001740',
      contactType: 'customer service',
      availableLanguage: 'Persian',
    },
    sameAs: [
      // اضافه کردن لینک‌های شبکه‌های اجتماعی
    ],
  };
}

/**
 * تولید Breadcrumb Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

/**
 * تولید Article Schema برای بلاگ
 */
export function generateArticleSchema(config: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.title,
    description: config.description,
    image: config.image || `${BASE_URL}/og-default.jpg`,
    datePublished: config.datePublished,
    dateModified: config.dateModified || config.datePublished,
    author: {
      '@type': 'Person',
      name: config.author || 'تیم کارچک',
    },
    publisher: {
      '@type': 'Organization',
      name: 'کارچک',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getCanonicalUrl(config.path),
    },
  };
}

/**
 * تولید Service Schema برای صفحه سرویس‌ها
 */
export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'کارشناسی خودرو',
    provider: {
      '@type': 'Organization',
      name: 'کارچک',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'تهران',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات کارشناسی',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'کارشناسی استاندارد',
            description: 'بررسی کامل خودرو با تجهیزات استاندارد',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'کارشناسی VIP',
            description: 'بررسی جامع با خدمات اضافی و راهنمایی تخصصی',
          },
        },
      ],
    },
  };
}

/**
 * تولید FAQ Schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * کلیدواژه‌های مشترک برای تمام صفحات
 */
export const COMMON_KEYWORDS = [
  'کارشناسی خودرو',
  'کارشناسی ماشین',
  'خرید خودرو',
  'خرید ماشین',
  'کارچک',
  'carmacheck',
  'کارشناسی خودرو تهران',
];

/**
 * تنظیمات SEO برای هر صفحه
 */
export const PAGE_SEO = {
  home: {
    title: 'کارچک | کارشناسی تخصصی خودرو با کارشناسان مجرب',
    description: 'کارشناسی تخصصی خودرو با ۹۰٪ دقت | بیش از ۲۵ هزار کارشناسی موفق | کارشناسی در محل یا مرکز | دریافت گزارش فوری | تهران',
    keywords: [
      ...COMMON_KEYWORDS,
      'کارشناسی آنلاین',
      'کارشناسی در محل',
      'قیمت کارشناسی خودرو',
      'بهترین کارشناس خودرو',
    ],
    path: '/',
  },
  
  about: {
    title: 'درباره کارچک | ۲۵ سال تجربه در کارشناسی خودرو',
    description: 'کارچک با بیش از ۲۵ سال تجربه و ۹۰٪ دقت در کارشناسی، بیش از ۲۵ هزار کارشناسی موفق انجام داده است. کارشناسان حرفه‌ای و مجرب.',
    keywords: [
      ...COMMON_KEYWORDS,
      'درباره کارچک',
      'تاریخچه کارچک',
      'کارشناسان کارچک',
      'تجربه کارشناسی',
    ],
    path: '/about-us',
  },
  
  services: {
    title: 'خدمات کارشناسی خودرو | استاندارد و VIP',
    description: 'انواع خدمات کارشناسی: استاندارد از ۲۵۰ هزار تومان | VIP از ۴۵۰ هزار تومان | بررسی موتور، برق، تایر، ترمز و سیستم سوخت | گزارش فوری',
    keywords: [
      ...COMMON_KEYWORDS,
      'قیمت کارشناسی',
      'کارشناسی استاندارد',
      'کارشناسی VIP',
      'خدمات کارشناسی',
      'هزینه کارشناسی خودرو',
    ],
    path: '/services',
  },
  
  contact: {
    title: 'تماس با کارچک | ۰۲۱-۹۱۰۰۱۷۴۰',
    description: 'تماس با کارچک: ۰۲۱-۹۱۰۰۱۷۴۰ | آدرس: تهران، ونک، ملاصدرا، بن‌بست صدر، پلاک ۶ | ساعات کاری: شنبه تا چهارشنبه ۹-۱۸',
    keywords: [
      ...COMMON_KEYWORDS,
      'تماس با کارچک',
      'شماره تماس کارشناسی',
      'آدرس کارچک',
      'ساعات کاری',
    ],
    path: '/contact-us',
  },
  
  blog: {
    title: 'مقالات کارشناسی خودرو | مجله کارچک',
    description: 'مقالات تخصصی درباره کارشناسی خودرو، نکات خرید ماشین، بررسی عیوب رایج، راهنمای خرید خودرو و مطالب آموزشی برای خریداران',
    keywords: [
      ...COMMON_KEYWORDS,
      'مقالات خودرو',
      'آموزش خرید ماشین',
      'نکات کارشناسی',
      'مجله خودرو',
    ],
    path: '/blog',
  },
  
  faq: {
    title: 'سوالات متداول | پاسخ به سوالات کارشناسی خودرو',
    description: 'پاسخ به سوالات متداول درباره فرآیند کارشناسی، هزینه‌ها، مدت زمان، گزارش کارشناسی و نحوه رزرو نوبت کارشناسی خودرو',
    keywords: [
      ...COMMON_KEYWORDS,
      'سوالات متداول',
      'راهنمای کارشناسی',
      'چگونه کارشناسی کنیم',
    ],
    path: '/faq',
  },
  
  regulations: {
    title: 'قوانین و مقررات | شرایط استفاده از خدمات کارچک',
    description: 'قوانین و مقررات استفاده از خدمات کارشناسی کارچک، حریم خصوصی، شرایط پرداخت، ضمانت و قوانین لغو یا تغییر نوبت کارشناسی',
    keywords: [
      ...COMMON_KEYWORDS,
      'قوانین کارچک',
      'مقررات کارشناسی',
      'شرایط استفاده',
    ],
    path: '/regulations',
  },
};

