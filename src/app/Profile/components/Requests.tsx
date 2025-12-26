'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { RequestCard } from "./RequestCard";
import { ArrowLeft01Icon } from "hugeicons-react"
import Link from "next/link";

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
        <section className="bg-white lg:border lg:border-[#D9D9D9] rounded-2xl  px-4 pt-6 font-IranSans col-span-3 lg:col-span-2 lg:order-1 lg:h-[500px] lg:overflow-auto">
              <div className="flex w-full justify-between">
                <span>درخواست های من</span>
                <Link href={"/Profile/requests"} prefetch={false} className="text-[#1434CB] flex items-center">
                    <span>همه درخواست ها</span>
                    <ArrowLeft01Icon className="mb-1 mx-1" color="#1434CB" size={20} />
                    
                </Link>
              
            </div>
            <div className="block lg:hidden">
              <Carousel  setApi={setApi}  className="w-full max-w-full" opts={{
                direction: "rtl",
                align:"start",
                loop:true
            }}  >
        <CarouselContent>
          {data?.map((item:any, index:number) => (
            <CarouselItem key={index} className="basis-4/5 " >
              
                  <RequestCard orderCreated={item?.orderCreated} Status={item.isComplete  ? "compepelted" : "unknown"} Id={item.id} CarName={item.carGroup} Title={item.isComplete ? "تکمیل شده" : "تکمیل نشده"} paymentStatus={item.flowState} Description={item.Description} />
              
           
            </CarouselItem>
          ))}
        </CarouselContent>
    
      </Carousel>
            </div>
            <div className="hidden lg:block">
               {data?.map((item:any, index:number) => (
            
              
                  <RequestCard orderCreated={item?.orderCreated} Status={item.isComplete  ? "compepelted" : "unknown"} Id={item.id} CarName={item.carGroup} Title={item.isComplete ? "تکمیل شده" : "تکمیل نشده"} paymentStatus={item.flowState} Description={item.Description} />
              
           
       
          ))}

            </div>
            

        </section>

    )
}