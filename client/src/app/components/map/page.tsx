"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon issue
L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Define types for coordinates
interface Coordinates {
  lat: number;
  lng: number;
}

interface MapPickerProps {
  onLocationSelect: (coordinates: Coordinates) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const container = L.DomUtil.get("map");
    if (container != null) {
      // Typecast to 'any' to bypass TypeScript error
      (container as any)._leaflet_id = null; // Reset the leaflet map ID
    }
  }, []); // Empty dependency array ensures this runs only on component mount

  // Component for handling map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setMarkerPosition({ lat, lng });
        onLocationSelect({ lat, lng });
      },
    });
    return null;
  };

  return (
    <MapContainer
      ref={mapRef}
      id="map" // Set an ID for the map container
      center={[37.7749, -122.4194]} // Default to San Francisco
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {markerPosition && (
        <Marker position={[markerPosition.lat, markerPosition.lng]} />
      )}
    </MapContainer>
  );
};

export default MapPicker;
