"use client";



import { cn } from "@/lib/utils";

import { useKeyboardBottomInset } from "@/hooks/useKeyboardBottomInset";

import { useEffect, useRef } from "react";



const FOOTER_HEIGHT_VAR = "--flow-step-footer-height";



export function FlowStepFooter({

  className,

  style,

  ...props

}: React.ComponentProps<"div">) {

  const footerRef = useRef<HTMLDivElement>(null);

  const keyboardInset = useKeyboardBottomInset();



  useEffect(() => {

    const el = footerRef.current;

    if (!el) return;



    const syncHeight = () => {

      const height = el.getBoundingClientRect().height;

      document.documentElement.style.setProperty(

        FOOTER_HEIGHT_VAR,

        `${Math.ceil(height)}px`

      );

    };



    syncHeight();

    const observer = new ResizeObserver(syncHeight);

    observer.observe(el);

    window.addEventListener("resize", syncHeight);



    return () => {

      observer.disconnect();

      window.removeEventListener("resize", syncHeight);

      document.documentElement.style.removeProperty(FOOTER_HEIGHT_VAR);

    };

  }, []);



  return (

    <div

      ref={footerRef}

      className={cn(

        "fixed bottom-0 left-0 right-0 z-30 flex w-full bg-white px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0px_4px_32px_0px_#CBD5E0]",

        "lg:static lg:my-4 lg:mt-8 lg:pb-5 lg:shadow-none",

        className

      )}

      style={{

        ...style,

        ...(keyboardInset > 0

          ? { bottom: keyboardInset, transition: "bottom 0.2s ease-out" }

          : undefined),

      }}

      {...props}

    />

  );

}



/** padding پایین محتوا روی موبایل تا زیر فوتر ثابت نرود */

export const flowStepScrollPaddingClass =

  "pb-[calc(var(--flow-step-footer-height,22rem)+var(--keyboard-inset,0px)+0.75rem)] lg:pb-8";


