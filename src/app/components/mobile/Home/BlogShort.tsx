import { BlogCard } from "./BlogCard"

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
        <h2 className="text-lg font-bold text-[#101117]">خواندنی ها</h2>
        <p className="text-[#1434CB] flex items-center">
          <a href="/blog">نمایش بلاگ</a>
          <svg className="mb-1 mx-1" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6 9 12l6 6" stroke="#1434CB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
