'use client'

import { useEffect, useRef, useState } from "react";
import MapLoader from "@/app/utils/ui/map-loader";
import { MapComponentProps } from "@/app/utils/types/interfaces";


export const MapComponent = ({ coordinates, onHoverChange }: MapComponentProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRepositioning, setIsRepositioning] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initMap = () => {
      if (!mapContainerRef.current || !window.google) return;

      const center =
        coordinates.latitude && coordinates.longitude
          ? { lat: coordinates.latitude, lng: coordinates.longitude }
          : { lat: 40.7128, lng: -74.006 };

      mapInstanceRef.current = new window.google.maps.Map(mapContainerRef.current, {
        center,
        zoom: 13,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_LEFT,
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE],
        },
        streetViewControl: true,
        fullscreenControl: true,
        restriction: {
          latLngBounds: {
            north: 85,
            south: -85,
            west: -180,
            east: 180,
          },
          strictBounds: true,
        },
      });

      setIsLoading(false);
    };

    if (window.google?.maps) {
      initMap();
    } else {
      window.initMap = initMap;
    }

    return () => {
      if (mapInstanceRef.current) {
        // Cleanup if necessary
      }
    };
  }, []);

  // Handle coordinate changes
  useEffect(() => {
    if (mapInstanceRef.current && coordinates.latitude && coordinates.longitude) {
      setIsRepositioning(true);
      
      const newCenter = { 
        lat: coordinates.latitude, 
        lng: coordinates.longitude 
      };

      mapInstanceRef.current.panTo(newCenter);
      
      // Add a listener for the end of the pan animation
      const listener = mapInstanceRef.current.addListener('idle', () => {
        setIsRepositioning(false);
        // Remove the listener after it fires
        google.maps.event.removeListener(listener);
      });
    }
  }, [coordinates]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainerRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
      />
      {(isLoading || isRepositioning) && <MapLoader />}
    </div>
  );
};