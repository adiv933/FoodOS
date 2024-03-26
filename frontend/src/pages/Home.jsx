import Navbar from "../components/Navbar";
import HeroImageAutoplay from "../components/HeroImageAutoplay";
import HeroResto from "../components/HeroResto";

function Home() {
  return (
    <div>
      <Navbar />;
      <div className="w-[75%] mx-auto">
        <HeroImageAutoplay />
        <HeroResto />
      </div>
    </div>
  );
}

export default Home;
