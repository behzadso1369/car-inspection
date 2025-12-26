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
        
        
        className="w-full max-w-full"
      >
         <CarouselContent className="-ml-2 md:-ml-4">
          {data?.CarInspectionServices?.map((item:any,index:number) => {
 return (
  <CarouselItem
           key={index} className="pl-2 md:pl-4 basis-4/5 lg:basis-1/3 xl:basis-1/3 2xl:basis-1/3" 

            >
              <div className="flex flex-wrap px-2">
                <div className="w-full flex flex-wrap ">
               <div className="relative w-full h-52 overflow-hidden">
                   <Image className="w-full rounded-3xl h-full object-cover" src={"https://api.carmacheck.com/" + item?.ImagePath} alt={item?.Title}  height={256} width={256} />
                   </div>
              
           
                </div>
                <div className="mt-2 w-full">
                  <h3 className="text-2xl font-medium my-2 w-full">{item?.Title}</h3>
        
                  <p className="text-lg text-[#55565A] w-full">
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
