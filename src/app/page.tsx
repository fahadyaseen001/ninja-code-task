import { Main } from "./components/body";
import Header from "./components/header";
import { LocationProvider } from "./contexts/location-context";

export default function Home() {
  return (
    <div>
       <LocationProvider>
          <Header />
          <Main/>
       </LocationProvider>
    
    </div>
  );
}
