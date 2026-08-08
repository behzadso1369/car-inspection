"use client";
import React, { useState } from "react";
import Mapir from "mapir-react-component";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Cancel01Icon, Location01Icon } from "hugeicons-react";

const Map = Mapir.setToken({
  transformRequest: (url:any) => {
    return {
      url: url,
      headers: {
        "x-api-key": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY1YjA0NzRiNDcwNzU3Mjc1YWI1OGM2MDJkNzEzMDAzNTM1N2I0MzhjN2I0NzI2YzlmOTM0ZWM1OWI5YTUxOGFhMzk1YTIyNzU1NDYxYzExIn0.eyJhdWQiOiIzOTA3MyIsImp0aSI6IjY1YjA0NzRiNDcwNzU3Mjc1YWI1OGM2MDJkNzEzMDAzNTM1N2I0MzhjN2I0NzI2YzlmOTM0ZWM1OWI5YTUxOGFhMzk1YTIyNzU1NDYxYzExIiwiaWF0IjoxNzc2NTE5NTc3LCJuYmYiOjE3NzY1MTk1NzcsImV4cCI6MTc3OTExMTU3Nywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.OqnxVLlwjC450rJJZZ7g5ff7WZt3_14ERUGMOvdV-2RhDE3ftG6q_XXE1HG2KjpNsvMkTe23TNzwi4PAHHSaq1mo1cvERg47iJdHpjAwqmrD-bbfVRfowx6n1iPFMHCaZ2jKgDyi86rwB8DL5u_2Xf_Tv4BhR_5dy5ywDJHs0DaabmKhlvfukzNzaTznzr8SLrG1kON9vKBL5f6ynxRXDhzeubv4d_vX9Nok8dyUEs9gklAlVjfStwJfbQlq5Sb7jk-RrPj0PZ7o3D8m_W8tBkJMK9qYynAScxkFLJJF98fcgbMrF7yGLAMmb2-5nWdHPsxL9lWdylqHqa3A2kkp0w', //Mapir api key
        "Mapir-SDK": "reactjs"
      }
    };
  }
});  // Function to open navigation in various apps

const DirectionsMap = ({LocationTypeDescription, onClose}:any) => {
      const destination: [number, number] = [35.752854,51.508942];
      
      const handleNavigation = () => {
    const [lat, lng] = destination;
    
    // Detect if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile devices, use geo: URI which works on both Android and iOS
      // This will show a dialog to choose navigation app (Google Maps, Waze, Apple Maps, etc.)
      window.location.href = `geo:${lat},${lng}`;
    } else {
      // For desktop, open Google Maps in browser
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
  };

  // Function to open SMS
  const handleSMS = () => {
    // You can customize the phone number and message here
    const phoneNumber = ""; // Add phone number if needed
    const message = encodeURIComponent(`آدرس: ${LocationTypeDescription}\nمختصات: ${destination[0]}, ${destination[1]}`);
    
    if (phoneNumber) {
      window.location.href = `sms:${phoneNumber}?body=${message}`;
    } else {
      // If no phone number, just open SMS app
      window.location.href = `sms:?body=${message}`;
    }
  };
  return (
   <DialogContent showCloseButton={false} className="w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] overflow-hidden p-0 border-none bg-white font-IranSans m-0 rounded-none lg:rounded-lg lg:w-[90vw] lg:h-[90vh] lg:max-w-[1200px]">
      <DialogHeader className="px-4 pt-6 pb-2 lg:pt-4 relative">
        <Button
          onClick={onClose}
          className="absolute left-4 top-4 lg:top-2 bg-transparent hover:bg-gray-100 p-3 h-auto w-auto text-gray-600"
          variant="ghost"
        >
          <Cancel01Icon size={32} />
        </Button>
         <div className="flex my-3">
            <Location01Icon size={20}/>
            <span className="text-sm mx-2 break-words">{LocationTypeDescription}</span>
          </div>
      </DialogHeader>

   <div className="w-full h-[calc(100vh-180px)] lg:h-[650px] relative">
<div className="App">
      <Mapir  invalidateSize={true}   zoom={[15]} center={[51.508942,35.752854]} Map={Map} />
    </div>

      
      {/* Action Buttons Overlay - positioned on map */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-white shadow-[0px_4px_32px_0px_#CBD5E0] z-[1000] flex justify-between gap-3">
        <Button 
          onClick={handleNavigation}
          className="bg-[#416CEA] text-white rounded-3xl py-4 lg:py-6 px-6 lg:px-12 flex-1 text-sm lg:text-base" 
        >
          مسیریابی
        </Button>
        <Button 
          onClick={handleSMS}
          className="bg-transparent text-[#416CEA] rounded-3xl py-4 lg:py-6 px-6 lg:px-12 flex-1 border border-[#416CEA] text-sm lg:text-base" 
        >
          پیامک
        </Button>
      </div>
    </div>
    </DialogContent>
  );
};

export default DirectionsMap;