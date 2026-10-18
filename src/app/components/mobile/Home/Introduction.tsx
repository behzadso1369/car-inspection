import Image from "next/image";
import Link from "next/link";
import { apiAssetUrl } from "@/lib/media";

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="w-full lg:my-1">
      <p className="py-2 text-center text-sm font-medium text-[#101117] lg:text-start lg:text-xl lg:font-bold">
        {title}
      </p>
      <p className="text-center text-xs leading-6 text-[#55565A] lg:text-start lg:text-base lg:leading-8">
        {desc}
      </p>
    </div>
  );
}

export default function Introduction({ data }: { data?: unknown[] }) {
  const item = (data as Record<string, string>[] | undefined)?.[0];
  if (!item) return null;

  const imageSrc = apiAssetUrl(item.ImagePath);

  return (
    <section className="bg-secondary-background px-4 pb-8 pt-8 font-IranSans bg-[#F0F2F4] lg:py-24">
      <h2 className="text-lg text-black text-center lg:text-3xl my-2 font-extrabold leading-8 lg:leading-12">
        کارشناسی خودرو در محل و مرکز شرق تهران
      </h2>
      <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-[#55565A] lg:text-base lg:leading-8">
        کارشناسی خودرو در محل و مرکز شرق تهران؛ بررسی فنی، رنگ و بدنه و گزارش
        شفاف پیش از خرید یا فروش.
      </p>
      <div className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/car-inspection"
          className="inline-flex w-full items-center justify-center rounded-3xl bg-[#416CEA] px-6 py-4 text-center text-lg font-bold text-white shadow-[0_10px_24px_rgba(65,108,234,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-[#3456bb] sm:flex-1 sm:text-xl"
        >
          کارشناسی خودرو در محل
        </Link>
        <Link
          href="/car-price"
          className="inline-flex w-full items-center justify-center rounded-3xl border border-[#416CEA] bg-white px-6 py-4 text-center text-lg font-bold text-[#416CEA] transition-colors hover:bg-[#EEF2FD] sm:flex-1 sm:text-xl"
        >
          محاسبه قیمت خودرو
        </Link>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)_minmax(0,1fr)] lg:items-center lg:gap-x-8 xl:gap-x-14">
        <div className="order-1 flex w-full max-w-md flex-col gap-2 justify-self-center lg:order-1 lg:max-w-none lg:justify-self-stretch lg:gap-6 lg:pe-8 xl:pe-12">
          <FeatureItem title={item.T1Title} desc={item.T1Desc} />
          <FeatureItem title={item.T2Title} desc={item.T2Desc} />
        </div>
        <div className="order-2 flex shrink-0 justify-center lg:order-2">
          <div className="relative shrink-0 max-lg:flex max-lg:justify-center lg:h-[242px] lg:w-[340px] lg:overflow-hidden">
            <Image
              className="rotate-90 max-w-[171px] lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[340px] lg:w-auto lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2"
              src={imageSrc}
              width={348}
              height={489}
              alt="مزایای کارشناسی خودرو با کارماچک"
              sizes="(max-width: 1024px) 171px, 340px"
              quality={70}
              loading="lazy"
            />
          </div>
        </div>
        <div className="order-3 flex w-full max-w-md flex-col gap-2 justify-self-center lg:max-w-none lg:justify-self-stretch lg:gap-6 lg:ps-8 xl:ps-12">
          <FeatureItem title={item.T3Title} desc={item.T3Desc} />
          <FeatureItem title={item.T4Title} desc={item.T4Desc} />
        </div>
      </div>
    </section>
  );
}
