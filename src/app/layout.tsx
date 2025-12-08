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

// Dynamic metadata با icon از API
export async function generateMetadata(): Promise<Metadata> {
  let iconUrl = '/favicon.ico'; // fallback
  let siteName = 'کارماچک';
  let siteDescription = 'کارشناسی تخصصی خودرو با کارشناسان مجرب';

  try {
    const data = await serverApiHelper.get("GetMasterPageData", 3600);
    
    // ساخت URL کامل برای icon
    if (data?.MasterSiteData?.ImagePath) {
      const imagePath = data.MasterSiteData.ImagePath;
      iconUrl = imagePath.startsWith('/') 
        ? `${API_BASE_URL}${imagePath}`
        : `${API_BASE_URL}/${imagePath}`;
    }
    
    if (data?.MasterSiteData?.CompanyName) {
      siteName = data.MasterSiteData.CompanyName;
    }
    
    if (data?.MasterSiteData?.Description) {
      siteDescription = data.MasterSiteData.Description;
    }
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }

  return {
    title: siteName,
    description: siteDescription,
    icons: {
      icon: '/icon',
      shortcut: '/icon',
      apple: '/icon',
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
    initialData = await serverApiHelper.get("GetMasterPageData", 600);
  } catch (error) {
    console.error("Error fetching master data in layout:", error);
  }

  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     <SeoWrapper/>
        <ConditionalHeader initialData={initialData} />
        {children}
        <ConditionalFooter />
                <Toaster richColors position="top-center" />
             
     
      </body>
    </html>
  );
}
