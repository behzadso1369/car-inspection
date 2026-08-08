"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapClickHandler({
  onChange,
}: {
  onChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface AddressMapPickerProps {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
}

export default function AddressMapPicker({ lat, lng, onChange }: AddressMapPickerProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => onChange(pos.coords.latitude, pos.coords.longitude),
        () => {},
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
  }, [onChange]);

  return (
    <div className="rounded-xl overflow-hidden border border-[#DFDFDF] h-48 z-0">
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        scrollWheelZoom
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={markerIcon} />
        <MapClickHandler onChange={onChange} />
      </MapContainer>
      <p className="text-xs text-[#55565A] px-2 py-1 bg-[#F8FAFF]">
        روی نقشه کلیک کنید تا موقعیت دقیق را مشخص کنید
      </p>
    </div>
  );
}
