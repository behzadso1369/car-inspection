'use client'

import { ArrowLeft01Icon } from "hugeicons-react"
import { BlogCard } from "./BlogCard"
import Link from "next/link"

type BlogShortItem = {
  Id?: number | string
  Slug?: string
  Title?: string
  ImagePath?: string
  Excerpt?: string
}

export default function BlogShort({ data }: { data?: BlogShortItem[] }) {
  if (!data?.length) return null

  return (
    <section className="bg-white py-16 px-4 font-IranSans">
      <div className="flex w-full justify-between">
        <span>خواندنی ها</span>
        <p className="text-[#1434CB] flex items-center">
          <Link href="/blog" prefetch={false}>نمایش بلاگ</Link>
          <ArrowLeft01Icon className="mb-1 mx-1" color="#1434CB" size={20} />
        </p>
      </div>
      <div className="my-4 grid grid-cols-4 gap-4">
        {data.map((item) => (
          <BlogCard
            key={item.Slug ?? item.Id ?? item.Title}
            Slug={item.Slug}
            Id={item.Id}
            Title={item.Title}
            ImagePath={item.ImagePath}
            Excerpt={item.Excerpt}
          />
        ))}
      </div>
    </section>
  )
}
