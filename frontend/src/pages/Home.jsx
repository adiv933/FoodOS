import Navbar from "../components/Navbar";
import HeroImageAutoplay from "../components/HeroImageAutoplay";
import HeroResto from "../components/HeroResto";
import Preloader from "../components/Preloader";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const userData = location.state?.userData;
  console.log(userData);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="w-full h-screen bg-no-repeat bg-top">
      {/* <Preloader /> */}
      <Navbar />
      <div className="w-[90%] mx-auto">
        <HeroImageAutoplay />
        <HeroResto />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
