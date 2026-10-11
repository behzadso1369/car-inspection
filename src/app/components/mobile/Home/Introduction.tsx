import Image from "next/image";
import Link from "next/link";
import { apiAssetUrl } from "@/lib/media";

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="w-full lg:my-2">
      <p className="text-[#101117] py-2 text-center font-medium text-sm lg:text-2xl lg:text-justify">
        {title}
      </p>
      <p className="text-xs text-[#55565A] text-center leading-6 lg:text-lg lg:text-justify lg:leading-8">
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
    <section className="bg-secondary-background px-4 py-8 font-IranSans bg-[#F0F2F4] lg:py-24">
      <h1 className="text-lg text-black text-center lg:text-3xl my-2 font-extrabold leading-8 lg:leading-12">
        کارماچک؛ کارشناسی خودرو در تهران و شرق تهران
      </h1>
      <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-[#55565A] lg:text-base lg:leading-8">
        کارشناسی خودرو در محل و مرکز شرق تهران؛ بررسی فنی، رنگ و بدنه و گزارش
        شفاف پیش از خرید یا فروش.
      </p>
      <div className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/car-inspection"
          className="inline-flex w-full items-center justify-center rounded-3xl bg-[#416CEA] px-6 py-4 text-center text-lg font-bold text-white shadow-[0_10px_24px_rgba(65,108,234,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-[#3456bb] sm:flex-1 sm:text-xl"
        >
          رزرو کارشناسی خودرو
        </Link>
        <Link
          href="/car-price"
          className="inline-flex w-full items-center justify-center rounded-3xl border border-[#416CEA] bg-white px-6 py-4 text-center text-lg font-bold text-[#416CEA] transition-colors hover:bg-[#EEF2FD] sm:flex-1 sm:text-xl"
        >
          محاسبه قیمت خودرو
        </Link>
      </div>

      <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-start justify-between gap-6 lg:mt-12">
        <div className="order-2 flex w-full flex-wrap justify-center gap-x-2 sm:w-[45%] lg:order-1 lg:w-2/5 lg:flex-col lg:justify-start">
          <FeatureItem title={item.T1Title} desc={item.T1Desc} />
          <FeatureItem title={item.T2Title} desc={item.T2Desc} />
        </div>
        <div className="order-1 flex w-full justify-center sm:order-2 sm:w-[10%] lg:order-2 lg:w-1/5">
          <Image
            className="rotate-90"
            src={imageSrc}
            width={348}
            height={489}
            alt="مزایای کارشناسی خودرو با کارماچک"
            sizes="(max-width: 1024px) 171px, 348px"
            quality={70}
            loading="lazy"
          />
        </div>
        <div className="order-3 flex w-full flex-wrap justify-center gap-x-2 sm:w-[45%] lg:w-2/5 lg:flex-col lg:justify-start">
          <FeatureItem title={item.T3Title} desc={item.T3Desc} />
          <FeatureItem title={item.T4Title} desc={item.T4Desc} />
        </div>
      </div>
    </section>
  );
}
