/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

const RestoCard = ({ resto }) => {
  return (
    <Link
      to={`/restaurant/${resto.RESTAURANT_ID}`}
      className="hover:no-underline"
      state={{ id: resto.RESTAURANT_ID }}
    >
      <div className="w-72 h-96 rounded-md mb-8 transition-transform hover:scale-105 hover:-translate-y-2 shadow-md hover:shadow-xl duration-200 bg-white overflow-hidden text-zinc-700">
        <div className="h-2/3  overflow-hidden relative">
          <img
            src={resto.IMG_SRC}
            alt={resto.NAME}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-red w-full h-full bg-gradient-to-t from-black opacity-50 "></div>
        </div>
        <div className="flex flex-col p-2 h-1/3 justify-between">
          <h1 className="text-2xl font-semibold">{resto.NAME}</h1>
          <div className="flex justify-between">
            <h1 className="font-semibold">
              Rating: {resto.RATING}
              <StarIcon sx={{ color: yellow[700] }} />
            </h1>
            <h1 className="font-semibold">{resto.DELIVERY_TIME}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

const RestoCardView = ({ restaurants }) => {
  return (
    <div className="flex flex-wrap justify-around ">
      {restaurants.map((resto, index) => (
        <RestoCard resto={resto} key={index} />
      ))}
    </div>
  );
};

export default function HeroResto() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:4000/home`)
      .then((res) => {
        setIsLoading(true);
        if (res.status === 200) {
          setRestaurants(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-amber-300 rounded-md p-8 pb-20 bg-blur2">
      <h1 className="text-2xl font-semibold mb-8">
        Top restuarant chains in Manipal
      </h1>
      {isLoading ? (
        <div className="text-2xl font-semibold mb-8">Loading...</div>
      ) : (
        <RestoCardView restaurants={restaurants} />
      )}
    </div>
  );
}
