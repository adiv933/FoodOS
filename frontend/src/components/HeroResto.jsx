/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";

const RestoCard = ({ resto }) => {
  return (
    <Link
      to={`/restaurant/${resto.RESTAURANT_ID}`}
      className="hover:no-underline"
      state={{ id: resto.RESTAURANT_ID }}
    >
      <div className="mb-8 h-96 w-72 overflow-hidden rounded-md bg-white text-zinc-700 shadow-md transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:shadow-xl">
        <div className="relative  h-2/3 overflow-hidden">
          <img
            src={resto.IMG_SRC}
            alt={resto.NAME}
            className="h-full w-full object-cover"
          />
          <div className="bg-red absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black opacity-50 "></div>
        </div>
        <div className="flex h-1/3 flex-col justify-between p-2">
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

const RestoCardView = ({ restaurants, isLoading }) => {
  return (
    <div className="flex flex-wrap justify-around ">
      {restaurants.map((resto, index) => (
        <RestoCard resto={resto} key={index} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default function HeroResto({ restaurants, isLoading }) {
  return (
    <div className="bg-blur2 rounded-md bg-amber-300 p-8 pb-20">
      {isLoading ? (
        <>
          <div className="flex items-center gap-8">
            <h1 className="inline-block text-2xl font-semibold">Loading...</h1>
            <CircularProgress color="warning" size={50} />
          </div>
        </>
      ) : (
        <h1 className="mb-8 text-2xl font-semibold">
          Top restuarant chains in Manipal
        </h1>
      )}
      <RestoCardView restaurants={restaurants} isLoading={isLoading} />
    </div>
  );
}
