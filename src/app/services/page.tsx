"use client"
import { useEffect, useState } from "react";
import Banner from "../components/mobile/Home/Banner";
import { Header } from "../components/mobile/Home/Header";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import Image from "next/image";

export default  function Services() {
        const [data,setData] = useState<any>([]);
  useEffect(() => {
    instance.get(ApiHelper.get("GetMasterPageData"))
      .then((res: any) => {
        setData(res);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
  }, []);
    return (
         <div className="lg:max-w-7xl lg:container lg:mx-auto font-IranSans">
                       <Banner data={data?.MasterSiteData?.NavbarPhoneNumber}/>
                                <div className="hidden lg:block px-20 mb-6 bg-transparent sticky  top-11 z-10">
                    <Header data={data?.MasterSiteData?.PhoneNumbers} />
                    </div>
                    <div className="flex py-16 flex-wrap px-4">
                        <div className="flex flex-col w-full my-4 lg:my-0  lg:w-1/2 lg:px-12 order-1 lg:order-0">
                        <h1 className="text-[#101117] font-bold text-2xl">سرویس عمومی و رفع مشکلات خودرو</h1>
                        <p className="my-4 text-lg font-light">ما تیمی باتجربه و کارآمد داریم که با دقت و تعهد کار می‌کنه تا مطمئن بشیم خودروی شما همیشه در بهترین وضعیت ممکن قرار داره. در هر سرویس دوره‌ای، چراغ‌ها، سیستم برق و سایر قطعاتی که ممکنه دچار استهلاک بشن رو بررسی می‌کنیم.</p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-[155px] py-4">
                            <div className="flex flex-col items-center ">
                                <div className="px-10 py-6 flex justify-center bg-[#F0F2F4] items-center col-span-1 rounded-4xl">
                                    <Image alt="خدمات کارشناسی " src="/service-box-1.svg" width={36} height={70}/>
                                </div>
                                <h3 className="text-base">تجهیزات با کیفیت</h3>
                            </div>
                            <div className="flex flex-col items-center ">
                                <div className="px-10 py-6 flex justify-center bg-[#F0F2F4] items-center col-span-1 rounded-4xl">
                                    <Image alt="خدمات کارشناسی " src="/service-box-1.svg" width={36} height={70}/>
                                </div>
                                <h3 className="text-base">تجهیزات با کیفیت</h3>
                            </div>
                            <div className="flex flex-col items-center ">
                                <div className="px-10 py-6 flex justify-center bg-[#F0F2F4] items-center col-span-1 rounded-4xl">
                                    <Image alt="خدمات کارشناسی " src="/service-box-1.svg" width={36} height={70}/>
                                </div>
                                <h3 className="text-base">تجهیزات با کیفیت</h3>
                            </div>
                            <div className="flex flex-col items-center order-0 lg:order-1">
                                <div className="px-10 py-6 flex justify-center bg-[#F0F2F4] items-center col-span-1 rounded-4xl">
                                    <Image alt="خدمات کارشناسی " src="/service-box-1.svg" width={36} height={70}/>
                                </div>
                                <h3 className="text-base">تجهیزات با کیفیت</h3>
                            </div>


                        </div>
                        </div>
                        <div className="rounded-3xl w-full lg:w-1/2 relative h-[300px] lg:h-[364px] order-0 lg:order-1">
                            <Image className="rounded-3xl" src="/services.png" fill alt="خدمات کارشناسی کارچک"  />
                        </div>
                    </div>
                    </div>
    )

}