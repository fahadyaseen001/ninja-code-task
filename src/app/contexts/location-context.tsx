'use client'

import { createContext, useContext, useState } from 'react';
import { fetchUserLocation } from '../services/location-services';
import { Coordinates, LocationData } from '../utils/types/interfaces';

interface LocationContextType {
  location: string | null;
  coordinates: Coordinates;
  setCoordinates: (coords: Coordinates) => void;
  fetchLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null
  });

  const fetchLocation = async () => {
    try {
      const locationData: LocationData = await fetchUserLocation();
      setLocation(locationData.address);
      setCoordinates(locationData.coordinates);
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  };

  return (
    <LocationContext.Provider value={{ 
      location, 
      coordinates, 
      setCoordinates,
      fetchLocation 
    }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}