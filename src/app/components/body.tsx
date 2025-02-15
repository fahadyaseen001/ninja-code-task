"use client"

import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import { useLocation } from "../contexts/location-context"
import Script from "next/script"
import { ScanSearch } from "lucide-react"
import { MapComponent } from "../utils/ui/map"

// Declare Google Maps types
declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export const Body = () => {
  const [showRestaurants, setShowRestaurants] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [address, setAddress] = useState("")
  const { location, coordinates, fetchLocation } = useLocation()

  const handleShowRestaurants = async () => {
    try {
      await fetchLocation()
      setShowRestaurants(true)
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }

  // Update address state when location changes
  useEffect(() => {
    if (location) {
      setAddress(location)
    }
  }, [location])

  return (
    <div className="relative w-full h-[70vh]">
      {/* Google Maps Script - Updated with async loading */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA-kcU5fzpAMLYniNWH0nFBZUejg_rhKco&callback=initMap`}
        strategy="lazyOnload"
        async
      />

      {/* Map Component */}
      <MapComponent coordinates={coordinates} onHoverChange={setIsHovering} />

      {/* Gradient Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/30 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: isHovering ? 0 : 1 }}
      />

      {/* Search Bar Container */}
      <div
        className="
          absolute 
          top-1/2 
          left-1/2 
          transform 
          -translate-x-1/2 
          -translate-y-1/2 
          z-10 
          w-full 
          px-4 
          sm:px-6 
          md:px-8 
          max-w-md 
          sm:max-w-xl 
          md:max-w-4xl
        "
      >
        {/* Use flex-col on small screens, row on larger screens */}
        {/* Location Search Bar*/}

        <div className="flex flex-col sm:flex-row items-center w-full bg-white rounded-md overflow-hidden shadow-lg">
          {/* Location Icon and Input */}
          <div className="flex items-center flex-grow px-3 py-3">
            <i className="pi pi-map-marker text-gray-500 mr-2"></i>
            <InputText
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Delivery Address"
              className="w-full border-none shadow-none outline-none text-black"
              style={{ backgroundColor: "transparent" }}
            />
          </div>

          {/* Share Location Button */}
          <Button
            label="Share Location"
            icon={<ScanSearch className="h-5 w-5 mr-2" />}
            className="
              border-none 
              bg-transparent 
              text-gray-700 
              hover:bg-gray-100 
              w-full 
              sm:w-auto 
              py-3 
              px-4 
              sm:border-l 
              sm:border-gray-200
            "
            onClick={fetchLocation}
          />

          {/* Find Restaurants Button */}
          <Button
            label="Find Restaurants"
            className="
              bg-green-500 
              hover:bg-green-600 
              text-white 
              rounded-none 
              w-full 
              sm:w-auto 
              py-3 
              px-6
            "
            onClick={handleShowRestaurants}
          />
        </div>
      </div>
    </div>
  )
}

