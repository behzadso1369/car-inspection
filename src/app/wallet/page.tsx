import { pageMetadata } from "@/lib/page-metadata";
import WalletClient from "./WalletClient";

export const revalidate = 0;

export const metadata = pageMetadata("/wallet", {
  title: "کیف‌پول من | کارماچک",
  description: "مشاهده موجودی، تاریخچه تراکنش و شارژ کیف‌پول کارماچک",
  robots: { index: false, follow: false },
});

export default function WalletPage() {
  return <WalletClient />;
}
