import Navbar from "../components/Navbar";
import HeroImageAutoplay from "../components/HeroImageAutoplay";
import HeroResto from "../components/HeroResto";
import Preloader from "../components/Preloader";

function Home() {
  return (
    <div>
      <Preloader />
      <Navbar />;
      <div className="w-[75%] mx-auto">
        <HeroImageAutoplay />
        <HeroResto />
      </div>
    </div>
  );
}

export default Home;
