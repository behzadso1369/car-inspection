"use client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


export default function DirectionsMap() {



  return (
    <DialogContent className="w-screen h-screen overflow-auto max-w-none p-0 border-none bg-white font-IranSans">
      <DialogHeader>
        <DialogTitle className="text-base text-[#101117] font-medium">
          آدرس و ساعت مراجعه
        </DialogTitle>
      </DialogHeader>-+

   <div className="w-full h-[500px]">
      <MapContainer  center={[35.753436, 51.509858]} zoom={600} className="h-full w-full">
        <TileLayer
        marker
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[37.7749, -122.4194]}>
          <Popup>San Francisco</Popup>
        </Marker>
      </MapContainer>
    </div>
    </DialogContent>
  )
}
