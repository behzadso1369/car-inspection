import { SOCIAL_LINKS } from "@/lib/social";

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

// اطلاعات ثابت کسب‌وکار برای استفاده در Schema و صفحات
export const COMPANY = {
  name: 'کارماچک',
  alternateName: 'CarmaCheck',
  phone: '+98-21-91001740',
  phoneDisplay: '۰۲۱-۹۱۰۰۱۷۴۰',
  email: 'info@carmacheck.com',
  streetAddress: 'میدان رسالت,خیابان هنگام,نبش خیابان دوازدهم,پلاک497(نمایندگی زارعی)',
  addressLocality: 'تهران',
  addressRegion: 'تهران',
  postalCode: '',
  addressCountry: 'IR',
  latitude: 35.7575,
  longitude: 51.4102,
  priceRange: '﷼﷼',
  openingHours: 'Sa-We 09:00-18:00',
  logo: `${BASE_URL}/assets/images/logo.svg`,
  ogImage: `${BASE_URL}/opengraph-image`,
};

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
    siteName: 'کارماچک - کارشناسی خودرو',
    images: [
      {
        url: config.image || `${BASE_URL}/opengraph-image`,
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
    '@id': `${BASE_URL}/#organization`,
    name: COMPANY.name,
    alternateName: COMPANY.alternateName,
    url: BASE_URL,
    logo: COMPANY.logo,
    image: COMPANY.ogImage,
    description: 'ارائه‌دهنده خدمات تخصصی کارشناسی خودرو در ایران',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.streetAddress,
      addressLocality: COMPANY.addressLocality,
      addressRegion: COMPANY.addressRegion,
      addressCountry: COMPANY.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY.phone,
      contactType: 'customer service',
      availableLanguage: 'Persian',
    },
    sameAs: SOCIAL_LINKS.map((item) => item.href),
  };
}

/**
 * تولید WebSite Schema (برای SearchAction و شناخت برند)
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: COMPANY.name,
    inLanguage: 'fa-IR',
    publisher: { '@id': `${BASE_URL}/#organization` },
  };
}

/**
 * تولید LocalBusiness Schema (برای سئوی محلی و نمایش در نقشه)
 * اگر area داده شود، areaServed مخصوص همان منطقه ست می‌شود.
 */
export function generateLocalBusinessSchema(options?: {
  area?: string;
  path?: string;
  extraAreas?: string[];
}) {
  const areas =
    options?.extraAreas ??
    [
      'تهران',
      'شرق تهران',
      'تهرانپارس',
      'نارمک',
      'رسالت',
      'میدان رسالت',
      'پیروزی',
      'فرجام',
      'هنگام',
      'حکیمیه',
      'مجیدیه',
      'نارمک',
    ];

  const areaServed = options?.area
    ? Array.from(
        new Set([options.area, ...(options.extraAreas ?? [])]),
      ).map((name) => ({ '@type': 'Place', name }))
    : areas.map((name) => ({ '@type': 'Place', name }));

  return {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    '@id': `${options?.path ? `${BASE_URL}${options.path}` : BASE_URL}/#localbusiness`,
    name: options?.area ? `${COMPANY.name} | کارشناسی خودرو ${options.area}` : COMPANY.name,
    image: COMPANY.ogImage,
    url: options?.path ? `${BASE_URL}${options.path}` : BASE_URL,
    telephone: COMPANY.phone,
    priceRange: COMPANY.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.streetAddress,
      addressLocality: COMPANY.addressLocality,
      addressRegion: COMPANY.addressRegion,
      addressCountry: COMPANY.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.latitude,
      longitude: COMPANY.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed,
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
  timeRequiredMinutes?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.title,
    description: config.description,
    image: config.image || `${BASE_URL}/opengraph-image`,
    datePublished: config.datePublished,
    dateModified: config.dateModified || config.datePublished,
    ...(config.timeRequiredMinutes
      ? { timeRequired: `PT${config.timeRequiredMinutes}M` }
      : {}),
    author: {
      '@type': 'Person',
      name: config.author || 'تیم کارماچک',
    },
    publisher: {
      '@type': 'Organization',
      name: 'کارماچک',
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
      name: 'کارماچک',
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
  'کارماچک',
  'carmacheck',
  'کارشناسی خودرو تهران',
  'کارشناسی ماشین تهران',
  'کارشناسی خودرو شرق تهران',
  'کارشناسی ماشین شرق تهران',
];

/**
 * کلیدواژه‌های محلی (سئوی محلی شرق تهران و محله‌ها)
 * برای صفحات با نیت محلی/تبدیل: خانه، خدمات، تماس، شروع کارشناسی
 */
export const LOCAL_KEYWORDS = [
  'کارشناسی ماشین شرق تهران',
  'کارشناسی ماشین تهران',
  'کارشناسی خودرو تهران',
  'کارشناسی خودرو شرق تهران',
  'کارشناسی خودرو فرجام',
  'کارشناسی خودرو میدان رسالت',
  'کارشناسی خودرو نارمک',
  'کارشناسی خودرو تهرانپارس',
  'کارشناسی ماشین فرجام',
  'کارشناسی ماشین نارمک',
  'کارشناسی ماشین میدان رسالت',
  'کارشناسی ماشین تهرانپارس',
];

/**
 * تنظیمات SEO برای هر صفحه
 */
export const PAGE_SEO = {
  home: {
    title: 'کارماچک | کارشناسی خودرو شرق تهران، تهرانپارس، نارمک و رسالت',
    description: 'کارشناسی خودرو در محل، شرق تهران (تهرانپارس، نارمک، رسالت، فرجام) و سراسر تهران | ۹۰٪ دقت، بیش از ۲۵ هزار کارشناسی موفق | گزارش فوری',
    keywords: [
      ...COMMON_KEYWORDS,
      ...LOCAL_KEYWORDS,
      'کارشناسی آنلاین',
      'کارشناسی در محل',
      'قیمت کارشناسی خودرو',
      'بهترین کارشناس خودرو',
    ],
    path: '/',
  },
  
  about: {
    title: 'درباره کارماچک | ۲۵ سال تجربه در کارشناسی خودرو',
    description: 'کارماچک با بیش از ۲۵ سال تجربه و ۹۰٪ دقت در کارشناسی، بیش از ۲۵ هزار کارشناسی موفق انجام داده است. کارشناسان حرفه‌ای و مجرب.',
    keywords: [
      ...COMMON_KEYWORDS,
      'درباره کارماچک',
      'تاریخچه کارماچک',
      'کارشناسان کارماچک',
      'تجربه کارشناسی',
    ],
    path: '/about-us',
  },
  
  services: {
    title: 'خدمات کارشناسی خودرو شرق تهران | استاندارد و VIP',
    description: 'کارشناسی خودرو شرق تهران و سراسر تهران | استاندارد از ۲۵۰ و VIP از ۴۵۰ هزار تومان | بررسی موتور، برق، تایر و ترمز | گزارش فوری در محل',
    keywords: [
      ...COMMON_KEYWORDS,
      ...LOCAL_KEYWORDS,
      'قیمت کارشناسی',
      'کارشناسی استاندارد',
      'کارشناسی VIP',
      'خدمات کارشناسی',
      'هزینه کارشناسی خودرو',
    ],
    path: '/services',
  },
  
  contact: {
    title: 'تماس با کارماچک | ۰۲۱-۹۱۰۰۱۷۴۰',
    description: 'تماس با کارماچک برای کارشناسی خودرو شرق تهران (تهرانپارس، نارمک، رسالت، فرجام) | ۰۲۱-۹۱۰۰۱۷۴۰ | شنبه تا چهارشنبه ۹ تا ۱۸',
    keywords: [
      ...COMMON_KEYWORDS,
      ...LOCAL_KEYWORDS,
      'تماس با کارماچک',
      'شماره تماس کارشناسی',
      'آدرس کارماچک',
      'ساعات کاری',
    ],
    path: '/contact-us',
  },
  
  blog: {
    title: 'مقالات کارشناسی خودرو | مجله کارماچک',
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
    title: 'قوانین و مقررات | شرایط استفاده از خدمات کارماچک',
    description: 'قوانین و مقررات استفاده از خدمات کارشناسی کارماچک، حریم خصوصی، شرایط پرداخت، ضمانت و قوانین لغو یا تغییر نوبت کارشناسی',
    keywords: [
      ...COMMON_KEYWORDS,
      'قوانین کارماچک',
      'مقررات کارشناسی',
      'شرایط استفاده',
    ],
    path: '/regulations',
  },
};

