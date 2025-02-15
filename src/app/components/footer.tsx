'use client'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import 'flag-icons/css/flag-icons.min.css'
import { useLocation } from '../contexts/location-context'
import { countryCoordinates } from '../data/country-data'

export default function Footer() {
  const { setCoordinates } = useLocation()

  const handleCountryClick = (countryCode: string) => {
    const country = countryCoordinates.find(c => c.code === countryCode)
    if (country) {
      setCoordinates({
        latitude: country.coordinates.latitude,
        longitude: country.coordinates.longitude
      })
    }
  }

  const countries = [
    { name: 'Cyprus', code: 'cy' },
    { name: 'Estonia', code: 'ee' },
    { name: 'Denmark', code: 'dk' },
    { name: 'Georgia', code: 'ge' },
    { name: 'Germany', code: 'de' },
    { name: 'Greece', code: 'gr' },
    { name: 'Cyprus', code: 'cy' },
    { name: 'Estonia', code: 'ee' },
    { name: 'Denmark', code: 'dk' },
    { name: 'Georgia', code: 'ge' },
    { name: 'Germany', code: 'de' },
    { name: 'Greece', code: 'gr' },
  ]

  return (
    <footer className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <h2 className="text-2xl font-bold mb-6 text-black">Explore Countries</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {countries.map((country, index) => (
          <Card
            key={`${country.code}-${index}`}
            className="
              border border-gray-200 
              rounded-none 
              hover:border-gray-300 
              transition-colors 
              cursor-pointer 
              shadow-none
              !m-0
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
    </footer>
  )
}