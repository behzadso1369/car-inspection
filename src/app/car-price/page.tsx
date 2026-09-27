"use client";

import { Suspense } from "react";
import CarPriceForm from "@/components/car-price/CarPriceForm";

export default function CarPricePage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F3F5F8]" dir="rtl" />}>
      <CarPriceForm />
    </Suspense>
  );
}
