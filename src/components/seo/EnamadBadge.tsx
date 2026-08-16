"use client";

import { useEffect, useState } from "react";

const ENAMAD_HREF =
  "https://trustseal.enamad.ir/?id=682294&Code=2SthnI2hgSdKSbpaD83fP1MtRtbLB1wD";
const ENAMAD_SRC =
  "https://trustseal.enamad.ir/logo.aspx?id=682294&Code=2SthnI2hgSdKSbpaD83fP1MtRtbLB1wD";

export function EnamadBadge() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => setShouldLoad(true), {
        timeout: 4000,
      });
    } else {
      timeoutId = setTimeout(() => setShouldLoad(true), 2500);
    }

    return () => {
      if (idleId !== undefined) {
        window.cancelIdleCallback?.(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!shouldLoad) {
    return (
      <div
        className="h-[125px] w-[125px]"
        aria-hidden="true"
      />
    );
  }

  return (
    <a
      href={ENAMAD_HREF}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="origin"
      aria-label="نماد اعتماد الکترونیکی"
    >
      {/* Enamad requires their hosted badge; load after idle so it stays off the critical path. */}
      <img
        src={ENAMAD_SRC}
        alt="نماد اعتماد الکترونیکی"
        width={125}
        height={125}
        loading="lazy"
        decoding="async"
        referrerPolicy="origin"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
