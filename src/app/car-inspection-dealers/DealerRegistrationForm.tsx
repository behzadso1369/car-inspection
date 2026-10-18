"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MapsLocation01Icon, Tick01Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GeocodedAddress } from "@/helper/reverse-geocode";
import {
  buildDealerRegistrationBody,
  submitDealerRegistration,
  validateDealerRegistration,
} from "@/lib/dealer-registration";

const DEFAULT_LAT = 35.6892;
const DEFAULT_LNG = 51.389;

const OnSiteMap = dynamic(
  () => import("@/app/car-inspection/inspection-location/OnSiteAddressMapModal"),
  {
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
  },
);

const inputClass =
  "rounded-full border-[#DFDFDF] px-4 !py-3 text-base text-[#101117] placeholder:text-[#C0C1C5] placeholder:font-normal";

const textareaClass =
  "mt-2 w-full resize-y rounded-2xl border border-[#DFDFDF] bg-transparent px-4 py-3 text-base text-[#101117] placeholder:text-[#C0C1C5] placeholder:font-normal outline-none focus-visible:border-[#3456bb] focus-visible:ring-2 focus-visible:ring-[#3456bb]/20";

function formatGeocodedAddress(geo: GeocodedAddress): string {
  const parts = [
    geo.city,
    geo.street,
    geo.plaque ? `پلاک ${geo.plaque}` : "",
  ].filter(Boolean);
  return parts.join("، ");
}

export default function DealerRegistrationForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lng, setLng] = useState(DEFAULT_LNG);
  const [hasMapCoords, setHasMapCoords] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [website, setWebsite] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  function applyMapSelection(geo: GeocodedAddress) {
    setLat(geo.lat);
    setLng(geo.lng);
    setHasMapCoords(true);
    const formatted = formatGeocodedAddress(geo);
    if (formatted) setAddress(formatted);
    setMapOpen(false);
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.address;
      delete next.lat;
      delete next.lng;
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || successMessage) return;

    setServerError(null);
    const body = buildDealerRegistrationBody({
      phoneNumber,
      dealerName,
      agencyName,
      address: address.trim() || undefined,
      lat: hasMapCoords ? lat : undefined,
      lng: hasMapCoords ? lng : undefined,
      website,
    });

    const errors = validateDealerRegistration(body);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const { httpStatus, data } = await submitDealerRegistration(body);

      if (data.isSuccess) {
        setSuccessMessage(
          data.statusMessage ||
            "درخواست ثبت شد و پس از بررسی با شما تماس گرفته می‌شود.",
        );
        return;
      }

      let message = data.statusMessage || "ثبت درخواست انجام نشد.";
      if (httpStatus === 429 && typeof data.resultObject === "string") {
        message = `${message} ${data.resultObject}`;
      }
      setServerError(message);
    } catch {
      setServerError(
        "ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی و دوباره تلاش کنید.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (successMessage) {
    return (
      <div
        role="status"
        className="rounded-[1.75rem] border border-[#C7E7D4] bg-gradient-to-l from-[#EEFBF3] to-white p-6 sm:p-8"
      >
        <p className="text-lg font-black text-[#101117]">درخواست شما ثبت شد</p>
        <p className="mt-3 text-sm leading-8 text-[#55565A] sm:text-base">
          {successMessage}
        </p>
        <p className="mt-3 text-sm leading-8 text-[#55565A]">
          تا زمان تأیید توسط کارماچک، لینک ورود به پرتال نمایشگاه فعال
          نمی‌شود. پس از تأیید، با همین شماره موبایل از طریق OTP وارد{" "}
          <span dir="ltr" className="font-medium text-[#3456bb]">
            dealer.carmacheck.com
          </span>{" "}
          می‌شوید.
        </p>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 shadow-[0_8px_24px_rgba(16,17,23,0.04)] sm:p-7"
        aria-labelledby="dealer-form-title"
      >
        <h2
          id="dealer-form-title"
          className="text-xl font-black leading-9 text-[#101117] sm:text-[1.35rem]"
        >
          فرم ثبت‌نام نمایشگاه
        </h2>
        <p className="mt-2 text-sm leading-8 text-[#55565A]">
          پس از ارسال، درخواست در صف بررسی قرار می‌گیرد. نمایشگاه و حساب کاربری
          فقط بعد از تأیید ادمین ساخته می‌شود.
        </p>

        {serverError ? (
          <p
            role="alert"
            className="mt-4 rounded-2xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm leading-7 text-[#991B1B]"
          >
            {serverError}
          </p>
        ) : null}

        <div className="mt-6 space-y-5">
          <div>
            <Label htmlFor="dealer-phone" className="text-sm text-[#101117]">
              شماره موبایل مالک <span className="text-[#3456bb]">*</span>
            </Label>
            <Input
              id="dealer-phone"
              name="phoneNumber"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              className={`mt-2 ${inputClass}`}
              placeholder="مثال: 09121234567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              aria-invalid={!!fieldErrors.phoneNumber}
              aria-describedby={
                fieldErrors.phoneNumber ? "dealer-phone-error" : undefined
              }
              disabled={submitting}
            />
            {fieldErrors.phoneNumber ? (
              <p id="dealer-phone-error" className="mt-1 text-xs text-[#B91C1C]">
                {fieldErrors.phoneNumber}
              </p>
            ) : (
              <p className="mt-1 text-xs text-[#55565A]">
                ورود بعدی به پرتال با OTP همین شماره است.
              </p>
            )}
          </div>

          <fieldset className="space-y-5 border-0 p-0">
            <legend className="text-sm text-[#101117]">
              نام نمایشگاه یا نام نمایندگی{" "}
              <span className="text-[#3456bb]">*</span>
              <span className="mt-1 block text-xs font-normal text-[#55565A]">
                حداقل یکی از دو فیلد زیر را پر کنید.
              </span>
            </legend>

            <div>
              <Label htmlFor="dealer-name" className="text-sm text-[#55565A]">
                نام نمایشگاه
              </Label>
              <Input
                id="dealer-name"
                name="dealerName"
                className={`mt-2 ${inputClass}`}
                placeholder="مثال: نمایشگاه پارس خودرو"
                maxLength={120}
                value={dealerName}
                onChange={(e) => setDealerName(e.target.value)}
                aria-invalid={!!fieldErrors.dealerName}
                disabled={submitting}
              />
              {fieldErrors.dealerName ? (
                <p className="mt-1 text-xs text-[#B91C1C]">
                  {fieldErrors.dealerName}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor="agency-name" className="text-sm text-[#55565A]">
                نام نمایندگی
              </Label>
              <Input
                id="agency-name"
                name="agencyName"
                className={`mt-2 ${inputClass}`}
                placeholder="مثال: نمایندگی ایران‌خودرو منطقه ۳"
                maxLength={120}
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                aria-invalid={!!fieldErrors.agencyName}
                disabled={submitting}
              />
              {fieldErrors.agencyName ? (
                <p className="mt-1 text-xs text-[#B91C1C]">
                  {fieldErrors.agencyName}
                </p>
              ) : null}
            </div>
          </fieldset>

          <div>
            <Label className="text-sm text-[#101117]">موقعیت و آدرس نمایشگاه</Label>
            <p className="mt-1 text-xs leading-6 text-[#55565A]">
              مثل مرحله «کارشناسی در محل»، موقعیت را روی نقشه انتخاب کنید یا
              آدرس را دستی بنویسید. حداقل یکی از این دو لازم است.
            </p>

            {hasMapCoords ? (
              <div className="relative mt-3 overflow-hidden rounded-2xl border-2 border-[#416CEA]/40 bg-gradient-to-br from-[#EEF2FD] via-white to-[#F8FAFF] p-4">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-l from-[#416CEA] to-[#3456bb]" />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#416CEA] px-2.5 py-0.5 text-xs font-medium text-white">
                      <Tick01Icon size={14} />
                      موقعیت روی نقشه
                    </span>
                    {address ? (
                      <p className="mt-2 text-sm leading-7 text-[#55565A]">
                        {address}
                      </p>
                    ) : null}
                    <p className="mt-1 text-xs text-[#6B6C70]" dir="ltr">
                      {lat.toFixed(6)}, {lng.toFixed(6)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setMapOpen(true)}
                    className="shrink-0 rounded-xl border-[#416CEA]/30 text-xs text-[#416CEA] h-9"
                    disabled={submitting}
                  >
                    ویرایش روی نقشه
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => setMapOpen(true)}
                disabled={submitting}
                className="mt-3 h-auto w-full justify-center gap-2.5 rounded-2xl border-[#416CEA]/30 bg-gradient-to-l from-[#416CEA]/8 to-[#3456bb]/5 px-4 py-4 text-sm font-medium text-[#416CEA] shadow-[0_4px_16px_rgba(65,108,234,0.08)]"
              >
                <MapsLocation01Icon size={22} />
                <span>انتخاب موقعیت روی نقشه</span>
              </Button>
            )}

            <Label htmlFor="dealer-address" className="mt-4 block text-sm text-[#55565A]">
              آدرس متنی (قابل ویرایش)
            </Label>
            <textarea
              id="dealer-address"
              name="address"
              rows={3}
              maxLength={500}
              className={textareaClass}
              placeholder="مثال: تهران، خیابان …"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-invalid={!!fieldErrors.address}
              disabled={submitting}
            />
            {fieldErrors.address ? (
              <p className="mt-1 text-xs text-[#B91C1C]">{fieldErrors.address}</p>
            ) : null}
            {(fieldErrors.lat || fieldErrors.lng) && (
              <p className="mt-1 text-xs text-[#B91C1C]">
                {fieldErrors.lat || fieldErrors.lng}
              </p>
            )}
          </div>

          <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
            <label htmlFor="dealer-website">Website</label>
            <input
              id="dealer-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="h-auto w-full rounded-full bg-[#3456bb] py-3.5 text-base font-bold text-white hover:bg-[#2c4aa0] disabled:opacity-60"
          >
            {submitting ? "در حال ارسال…" : "ارسال درخواست ثبت‌نام"}
          </Button>
        </div>
      </form>

      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <OnSiteMap
          open={mapOpen}
          onClose={() => setMapOpen(false)}
          initialLat={lat}
          initialLng={lng}
          locationTypeDescription="موقعیت نمایشگاه"
          enforceTehranBounds={false}
          onConfirm={applyMapSelection}
        />
      </Dialog>
    </>
  );
}
