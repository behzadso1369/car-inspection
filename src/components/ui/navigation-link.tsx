"use client";

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';

interface NavigationLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  onClick?: () => void;
}

/**
 * بهینه‌سازی شده NavigationLink با startTransition
 * برای navigation سریع‌تر و smooth تر
 */
export default function NavigationLink({
  href,
  children,
  className = '',
  prefetch = true,
  onClick,
}: NavigationLinkProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (onClick) {
      onClick();
    }

    // استفاده از startTransition برای navigation بدون blocking
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      prefetch={prefetch}
      className={`${className} ${isPending ? 'opacity-70 pointer-events-none' : ''}`}
    >
      {children}
    </Link>
  );
}

