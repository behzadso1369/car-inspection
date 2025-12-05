"use client";

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Hook برای navigation بهینه‌سازی شده با startTransition
 * باعث می‌شه navigation blocking نباشه و UI responsive بمونه
 */
export function useOptimizedNavigation() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const navigate = (path: string) => {
    startTransition(() => {
      router.push(path);
    });
  };

  const replace = (path: string) => {
    startTransition(() => {
      router.replace(path);
    });
  };

  return {
    navigate,
    replace,
    isPending,
    router,
  };
}

