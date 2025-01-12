"use client";
import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon issue
L.Icon.Default.mergeOptions({
  iconUrl: "/path/to/leaflet/dist/images/marker-icon.png",
  iconRetinaUrl: "/path/to/leaflet/dist/images/marker-icon-2x.png",
  shadowUrl: "/path/to/leaflet/dist/images/marker-shadow.png",
});

// Define types for coordinates
interface Coordinates {
  lat: number;
  lng: number;
}

interface MapProps {
  onMarkerClick?: (coordinates: Coordinates) => void;
  markers?: Coordinates[]; // Array of marker positions
  initialLocation: Coordinates; // Initial location for the map center
}

const MapComponent: React.FC<MapProps> = ({
  onMarkerClick,
  markers = [],
  initialLocation,
}) => {
  const mapRef = useRef<any>(null);

  // Initialize map instance and handle cleanup
  useEffect(() => {
    const container = L.DomUtil.get("map");
    if (container != null) {
      (container as any)._leaflet_id = null; // Reset the leaflet map ID
    }
    
  }, []);

  // Handle map clicks to place a marker
  const MapClickHandler = () => {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        if (onMarkerClick) {
          onMarkerClick({ lat, lng });
        }
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
      {/* Render dynamic markers passed as props */}
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]}>
          <Popup>Marker {index + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
