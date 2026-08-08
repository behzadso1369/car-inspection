"use client";

import {
  Call02Icon,
  Car01Icon,
  Home01Icon,
  Menu01Icon,
  Money03Icon,
  News01Icon,
  UserCircle02Icon,
  ContactBookIcon,
  InformationCircleIcon,
} from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import NavigationLink from "@/components/ui/navigation-link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "خانه", icon: Home01Icon },
  { href: "/car-inspection", label: "کارشناسی خودرو", icon: Car01Icon },
  { href: "/car-price", label: "قیمت گذاری خودرو", icon: Money03Icon },
  { href: "/blog", label: "بلاگ", icon: News01Icon },
  { href: "/contact-us", label: "ارتباط با ما", icon: ContactBookIcon },
  { href: "/about-us", label: "درباره ما", icon: InformationCircleIcon },
] as const;

export const BlogMobileHeader = memo(({ data }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
  const phone = data?.NavbarPhoneNumber;

  return (
    <header className="w-full border-b border-[#E8EAF0] bg-white px-3 py-2.5 font-IranSans shadow-[0px_4px_24px_0px_#CBD5E066]">
      <div className="flex items-center justify-between gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="باز کردن منو"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F6FB] text-[#101117] transition-colors active:bg-[#E8ECF8]"
            >
              <Menu01Icon size={22} />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex w-[min(100%,20rem)] flex-col gap-0 border-l border-[#E8EAF0] bg-white p-0 font-IranSans sm:max-w-sm [&>button]:hidden"
            dir="rtl"
          >
            <SheetHeader className="space-y-0 border-b border-[#E8EAF0] p-0 text-right">
              <SheetTitle className="sr-only">منوی ناوبری</SheetTitle>
              <div className="flex items-center justify-between px-4 py-3">
                <Link
                  href="/"
                  prefetch={true}
                  aria-label="صفحه اصلی کارماچک"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    alt="کارماچک"
                    width={120}
                    height={48}
                    src={logoSrc}
                    priority
                    className="h-10 w-auto object-contain"
                  />
                </Link>
                <SheetClose asChild>
                  <button
                    type="button"
                    aria-label="بستن منو"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F6FB] text-[#55565A] text-lg leading-none"
                  >
                    ×
                  </button>
                </SheetClose>
              </div>
            </SheetHeader>

            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="منوی اصلی">
              <ul className="flex flex-col gap-1.5">
                {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                  const active = isActive(href);
                  return (
                    <li key={href}>
                      <NavigationLink
                        href={href}
                        prefetch={true}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm transition-colors",
                          active
                            ? "bg-[#3456bb]/10 font-medium text-[#3456bb]"
                            : "text-[#101117] hover:bg-[#F4F6FB]"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                            active ? "bg-[#3456bb] text-white" : "bg-[#F4F6FB] text-[#55565A]"
                          )}
                        >
                          <Icon size={18} />
                        </span>
                        <span>{label}</span>
                        {active && (
                          <span className="mr-auto h-1.5 w-1.5 rounded-full bg-[#3456bb]" />
                        )}
                      </NavigationLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto space-y-2 border-t border-[#E8EAF0] bg-[#F8F9FC] p-4">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#DCE3F5] bg-white px-4 py-3 text-sm text-[#101117]"
                >
                  <Call02Icon size={18} className="text-[#3456bb]" />
                  <span className="font-IranSans-UltraLight tracking-wide" dir="ltr">
                    {phone}
                  </span>
                </a>
              )}
              <NavigationLink
                href="/Profile"
                prefetch={true}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#3456bb] px-4 py-3 text-sm text-white"
              >
                <UserCircle02Icon size={18} />
                حساب کاربری
              </NavigationLink>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" prefetch={true} aria-label="صفحه اصلی کارماچک" className="mx-auto">
          <Image
            alt="کارماچک"
            width={130}
            height={52}
            src={logoSrc}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        <NavigationLink
          href="/Profile"
          prefetch={true}
          aria-label="حساب کاربری"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F6FB] text-[#101117]"
        >
          <UserCircle02Icon size={22} />
        </NavigationLink>
      </div>
    </header>
  );
});

BlogMobileHeader.displayName = "BlogMobileHeader";
