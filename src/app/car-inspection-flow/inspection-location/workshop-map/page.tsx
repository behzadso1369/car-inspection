"use client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Location01Icon } from "hugeicons-react"


export default function DirectionsMap({LocationTypeDescription}:any) {



  return (
    <DialogContent className="w-screen h-screen overflow-auto max-w-none p-0 border-none bg-white font-IranSans">
      <DialogHeader className="h-8">
        <DialogTitle className="text-base text-[#101117]  py-4 font-bold">
          آدرس و ساعت مراجعه
        </DialogTitle>
         <div className="flex my-3 px-6">
            <Location01Icon size={20}/>
            <span className="text-sm mx-2">{LocationTypeDescription}</span>
          </div>
      </DialogHeader>

   <div className="w-full h-[650px]">
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
                 <div className="px-4 w-full fixed   bottom-0 bg-white   shadow-[0px_4px_32px_0px_#CBD5E0] py-5 z-50 flex justify-between">
                               
                              <Button  type="submit" className="bg-[#416CEA] text-white rounded-3xl py-6 px-12 w-2/5" >
                              مسیریابی
                         </Button>
                              <Button  type="submit" className="bg-transparent text-[#416CEA] rounded-3xl py-6 px-12 w-2/5 border border-[#416CEA]" >
                              پیامک
                         </Button>
                               
                      
                           
           
                       </div>
    </DialogContent>
  )
}
