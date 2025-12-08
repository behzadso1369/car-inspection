"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft01Icon, Call02Icon, Location01Icon, Logout03Icon } from "hugeicons-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import CurrentRequest from "./currentRequests";
import DoneRequest from "./doneRequests";
import CanceledRequest from "./cancelRequests";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
    const [doneRequests,setDoneRequest] = useState([]);
    const [currentRequests,setCurrentRequests] = useState([]);
      const router = useRouter();
     useEffect(() => {
    instance.get(ApiHelper.get("GetOrders"))
      .then((res: any) => {
        setCurrentRequests(res.filter((item:any) => item.isComplete == false));
        setDoneRequest(res.filter((item:any) => item.isComplete == true));
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
  }, []);
    const logOut = () => {
    instance.post(ApiHelper.get("Logout"))
      .then((res: any) => {
        if (typeof window !== 'undefined') {
          localStorage.clear();
        }
        router.push("/");
      })
      .catch((err: any) => {
        console.error("Error logging out:", err);
        if (typeof window !== 'undefined') {
          localStorage.clear();
        }
        router.push("/");
      });
  }
 
    // const doneRequests = [
    //         {Id:1,Title:"تکمیل شده",CarName:"سمند سورن",paymentStatus:"تکمیل سفارش",Description:"کارشناسی ماشین انجام شده است.",status: "compepelted"},
    //         {Id:1,Title:"تکمیل شده",CarName:"پژو 405",paymentStatus:"تکمیل سفارش",Description:"کارشناسی ماشین انجام شده است.",status: "compepelted"},
    // ]
    // const canceledRequests = [
    //     {Id:1,Title:" لغو شده",CarName:"تیبا 2",paymentStatus:"لغو شده",Description:"درخواست لغو شده است",status: "cenceled"},
    //     {Id:1,Title:"لغو شده",CarName:"ماکسیما",paymentStatus:"لغو شده",Description:"درخواست لغو شده است",status: "cenceled"},
    // ]
    // const currentRequests = [
    //     {Id:1,Title:"تکمیل نشده",CarName:"پرشیا",paymentStatus:"منتظر پرداخت",Description:"پرداخت خود را تکمیل کنید.",status: "unknown"},
    //     {Id:1,Title:"تکمیل نشده",CarName:"پژو 206",paymentStatus:"منتظر پرداخت",Description:"پرداخت خود را تکمیل کنید.",status: "unknown"},
    // ]
    return (
      <div className="grid grid-cols-3 gap-4 pt-4 font-IranSans pb-16">
        <div className="col-span-3 lg:col-span-1 order-1 lg:order-0 lg:border lg:border-[#D9D9D9] lg:max-h-[243px] rounded-2xl">           
                <h3 className="text-[#101117] font-normal my-6 px-4">تنظیمات حساب</h3>   
                <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
                    <div className="text-[#101117] flex">
                          <Image alt="کارشناسی خودرو" src="/car-inspection-icon.svg" width={24} height={24}/>
                    <Link href={"/Profile/requests"} className="mx-1 text-base" prefetch={false}>تمامی درخواست ها  </Link>
                    </div>
             
                 <ArrowLeft01Icon/>
        
                </h6>
                {/* <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
                <div className="text-[#101117] flex">
                      <Location01Icon size={24}/>
                    <span className="mx-1 text-base">آدرس ها</span>
                    </div>
                 <ArrowLeft01Icon/>
        
                </h6> */}
                <h6 className="flex px-4 justify-between my-6 pb-4 border-b border-[#DFDFDF]">
                <div className="text-[#101117] flex" onClick={logOut}>
                     <Logout03Icon size={24}/>
                    <span className="mx-1 text-base" >خروج</span>
                    </div>
                   <ArrowLeft01Icon/>
        
                </h6>
                </div>
         <Tabs defaultValue="درخواست ها جاری" className="w-full h-full lg:border rounded-2xl lg:border-[#D9D9D9] col-span-3 order-0 lg-order-1 lg:col-span-2 bg-[#fbfbfc] py-6 font-IranSans px-4" dir="rtl">
        <TabsList  className="px-2 w-full lg:!w-auto" >
          <TabsTrigger className="rounded-4xl text-[#A6A6A6] border data-[state=active]:bg-[#3456bb] data-[state=active]:border-none  data-[state=active]:text-white  border-[#A6A6A6] px-4 mx-2" value="درخواست ها جاری">درخواست ها جاری</TabsTrigger>
          <TabsTrigger className="rounded-4xl text-[#A6A6A6]  border data-[state=active]:bg-[#3456bb] data-[state=active]:border-none   data-[state=active]:text-white border-[#A6A6A6] px-4 mx-2" value="انجام شده">انجام شده</TabsTrigger>
          {/* <TabsTrigger className="rounded-4xl text-[#A6A6A6]  border data-[state=active]:bg-[#3456bb] data-[state=active]:border-none  data-[state=active]:text-white  border-[#A6A6A6] px-4 mx-2" value="لغو شده">لغو شده</TabsTrigger> */}
        </TabsList>
        <TabsContent value="درخواست ها جاری">
            <CurrentRequest data={currentRequests}/>
        </TabsContent>
        <TabsContent value="انجام شده">
            <DoneRequest data={doneRequests}/>
        </TabsContent>
        {/* <TabsContent value="لغو شده">
            <CanceledRequest data={canceledRequests}/>
        </TabsContent> */}
      </Tabs>
      </div>
       

    )
}