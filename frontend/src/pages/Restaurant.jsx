/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MenuSection from "../components/MenuSection";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RatingSection from "../components/RatingSection";

const Restaurant = () => {
  const [resto, setResto] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(resto.RATING);

  const handleRatingChange = (newValue) => {
    setRating((newValue + resto.RATING) / 2);
  };

  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${import.meta.env.VITE_BASE_SERVER_URL}/restaurant/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(true);
          setResto(res.data[0]);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${import.meta.env.VITE_BASE_SERVER_URL}/restaurant/${id}/menu`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setMenuItems(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const [sortBy, setSortBy] = useState("Sort By:");

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedMenuItems = [...menuItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.NAME.localeCompare(b.NAME);
      case "rating":
        return b.RATING - a.RATING;
      case "price":
        return a.PRICE - b.PRICE;
      default:
        return 0; // no sorting
    }
  });

  return (
    <div className="h-screen w-full bg-top bg-no-repeat">
      <Navbar />
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="mx-auto w-[90%] overflow-hidden rounded bg-white shadow-lg">
          <div className="relative mb-8 overflow-hidden border-b-2">
            <img
              className="h-96 w-full transform object-cover object-center transition-transform duration-300 ease-in-out hover:scale-110"
              src={resto.IMG_SRC}
              alt={resto.NAME}
            />
            <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 px-6 pb-4">
              <h2 className="text-6xl font-semibold text-white">
                {resto.NAME}
              </h2>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/4 p-6">
              {/* Sort options */}
              <div className="border-b-2 pb-24">
                <label
                  className="mb-2 block text-lg font-bold text-gray-700"
                  htmlFor="sortOptions"
                >
                  Sort by:
                </label>
                <select
                  className="w-full rounded border border-gray-300 px-3 py-2 leading-tight focus:border-gray-500 focus:outline-none"
                  id="sortOptions"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="default">Sort By:</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                  <option value="price">Price</option>
                </select>
              </div>
              {/* Rating section */}
              <div className="mb-4 mt-8">
                <div className="mb-8 rounded   bg-amber-500 px-4 py-2 text-center font-bold text-white">
                  Rate this restaurant
                </div>
                <p className="mb-2 block text-lg font-bold text-gray-700">
                  Current Rating: {rating || resto.RATING}
                </p>
              </div>
              <RatingSection onRatingChange={handleRatingChange} />
            </div>
            <div className="w-3/4 border-l border-gray-200 p-6">
              {/* Contact and address section */}
              <div className="mb-4">
                <p className="mb-2 block text-lg font-semibold text-gray-700">
                  Contact Number: {resto.CONTACT_NUMBER}
                </p>
                <p className="mb-2 block text-lg font-semibold text-gray-700">
                  Address: {resto.ADDRESS}
                </p>
              </div>
              {/* Menu section */}
              <MenuSection menuItems={sortedMenuItems}>{"Menu"}</MenuSection>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Restaurant;
