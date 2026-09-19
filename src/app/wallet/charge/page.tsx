import { pageMetadata } from "@/lib/page-metadata";
import ChargeClient from "./ChargeClient";

export const revalidate = 0;

export const metadata = pageMetadata("/wallet/charge", {
  title: "شارژ کیف‌پول | کارماچک",
  description: "انتخاب پلن و شارژ کیف‌پول کارماچک",
  robots: { index: false, follow: false },
});

export default function WalletChargePage() {
  return <ChargeClient />;
}
