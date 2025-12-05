import { MetadataRoute } from 'next';
import { serverApiHelper } from '@/helper/server-fetcher';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://carmacheck.com';
const API_BASE_URL = 'https://api.carmacheck.com';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // Fetch data from API
  let iconUrl = '/favicon.ico'; // fallback
  let siteName = 'کارچک';
  let siteDescription = 'کارشناسی تخصصی خودرو با کارشناسان مجرب';

  try {
    const data = await serverApiHelper.get("GetMasterPageData", 3600);
    
    // ساخت URL کامل برای icon
    if (data?.MasterSiteData?.ImagePath) {
      const imagePath = data.MasterSiteData.ImagePath;
      // اگه imagePath با / شروع نشده، اضافه می‌کنیم
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
    console.error('Error fetching manifest data:', error);
  }

  return {
    name: siteName,
    short_name: siteName,
    description: siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#416CEA',
    orientation: 'portrait-primary',
    icons: [
      {
        src: iconUrl,
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: iconUrl,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: iconUrl,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['automotive', 'business', 'productivity'],
    lang: 'fa',
    dir: 'rtl',
    scope: '/',
    id: '/',
  };
}

