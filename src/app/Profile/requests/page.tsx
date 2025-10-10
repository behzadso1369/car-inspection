import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Call02Icon } from "hugeicons-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import CurrentRequest from "./currentRequests";
import DoneRequest from "./doneRequests";
import CanceledRequest from "./cancelRequests";

export default function Profile() {
    const doneRequests = [
            {Id:1,Title:"تکمیل شده",CarName:"سمند سورن",paymentStatus:"تکمیل سفارش",Description:"کارشناسی ماشین انجام شده است.",status: "compepelted"},
            {Id:1,Title:"تکمیل شده",CarName:"پژو 405",paymentStatus:"تکمیل سفارش",Description:"کارشناسی ماشین انجام شده است.",status: "compepelted"},
    ]
    const canceledRequests = [
        {Id:1,Title:" لغو شده",CarName:"تیبا 2",paymentStatus:"لغو شده",Description:"درخواست لغو شده است",status: "cenceled"},
        {Id:1,Title:"لغو شده",CarName:"ماکسیما",paymentStatus:"لغو شده",Description:"درخواست لغو شده است",status: "cenceled"},
    ]
    const currentRequests = [
        {Id:1,Title:"تکمیل نشده",CarName:"پرشیا",paymentStatus:"منتظر پرداخت",Description:"پرداخت خود را تکمیل کنید.",status: "unknown"},
        {Id:1,Title:"تکمیل نشده",CarName:"پژو 206",paymentStatus:"منتظر پرداخت",Description:"پرداخت خود را تکمیل کنید.",status: "unknown"},
    ]
    return (
        <Tabs defaultValue="درخواست ها جاری" className="w-full bg-[#fbfbfc] py-6 font-IranSans px-4" dir="rtl">
        <TabsList  className="px-2 w-full" >
          <TabsTrigger className="rounded-4xl text-[#A6A6A6] border data-[state=active]:bg-[#3456bb] data-[state=active]:border-none  data-[state=active]:text-white  border-[#A6A6A6] px-4 mx-2" value="درخواست ها جاری">درخواست ها جاری</TabsTrigger>
          <TabsTrigger className="rounded-4xl text-[#A6A6A6]  border data-[state=active]:bg-[#3456bb] data-[state=active]:border-none   data-[state=active]:text-white border-[#A6A6A6] px-4 mx-2" value="انجام شده">انجام شده</TabsTrigger>
          <TabsTrigger className="rounded-4xl text-[#A6A6A6]  border data-[state=active]:bg-[#3456bb] data-[state=active]:border-none  data-[state=active]:text-white  border-[#A6A6A6] px-4 mx-2" value="لغو شده">لغو شده</TabsTrigger>
        </TabsList>
        <TabsContent value="درخواست ها جاری">
            <CurrentRequest data={currentRequests}/>
        </TabsContent>
        <TabsContent value="انجام شده">
            <DoneRequest data={doneRequests}/>
        </TabsContent>
        <TabsContent value="لغو شده">
            <CanceledRequest data={canceledRequests}/>
        </TabsContent>
      </Tabs>

    )
}