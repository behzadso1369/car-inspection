"use client";
import dynamic from "next/dynamic";

// نقشه Map.ir/mapbox موقع import به document دست می‌زند و در SSR کرش می‌کند؛
// پس فقط سمت کلاینت لود می‌شود.
const DirectionsMap = dynamic(() => import("./DirectionsMapClient"), {
  ssr: false,
});

export default function WorkshopMap2Page(props: any) {
  return <DirectionsMap {...props} />;
}
