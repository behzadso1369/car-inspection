"use client";

import { useTransition, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavigationLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  "aria-label"?: string;
}

/**
 * بهینه‌سازی شده NavigationLink با startTransition
 * برای navigation سریع‌تر و smooth تر
 */
export default function NavigationLink({
  href,
  children,
  className = "",
  prefetch = true,
  onClick,
  style,
  "aria-label": ariaLabel,
}: NavigationLinkProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick) {
      onClick();
    }

    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      prefetch={prefetch}
      aria-label={ariaLabel}
      style={style}
      className={`${className} ${isPending ? "opacity-70 pointer-events-none" : ""}`}
    >
      {children}
    </Link>
  );
}
