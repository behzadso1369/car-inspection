'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { RequestCard } from "./RequestCard";
import { ArrowLeft01Icon } from "hugeicons-react"

export default function Requests({data}:any) {

  
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
        <section className="bg-white  px-4 py-12  font-IranSans">
              <div className="flex w-full justify-between">
                <span>درخواست های من</span>
                <p className="text-[#1434CB] flex items-center">
                    <span>همه درخواست ها</span>
                    <ArrowLeft01Icon className="mb-1 mx-1" color="#1434CB" size={20} />
                    
                </p>
              
            </div>
            <Carousel  setApi={setApi}  className="w-full max-w-full my-4" opts={{
                direction: "rtl",
                align:"start",
                loop:true
            }}  >
        <CarouselContent>
          {data?.map((item:any, index:number) => (
            <CarouselItem key={index} className="basis-4/5" >
              
                  <RequestCard Status={item.status} Id={item.Id} CarName={item.CarName} Title={item.Title} paymentStatus={item.paymentStatus} Description={item.Description} />
              
           
            </CarouselItem>
          ))}
        </CarouselContent>
    
      </Carousel>

        </section>

    )
}