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