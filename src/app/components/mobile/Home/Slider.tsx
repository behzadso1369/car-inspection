'use client';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";export const Slider = ({data}:any) => {
  console.log(data);
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState<number>(1)
   
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


    <div className="bg-white py-6 lg:py-0 px-4 relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          duration: data?.[0]?.DurationTime  || 90,
          active:true,
          

        }}
        
        plugins={[
            Autoplay({
              delay: 3000,
                
            }),

          ]}
        
        orientation="vertical"
        
        className="w-full lg:max-w-7xl lg:mx-auto"
      >
        <CarouselContent className="w-full h-[calc((100vw-2rem)*600/1080)] lg:h-[calc((min(100vw-8rem,80rem))*700/1400)]">
          {data?.map((item:any) => {
            const imageUrl = item.ImagePath.replace(/\\/g, '/'); 
 return (
  <CarouselItem
              key={item.id}
              className="relative w-full aspect-[1080/600] lg:aspect-[1920/700]  shrink-0 flex items-center justify-center bg-gray-50"
            >
              <Link href="./car-inspection-flow/select-car-group" className="relative w-full h-full">
                 <Image
                src={`https://api.carmacheck.com/${imageUrl}`}
                alt="کارشناسی خودرو، فقط با چند کلیک"
                fill
                className="object-cover lg:object-cover z-0"
                quality={100}
                sizes="(max-width: 1600px) 100vw, 1920px"
              />
              </Link>
               
           
            </CarouselItem>
 )           
})}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center flex-col lg:h-8 lg:flex-row absolute right-4 lg:right-0  rounded-l-2xl lg:rounded-none bg-white top-1/2  lg:top-full lg:w-full lg:justify-center -translate-y-1/2 lg:translate-y-0  py-6 lg:py-4 px-2">
        {items.map((_, i) => (
          <button
            key={i}
            className={`w-2 my-0.5 h-2 lg:w-3 lg:h-3 rounded-full lg:mx-1 ${i === current ? "bg-blue-500" : "bg-gray-300"}`}
       
           
          />
        ))}
      </div>
    </div>
  );
};
