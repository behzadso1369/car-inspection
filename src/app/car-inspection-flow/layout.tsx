"use client";
import { useEffect, useState } from "react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Call02Icon } from "hugeicons-react";
import { usePathname, useRouter } from "next/navigation";
import {
  CarInspectionFlowHeaderSkeleton,
  CarInspectionFlowSkeleton,
} from "./components/CarInspectionFlowSkeleton";

const FLOW_SKELETON_ROUTES = [
  "/car-inspection-flow/inspection-method",
  "/car-inspection-flow/inspection-location",
  "/car-inspection-flow/insert-information",
  "/car-inspection-flow/inspection-time",
  "/car-inspection-flow/final-confirm",
] as const;

function isFlowSkeletonRoute(pathname: string) {
  return FLOW_SKELETON_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const isBaseFlow = pathname === "/car-inspection-flow/select-car-group";
  const isSkeletonRoute = isFlowSkeletonRoute(pathname);
  const showSkeleton = isLoading && isSkeletonRoute;
  const showFlowHeader = !isBaseFlow;

  const navigateBack = () => {
    const isLoggedIn = Boolean(
      localStorage.getItem("token") || localStorage.getItem("userId")
    );

    if (
      isLoggedIn &&
      pathname.startsWith("/car-inspection-flow/inspection-location")
    ) {
      router.replace("/car-inspection-flow/inspection-method");
      return;
    }

    router.back();
  };

  const handleBack = () => {
    if (showSkeleton) return;

    const userId = localStorage.getItem("userId");
    const orderId = localStorage.getItem("OrderId");

    if (userId && orderId) {
      instance
        .post(ApiHelper.get("MoveOrder"), {
          isBack: true,
          orderId: Number(orderId),
          userId: userId,
        })
        .then((res: any) => {
          if (res) {
            navigateBack();
          }
        })
        .catch((err: any) => {
          console.error("Error moving order:", err);
          navigateBack();
        });
    } else {
      navigateBack();
    }
  };

  const getMasterData = () => {
    setIsLoading(true);
    instance
      .get(ApiHelper.get("GetMasterPageData"))
      .then((res: any) => {
        setData(res);
      })
      .catch((err: any) => {
        console.error("Error fetching master page data:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isSkeletonRoute) {
      getMasterData();
      return;
    }

    if (data === null) {
      getMasterData();
    }
  }, [pathname]);

  return (
    <div
      className={`bg-white font-IranSans ${showFlowHeader ? "lg:max-w-xl lg:container lg:mx-auto lg:my-10 lg:pt-8" : ""} shadow-[0px_4px_24px_0px_#EAEAEA]`}
      aria-busy={showSkeleton}
    >
      {showSkeleton ? (
        <div className="pointer-events-none select-none" aria-hidden="false">
          <CarInspectionFlowHeaderSkeleton />
          <CarInspectionFlowSkeleton variant="step" />
        </div>
      ) : (
        <>
          {showFlowHeader && (
            <div className="px-4 py-3 flex justify-between shadow-[0px_6px_20px_-2px_#10182814] lg:shadow-none">
              <ArrowRight onClick={handleBack} className="cursor-pointer" />
              <div className="flex items-center">
                <Link href="/" prefetch={true} aria-label="صفحه اصلی کارماچک">
                  <Image
                    alt="کارماچک"
                    width={140}
                    height={58}
                    src={
                      data?.MasterSiteData?.ImagePath
                        ? `https://api.carmacheck.com/${data.MasterSiteData.ImagePath}`
                        : "/assets/images/logo.svg"
                    }
                  />
                </Link>
              </div>
              <span className="text-[#101117] flex items-center font-IranSans">
                <a
                  className="rounded-3xl font-IranSans-UltraLight border border-white px-2"
                  href={`tel:${data?.MasterSiteData?.NavbarPhoneNumber}`}
                >
                  {data?.MasterSiteData?.NavbarPhoneNumber}
                </a>
                <Call02Icon size={16} />
              </span>
            </div>
          )}
          {children}
        </>
      )}
    </div>
  );
}
