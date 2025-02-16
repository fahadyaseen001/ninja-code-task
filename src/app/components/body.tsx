'use client'

import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import { useLocation } from "@/app/contexts/location-context"
import Script from "next/script"
import { ScanSearch } from "lucide-react"
import { MapComponent } from "@/app/utils/ui/map"
import ContextLoader from "@/app/utils/ui/context-loader"
import Footer from "@/app/components/footer"

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
  const [isLoading, setIsLoading] = useState(false)


  const handleShowRestaurants = async () => {
    try {
      setIsLoading(true)
      await fetchLocation()
      setShowRestaurants(true)
    } catch (error) {
      console.error("Error fetching location:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (location) {
      setAddress(location)
    }
  }, [location])

  return (
    <>
      <div className="relative w-full h-[70vh]">
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`}
          strategy="lazyOnload"
          async
        />

        <MapComponent coordinates={coordinates} onHoverChange={setIsHovering} />

        <div
          className="absolute top-0 left-0 w-full h-full bg-black/30 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: isHovering ? 0 : 1 }}
        />

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
          {isLoading ? (
            <ContextLoader />
          ) : (
            <div className="flex flex-col sm:flex-row items-center w-full bg-white rounded-md overflow-hidden shadow-lg">
              <div className="flex items-center flex-grow px-3 py-3">
                <i className={`pi pi-map-marker ${location ? 'text-green-500' : 'text-gray-500'} mr-2`}></i>
                <InputText 
                  data-testid="address-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Delivery Address"
                  className="w-full border-none shadow-none outline-none text-black"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>

              <Button
                 data-testid="share-location-btn"
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

              <Button
                data-testid="find-restaurants-btn"
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
          )}
        </div>
      </div>
      <Footer showRestaurants={showRestaurants} />
    </>
  )
}