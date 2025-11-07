'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react";

export default function Services({data}:any) {

  
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    useEffect(() => {
      if (!api) {
        return
      }
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])

    return (
        <section className="bg-white  px-4 py-12 lg:px-32">
            <h3 className="mb-7 text-center font-IranSans text-lg">خدمات کارشناسی کارچک</h3>
            <Carousel  setApi={setApi}  className="w-full max-w-full" opts={{
                direction: "rtl",
                align:"start",
                loop:true
            }}  >
        <CarouselContent>
          {data?.map((item:any, index:number) => (
            <CarouselItem key={index} className="basis-4/5 lg:basis-1/3" >
              
                  <ProductCard Id={item.Id} ImagePath={item.ImagePath} Title={item.Title} Description={item.Description} />
              
           
            </CarouselItem>
          ))}
        </CarouselContent>
    
      </Carousel>

        </section>

    )
}