export interface LocationData {
    address: string;
    coordinates: Coordinates;
  }

export interface MapComponentProps {
  coordinates: Coordinates;
  onHoverChange: (isHovering: boolean) => void;
}

export interface Coordinates {
    latitude: number | null;
    longitude: number | null;
  }
  

export interface CountryCoordinate {
  name: string;
  code: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface LocationOption {
    label: string;
    value: string;
  }


  export interface RestaurantInterface {
    isAvailable: boolean;
    address: string;
    tax: number;
    openingTimes: openingTimes;
    _id: string;
    name: string;
    image?: string;
    reviewData: ReviewData;
    deliveryTime: number;
    rating?: number;
    minimumOrder: number;
    categories: categories[];
  }

  export interface RestaurantCardProps {
    restaurant: RestaurantInterface;
  }

 interface ReviewData {
    ratings: number;
    total: number;
  }

 interface foods {
    _id: string;
     title:string;
  }

 interface categories {
    _id: string;
    title: string;
    foods: foods[];
  }


 interface times {
    startTime: string[];
    endTime: string[];
  }
  
interface openingTimes {
    day: string;
    times: times[];
  }
  

  