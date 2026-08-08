"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Cancel01Icon, Location01Icon } from "hugeicons-react";
import { reverseGeocode, type GeocodedAddress } from "@/helper/reverse-geocode";

/** میدان رسالت — مرکز پیش‌فرض و نقطه بازگشت هنگام خروج از محدوده سرویس */
const RESALAT_SQUARE = { lat: 35.752854, lng: 51.508942 };

/** محدوده تقریبی شهر تهران */
const TEHRAN_BOUNDS = {
  minLat: 35.56, // south
  maxLat: 35.82, // north
  minLng: 51.09, // west
  maxLng: 51.61, // east
};

function isInsideTehran(lat: number, lng: number): boolean {
  return (
    lat >= TEHRAN_BOUNDS.minLat &&
    lat <= TEHRAN_BOUNDS.maxLat &&
    lng >= TEHRAN_BOUNDS.minLng &&
    lng <= TEHRAN_BOUNDS.maxLng
  );
}

function MapResizeOnMount() {
  const map = useMap();
  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 150);
    return () => window.clearTimeout(id);
  }, [map]);
  return null;
}

/** پرواز برنامه‌ای به موقعیت (مثلاً موقعیت فعلی کاربر) — نه بعد از درگ کاربر */
function FlyToTarget({
  target,
}: {
  target: { lat: number; lng: number; key: number } | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 15), {
      duration: 0.6,
    });
  }, [target, map]);
  return null;
}

/** با هر جابه‌جایی نقشه، مرکز ویوپورت به‌عنوان نقطه انتخاب ثبت می‌شود */
function MapCenterTracker({
  onCenterChange,
}: {
  onCenterChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    moveend(e) {
      const center = e.target.getCenter();
      onCenterChange(center.lat, center.lng);
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
  const [flyTarget, setFlyTarget] = useState<{
    lat: number;
    lng: number;
    key: number;
  } | null>(null);
  const [preview, setPreview] = useState<GeocodedAddress | null>(null);
  const [resolving, setResolving] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const geocodeRequestRef = useRef(0);
  const isBackPressedRef = useRef(false);
  const lastGeocodedRef = useRef({ lat: initialLat, lng: initialLng });
  const redirectingOutOfServiceRef = useRef(false);
  const lastOutOfServiceToastAtRef = useRef(0);

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

  const showOutOfServiceToast = useCallback(() => {
    const now = Date.now();
    if (now - lastOutOfServiceToastAtRef.current < 2500) return;
    lastOutOfServiceToastAtRef.current = now;
    toast.error("محدوده مورد نظر خارج از سرویس دهی است", {
      duration: 5000,
      style: {
        fontSize: "17px",
        fontWeight: 700,
        padding: "18px 22px",
        minWidth: "min(92vw, 420px)",
        lineHeight: 1.6,
        textAlign: "center",
      },
      className: "font-IranSans",
    });
  }, []);

  const resolveAddress = useCallback(async (lat: number, lng: number) => {
    const requestId = ++geocodeRequestRef.current;
    lastGeocodedRef.current = { lat, lng };
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

  const flyToLocation = useCallback(
    (lat: number, lng: number) => {
      if (!isInsideTehran(lat, lng)) {
        showOutOfServiceToast();
        redirectingOutOfServiceRef.current = true;
        setPosition(RESALAT_SQUARE);
        setLocationError(null);
        setFlyTarget({ ...RESALAT_SQUARE, key: Date.now() });
        resolveAddress(RESALAT_SQUARE.lat, RESALAT_SQUARE.lng);
        window.setTimeout(() => {
          redirectingOutOfServiceRef.current = false;
        }, 900);
        return;
      }

      setPosition({ lat, lng });
      setLocationError(null);
      setFlyTarget({ lat, lng, key: Date.now() });
      resolveAddress(lat, lng);
    },
    [resolveAddress, showOutOfServiceToast]
  );

  const syncCenter = useCallback(
    (lat: number, lng: number) => {
      if (redirectingOutOfServiceRef.current) return;

      if (!isInsideTehran(lat, lng)) {
        showOutOfServiceToast();
        redirectingOutOfServiceRef.current = true;
        setPosition(RESALAT_SQUARE);
        setLocationError(null);
        setFlyTarget({ ...RESALAT_SQUARE, key: Date.now() });
        resolveAddress(RESALAT_SQUARE.lat, RESALAT_SQUARE.lng);
        window.setTimeout(() => {
          redirectingOutOfServiceRef.current = false;
        }, 900);
        return;
      }

      setPosition({ lat, lng });
      setLocationError(null);
      const prev = lastGeocodedRef.current;
      // جلوگیری از درخواست تکراری وقتی مرکز تقریباً ثابت مانده
      if (
        Math.abs(prev.lat - lat) < 0.00001 &&
        Math.abs(prev.lng - lng) < 0.00001
      ) {
        return;
      }
      resolveAddress(lat, lng);
    },
    [resolveAddress, showOutOfServiceToast]
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
      flyToLocation(pos.coords.latitude, pos.coords.longitude);
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
  }, [flyToLocation]);

  useEffect(() => {
    if (!open || !mounted) return;

    const startLat = isInsideTehran(initialLat, initialLng)
      ? initialLat
      : RESALAT_SQUARE.lat;
    const startLng = isInsideTehran(initialLat, initialLng)
      ? initialLng
      : RESALAT_SQUARE.lng;

    setPosition({ lat: startLat, lng: startLng });
    setFlyTarget({ lat: startLat, lng: startLng, key: Date.now() });
    setLocationError(null);
    resolveAddress(startLat, startLng);

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
      ? "دسترسی موقعیت برای این سایت مسدود است. از تنظیمات مرورگر اجازه دهید، یا نقشه را جابه‌جا کنید."
      : locationError === "insecure"
        ? "برای موقعیت‌یابی، سایت باید با HTTPS باز شود."
        : locationError === "timeout"
          ? "دریافت موقعیت طول کشید. دوباره تلاش کنید یا نقشه را جابه‌جا کنید."
          : locationError === "unsupported"
            ? "مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند. نقشه را جابه‌جا کنید تا نقطه در مرکز قرار گیرد."
            : locationError
              ? "دریافت موقعیت با خطا مواجه شد. نقشه را جابه‌جا کنید تا نقطه در مرکز قرار گیرد."
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
                : "نقشه را جابه‌جا کنید تا نقطه در مرکز قرار گیرد"}
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
          <>
            <MapContainer
              center={[position.lat, position.lng]}
              zoom={15}
              className="h-full w-full min-h-[50vh]"
              style={{ height: "100%", width: "100%", minHeight: "50vh", zIndex: 0 }}
            >
              <MapResizeOnMount />
              <FlyToTarget target={flyTarget} />
              <MapCenterTracker onCenterChange={syncCenter} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
            {/* پین ثابت در مرکز نقشه — با درگ نقشه، نقطه انتخاب همان مرکز است */}
            <div
              className="pointer-events-none absolute inset-0 z-[500] flex items-center justify-center"
              aria-hidden
            >
              <div className="-translate-y-1/2 drop-shadow-lg">
                <svg
                  width="36"
                  height="48"
                  viewBox="0 0 36 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z"
                    fill="#416CEA"
                  />
                  <circle cx="18" cy="18" r="7" fill="white" />
                </svg>
              </div>
            </div>
          </>
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
            onClick={() =>
              preview &&
              onConfirm({
                ...preview,
                lat: position.lat,
                lng: position.lng,
              })
            }
            className="h-12 flex-1 rounded-3xl bg-[#416CEA] text-white"
          >
            تایید این آدرس
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
