import { Body } from "./components/body";
import Footer from "./components/footer";
import Header from "./components/header";
import { LocationProvider } from "./contexts/location-context";

export default function Home() {
  return (
    <div className="pt-[88px] md:pt-[96px] bg-white">
    <LocationProvider>
      <Header />
      <Body />
      <Footer/>
    </LocationProvider>
  </div>
  );
}
