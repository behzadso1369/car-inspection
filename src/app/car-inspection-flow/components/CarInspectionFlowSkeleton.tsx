"use client";

import { Skeleton } from "@/components/ui/skeleton";

function StepHeaderSkeleton() {
  return (
    <div className="px-4 py-3 flex justify-between items-center shadow-[0px_6px_20px_-2px_#10182814] lg:shadow-none">
      <Skeleton className="h-6 w-6 rounded-full" />
      <Skeleton className="h-10 w-[120px] rounded-xl" />
      <Skeleton className="h-8 w-24 rounded-full" />
    </div>
  );
}

function StepCardSkeleton() {
  return (
    <div className="mx-4 mt-6 rounded-3xl border border-[#E8ECF4] bg-white px-4 py-6 shadow-[8px_4px_24px_0px_#EAEAEA40]">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-16 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-40 rounded-lg" />
          <Skeleton className="h-3 w-28 rounded-lg" />
        </div>
      </div>
      <Skeleton className="mt-5 h-3 w-16 rounded-lg" />
      <Skeleton className="mt-2 h-12 w-full rounded-full" />
    </div>
  );
}

function ContentCardsSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="space-y-4 px-4 pb-28 pt-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-[#E8ECF4] bg-white shadow-[0_6px_20px_rgba(16,17,23,0.05)]"
        >
          <div className="space-y-3 border-b border-[#E8ECF4] px-4 py-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-32 rounded-lg" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((__, pillIndex) => (
                <Skeleton key={pillIndex} className="h-10 rounded-full" />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between bg-gradient-to-b from-[#F8FAFF] to-[#EEF2FD] px-4 py-4">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-4 w-28 rounded-lg" />
              <Skeleton className="h-7 w-36 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FooterSkeleton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-between bg-white px-4 py-5 shadow-[0px_4px_32px_0px_#CBD5E0] lg:static lg:mt-8 lg:shadow-none">
      <Skeleton className="h-12 w-36 rounded-3xl" />
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-3 w-20 rounded-lg" />
        <Skeleton className="h-6 w-28 rounded-lg" />
      </div>
    </div>
  );
}

function LandingSkeleton() {
  return (
    <div className="pb-8">
      <div className="px-4 w-full lg:w-2/5 lg:mx-24 lg:py-10">
        <div className="my-6 rounded-3xl border border-[#DCDCDC] bg-white px-4 py-6 shadow-[8px_4px_24px_0px_#EAEAEA40]">
          <Skeleton className="h-6 w-40 rounded-lg" />
          <Skeleton className="mt-3 h-4 w-full max-w-md rounded-lg" />
          <div className="mt-5 flex items-center gap-4">
            <Skeleton className="h-8 w-16 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48 rounded-lg" />
              <Skeleton className="h-3 w-36 rounded-lg" />
            </div>
          </div>
          <Skeleton className="mt-5 h-3 w-16 rounded-lg" />
          <Skeleton className="mt-2 h-11 w-full rounded-full" />
          <Skeleton className="mt-4 h-11 w-full rounded-3xl" />
        </div>
      </div>
      <div className="mt-20 px-4 lg:px-24">
        <Skeleton className="mx-auto h-6 w-56 rounded-lg" />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-36 rounded-3xl" />
          <Skeleton className="h-36 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export function CarInspectionFlowSkeleton({
  variant = "step",
}: {
  variant?: "step" | "landing";
}) {
  if (variant === "landing") {
    return <LandingSkeleton />;
  }

  return (
    <div className="min-h-[70vh] bg-white font-IranSans">
      <StepCardSkeleton />
      <ContentCardsSkeleton count={2} />
      <FooterSkeleton />
    </div>
  );
}

export function CarInspectionFlowHeaderSkeleton() {
  return <StepHeaderSkeleton />;
}
