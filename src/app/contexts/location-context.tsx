"use client"

import React, { createContext, useState, useContext, useCallback } from "react";
import { Coordinates } from "@/app/utils/types/type";
import { fetchUserLocation } from "@/app/services/location-services";

interface LocationContextType {
  location: string;
  coordinates: Coordinates;
  fetchLocation: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

// Create the context with a more specific type
const LocationContext = createContext<LocationContextType | null>(null);

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const locationData = await fetchUserLocation();
      setLocation(locationData.address);
      setCoordinates(locationData.coordinates);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <LocationContext.Provider 
      value={{ 
        location, 
        coordinates, 
        fetchLocation, 
        isLoading, 
        error 
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the location context with proper type checking
export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};