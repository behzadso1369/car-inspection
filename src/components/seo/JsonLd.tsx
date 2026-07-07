import React from "react";

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/**
 * تزریق داده‌ی ساختاریافته (JSON-LD) به صفحه.
 * می‌تواند یک اسکیمای واحد یا آرایه‌ای از اسکیماها را بگیرد.
 */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
