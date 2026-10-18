"use client";

import { useEffect, useState } from "react";

const DESKTOP_MQ = "(min-width: 1024px)";

function measureKeyboardInset(): number {
  if (typeof window === "undefined") return 0;
  const viewport = window.visualViewport;
  if (!viewport) return 0;
  return Math.max(
    0,
    Math.round(window.innerHeight - viewport.height - viewport.offsetTop)
  );
}

export function useKeyboardBottomInset() {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const viewport = window.visualViewport;

    const sync = () => {
      const next = mq.matches ? 0 : measureKeyboardInset();
      setInset(next);
      document.documentElement.style.setProperty(
        "--keyboard-inset",
        `${next}px`
      );
    };

    sync();

    mq.addEventListener("change", sync);
    viewport?.addEventListener("resize", sync);
    viewport?.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);

    const onFocusIn = (event: FocusEvent) => {
      if (mq.matches) return;
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        window.setTimeout(() => {
          target.scrollIntoView({ block: "center", behavior: "smooth" });
        }, 320);
      }
    };

    document.addEventListener("focusin", onFocusIn);

    return () => {
      mq.removeEventListener("change", sync);
      viewport?.removeEventListener("resize", sync);
      viewport?.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      document.removeEventListener("focusin", onFocusIn);
      document.documentElement.style.removeProperty("--keyboard-inset");
    };
  }, []);

  return inset;
}
