'use client'

import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Rating } from "primereact/rating"
import { useState } from "react"
import { RestaurantCardProps } from "../types/interfaces"

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [favorite, setFavorite] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  const header = (
    <div className="relative w-full overflow-hidden">
      <img
        alt={restaurant.name}
        src={restaurant.image || "/placeholder.svg"}
        className="w-full h-[120px] xs:h-[150px] sm:h-[200px] md:h-[180px] lg:h-[200px] 
                   object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
      />
      {/* Status Badge */}
      <div className={`absolute top-2 right-12 sm:right-14 px-2 py-0.5 sm:py-1 
                       rounded-full text-[10px] xs:text-xs font-medium 
                       ${restaurant.isAvailable 
                         ? 'bg-green-100 text-green-800' 
                         : 'bg-red-100 text-red-800'
                       }`}>
        {restaurant.isAvailable ? 'Open' : 'Closed'}
      </div>
      {/* Delivery Time Badge */}
      <div className="absolute top-2 left-2 sm:left-4 bg-white 
                      px-2 py-0.5 sm:py-1 rounded-full 
                      text-[10px] xs:text-xs sm:text-sm font-medium">
        {restaurant.deliveryTime} MIN
      </div>
      {/* Favorite Button */}
      <Button
        icon={favorite ? "pi pi-heart-fill" : "pi pi-heart"}
        onClick={() => setFavorite(!favorite)}
        className="p-button-rounded p-button-text absolute top-2 right-2 
                   scale-75 sm:scale-100 transition-transform duration-200 
                   hover:scale-110 active:scale-95"
        style={{
          backgroundColor: "white",
          color: favorite ? "#ff4b4b" : "black",
          width: "1.5rem",
          height: "1.5rem",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          borderRadius: "50%",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
        aria-label="Favorite"
      />
    </div>
  )

  const body = (
    <div className="px-2 sm:px-4 py-2 sm:py-3">
      {/* Address */}
      <div className="flex items-start gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <i className="pi pi-map-marker mt-1 text-xs sm:text-sm text-gray-500"></i>
        <span className="text-xs sm:text-sm text-gray-600 line-clamp-2">{restaurant.address}</span>
      </div>

      {/* Categories */}
      <div className="mb-2 sm:mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs sm:text-sm font-medium text-gray-700">Categories</span>
          <Button
            icon={`pi pi-chevron-${showCategories ? 'up' : 'down'}`}
            onClick={() => setShowCategories(!showCategories)}
            className="p-button-text p-button-sm !p-0 scale-75 sm:scale-100"
            style={{ color: '#666' }}
          />
        </div>
        <div className={`flex flex-wrap gap-1 
                        ${showCategories ? '' : 'line-clamp-1'} 
                        transition-all duration-300`}>
          {restaurant.categories.map(category => (
            <span 
              key={category._id}
              className="bg-gray-100 text-gray-700 
                       px-1.5 sm:px-2 py-0.5 sm:py-1 
                       rounded-full text-[10px] xs:text-xs
                       hover:bg-gray-200 transition-colors duration-200"
            >
              {category.title}
            </span>
          ))}
        </div>
      </div>

      {/* Tax Info */}
      {restaurant.tax > 0 && (
        <div className="text-[10px] xs:text-xs text-gray-500 mb-2">
          +{restaurant.tax}% tax applicable
        </div>
      )}
    </div>
  )

  const footer = (
    <div className="flex flex-col gap-2 sm:gap-3 p-2 sm:p-4 border-t border-gray-100">
      {/* Ratings & Minimum Order */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Ratings */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Rating
            value={restaurant.rating || 0}
            stars={5}
            cancel={false}
            className="flex cursor-default pointer-events-none scale-[0.6] xs:scale-75 sm:scale-90"
            readOnly
            pt={{
              onIcon: { className: 'text-yellow-300 cursor-default' },
              offIcon: { className: 'text-yellow-300 cursor-default' }
            }}
          />
          <div className="flex flex-col sm:flex-row sm:gap-1">
            <span className="text-[10px] xs:text-xs text-gray-600">
              ({restaurant.reviewData?.ratings || 0}/5)
            </span>
            <span className="text-[10px] xs:text-xs text-gray-500">
              {restaurant.reviewData?.total || 0} reviews
            </span>
          </div>
        </div>
  
        {/* Right: Minimum Order */}
        <div className="mt-2 sm:mt-0 text-right">
          <span className="font-bold text-sm sm:text-base">
            $ {restaurant.minimumOrder}
          </span>
          <div className="text-[10px] xs:text-xs text-gray-600">
            Minimum order
          </div>
        </div>
      </div>
  
      {/* Opening Times */}
      {restaurant.openingTimes &&
        restaurant.openingTimes.times &&
        restaurant.openingTimes.times[0] && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <i className="pi pi-clock text-[10px] xs:text-xs text-gray-500"></i>
            <span className="text-[10px] xs:text-xs text-gray-600">
              {restaurant.openingTimes.day}: {restaurant.openingTimes.times[0].startTime[0]} -{' '}
              {restaurant.openingTimes.times[0].endTime[0]}
            </span>
          </div>
        )}
    </div>
  );
  
  const titleTemplate = (
    <div className="flex items-center justify-between p-2 sm:p-4">
      <h2 className="font-bold text-base sm:text-lg md:text-xl m-0 line-clamp-1">
        {restaurant.name}
      </h2>
    </div>
  )

  return (
    <Card
      title={titleTemplate}
      header={header}
      footer={footer}
      className="w-full max-w-full sm:max-w-sm shadow-md hover:shadow-lg 
                 transition-all duration-300 ease-in-out
                 bg-white rounded-lg overflow-hidden
                 hover:-translate-y-1"
      pt={{
        root: { className: 'border border-gray-100 rounded-lg' },
        content: { className: 'p-0' },
      }}
    >
      {body}
    </Card>
  )
}