import Image from "next/image";
import { apiAssetUrl } from "@/lib/media";

export function Slider({ data }: { data?: any[] }) {
  const slides = Array.isArray(data)
    ? data.filter((item) => item?.ImagePath)
    : [];
  if (!slides.length) return null;

  return (
    <section
      className="relative bg-white px-4 py-6 lg:py-0"
      aria-label="اسلایدر کارشناسی خودرو"
    >
      <div className="relative mx-auto w-full lg:max-w-7xl">
        <div className="h-[calc((100vw-2rem)*600/1080)] snap-y snap-mandatory overflow-y-auto scrollbar-hide lg:h-[calc((min(100vw-8rem,80rem))*700/1400)]">
          {slides.map((item: any, index: number) => {
            const src = apiAssetUrl(item.ImagePath);
            if (!src) return null;
            return (
              <div
                key={item.id ?? item.Id ?? index}
                className="relative h-full w-full shrink-0 snap-start bg-gray-50"
              >
                <a
                  href="/car-inspection"
                  className="relative block h-full w-full"
                  aria-label="رزرو کارشناسی خودرو"
                >
                  <Image
                    src={src}
                    alt="کارشناسی خودرو، فقط با چند کلیک"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1400px"
                    quality={70}
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "low"}
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
