"use client"

import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { BlogCard } from "./BlogCard"

type BlogShortItem = {
  Id?: number | string
  Slug?: string
  Title?: string
  ImagePath?: string
  Excerpt?: string
}

export default function BlogShort({ data }: { data?: BlogShortItem[] }) {
  const autoplay = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  )

  if (!data?.length) return null

  const posts = data.slice(0, 6)

  return (
    <section className="bg-white py-16 px-4 font-IranSans">
      <div className="flex w-full justify-between">
        <h2 className="text-lg font-bold text-[#101117]">آخرین مطالب</h2>
        <p className="text-[#1434CB] flex items-center">
          <a href="/blog">نمایش بلاگ</a>
          <svg className="mb-1 mx-1" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6 9 12l6 6" stroke="#1434CB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      </div>
      <Carousel
        className="my-4"
        opts={{
          align: "start",
          direction: "rtl",
          loop: true,
          slidesToScroll: 1,
          breakpoints: {
            "(min-width: 1024px)": { slidesToScroll: 3 },
          },
        }}
        plugins={[autoplay.current]}
      >
        <CarouselContent>
          {posts.map((item) => (
            <CarouselItem
              key={item.Slug ?? item.Id ?? item.Title}
              className="basis-[85%] lg:basis-1/3"
            >
              <BlogCard
                Slug={item.Slug}
                Id={item.Id}
                Title={item.Title}
                ImagePath={item.ImagePath}
                Excerpt={item.Excerpt}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
