"use client";

import { Call02Icon } from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";

type CallActionProps = {
  data?: any;
  /** روی موبایل به‌صورت fixed زیر بنر بچسبد (مثلاً صفحه قیمت‌گذاری) */
  fixed?: boolean;
};

export default function CallAction({ data, fixed = false }: CallActionProps) {
  const sectionClass = fixed
    ? "fixed inset-x-0 top-11 z-30 bg-secondary p-4 h-11 text-black flex justify-between items-center shadow-[0px_4px_8px_0px_#00000014]"
    : "sticky top-11 z-20 bg-secondary p-4 h-11 text-black flex justify-between items-center shadow-[0px_4px_8px_0px_#00000014]";

  return (
    <>
      {fixed ? <div className="h-11" aria-hidden /> : null}
      <section className={sectionClass}>
        <div className="flex items-center">
          <Link href="/" prefetch={true} aria-label="صفحه اصلی کارماچک">
            <Image
              alt="کارماچک"
              width={130}
              height={30}
              src={"https://api.carmacheck.com/" + data?.ImagePath}
            />
          </Link>
        </div>

        <span className="text-[#101117] flex items-center font-IranSans">
          <a
            className="rounded-3xl font-IranSans-UltraLight border border-white px-2"
            href={`tel:${data?.NavbarPhoneNumber}`}
          >
            {data?.NavbarPhoneNumber}
          </a>
          <Call02Icon size={16} />
        </span>
      </section>
    </>
  );
}
