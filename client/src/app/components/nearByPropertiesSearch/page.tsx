// NearbyPropertiesSearch.tsx
import React, { useEffect, useState } from "react";
import apiRequest from "@/app/lib/apiRequest";
import { Property } from "@/app/models/page";

interface Coordinates {
  lat: number;
  lng: number;
}

interface NearbyPropertiesSearchProps {
  location: Coordinates | null;
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
}

const NearbyPropertiesSearch: React.FC<NearbyPropertiesSearchProps> = ({ location, setProperties }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      const fetchNearbyProperties = async () => {
        setLoading(true);
        setError(null);

        try {
          const res = await apiRequest.post("/map/getNearBy", {
            lat: location.lat,
            lng: location.lng,
          });
          setProperties(res.data); // Update the properties in the parent component
        } catch (err) {
          setError("Failed to fetch nearby properties.");
        } finally {
          setLoading(false);
        }
      };
      fetchNearbyProperties();
    }
  }, [location, setProperties]);

  if (loading) return <p>Loading nearby properties...</p>;
  if (error) return <p>{error}</p>;

  return null; // No UI is needed for this component as it updates the map markers
};

export default NearbyPropertiesSearch;
