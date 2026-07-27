"use client"
import dynamic from "next/dynamic";

// نقشه leaflet موقع import به window دست می‌زند و در SSR کرش می‌کند؛
// پس فقط سمت کلاینت لود می‌شود.
const DirectionsMap = dynamic(() => import("./DirectionsMapClient"), {
  ssr: false,
});

export default function WorkshopMapPage(props: any) {
  return <DirectionsMap {...props} />;
}
