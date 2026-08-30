"use client";

import { Call02Icon, UserCircle02Icon } from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect } from "react";
import NavigationLink from "@/components/ui/navigation-link";

const NAV_ITEMS = [
  { href: "/", label: "خانه" },
  { href: "/car-inspection", label: "کارشناسی خودرو" },
  { href: "/car-price", label: "قیمت گذاری خودرو" },
  { href: "/blog", label: "بلاگ" },
  { href: "/contact-us", label: "ارتباط با ما" },
  { href: "/about-us", label: "درباره ما" },
] as const;

export const BlogHeader = memo(({ data }: any) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/car-inspection");
    router.prefetch("/car-price");
    router.prefetch("/blog");
    router.prefetch("/contact-us");
    router.prefetch("/about-us");
    router.prefetch("/Profile");
  }, [router]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/car-inspection") {
      return (
        pathname === "/car-inspection" || pathname.startsWith("/car-inspection/")
      );
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const logoSrc = data?.ImagePath
    ? `https://api.carmacheck.com/${data.ImagePath}`
    : "/assets/images/logo.svg";

  return (
    <header className="w-full bg-white px-8 py-4 font-IranSans shadow-[0px_4px_32px_0px_#CBD5E099]">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" prefetch={true} aria-label="صفحه اصلی کارماچک">
          <Image
            alt="کارماچک"
            width={140}
            height={57}
            src={logoSrc}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        <ul className="site-top-nav flex flex-wrap items-center justify-center text-base">
          {NAV_ITEMS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <li key={href} className="mx-3 xl:mx-4">
                <NavigationLink
                  href={href}
                  prefetch={true}
                  className={`transition-colors hover:text-[#3456bb] ${
                    active
                      ? "text-[#3456bb] visited:text-[#3456bb] active:text-[#3456bb]"
                      : "text-[#101117] visited:text-[#101117] active:text-[#101117]"
                  }`}
                  style={
                    active
                      ? { color: "#3456bb", WebkitTextFillColor: "#3456bb" }
                      : { color: "#101117", WebkitTextFillColor: "#101117" }
                  }
                >
                  {label}
                </NavigationLink>
              </li>
            );
          })}
        </ul>

        <span className="flex shrink-0 items-center gap-1 text-[#101117]">
          {data?.NavbarPhoneNumber && (
            <a
              className="rounded-3xl px-2 font-IranSans-UltraLight tracking-wide"
              href={`tel:${data.NavbarPhoneNumber}`}
              dir="ltr"
            >
              {data.NavbarPhoneNumber}
            </a>
          )}
          <Call02Icon size={16} />
          <NavigationLink href="/Profile" prefetch={true} className="mx-2" aria-label="حساب کاربری">
            <UserCircle02Icon size={24} />
          </NavigationLink>
        </span>
      </div>
    </header>
  );
});

BlogHeader.displayName = "BlogHeader";
