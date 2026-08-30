"use client";

import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/seo/BrandLogo";

type HeaderProps = {
  data?: any;
  activePath?: string;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/car-inspection") {
    return pathname === "/car-inspection" || pathname.startsWith("/car-inspection/");
  }
  return pathname.startsWith(href);
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.5 3.5h3L12 8l-2 1.5a12 12 0 0 0 4.5 4.5L16 12l4.5 1.5v3c0 1-1 2.5-6 2.5C8 19 5 12 5 7.5c0-5 1.5-4 2.5-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.5 19.2c.8-3.2 3.3-5.2 6.5-5.2s5.7 2 6.5 5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header({ data, activePath }: HeaderProps) {
  const pathname = usePathname();
  const currentPath = activePath || pathname || "";
  const linkClass = (href: string) =>
    `mx-4 [-webkit-tap-highlight-color:transparent] ${
      isActivePath(currentPath, href)
        ? "text-[#3456bb] visited:text-[#3456bb] active:text-[#3456bb] focus:text-[#3456bb]"
        : "text-inherit visited:text-inherit active:text-inherit"
    }`;

  const linkStyle = (href: string) => {
    const color = isActivePath(currentPath, href) ? "#3456bb" : "inherit";
    return { color, WebkitTextFillColor: color } as const;
  };

  return (
    <header className="w-full shadow-[0px_4px_32px_0px_#CBD5E099] px-8 py-4 !bg-white rounded-b-3xl font-IranSans">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" aria-label="صفحه اصلی کارماچک">
            <BrandLogo path={data?.ImagePath} width={140} height={57} />
          </a>
        </div>

        <ul className="site-top-nav flex text-base">
          <li>
            <a href="/" className={linkClass("/")} style={linkStyle("/")}>خانه</a>
          </li>
          <li>
            <a href="/car-inspection" className={linkClass("/car-inspection")} style={linkStyle("/car-inspection")}>
              کارشناسی خودرو
            </a>
          </li>
          <li>
            <a href="/car-price" className={linkClass("/car-price")} style={linkStyle("/car-price")}>
              قیمت گذاری خودرو
            </a>
          </li>
          <li>
            <a href="/blog" className={linkClass("/blog")} style={linkStyle("/blog")}>بلاگ</a>
          </li>
          <li>
            <a href="/contact-us" className={linkClass("/contact-us")} style={linkStyle("/contact-us")}>
              ارتباط با ما
            </a>
          </li>
          <li>
            <a href="/about-us" className={linkClass("/about-us")} style={linkStyle("/about-us")}>
              درباره ما
            </a>
          </li>
        </ul>

        <span className="text-[#101117] flex items-center font-IranSans">
          <a
            className="rounded-3xl font-IranSans border border-white px-2"
            href={`tel:${data?.NavbarPhoneNumber}`}
          >
            {data?.NavbarPhoneNumber}
          </a>
          <PhoneIcon />
          <a href="/Profile" className="mx-2" aria-label="حساب کاربری">
            <UserIcon />
          </a>
        </span>
      </div>
    </header>
  );
}
