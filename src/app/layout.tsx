import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SeoWrapper from "./SeoWrapper";
import { Toaster } from "sonner";
import ConditionalHeader from "./components/ConditionalHeader";
import ConditionalFooter from "./components/ConditionalFooter";
import { serverApiHelper } from "@/helper/server-fetcher";

export const dynamic = 'force-dynamic'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      apple: '/apple-touch-icon.png',
    },
    
    // Manifest
    manifest: '/site.webmanifest',
    
    // Theme Color
    themeColor: '#3456bb',
    
    // Viewport
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    
    // Open Graph
    openGraph: {
      type: 'website',
      locale: 'fa_IR',
      url: SITE_URL,
      siteName: `${siteName} - کارشناسی خودرو`,
      title: `${siteName} | کارشناسی تخصصی خودرو با کارشناسان مجرب`,
      description: siteDescription,
      images: [
        {
          url: `${SITE_URL}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: `${siteName} - کارشناسی خودرو`,
          type: 'image/jpeg',
        },
      ],
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
    
    // Alternates
    alternates: {
      canonical: SITE_URL,
      languages: {
        'fa-IR': SITE_URL,
      },
    },
    
    // Additional meta tags
    other: {
      'msapplication-TileColor': '#3456bb',
    },
  };
}

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
    debugger
    console.error("Error fetching master data in layout:", error);
  }

  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     {/* <SeoWrapper/> */}
        <ConditionalHeader data={initialData} />
        {children}
        <ConditionalFooter data={initialData} />
                <Toaster richColors position="top-center" />
             
     
      </body>
    </html>
  );
}
