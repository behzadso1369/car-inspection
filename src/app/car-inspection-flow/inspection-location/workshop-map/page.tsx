"use client"
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Location01Icon, Cancel01Icon } from "hugeicons-react"
import { useEffect, useState, useRef } from "react"
import L from "leaflet"

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to fit map bounds
function MapBounds({ userLocation, destination }: { userLocation: [number, number] | null, destination: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      const bounds = L.latLngBounds([userLocation, destination]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [userLocation, destination, map]);

  return null;
}

// Function to create bezier curve points
function createCurvedPath(start: [number, number], end: [number, number], numPoints: number = 50): [number, number][] {
  const points: [number, number][] = [];
  
  // Calculate control point for the curve (offset perpendicular to the line)
  const midLat = (start[0] + end[0]) / 2;
  const midLng = (start[1] + end[1]) / 2;
  
  // Calculate perpendicular offset for curve
  const dx = end[1] - start[1];
  const dy = end[0] - start[0];
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Control point offset (creates a curved arc)
  const offset = distance * 0.3; // Adjust this value to change curve intensity
  const controlLat = midLat + (offset * 0.001);
  const controlLng = midLng - (offset * 0.001);
  
  // Generate bezier curve points
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lat = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * controlLat + t * t * end[0];
    const lng = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * controlLng + t * t * end[1];
    points.push([lat, lng]);
  }
  
  return points;
}

export default function DirectionsMap({LocationTypeDescription, onClose}:any) {
   const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const destination: [number, number] = [35.752854, 51.508942];
  const center: [number, number] = userLocation || destination;
  const isBackPressedRef = useRef(false);
  
  const mapProps: any = {
    center,
    zoom: userLocation ? 12 : 15,
    className: "h-full w-full"
  };

  // Handle Android back button
  useEffect(() => {
    // Push a new state to history when component mounts
    window.history.pushState({ modalOpen: true }, '');

    const handlePopState = (event: PopStateEvent) => {
      // Mark that back button was pressed
      isBackPressedRef.current = true;
      // Close the modal
      onClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Only go back if the modal was closed by clicking close button (not back button)
      if (!isBackPressedRef.current && window.history.state?.modalOpen) {
        window.history.back();
      }
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          // If geolocation fails, just show destination
        }
      );
    }
  }, []);

  const curvedPath = userLocation ? createCurvedPath(userLocation, destination) : [];

  // Function to open navigation in various apps
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
      <MapContainer {...mapProps}>
        <TileLayer {...({ attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' } as any)} />
        <MapBounds userLocation={userLocation} destination={destination} />
        
        {/* Destination Marker */}
        <Marker position={destination}>
          <Popup>مقصد</Popup>
        </Marker>
        
        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>موقعیت شما</Popup>
          </Marker>
        )}
        
        {/* Curved Line */}
        {curvedPath.length > 0 && (
          <Polyline
            positions={curvedPath}
            pathOptions={{
              color: '#416CEA',
              weight: 4,
              opacity: 0.7
            }}
          />
        )}
      </MapContainer>
      
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
  )
}