"use client";

import dynamic from "next/dynamic";
import type { OnSiteAddressMapModalProps } from "../OnSiteAddressMapModal";

const OnSiteAddressMapModal = dynamic(() => import("../OnSiteAddressMapModal"), {
  ssr: false,
});

export default function OnSiteMapPage(props: OnSiteAddressMapModalProps) {
  return <OnSiteAddressMapModal {...props} />;
}
