"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Toaster = dynamic(() => import("sonner").then((m) => m.Toaster), {
  ssr: false,
});

export function DeferredToaster() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 8000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;
  return <Toaster richColors position="top-center" />;
}
