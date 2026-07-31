"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Location01Icon, Tick01Icon, MapsLocation01Icon } from "hugeicons-react";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import { extractAddressId, readStoredAddressId } from "@/helper/create-user-address";
import type { GeocodedAddress } from "@/helper/reverse-geocode";
import dynamic from "next/dynamic";
import { toast } from "sonner";

export const ON_SITE_ADDRESS_KEY = "OnSiteAddressDraft";

export interface SavedOnSiteAddress {
  AddressId: number;
  Title: string;
  City: string;
  Street: string;
  Plaque: string;
  Lat: number;
  Lng: number;
}

const OnSiteMap = dynamic(() => import("./onsite-map/page"), {
  ssr: false,
  loading: () => (
    <DialogContent
      showCloseButton={false}
      className="flex h-[100dvh] w-[100vw] max-w-[100vw] items-center justify-center border-none bg-white font-IranSans z-[200]"
    >
      <DialogTitle className="sr-only">بارگذاری نقشه</DialogTitle>
      <div className="flex flex-col items-center gap-3 text-[#416CEA]">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#416CEA]" />
        <span className="text-sm">در حال بارگذاری نقشه...</span>
      </div>
    </DialogContent>
  ),
});

interface InLocationProps {
  selectedAddressId: number | null;
  onSelectAddress: (id: number | null) => void;
  locationTypeDescription?: string;
}

function readSavedAddress(): SavedOnSiteAddress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ON_SITE_ADDRESS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedOnSiteAddress & { Id?: number };
    const addressId = parsed.AddressId ?? parsed.Id;
    if (!addressId || !Number.isFinite(addressId)) return null;
    return { ...parsed, AddressId: addressId };
  } catch {
    return null;
  }
}

function SelectedAddressCard({
  address,
  onEdit,
}: {
  address: SavedOnSiteAddress;
  onEdit: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-[#416CEA]/40 bg-gradient-to-br from-[#EEF2FD] via-white to-[#F8FAFF] p-5 shadow-[0_8px_32px_rgba(65,108,234,0.12)]">
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-l from-[#416CEA] to-[#3456bb]" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3 min-w-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#416CEA] text-white shadow-md">
            <Location01Icon size={22} />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#416CEA] px-2.5 py-0.5 text-xs font-medium text-white">
                <Tick01Icon size={14} />
                انتخاب شده
              </span>
              <span className="font-semibold text-[#101117]">{address.Title}</span>
            </div>
            <p className="text-sm leading-7 text-[#55565A]">
              {address.City}، {address.Street}
              {address.Plaque ? `، پلاک ${address.Plaque}` : ""}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={onEdit}
          className="shrink-0 rounded-xl border-[#416CEA]/30 text-[#416CEA] text-xs h-9"
        >
          ویرایش
        </Button>
      </div>
    </div>
  );
}

export default function InLocation({
  selectedAddressId,
  onSelectAddress,
  locationTypeDescription,
}: InLocationProps) {
  const [mapOpen, setMapOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAddress, setSavedAddress] = useState<SavedOnSiteAddress | null>(null);
  const [form, setForm] = useState({
    Title: "منزل",
    City: "تهران",
    Street: "",
    Plaque: "",
    Lat: 35.6892,
    Lng: 51.389,
  });

  useEffect(() => {
    const draft = readSavedAddress();
    const storedId = readStoredAddressId();
    const id = draft?.AddressId ?? storedId;
    if (id) {
      if (draft) setSavedAddress(draft);
      onSelectAddress(id);
      setForm({
        Title: draft?.Title ?? "منزل",
        City: draft?.City ?? "تهران",
        Street: draft?.Street ?? "",
        Plaque: draft?.Plaque ?? "",
        Lat: draft?.Lat ?? 35.6892,
        Lng: draft?.Lng ?? 51.389,
      });
    }
  }, [onSelectAddress]);

  const applyGeocodedAddress = (address: GeocodedAddress) => {
    setForm((prev) => ({
      ...prev,
      City: address.city || prev.City,
      Street: address.street || prev.Street,
      Plaque: address.plaque || prev.Plaque,
      Lat: address.lat,
      Lng: address.lng,
    }));
    setMapOpen(false);
  };

  const createAddress = () => {
    if (!form.Street.trim()) return;
    setSaving(true);
    instance
      .post(ApiHelper.get("CreateUserAddress"), {
        Title: form.Title,
        City: form.City,
        Street: form.Street,
        Plaque: form.Plaque,
        Lat: form.Lat,
        Lng: form.Lng,
      })
      .then((res: unknown) => {
        const addressId = extractAddressId(res);
        if (addressId == null) {
          console.error("CreateUserAddress response:", res);
          toast("Error", {
            description: "آدرس ثبت شد اما شناسه AddressId در پاسخ یافت نشد.",
          });
          return;
        }

        const saved: SavedOnSiteAddress = {
          AddressId: addressId,
          Title: form.Title,
          City: form.City,
          Street: form.Street,
          Plaque: form.Plaque,
          Lat: form.Lat,
          Lng: form.Lng,
        };

        setSavedAddress(saved);
        onSelectAddress(addressId);
        localStorage.setItem("AddressId", String(addressId));
        localStorage.setItem(ON_SITE_ADDRESS_KEY, JSON.stringify(saved));
        toast("Success", { description: "آدرس با موفقیت ثبت شد" });
      })
      .finally(() => setSaving(false));
  };

  const editAddress = () => {
    setSavedAddress(null);
    localStorage.removeItem(ON_SITE_ADDRESS_KEY);
    localStorage.removeItem("AddressId");
    onSelectAddress(null);
  };

  const hasValidSelection =
    savedAddress != null &&
    Number.isFinite(savedAddress.AddressId) &&
    selectedAddressId === savedAddress.AddressId;

  return (
    <div className="my-4 px-2">
      <div className="rounded-2xl border border-[#E8ECF4] bg-gradient-to-b from-[#F8FAFF] to-white px-4 py-3.5 mb-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FD] text-[#416CEA]">
            <Location01Icon size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-[#6B6C70]">کارشناسی در محل</p>
            <p className="mt-1 text-sm font-semibold text-[#101117]">
              {locationTypeDescription
                ? `محدوده پوشش: ${locationTypeDescription}`
                : "کارشناس به آدرس انتخابی شما اعزام می‌شود"}
            </p>
          </div>
        </div>
      </div>

      {hasValidSelection && savedAddress ? (
        <SelectedAddressCard address={savedAddress} onEdit={editAddress} />
      ) : (
        <>
          <Button
            type="button"
            variant="outline"
            onClick={() => setMapOpen(true)}
            className="h-auto w-full justify-center gap-2.5 rounded-2xl border-[#416CEA]/30 bg-gradient-to-l from-[#416CEA]/8 to-[#3456bb]/5 px-4 py-4 text-sm font-medium text-[#416CEA] shadow-[0_4px_16px_rgba(65,108,234,0.08)] mb-4"
          >
            <MapsLocation01Icon size={22} />
            <span>انتخاب آدرس روی نقشه</span>
          </Button>

          <div className="rounded-2xl border border-[#DFDFDF] p-4 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-medium text-[#101117]">ثبت آدرس محل کارشناسی</h4>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setMapOpen(true)}
                className="text-[#416CEA] text-xs h-auto py-1 px-2"
              >
                نقشه
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-[#55565A]">عنوان</Label>
                <Input
                  value={form.Title}
                  onChange={(e) => setForm({ ...form, Title: e.target.value })}
                  className="rounded-xl mt-1"
                  placeholder="منزل"
                />
              </div>
              <div>
                <Label className="text-xs text-[#55565A]">شهر</Label>
                <Input
                  value={form.City}
                  onChange={(e) => setForm({ ...form, City: e.target.value })}
                  className="rounded-xl mt-1"
                  placeholder="تهران"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-[#55565A]">خیابان و کوچه</Label>
              <Input
                value={form.Street}
                onChange={(e) => setForm({ ...form, Street: e.target.value })}
                className="rounded-xl mt-1"
                placeholder="از نقشه انتخاب کنید یا دستی وارد کنید"
              />
            </div>
            <div>
              <Label className="text-xs text-[#55565A]">پلاک</Label>
              <Input
                value={form.Plaque}
                onChange={(e) => setForm({ ...form, Plaque: e.target.value })}
                className="rounded-xl mt-1"
                placeholder="12"
              />
            </div>
            <Button
              type="button"
              disabled={saving || !form.Street.trim()}
              onClick={createAddress}
              className="w-full rounded-2xl bg-[#416CEA] text-white py-6"
            >
              {saving ? "در حال ثبت..." : "ثبت آدرس"}
            </Button>
          </div>
        </>
      )}

      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <OnSiteMap
          open={mapOpen}
          onClose={() => setMapOpen(false)}
          initialLat={form.Lat}
          initialLng={form.Lng}
          locationTypeDescription={locationTypeDescription}
          onConfirm={applyGeocodedAddress}
        />
      </Dialog>
    </div>
  );
}
