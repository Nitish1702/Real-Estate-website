"use client";

import React, { useState, useEffect } from "react";
import { Property } from "@/app/models/page"; // Assuming Property type is defined
import MapComponent from "../mapComponent/page"; // Import the MapComponent
import NearbyPropertiesSearch from "../nearByPropertiesSearch/page";

// Define types for coordinates
interface Coordinates {
  lat: number;
  lng: number;
}

const MapSearch: React.FC = () => {
  const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(null);
  const [nearByProperties, setNearByProperties] = useState<Property[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    // Get current location of the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Fallback to default location if geolocation fails
          setCurrentLocation({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Fallback to default location if geolocation is not available
      setCurrentLocation({ lat: 37.7749, lng: -122.4194 });
    }
  }, []);

  const handleMarkerClick = (coordinates: Coordinates) => {
    setMarkerPosition(coordinates); // Update the marker position on map click
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Map Component with dynamic markers */}
      {currentLocation && (
        <MapComponent
          onMarkerClick={handleMarkerClick}
          markers={markerPosition ? [markerPosition] : []}
          initialLocation={currentLocation} // Pass the current location to MapComponent
        />
      )}
    </div>
  );
};

export default MapSearch;
