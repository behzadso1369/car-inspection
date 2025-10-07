"use client";
import axios from "axios";
import { toast } from "sonner";

const BASE_URL = "http://45.139.11.225:5533/api/Site/";

const instance = axios.create({
  baseURL: BASE_URL,
});

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
    console.log("dataaaaaaaaaaaaaaa"+data.statusMessage)
    toast("Error", { description: data.statusMessage });
    if (!data.isSuccess) {
      toast("Error", { description: data.statusMessage });
    }
    return response.data.resultObject;
  },
  (error) => {
    let message = "مشکلی به وجود آمده است";

    if (!error.response) {
      message = "اینترنت شما قطع شده است";
    } else if (error.response.status === 401) {
      message = "نشست شما منقضی شده است";
      window.location.href = "/login";
    } else {
      message = error.response?.data?.message ?? message;
    }

    toast("Error", { description: message });
    return Promise.reject(error);
  }
);

console.log("Exporting instance:", instance);
export default instance;
