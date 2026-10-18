"use client";

import { cn } from "@/lib/utils";
import { useKeyboardBottomInset } from "@/hooks/useKeyboardBottomInset";
import { useEffect, useState } from "react";

/** Full-screen sheets on narrow viewports pin the footer to the viewport. */
function useMobileSheetViewport() {
  const [isMobileSheet, setIsMobileSheet] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobileSheet(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isMobileSheet;
}

/**
 * Footer bar for full-screen dialogs / sheets (e.g. address form).
 * Lifts above the software keyboard on phones.
 */
export function KeyboardAwareSheetFooter({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  const keyboardInset = useKeyboardBottomInset();
  const isMobileSheet = useMobileSheetViewport();

  const liftStyle =
    keyboardInset > 0
      ? isMobileSheet
        ? { bottom: keyboardInset, transition: "bottom 0.2s ease-out" }
        : {
            transform: `translateY(-${keyboardInset}px)`,
            transition: "transform 0.2s ease-out",
          }
      : undefined;

  return (
    <div
      className={cn(
        "shrink-0",
        "max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-[260]",
        className
      )}
      style={{ ...style, ...liftStyle }}
      {...props}
    />
  );
}
