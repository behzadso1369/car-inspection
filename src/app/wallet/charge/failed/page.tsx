import { pageMetadata } from "@/lib/page-metadata";
import ChargeResultClient from "../../ChargeResultClient";

export const revalidate = 0;

export const metadata = pageMetadata("/wallet/charge/failed", {
  title: "شارژ ناموفق کیف‌پول | کارماچک",
  robots: { index: false, follow: false },
});

export default function WalletChargeFailedPage() {
  return <ChargeResultClient success={false} />;
}
