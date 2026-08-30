'use client';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiAssetUrl } from "@/lib/media";

function sliderHref(link?: string): string | null {
  const trimmed = String(link ?? "").trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed, "https://carmacheck.com");
    const host = url.hostname.replace(/^www\./, "");
    if (host === "carmacheck.com" || host === "localhost") {
      return `${url.pathname}${url.search}${url.hash}` || "/";
    }
    return trimmed;
  } catch {
    return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  }
}

export const Slider = ({data}:any) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState<number>(0)

    useEffect(() => {
      if (!api) {
        return
      }
      setCurrent(api.selectedScrollSnap())

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap())
      })

      const autoplay = api.plugins()?.autoplay
      const startMs = Math.max(Number(data?.[0]?.DurationTime) || 3000, 4000)
      const timer = window.setTimeout(() => {
        autoplay?.play?.()
      }, startMs)

      return () => window.clearTimeout(timer)
    }, [api, data])

    if (!data?.length) return null;

  return (


    <div className="bg-white py-6 lg:py-0 px-4 relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          duration:  90,
          active:true,


        }}

        plugins={[
            Autoplay({
              delay: data?.[0]?.DurationTime  || 3000,
              playOnInit: false,
            }),

          ]}

        orientation="vertical"

        className="w-full lg:max-w-7xl lg:mx-auto"
      >
        <CarouselContent className="w-full h-[calc((100vw-2rem)*600/1080)] lg:h-[calc((min(100vw-8rem,80rem))*700/1400)]">
          {data?.map((item:any, index: number) => {
            const imageUrl = apiAssetUrl(item.ImagePath);
            const isFirst = index === 0;
            const href = sliderHref(item.Link);
            const alt = String(item.Text ?? "").trim() || "اسلاید کارماچک";
            const image = (
                 <Image
                src={imageUrl}
                alt={alt}
                fill
                className="object-cover lg:object-cover z-0"
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1600px) 100vw, 1920px"
                priority={isFirst}
                fetchPriority={isFirst ? "high" : "low"}
              />
            );
 return (
  <CarouselItem
              key={item.id ?? item.Id ?? imageUrl ?? index}
              className="relative w-full aspect-[1080/600] lg:aspect-[1920/700]  shrink-0 flex items-center justify-center bg-gray-50"
            >
              {href ? (
              <Link href={href} className="relative w-full h-full">
                 {image}
              </Link>
              ) : (
              <div className="relative w-full h-full">{image}</div>
              )}


            </CarouselItem>
 )
})}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center flex-col lg:h-8 lg:flex-row absolute right-4 lg:right-0  rounded-l-2xl lg:rounded-none bg-white top-1/2  lg:top-full lg:w-full lg:justify-center -translate-y-1/2 lg:translate-y-0  py-6 lg:py-4 px-2">
        {data?.map((item:any, i:number) => (
          <button
            key={i}
            className={`w-2 my-0.5 h-2 lg:w-3 lg:h-3 rounded-full lg:mx-1 ${i === current ? "bg-blue-500" : "bg-gray-300"}`}


          />
        ))}
      </div>
    </div>
  );
};
