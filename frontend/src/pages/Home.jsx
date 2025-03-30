import Navbar from "../components/Navbar";
import HeroImageAutoplay from "../components/HeroImageAutoplay";
import HeroResto from "../components/HeroResto";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${import.meta.env.VITE_BASE_SERVER_URL}/home`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(true);
        if (res.status === 200) {
          setRestaurants(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        navigate("/login");
        console.log(err);
      });
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-top bg-no-repeat">
      <Navbar />
      <div className="mx-auto w-[90%]">
        <HeroImageAutoplay />
        <HeroResto restaurants={restaurants} isLoading={isLoading} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
