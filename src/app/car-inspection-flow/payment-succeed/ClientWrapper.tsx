"use client";

import { Button } from "@/components/ui/button";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientWrapper() {
  const [orderDetail, setOrderDetail] = useState<any>([]);
  const router = useRouter();
  const [discountCode, setDiscountCode] = useState<any>("");

  const getUserOrderDetails = () => {
    instance.get(ApiHelper.get("GetUserOrderDetails") + "?OrderId=" + localStorage.getItem("OrderId")).then((res: any) => {
      setOrderDetail(res);
      debugger
         setDiscountCode(res?.discountCode);
    });
  };

  const moveToGateway = () => {
  router.push("Profile");

  };

  useEffect(() => {
    getUserOrderDetails();
  }, []);

  return (
    <div className="bg-white font-IranSans lg:px-4 lg:py-4">
      <div className="px-4">
        <div className="bg-white px-4 py-6 rounded-3xl mt-6">
          <div className="flex flex-wrap items-center w-full justify-center">
            <div className="aspect-[1] relative w-16 h-auto ml-4">
              <Image src="/final-success.png" alt="step2.png" fill className="object-fill" />
            </div>
            <h3 className="w-full text-center my-4 text-base text-[#101117] font-bold">پرداخت شما با موفقیت انجام شد</h3>
          </div>
        </div>
      </div>
      <div className="flex my-4 justify-between">
          <span className="text-[#6B6C70] text-sm"> کد پیگیری سفارش:</span>
          <span className="text-sm">{discountCode}</span>
        </div>

     

    

      <div className="px-4 w-full lg:my-4 lg:static lg:mt-8 fixed flex justify-center bottom-0 b-white shadow-[0px_4px_32px_0px_#CBD5E0] py-5">
        <Button onClick={moveToGateway} type="submit" className="bg-[#416CEA] text-white rounded-3xl py-6 px-12 w-full">
           مشاهده سفارشات
        </Button>
      </div>
    </div>
  );
}

