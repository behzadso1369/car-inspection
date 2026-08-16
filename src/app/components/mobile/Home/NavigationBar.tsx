const ACTIVE = "#3456bb";
const INACTIVE = "#6B6C70";

const activeFilter =
  "brightness(0) saturate(100%) invert(28%) sepia(70%) saturate(1600%) hue-rotate(208deg) brightness(92%) contrast(90%)";
const inactiveFilter =
  "brightness(0) saturate(100%) invert(42%) sepia(0%) saturate(0%)";

type NavigationBarProps = {
  activePath?: string;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/car-inspection") {
    return pathname === "/car-inspection" || pathname.startsWith("/car-inspection/");
  }
  if (href === "/car-price") return pathname.startsWith("/car-price");
  return pathname.startsWith(href);
}

function HomeIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoneyIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke={color} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.25" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

function BookIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M5 19.5A2.5 2.5 0 0 1 7.5 17H20" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

export function NavigationBar({ activePath = "" }: NavigationBarProps) {
  const linkClass = (href: string) =>
    `flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 ${
      isActivePath(activePath, href)
        ? "text-[#3456bb] visited:text-[#3456bb]"
        : "text-[#6B6C70] visited:text-[#6B6C70]"
    }`;

  const iconColor = (href: string) =>
    isActivePath(activePath, href) ? ACTIVE : INACTIVE;

  return (
    <nav className="fixed font-IranSans z-40 w-[calc(100%-1.5rem)] max-w-md left-1/2 transform -translate-x-1/2 bottom-6 h-[4.25rem] px-2 bg-[#f6f6f6] rounded-2xl shadow-[0px_4px_8px_0px_#00000014] flex justify-between items-center">
      <a href="/" className={linkClass("/")}>
        <HomeIcon color={iconColor("/")} />
        <span className="text-[11px] leading-tight text-center">خانه</span>
      </a>

      <a href="/car-inspection" className={linkClass("/car-inspection")}>
        <div
          style={{
            filter: isActivePath(activePath, "/car-inspection")
              ? activeFilter
              : inactiveFilter,
          }}
        >
          <img src="/car-inspection.svg" alt="" width={22} height={22} />
        </div>
        <span className="text-[11px] leading-tight text-center">کارشناسی</span>
      </a>

      <a href="/car-price" className={linkClass("/car-price")}>
        <MoneyIcon color={iconColor("/car-price")} />
        <span className="text-[11px] leading-tight text-center">
          قیمت‌گذاری
          <br />
          خودرو
        </span>
      </a>

      <a href="/blog" className={linkClass("/blog")}>
        <BookIcon color={iconColor("/blog")} />
        <span className="text-[11px] leading-tight text-center">بلاگ</span>
      </a>

      <a href="/Profile" className={linkClass("/Profile")}>
        <div
          style={{
            filter: isActivePath(activePath, "/Profile") ? activeFilter : inactiveFilter,
          }}
        >
          <img src="/profile.svg" alt="" width={22} height={22} />
        </div>
        <span className="text-[11px] leading-tight text-center">پروفایل</span>
      </a>
    </nav>
  );
}
