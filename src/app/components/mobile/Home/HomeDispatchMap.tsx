"use client";

import Image from "next/image";

export default function HomeDispatchMap() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#071018]">
      <Image
        src="/images/home/hero-map-3d-complete.jpg"
        alt="ماکت سه‌بعدی شهر با پین روی خودرو"
        fill
        priority
        quality={82}
        sizes="100vw"
        className="home-dispatch-model-photo object-cover object-[50%_28%]"
      />
    </div>
  );
}
