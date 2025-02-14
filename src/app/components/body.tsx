"use client"

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "../contexts/location-context";
import Script from "next/script";
import { ScanSearch } from "lucide-react";


// Declare Google Maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const Main = () => {
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [address, setAddress] = useState("");
  const { location, coordinates, fetchLocation } = useLocation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  const handleShowRestaurants = async () => {
    try {
      await fetchLocation();
      setShowRestaurants(true);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Update address state when location changes
  useEffect(() => {
    if (location) {
      setAddress(location);
    }
  }, [location]);

  // Initialize Google Maps
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Define the initMap function that Google Maps will call
    window.initMap = () => {
      if (!mapContainerRef.current || !window.google) return;
      
      // Default center (can be changed when user shares location)
      const center = coordinates.latitude && coordinates.longitude
        ? { lat: coordinates.latitude, lng: coordinates.longitude }
        : { lat: 40.7128, lng: -74.0060 }; // Default to NYC
      
      // Create the map instance
      mapInstanceRef.current = new window.google.maps.Map(mapContainerRef.current, {
        center,
        zoom: 13,
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true
      });
    };

    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      window.initMap();
    }
  }, [coordinates]);

  return (
    <div className="relative w-full h-screen">
      {/* Google Maps Script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA-kcU5fzpAMLYniNWH0nFBZUejg_rhKco&callback=initMap`}
        strategy="lazyOnload"
      />

      {/* Map Container */}
      <div 
        ref={mapContainerRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-black/30 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: isHovering ? 0 : 1 }}
        />
      </div>

      {/* Search Bar Container - Centered */}
      <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-4xl px-4">
        <div className="flex items-center w-full bg-white rounded-md overflow-hidden shadow-lg">
          {/* Location Icon and Input */}
          <div className="flex items-center flex-grow px-3">
            <i className="pi pi-map-marker text-gray-500 mr-2"></i>
            <InputText
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Delivery Address"
              className="w-full border-none shadow-none outline-none py-3 text-black"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
          
          <Button
            label="Share Location"
            icon={<ScanSearch className="h-5 w-5 mr-2" />}
            className="border-none bg-transparent text-gray-700 px-4 hover:bg-gray-100"
            onClick={fetchLocation}
          />
          
          {/* Find Restaurants Button */}
          <Button
            label="Find Restaurants"
            className="bg-green-500 hover:bg-green-600 text-white rounded-none px-6 py-3 h-full"
            onClick={handleShowRestaurants}
          />
        </div>
      </div>
    </div>
  );
};