import Navbar from "../components/Navbar";
import HeroImageAutoplay from "../components/HeroImageAutoplay";
import HeroResto from "../components/HeroResto";
import Preloader from "../components/Preloader";
import Footer from "../components/Footer";
// import bg-curves from "../../public/assets/bg-curves.png";

function Home() {
  return (
    <div className="w-full h-screen bg-no-repeat bg-top">
      <Preloader />
      <Navbar />
      <div className="w-[80%] mx-auto">
        <HeroImageAutoplay />
        <HeroResto />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
