import { NextRequest, NextResponse } from 'next/server';
import { serverApiHelper } from '@/helper/server-fetcher';

const API_BASE_URL = 'https://api.carmacheck.com';

// Dynamic icon route handler از API
export async function GET(request: NextRequest) {
  try {
    const data = await serverApiHelper.get("GetMasterPageData", 3600);
    
    let imageUrl = '/favicon.ico.backup'; // fallback
    
    if (data?.MasterSiteData?.ImagePath) {
      const imagePath = data.MasterSiteData.ImagePath;
      imageUrl = imagePath.startsWith('/') 
        ? `${API_BASE_URL}${imagePath}`
        : `${API_BASE_URL}/${imagePath}`;
    }

    // Fetch image from API
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch icon');
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/png';

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating icon:', error);
    
    // Fallback: return 404 - Next.js خودش favicon.ico رو handle می‌کنه
    return new NextResponse('Icon not found', { 
      status: 404,
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}

