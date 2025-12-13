"use client";
import axios from "axios";
import { toast } from "sonner";

const BASE_URL = "https://api.carmacheck.com/api/";



const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Enable sending cookies with requests
});


  const refreshAccessToken = async () => {
    try {
      console.log('🔄 Attempting to refresh token...');
      console.log('📍 Current cookies:', document.cookie);
      const res = await axios.get(
        "https://api.carmacheck.com/api/User/RefreshToken",
        {
          withCredentials: true,
          headers: {
            Authorization:` Bearer ${localStorage.getItem("token")}`
          },
         
        }
      );

      const newAccessToken = res.data.resultObject.accessToken;
      if (newAccessToken) {
        localStorage.setItem("token", newAccessToken);
      }

      return newAccessToken;
    } catch (err) {
      throw err;
    }
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
      // if(response?.config?.method !== "get")
      // toast("Success", { description: data.statusMessage });
    }
    
    return response.data.resultObject;
  },
  async (error) => {
    debugger
    const originalRequest = error.config;
    
    // if(error.response.data.statusMessage) {
    //   toast("Error", { description: error.response.data.statusMessage });
    //   return
    // }
    
    let message = "";

    if (!error.response) {
      message = "اینترنت شما قطع شده است";
      toast("Error", { description: message });
      debugger
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized - Token expired
    if (error.response.status === 401 && !originalRequest._retry) {
    try {
          const newToken = await refreshAccessToken();
     

          originalRequest.headers["Authorization"] = "Bearer " + newToken;
          return instance(originalRequest);
        } catch (err) {
         
          localStorage.clear();
          toast("Error", { description: "نشست شما منقضی شده است. لطفاً دوباره وارد شوید." });
          window.location.href = "/login";
          return Promise.reject(err);
        }
    }

    toast("Error", { description: message });
    return Promise.reject(error);
  }
);


export default instance;
