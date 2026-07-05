import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return pageMetadata(`/Profile/requests/${id}`, {
    title: "جزئیات درخواست | کارماچک",
    robots: { index: false, follow: false },
  });
}

export default function ProfileRequestDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
