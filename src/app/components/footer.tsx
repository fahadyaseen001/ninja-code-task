'use client'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import 'flag-icons/css/flag-icons.min.css'
import { useLocation } from '../contexts/location-context'
import { countryCoordinates } from '../data/country-data'
import { useEffect } from 'react'
import RestaurantCard from '../utils/ui/resturant-cards'
import { useLazyQuery } from '@apollo/client'
import { RestaurantInterface } from '../utils/types/interfaces'
import { restaurantList } from '../data/apollo/resturants-list-query'

export default function Footer({ showRestaurants = false }) {
  const { coordinates, setCoordinates } = useLocation();
  const [getRestaurants, { loading, error, data }] = useLazyQuery(restaurantList);

  useEffect(() => {
    if (showRestaurants && coordinates?.latitude && coordinates?.longitude) {
      getRestaurants({
        variables: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
      });
    }
  }, [coordinates, showRestaurants, getRestaurants]);

  const handleCountryClick = (countryCode: string) => {
    const country = countryCoordinates.find(c => c.code === countryCode);
    if (country) {
      setCoordinates({
        latitude: country.coordinates.latitude,
        longitude: country.coordinates.longitude,
      });
    }
  };

  return (
    <footer className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {showRestaurants ? (
        <>
          <h2 className="text-2xl font-bold mb-6 text-black">All Restaurants</h2>
          {loading ? (
            <div className="text-gray-400 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4"></div>
              <p>Loading Restaurants, please wait...</p>
            </div>
          ) : error ? (
            <p>Error loading restaurants: {error.message}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.nearByRestaurants?.restaurants.map((restaurant: RestaurantInterface) => (
                <RestaurantCard
                  key={restaurant._id}
                  restaurant={restaurant}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-black">Explore Countries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {countryCoordinates.map((country, index) => (
              <Card
                key={`${country.code}-${index}`}
                className="
                  border border-gray-200 
                  rounded-none 
                  hover:border-gray-300 
                  transition-all
                  duration-300
                  ease-in-out
                  cursor-pointer 
                  shadow-none
                  !m-0
                  hover:-translate-y-1
                  hover:shadow-md
                "
                onClick={() => handleCountryClick(country.code)}
              >
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="flex items-center gap-1">
                    <span
                      className={`fi fi-${country.code} 
                                inline-block w-3 h-3 
                                bg-contain bg-no-repeat bg-center
                                text-xs`}
                    ></span>
                    <span className="text-gray-900 text-xs">{country.name}</span>
                  </div>
                  <Button
                    icon="pi pi-chevron-right"
                    text
                    severity="secondary"
                    className="
                      !p-0 
                      text-gray-500 
                      hover:text-gray-700 
                      hover:bg-transparent 
                      text-xs
                    "
                  />
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </footer>
  );
}
