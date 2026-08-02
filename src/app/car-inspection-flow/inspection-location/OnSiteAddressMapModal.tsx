"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Cancel01Icon, Location01Icon } from "hugeicons-react";
import { reverseGeocode, type GeocodedAddress } from "@/helper/reverse-geocode";

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapResizeOnMount() {
  const map = useMap();
  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 150);
    return () => window.clearTimeout(id);
  }, [map]);
  return null;
}

function FlyToPosition({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], Math.max(map.getZoom(), 15), { duration: 0.6 });
  }, [lat, lng, map]);
  return null;
}

function MapClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export interface OnSiteAddressMapModalProps {
  open: boolean;
  onClose: () => void;
  initialLat: number;
  initialLng: number;
  locationTypeDescription?: string;
  onConfirm: (address: GeocodedAddress) => void;
}

export default function OnSiteAddressMapModal({
  open,
  onClose,
  initialLat,
  initialLng,
  locationTypeDescription,
  onConfirm,
}: OnSiteAddressMapModalProps) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ lat: initialLat, lng: initialLng });
  const [preview, setPreview] = useState<GeocodedAddress | null>(null);
  const [resolving, setResolving] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const geocodeRequestRef = useRef(0);
  const isBackPressedRef = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    window.history.pushState({ onSiteMapOpen: true }, "");
    const onPop = () => {
      isBackPressedRef.current = true;
      onClose();
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (!isBackPressedRef.current && window.history.state?.onSiteMapOpen) {
        window.history.back();
      }
    };
  }, [open, onClose]);

  const resolveAddress = useCallback(async (lat: number, lng: number) => {
    const requestId = ++geocodeRequestRef.current;
    setResolving(true);
    try {
      const result = await reverseGeocode(lat, lng);
      if (requestId === geocodeRequestRef.current) {
        setPreview(result);
      }
    } catch {
      if (requestId === geocodeRequestRef.current) {
        setPreview({
          city: "تهران",
          street: "",
          plaque: "",
          lat,
          lng,
        });
      }
    } finally {
      if (requestId === geocodeRequestRef.current) setResolving(false);
    }
  }, []);

  const pickLocation = useCallback(
    (lat: number, lng: number) => {
      setPosition({ lat, lng });
      setLocationError(null);
      resolveAddress(lat, lng);
    },
    [resolveAddress]
  );

  const requestUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("unsupported");
      return;
    }
    if (!window.isSecureContext) {
      setLocationError("insecure");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    const onSuccess = (pos: GeolocationPosition) => {
      pickLocation(pos.coords.latitude, pos.coords.longitude);
      setIsLocating(false);
    };

    const onError = (err: GeolocationPositionError) => {
      setIsLocating(false);
      if (err.code === err.PERMISSION_DENIED) {
        setLocationError("denied");
        return;
      }
      if (err.code === err.TIMEOUT) {
        setLocationError("timeout");
        return;
      }
      setLocationError("failed");
    };

    // اول با دقت پایین‌تر (سریع‌تر و پایدارتر روی موبایل)، بعد در صورت نیاز با دقت بالا
    navigator.geolocation.getCurrentPosition(onSuccess, (err) => {
      if (err.code === err.PERMISSION_DENIED) {
        onError(err);
        return;
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      });
    }, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000,
    });
  }, [pickLocation]);

  useEffect(() => {
    if (!open || !mounted) return;

    setPosition({ lat: initialLat, lng: initialLng });
    setLocationError(null);
    resolveAddress(initialLat, initialLng);

    // درخواست خودکار فقط اگر قبلاً اجازه داده شده باشد.
    // درخواست بدون gesture کاربر در موبایل/پروداکشن اغلب PERMISSION_DENIED می‌شود.
    let cancelled = false;
    const maybeAutoLocate = async () => {
      try {
        const permissions = navigator.permissions;
        if (!permissions?.query) return;
        const result = await permissions.query({
          name: "geolocation" as PermissionName,
        });
        if (!cancelled && result.state === "granted") {
          requestUserLocation();
        }
      } catch {
        // Permissions API در بعضی مرورگرها پشتیبانی نمی‌شود؛ دستی بماند.
      }
    };
    void maybeAutoLocate();

    return () => {
      cancelled = true;
    };
  }, [open, mounted, initialLat, initialLng, resolveAddress, requestUserLocation]);

  const locationMessage =
    locationError === "denied"
      ? "دسترسی موقعیت برای این سایت مسدود است. از تنظیمات مرورگر اجازه دهید، یا روی نقشه نقطه را انتخاب کنید."
      : locationError === "insecure"
        ? "برای موقعیت‌یابی، سایت باید با HTTPS باز شود."
        : locationError === "timeout"
          ? "دریافت موقعیت طول کشید. دوباره تلاش کنید یا روی نقشه انتخاب کنید."
          : locationError === "unsupported"
            ? "مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند. روی نقشه نقطه را انتخاب کنید."
            : locationError
              ? "دریافت موقعیت با خطا مواجه شد. روی نقشه نقطه مورد نظر را انتخاب کنید."
              : null;

  return (
    <DialogContent
      showCloseButton={false}
      className="flex max-h-[100dvh] w-[100vw] max-w-[100vw] flex-col gap-0 overflow-hidden border-none bg-white p-0 font-IranSans m-0 h-[100dvh] rounded-none lg:h-[90vh] lg:w-[90vw] lg:max-w-[1200px] lg:rounded-2xl z-[200]"
    >
      <DialogTitle className="sr-only">انتخاب آدرس روی نقشه</DialogTitle>

      <div className="relative z-20 shrink-0 border-b border-[#E8ECF4] bg-white px-4 pb-4 pt-5 lg:px-6">
        <Button
          type="button"
          onClick={onClose}
          aria-label="بستن نقشه"
          className="absolute end-3 top-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E8ECF4] bg-white p-0 text-[#55565A] shadow-sm hover:bg-[#F8FAFF]"
          variant="ghost"
        >
          <Cancel01Icon size={24} />
        </Button>

        <div className="flex items-start gap-3 pe-14">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FD] text-[#416CEA]">
            <Location01Icon size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-[#6B6C70]">انتخاب محل کارشناسی</p>
            <p className="mt-1 text-sm font-semibold text-[#101117]">
              {locationTypeDescription
                ? `محدوده: ${locationTypeDescription}`
                : "روی نقشه کلیک کنید تا آدرس پر شود"}
            </p>
          </div>
        </div>
      </div>

      <div className="relative min-h-[50vh] flex-1 overflow-hidden bg-[#F0F2F4]">
        {(isLocating || resolving) && (
          <div className="absolute top-4 left-1/2 z-[1000] -translate-x-1/2 rounded-2xl bg-white/95 px-4 py-2 text-sm text-[#416CEA] shadow-lg">
            {isLocating ? "در حال دریافت موقعیت شما..." : "در حال تشخیص آدرس..."}
          </div>
        )}

        {locationMessage && !isLocating && (
          <div className="absolute top-4 left-1/2 z-[1000] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border bg-white px-4 py-3 text-center text-sm text-[#55565A] shadow-lg pointer-events-auto">
            <p>{locationMessage}</p>
            <div className="mt-2 flex gap-2">
              {locationError !== "denied" && locationError !== "unsupported" && locationError !== "insecure" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={requestUserLocation}
                  className="h-9 flex-1 rounded-full border-[#416CEA]/30 text-[#416CEA]"
                >
                  تلاش مجدد
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocationError(null)}
                className="h-9 flex-1 rounded-full border-[#DFDFDF] text-[#55565A]"
              >
                بستن
              </Button>
            </div>
          </div>
        )}

        {mounted ? (
          <MapContainer
            center={[position.lat, position.lng]}
            zoom={15}
            className="h-full w-full min-h-[50vh]"
            style={{ height: "100%", width: "100%", minHeight: "50vh", zIndex: 0 }}
          >
            <MapResizeOnMount />
            <FlyToPosition lat={position.lat} lng={position.lng} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[position.lat, position.lng]} />
            <MapClickHandler onPick={pickLocation} />
          </MapContainer>
        ) : (
          <div className="flex h-full min-h-[50vh] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#416CEA]" />
          </div>
        )}
      </div>

      <div className="relative z-20 shrink-0 border-t border-[#E8ECF4] bg-white px-4 py-4 shadow-[0_-4px_24px_rgba(203,213,224,0.45)] lg:px-6">
        {preview && (
          <div className="mb-3 rounded-xl bg-[#F8FAFF] border border-[#E8ECF4] px-3 py-2 text-sm">
            <p className="text-[#55565A] text-xs mb-1">آدرس انتخاب‌شده</p>
            <p className="text-[#101117] font-medium">
              {preview.city}
              {preview.street ? `، ${preview.street}` : ""}
              {preview.plaque ? `، پلاک ${preview.plaque}` : ""}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={requestUserLocation}
            className="h-12 flex-1 rounded-3xl border-[#416CEA] text-[#416CEA]"
          >
            موقعیت فعلی من
          </Button>
          <Button
            type="button"
            disabled={!preview || resolving}
            onClick={() => preview && onConfirm(preview)}
            className="h-12 flex-1 rounded-3xl bg-[#416CEA] text-white"
          >
            تایید این آدرس
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
