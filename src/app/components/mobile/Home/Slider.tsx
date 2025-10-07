'use client';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export const Slider = ({data}:any) => {
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


    <div className="bg-white py-4 px-4 relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          duration: 70,
          active:true,
          

        }}
        
        plugins={[
            Autoplay({
              delay: 3000,
                
            }),

          ]}
        
        orientation="vertical"
        className="w-full"
      >
        <CarouselContent className="w-full h-[183px] ">
          {[1, 2, 3].map((i) => (
            <CarouselItem
              key={i}
              className="relative w-full h-full "
            >
                <div className="w-full h-full bg-banner  bg-cover px-8 pt-10">
                  <h2 className="text-white text-2xl w-46 font-IranSans leading-10">کارشناسی خودرو، فقط با چند کلیک</h2>
                  <Button className="mt-2 rounded-2xl flex justify-center items-center font-IranSans text-white">
                    رزرو کارشناسی
                  </Button>
                </div>
              {/* <Image
                src="/banner.png"
                alt="کارشناسی خودرو، فقط با چند کلیک"
                fill
                className="object-cover "
                quality={100}
              /> */}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center flex-col absolute right-4  rounded-l-2xl bg-white top-1/2 -translate-y-1/2  py-6 px-2">
        {items.map((_, i) => (
          <button
            key={i}
            className={`w-2 my-0.5 h-2 rounded-full ${i === current ? "bg-blue-500" : "bg-gray-300"}`}
       
           
          />
        ))}
      </div>
    </div>
  );
};
