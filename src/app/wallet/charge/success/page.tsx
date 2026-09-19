import { pageMetadata } from "@/lib/page-metadata";
import ChargeResultClient from "../../ChargeResultClient";

export const revalidate = 0;

export const metadata = pageMetadata("/wallet/charge/success", {
  title: "شارژ موفق کیف‌پول | کارماچک",
  robots: { index: false, follow: false },
});

export default function WalletChargeSuccessPage() {
  return <ChargeResultClient success />;
}
