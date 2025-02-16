import axios from "axios";
import { LocationData } from "@/app/utils/types/interfaces";



export const fetchUserLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation not supported or running on the server"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
              params: {
                format: "json",
                lat: latitude,
                lon: longitude,
              },
            }
          );

          if (response.status === 200) {
            const data = response.data;
            const address = data.display_name
              .split(",")
              .filter((part: string) => !/\d{5,}/.test(part))
              .join(",");

            resolve({
              address,
              coordinates: { latitude, longitude },
            });
          } else {
            reject(new Error("Failed to fetch location data"));
          }
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
};