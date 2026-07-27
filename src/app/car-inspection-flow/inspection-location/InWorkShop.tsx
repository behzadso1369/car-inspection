"use client";
import { Dialog } from "@/components/ui/dialog";
import { Location01Icon, MapsLocation01Icon } from "hugeicons-react";
import { useState } from "react";
import dynamic from "next/dynamic";
const DirectionsMap = dynamic(() => import("./workshop-map/page"), { ssr: false });
import { Button } from "@/components/ui/button";

type UserLocation = [number, number];

export default function InWorkShop({ LocationTypeDescription }: any) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestUserLocation = () => {
    if (typeof window === "undefined") return;

    if (!window.isSecureContext) {
      setLocationError("insecure");
      setIsLocating(false);
      return;
    }

    if (!navigator.geolocation) {
      setLocationError("unsupported");
      setIsLocating(false);
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        setLocationError(error.code === error.PERMISSION_DENIED ? "denied" : "failed");
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleOpenMap = () => {
    setOpenModal(true);
    requestUserLocation();
  };

  const handleOpenChange = (open: boolean) => {
    setOpenModal(open);
    if (!open) {
      setUserLocation(null);
      setIsLocating(false);
      setLocationError(null);
    }
  };

  return (
    <div className="my-4">
      <div className="flex my-3">
        <Location01Icon size={20} />
        <span className="text-sm mx-2">{LocationTypeDescription}</span>
      </div>
      <div className="my-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleOpenMap}
          className="h-auto w-full justify-center gap-2.5 rounded-2xl border-[#416CEA]/30 bg-gradient-to-l from-[#416CEA]/8 to-[#3456bb]/5 px-4 py-3 text-sm font-medium text-[#416CEA] shadow-[0_4px_16px_rgba(65,108,234,0.08)] transition-all hover:border-[#416CEA]/50 hover:bg-[#416CEA]/10 hover:text-[#3456bb] hover:shadow-[0_6px_20px_rgba(65,108,234,0.14)]"
        >
          <MapsLocation01Icon size={20} />
          <span>مشاهده آدرس روی نقشه</span>
        </Button>
      </div>
      <Dialog open={openModal} onOpenChange={handleOpenChange}>
        <DirectionsMap
          LocationTypeDescription={LocationTypeDescription}
          onClose={() => handleOpenChange(false)}
          userLocation={userLocation}
          isLocating={isLocating}
          locationError={locationError}
          onRetryLocation={requestUserLocation}
        />
      </Dialog>
    </div>
  );
}
