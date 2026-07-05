import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return pageMetadata(`/Profile/requests/${id}/inspection-report`, {
    title: "گزارش کارشناسی | کارماچک",
    robots: { index: false, follow: false },
  });
}

export default function ProfileInspectionReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
