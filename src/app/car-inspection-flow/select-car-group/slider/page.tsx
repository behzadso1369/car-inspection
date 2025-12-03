"use client";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react";
import { Calendar01Icon } from "hugeicons-react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
export default function OurCustomer() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState<number>(1)

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
    useEffect(() => {
      if (!api) {
        return
      }
      setCurrent(api.selectedScrollSnap())
   
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap())
      })
      
    }, [api])
    const items = [0, 1, 2]; 
  return (


    <div className="bg-white py-16 relative">
      <Carousel
        setApi={setApi}
        opts={{
            direction: "rtl",
          loop: true,
          duration: 70,
          active:true,
          

        }}
        
        plugins={[
            Autoplay({
              delay: 3000,
                
            }),

          ]}
        
        orientation="horizontal"
        
        className="w-full"
      >
        <CarouselContent className="w-full h-auto lg:h-[500px]">
          {data?.CarInspectionServices?.map((item:any) => {
 return (
  <CarouselItem
              key={item?.Id}
              className="basis-full"

            >
              <div className="flex flex-wrap px-2 lg:px-60">
                <div className="w-full flex flex-wrap ">
                  <div className="w-full lg:w-1/3 flex justify-center relative h-[320px]">
  <Image
                src={"https://api.carmacheck.com/" + item.ImagePath}
                alt=""
            fill
                className=" mx-2"
                
                quality={100}
              />
                  </div>
              
           
                </div>
                <div className="mt-2">
                  <h3 className="text-2xl font-medium my-2">{item?.Title}</h3>
        
                  <p className="text-lg text-[#55565A]">
                    {item?.InspectionServiceDescription}
                  </p>
                </div>

               
              </div>
             
            </CarouselItem>
 )           
})}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-center w-full absolute bottom-0   bg-white  lg:w-full lg:justify-center  py-6 px-2">
        {items.map((_, i) => (
          <button
            key={i}
                     className={`w-4 mx-1 my-0.5 h-4 rounded-full lg:mx-2 ${i === current ? "bg-blue-500" : "bg-gray-300"}`}
       
           
          />
        ))}
      </div>
    </div>
  );
};
