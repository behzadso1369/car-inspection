"use client";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 37.7749, lng: -122.4194 }; // default center

export default function DirectionsMap() {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const origin = { lat: 37.7749, lng: -122.4194 }; // San Francisco
    const destination = { lat: 37.3382, lng: -121.8863 }; // San Jose

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result:any, status:any) => {
        if (status === "OK") setDirections(result);
      }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
}
