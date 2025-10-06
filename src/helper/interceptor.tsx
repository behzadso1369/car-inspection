"use client"
import axios from "axios";
import { toast } from "sonner"
const instance = axios.create({
  baseURL: "http://45.139.11.225:5533/api/Site/",
});

  let error = "";
  instance.interceptors.request.use(
  (config:any) => {
    
    const token =  localStorage.getItem("token");
    return {
      ...config,
      headers: {
        ...(token !== null && { Authorization: `Bearer ${token}` }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return  toast("Event has", {
      description: error,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }
);
instance.interceptors.response.use(
  (response) => {
    if(response.data.isSuccess) {
      console.log("test taost")
      error = response.data.statusMessage;

    }else {;
      error = response.data.statusMessage;
    }
    return response;
  },
  (error) => {
    if(!error.response) {
      error = "اینترنت شما قظع شده است";

    }else {
      if (error.response.status === 401) {
        error = "نشست شما منقضی شده است";
   
        window.location.href = "/login";
      }else {
      error = 
        error?.response?.data?.message
          ? error?.response?.data?.message
          : 'مشکلی به وجود آمده است'
      }
    }
    return  toast("Event has", {
      description: error,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }
);


export default instance;


