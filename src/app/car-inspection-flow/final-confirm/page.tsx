"use client"
import { Button } from "@/components/ui/button";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FinalConfirm() {
    const [orderDetail,setOrderDetail] = useState<any>([])
      const getUserOrderDetails = () => { 
        instance.get(ApiHelper.get("GetUserOrderDetails") + "?OrderId=" + localStorage.getItem("OrderId")).then((res:any) => {
            
            
           
            
setOrderDetail(res);
        })
       }
       useEffect(() => {
        getUserOrderDetails();
       },[])
    return (
              <div className="bg-white font-IranSans">
                      
                    <div className="px-4">
                        <div className="bg-white  px-4 py-6 rounded-3xl my-6">
        
                            <div className="flex items-center">
                                  <div className="aspect-[2] relative w-16 h-8 ml-4">
                                                                                     <Image src="/step-5.png" alt="step2.png" fill className="object-fill"/>
                                                                               </div>
                                <div>
               <h3 className="text-base text-black my-2 font-medium">
                مشاهده و تایید نهایی
               </h3>
               <h4 className="text-[#55565A] font-light text-sm"> بعدی:    پرداخت</h4>
               
        
                                </div>
                         
                            </div>
        
                        
        
                        </div>
        
                    </div>
                    <div className="px-4">
                        <h1>خلاصه اطلاعات</h1>
                        <div className="flex my-4 justify-between">
                            <span className="text-[#6B6C70] text-sm">مدل ماشین:</span>
                            <span className="text-sm">{orderDetail?.carGroup}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#6B6C70] text-sm">نام و نام خانوادگی:</span>
                            <span>{orderDetail?.username}</span>
                        </div>
                    </div>
                   

                    <div className="px-4 shadow-[0px_4px_24px_0px_#EAEAEA] py-2 mx-2 text-xs my-4 rounded-2xl">
                                     <div className="text-[#6B6C70] my-2">آدرس کارشناسی</div>
                                     <span>{orderDetail?.carInspectionLocationTypeAddress}</span>
                    </div>
                    <div className="px-4">
                        <h1>خلاصه سفارش</h1>
                        <div className="flex my-4 justify-between">
                            <span className="text-[#6B6C70] text-sm">مبلغ کل:</span>
                            <span className="text-sm">{orderDetail?.totalPrice} تومان</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#6B6C70] text-sm">تخفیف:</span>
                            <span>{orderDetail?.discount} تومان</span>
                        </div>
                        <div className="flex my-4 justify-between">
                            <span className="text-[#6B6C70] text-sm">نوع کارشناسی:</span>
                            <span className="text-sm">{orderDetail?.inspectionType}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#6B6C70] text-sm">محل کارشناسی:</span>
                            <span>{orderDetail?.carInspectionLocationType}</span>
                        </div>
                        {/* <div className="flex my-4 justify-between">
                            <span className="text-[#6B6C70] text-sm">هزینه کارشناسی :</span>
                            <span className="text-sm">5,028,000 تومان</span>
                        </div> */}
                        <div className="flex my-4 justify-between">
                            <span className="text-[#6B6C70] text-sm">قابل پرداخت:</span>
                            <span className="text-sm">{orderDetail?.finalPrice} تومان</span>
                        </div>
                       
                    </div>
                      <div className="px-4 w-full fixed flex justify-center  bottom-0 b-white   shadow-[0px_4px_32px_0px_#CBD5E0] py-5">
                   
                   <Button type="submit" className="bg-[#416CEA] text-white rounded-3xl py-6 px-12 w-full" >
                  ثبت سفارش

              </Button>
                    
           
                

            </div>
                    </div>
    )
}