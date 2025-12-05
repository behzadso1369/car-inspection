/**
 * Server-Side Fetcher
 * برای استفاده در Server Components (ISR/SSR)
 * از همون BASE_URL که در interceptor استفاده میشه
 */

import { ApiHelper } from './api-request';

// استفاده از همون BASE_URL که در interceptor هست
const BASE_URL = "https://api.carmacheck.com/api/";

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

/**
 * Server-side fetcher که از همان interceptor logic استفاده می‌کند
 */
export async function serverFetch<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T | null> {
  try {
    // endpoint از ApiHelper میاد که خودش path کامل رو داره
    // مثلاً: Site/GetMasterPageData
    const url = `${BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const fetchOptions: RequestInit = {
      method: options.method || 'GET',
      headers,
      cache: options.cache || 'default',
      ...(options.next && { next: options.next }),
    };

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    console.log(`🔥 Server Fetch: ${options.method || 'GET'} ${url}`);

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      console.error(`❌ Server Fetch Error: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // همون ساختار response که interceptor داره
    if (data?.isSuccess === false) {
      console.error(`❌ API Error: ${data?.statusMessage}`);
      throw new Error(data?.statusMessage || 'API Error');
    }
    
    console.log(`✅ Server Fetch Success: ${endpoint}`);
    
    // برگردوندن resultObject مثل interceptor
    return data?.resultObject || data;
  } catch (error) {
    console.error('❌ Server Fetch Failed:', error);
    return null;
  }
}

/**
 * Helper functions برای استفاده راحت‌تر
 */
export const serverApi = {
  get: async <T = any>(
    endpoint: string,
    revalidate?: number
  ): Promise<T | null> => {
    return serverFetch<T>(endpoint, {
      method: 'GET',
      next: revalidate ? { revalidate } : undefined,
    });
  },

  post: async <T = any>(
    endpoint: string,
    body: any,
    revalidate?: number
  ): Promise<T | null> => {
    return serverFetch<T>(endpoint, {
      method: 'POST',
      body,
      next: revalidate ? { revalidate } : undefined,
    });
  },
};

/**
 * استفاده از ApiHelper برای endpoint ها
 */
export const serverApiHelper = {
  get: async <T = any>(
    helperKey: string,
    revalidate?: number
  ): Promise<T | null> => {
    const endpoint = ApiHelper.get(helperKey);
    return serverApi.get<T>(endpoint, revalidate);
  },

  post: async <T = any>(
    helperKey: string,
    body: any,
    revalidate?: number
  ): Promise<T | null> => {
    const endpoint = ApiHelper.get(helperKey);
    return serverApi.post<T>(endpoint, body, revalidate);
  },
};

