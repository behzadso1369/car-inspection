"use client";
import axios from "axios";
import { toast } from "sonner";

const BASE_URL = "https://api.carmacheck.com/api/";

// Cookie helper functions
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

const setCookie = (name: string, value: string, days: number = 30) => {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Enable sending cookies with requests
});

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

instance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    
    // Check if response contains a new access token (from refresh)
    if (data?.resultObject?.accessToken) {
      localStorage.setItem("token", data.resultObject.accessToken);
    }
    
    if (!data.isSuccess) {
      toast("Error", { description: data.statusMessage });
    }else {
      if(response?.config?.method !== "get")
      toast("Success", { description: data.statusMessage });
    }
    
    return response.data.resultObject;
  },
  async (error) => {
    const originalRequest = error.config;
    
    let message = "مشکلی به وجود آمده است";

    if (!error.response) {
      message = "اینترنت شما قطع شده است";
      toast("Error", { description: message });
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized - Token expired
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return instance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // Check if refresh token exists in cookie
      const refreshToken = getCookie("refreshToken");

      if (!refreshToken) {
        isRefreshing = false;
        message = "نشست شما منقضی شده است";
        toast("Error", { description: message });
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Remove old Authorization header - server will use refresh token from cookie
        delete originalRequest.headers.Authorization;
        
        // Retry the original request - cookie with refresh token will be sent automatically
        // Server should use refresh token from cookie to validate and return new access token
        const response = await instance(originalRequest);

        // Get the new token from response (updated by response interceptor)
        const newToken = localStorage.getItem("token");
        
        // Update Authorization header with new token for queued requests
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        // Process queued requests
        processQueue(null, newToken);
        isRefreshing = false;

        return response;
      } catch (refreshError: any) {
        // Refresh token failed, redirect to login
        processQueue(refreshError, null);
        isRefreshing = false;
        
        // Clear tokens
        localStorage.removeItem("token");
        setCookie("refreshToken", "", -1); // Delete cookie
        
        message = "نشست شما منقضی شده است";
        toast("Error", { description: message });
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    toast("Error", { description: message });
    return Promise.reject(error);
  }
);


export default instance;
