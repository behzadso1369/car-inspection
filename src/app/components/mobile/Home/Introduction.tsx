"use client";
import Image from "next/image";

export default function Introduction({data}:any) {
    return (
        <section className="bg-secondary-background px-4 py-8 font-IranSans   bg-[#F0F2F4] lg:py-24">
            <h2 className="text-lg text-black text-center lg:text-2xl my-2">چرا کارماچک؟</h2>
            <div className="flex  flex-wrap justify-between lg:hidden">
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">{data?.[0].T1Title}</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                      {data?.[0].T1Desc}
                    </p>
                </div>
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">{data?.[0].T2Title}</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                        {data?.[0].T1Desc}
                    </p>
                </div>
                <div className="w-full flex justify-center">
                    <Image className="rotate-90" src={"https://api.carmacheck.com/" + data?.[0].ImagePath} width="171" height="240" alt="چرا کارماچک"/>
                </div>
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">{data?.[0].T3Title}</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                          {data?.[0].T3Desc}
                    </p>
                </div>
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">{data?.[0].T4Title}</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
 {data?.[0].T4Desc}
                    </p>
                </div>
                
             
            </div>
            <div className="hidden  flex-wrap  lg:flex py-4">
                <div className="w-1/5 mx-60">
                  <div className="w-full my-2">
                    <h3 className="text-[#101117] text-center py-4 font-medium text-2xl lg:text-justify">{data?.[0].T1Title}</h3>
                    <p className="text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
{data?.[0].T1Desc}
                    </p>
                </div>
                <div className="w-full my-2">
                    <h3 className="text-[#101117]  text-center py-4 font-medium text-2xl lg:text-justify">{data?.[0].T2Title}</h3>
                    <p className=" text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
{data?.[0].T2Desc}
                    </p>
                </div>
                <div className="w-full my-2">
                    <h3 className="text-[#101117] text-center py-4 font-medium text-2xl lg:text-justify">{data?.[0].T3Title}</h3>
                    <p className="text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
                    {data?.[0].T3Desc}
                    </p>
                </div>
                <div className="w-full my-2">
                    <h3 className="text-[#101117]  text-center py-4 font-medium text-2xl lg:text-justify">{data?.[0].T4Title}</h3>
                    <p className="text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
{data?.[0].T4Desc}
                    </p>
                </div>
                </div>
              
                <div className="w-1/3 flex justify-center">
                    <Image className="rotate-90" src={"https://api.carmacheck.com/" + data?.[0].ImagePath} width="348" height="489" alt="چرا کارماچک"/>
                </div>
                
                
             
            </div>
            

        </section>
    )
}