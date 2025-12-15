"use client";

import { Button } from "@/components/ui/button";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import { Payment02Icon } from "hugeicons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientWrapper() {
  const [orderDetail, setOrderDetail] = useState<any>([]);
  const router = useRouter();
  const [discountCode, setDiscountCode] = useState<any>("");

  const moveToPaymentSucceed = () => {
  
  };

  const getUserOrderDetails = () => {
    instance.get(ApiHelper.get("GetUserOrderDetails") + "?OrderId=" + localStorage.getItem("OrderId")).then((res: any) => {
      setOrderDetail(res);
    });
  };

  const moveToGateway = () => {
      const params: any = {
      "isBack": false,
      "orderId": Number(localStorage.getItem("OrderId"))
    };
    instance.post(ApiHelper.get("MovePrivateOrder"), params).then((res: any) => {
      
      if(res?.isEndFlow) {
        
           router.push(res?.paymentUrl);
      }
         
   
    });

  };

  useEffect(() => {
    getUserOrderDetails();
    // moveToPaymentSucceed();
  }, []);

  return (
    <div className="bg-white font-IranSans lg:px-4 lg:py-4">
      <div className="px-4">
        <div className="bg-white px-4 py-6 rounded-3xl mt-6">
          <div className="flex flex-wrap items-center w-full justify-center">
            <Payment02Icon color="#416CEA" size={80}/>
            <h3 className="w-full text-center my-4 text-base text-[#101117] font-bold">پرداخت سفارش</h3>
          </div>
        </div>
      </div>

      <div className="px-4 border-b border-[#DFDFDF] py-2">
        
        <div className="flex justify-between">
          <span className="text-[#6B6C70] text-sm">تاریخ ثبت سفارش:</span>
          <span>{orderDetail?.orderCreated}</span>
        </div>
      </div>

      <div className="px-4 border-b border-[#DFDFDF] py-2">
        <div className="flex my-4 justify-between">
          <span className="text-[#6B6C70] text-sm">مبلغ :</span>
          <span className="text-sm">{orderDetail?.totalPrice?.toLocaleString()} تومان</span>
        </div>
        <div className="flex my-4 justify-between">
          <span className="text-[#6B6C70] text-sm">زمان کارشناسی:</span>
          <span className="text-sm">{orderDetail?.inspectionType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B6C70] text-sm">محل کارشناسی:</span>
          <span>{orderDetail?.carInspectionLocationType}</span>
        </div>
        <div className="flex my-4 justify-between">
          <span className="text-[#6B6C70] text-sm">قابل پرداخت:</span>
          <span className="text-sm">{orderDetail?.finalPrice?.toLocaleString()} تومان</span>
        </div>
      </div>

      <div className="flex px-4 my-4">
        <Image src="/sample-car.png" width={120} height={120} alt="کارشناسی خودرو" />
        <div className="flex flex-col text-base text-[#101117] mx-4">
          <span>خودرو سواری {orderDetail?.carGroup}</span>
          <span>مالک : {orderDetail?.username}</span>
        </div>
      </div>

      <div className="px-4 w-full lg:my-4 lg:static lg:mt-8 fixed flex justify-center bottom-0 b-white shadow-[0px_4px_32px_0px_#CBD5E0] py-5">
        <Button onClick={moveToGateway} type="submit" className="bg-[#416CEA] text-white rounded-3xl py-6 px-12 w-full">
           پرداخت
        </Button>
      </div>
    </div>
  );
}

