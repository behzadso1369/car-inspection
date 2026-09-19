"use client";

import { Call02Icon } from "hugeicons-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavigationBar } from "../components/mobile/Home/NavigationBar";
import { Header } from "../components/mobile/Home/Header";
import Banner from "../components/mobile/Home/Banner";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";

export default function WalletLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [data, setData] = useState<any>([]);
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    instance
      .get(ApiHelper.get("GetMasterPageData"))
      .then((res: any) => {
        setData(res);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token.trim() === "") {
      const redirectUrl = `${pathname}${window.location.search}`;
      router.replace(`/login?redirectUrl=${encodeURIComponent(redirectUrl)}`);
      setIsAuthed(false);
      return;
    }
    setIsAuthed(true);
  }, [pathname, router]);

  if (!isAuthed) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-IranSans text-[#55565A]">
        در حال انتقال به ورود...
      </div>
    );
  }

  return (
    <div className="lg:max-w-7xl lg:container lg:mx-auto">
      <Banner data={data?.MasterSiteData?.NavbarPhoneNumber} />
      <div className="hidden lg:block px-20 mb-6 bg-transparent sticky top-11 z-10">
        <Header data={data?.MasterSiteData} activePath="/Profile" />
      </div>
      <div className="block lg:hidden">
        <div className="px-8 py-3 flex justify-between shadow-[0px_6px_20px_-2px_#10182814]">
          <ArrowRight
            onClick={() => {
              router.back();
            }}
          />
          <div className="flex items-center">
            <Link href="/" prefetch={true} aria-label="صفحه اصلی کارماچک">
              <Image
                alt="کارماچک"
                width={140}
                height={30}
                src={
                  data?.MasterSiteData?.ImagePath
                    ? `https://api.carmacheck.com/${data.MasterSiteData.ImagePath}`
                    : "/assets/images/logo.svg"
                }
              />
            </Link>
          </div>
          <span className="text-[#101117] flex items-center font-IranSans">
            <Call02Icon size={16} />
          </span>
        </div>
      </div>

      {children}

      <div className="block lg:hidden">
        <NavigationBar activePath="/Profile" />
      </div>
    </div>
  );
}
