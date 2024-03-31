import Navbar from "../components/Navbar";
import HeroImageAutoplay from "../components/HeroImageAutoplay";
import HeroResto from "../components/HeroResto";
import Preloader from "../components/Preloader";
import Footer from "../components/Footer";

function Home() {
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
