import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import ConditionalHeader from "./components/ConditionalHeader";
import ConditionalFooter from "./components/ConditionalFooter";
import { serverApiHelper } from "@/helper/server-fetcher";
import { JsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { generateOrganizationSchema, generateLocalBusinessSchema, generateWebSiteSchema } from "@/lib/seo";

// صفحات جداگانه خودشان revalidate/ISR تعیین می‌کنند؛ روت را داینامیک اجباری نمی‌کنیم
export const revalidate = 3600;

const API_BASE_URL = 'https://api.carmacheck.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com";

async function fetchMasterData() {
  try {
    const data = await serverApiHelper.get("GetMasterPageData", 3600);
    return data?.MasterSiteData || null;
  } catch (error) {
    console.error('Error fetching master data:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const masterData = await fetchMasterData();
  
  const siteName = masterData?.CompanyName || 'کارماچک';
  const siteDescription = masterData?.Description || 'کارشناسی تخصصی خودرو با ۹۰٪ دقت | بیش از ۲۵ هزار کارشناسی موفق | کارشناسی در محل یا مرکز | دریافت گزارش فوری | تهران';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${siteName} | کارشناسی تخصصی خودرو با کارشناسان مجرب`,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Icons
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },

    // Manifest از app/manifest.ts سرو می‌شود (/manifest.webmanifest)
    // فیلد دستی حذف شد تا لینک تکراری/۴۰۴ ایجاد نشود

    // Open Graph
    openGraph: {
      type: 'website',
      locale: 'fa_IR',
      url: SITE_URL,
      siteName: `${siteName} - کارشناسی خودرو`,
      title: `${siteName} | کارشناسی تخصصی خودرو با کارشناسان مجرب`,
      description: siteDescription,
      // تصویر OG به‌صورت داینامیک از app/opengraph-image.tsx تولید می‌شود
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: '@carmacheck',
      creator: '@carmacheck',
    },
    
    // Other metadata
    authors: [{ name: 'کارماچک - CarmaCheck' }],
    creator: 'کارماچک',
    publisher: 'کارماچک',
    formatDetection: {
      telephone: false,
    },
    
    // Additional meta tags
    other: {
      'msapplication-TileColor': '#3456bb',
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3456bb',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch data در server-side برای ConditionalHeader
  let initialData = null;
  
  try {
    const data = await serverApiHelper.get("GetMasterPageData", 3600);
    initialData = data?.MasterSiteData;
  } catch (error) {
    console.error("Error fetching master data in layout:", error);
  }

  return (
    <html lang="fa" dir="rtl">
      <body
        className={` antialiased`}
      >
        <GoogleAnalytics />
        <JsonLd data={[generateOrganizationSchema(), generateLocalBusinessSchema(), generateWebSiteSchema()]} />
        <ConditionalHeader data={initialData} />
        {children}
        <ConditionalFooter data={initialData} />
                <Toaster richColors position="top-center" />
             
     
      </body>
    </html>
  );
}
