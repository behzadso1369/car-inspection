"use client";

import { OrderPaymentClient } from "@/components/payment/OrderPaymentClient";

export default function ClientWrapper() {
  return <OrderPaymentClient vehicleKind={1} orderImageAlt="کارشناسی خودرو" />;
}
