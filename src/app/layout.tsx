import type { Metadata, Viewport } from "next";
import "./globals.css";
import Banner from "./components/mobile/Home/Banner";
import CallAction from "./components/mobile/Home/CallAction";
import { Footer } from "./components/mobile/Home/Footer";
import { Header } from "./components/mobile/Home/Header";
import { SiteChrome } from "./components/SiteChrome";
import { serverApiHelper } from "@/helper/server-fetcher";
import { JsonLd } from "@/components/seo/JsonLd";
import { DeferredGtm } from "@/components/analytics/DeferredGtm";
import { DeferredToaster } from "@/components/analytics/DeferredToaster";
import { ChunkLoadErrorHandler } from "@/components/ChunkLoadErrorHandler";
import { generateOrganizationSchema, generateLocalBusinessSchema, generateWebSiteSchema } from "@/lib/seo";
import { iranSans, iranSansUltraLight } from "./fonts";

const GTM_ID = "GTM-5D46VDMH";

export const revalidate = 3600;

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
    
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },

    openGraph: {
      type: 'website',
      locale: 'fa_IR',
      url: SITE_URL,
      siteName: `${siteName} - کارشناسی خودرو`,
      title: `${siteName} | کارشناسی تخصصی خودرو با کارشناسان مجرب`,
      description: siteDescription,
    },
    
    twitter: {
      card: 'summary_large_image',
      site: '@carmacheck',
      creator: '@carmacheck',
    },
    
    authors: [{ name: 'کارماچک - CarmaCheck' }],
    creator: 'کارماچک',
    publisher: 'کارماچک',
    formatDetection: {
      telephone: false,
    },
    
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
  let initialData = null;
  
  try {
    const data = await serverApiHelper.get("GetMasterPageData", 3600);
    initialData = data?.MasterSiteData;
  } catch (error) {
    console.error("Error fetching master data in layout:", error);
  }

  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${iranSans.variable} ${iranSansUltraLight.variable} ${iranSans.className}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://api.carmacheck.com" />
        <link rel="dns-prefetch" href="https://api.carmacheck.com" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-[#3456bb]"
        >
          پرش به محتوای اصلی
        </a>
        {process.env.NODE_ENV === "production" ? (
          <>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
            <DeferredGtm id={GTM_ID} />
          </>
        ) : null}
        <ChunkLoadErrorHandler />
        <JsonLd data={[generateOrganizationSchema(), generateLocalBusinessSchema(), generateWebSiteSchema()]} />
        <SiteChrome
          header={<Header data={initialData} />}
          banner={<Banner />}
          mobileBar={<CallAction data={initialData} />}
          mobileBarFixed={<CallAction data={initialData} fixed />}
          footer={<Footer data={initialData} />}
        >
          <div id="main-content">{children}</div>
        </SiteChrome>
        <DeferredToaster />
      </body>
    </html>
  );
}
