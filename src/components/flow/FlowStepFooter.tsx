"use client";

import { cn } from "@/lib/utils";
import { useKeyboardBottomInset } from "@/hooks/useKeyboardBottomInset";

export function FlowStepFooter({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  const keyboardInset = useKeyboardBottomInset();

  return (
    <div
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
