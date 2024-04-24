import Navbar from "../components/Navbar";
import HeroImageAutoplay from "../components/HeroImageAutoplay";
import HeroResto from "../components/HeroResto";
import Preloader from "../components/Preloader";
import Footer from "../components/Footer";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="h-screen w-full bg-top bg-no-repeat">
      <Preloader>
        <span>FOODOS</span>
        <span>|</span>
        <span>Delights</span>
        <span>Delivered</span>
      </Preloader>
      <Navbar />
      <div className="mx-auto w-[90%]">
        <HeroImageAutoplay />
        <HeroResto />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
