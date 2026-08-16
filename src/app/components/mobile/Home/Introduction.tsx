import Image from "next/image";
import { apiAssetUrl } from "@/lib/media";

export default function Introduction({data}:any) {
    const item = data?.[0];
    if (!item) return null;

    const imageSrc = apiAssetUrl(item.ImagePath);

    return (
        <section className="bg-secondary-background px-4 py-8 font-IranSans bg-[#F0F2F4] lg:py-24">
            <h2 className="text-lg text-black text-center lg:text-3xl my-2 font-extrabold">چرا کارماچک؟</h2>
            <div className="flex flex-wrap justify-between lg:hidden">
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">{item.T1Title}</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                      {item.T1Desc}
                    </p>
                </div>
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">{item.T2Title}</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                        {item.T2Desc}
                    </p>
                </div>
                <div className="w-full flex justify-center">
                    <Image className="rotate-90" src={imageSrc} width={171} height={240} alt="چرا کارماچک" sizes="140px" quality={60}/>
                </div>
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">{item.T3Title}</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                          {item.T3Desc}
                    </p>
                </div>
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">{item.T4Title}</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
 {item.T4Desc}
                    </p>
                </div>
            </div>
            <div className="hidden flex-wrap lg:flex py-4">
                <div className="w-1/5 mx-60">
                  <div className="w-full my-2">
                    <h3 className="text-[#101117] text-center py-4 font-medium text-2xl lg:text-justify">{item.T1Title}</h3>
                    <p className="text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
{item.T1Desc}
                    </p>
                </div>
                <div className="w-full my-2">
                    <h3 className="text-[#101117]  text-center py-4 font-medium text-2xl lg:text-justify">{item.T2Title}</h3>
                    <p className=" text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
{item.T2Desc}
                    </p>
                </div>
                <div className="w-full my-2">
                    <h3 className="text-[#101117] text-center py-4 font-medium text-2xl lg:text-justify">{item.T3Title}</h3>
                    <p className="text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
                    {item.T3Desc}
                    </p>
                </div>
                <div className="w-full my-2">
                    <h3 className="text-[#101117]  text-center py-4 font-medium text-2xl lg:text-justify">{item.T4Title}</h3>
                    <p className="text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
{item.T4Desc}
                    </p>
                </div>
                </div>
              
                <div className="w-1/3 flex justify-center">
                    <Image className="rotate-90" src={imageSrc} width={348} height={489} alt="چرا کارماچک" sizes="348px" quality={70}/>
                </div>
            </div>
        </section>
    )
}
