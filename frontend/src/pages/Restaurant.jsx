/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
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
      .get(`http://localhost:4000/restaurant/${id}`)
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
      .get(`http://localhost:4000/restaurant/${id}/menu`)
      .then((res) => {
        if (res.status === 200) {
          setMenuItems(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    <div className="w-full h-screen bg-no-repeat bg-top">
      <Preloader>
        <span>Loading</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </Preloader>
      <Navbar />
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="w-[90%] mx-auto bg-white shadow-lg rounded overflow-hidden">
          <div className="relative mb-8 border-b-2 overflow-hidden">
            <img
              className="w-full h-96 object-cover object-center transition-transform duration-300 ease-in-out transform hover:scale-110"
              src={resto.IMG_SRC}
              alt={resto.NAME}
            />
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 px-6 pb-4">
              <h2 className="text-6xl font-semibold text-white">
                {resto.NAME}
              </h2>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/4 p-6">
              {/* Sort options */}
              <div className="pb-24 border-b-2">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="sortOptions"
                >
                  Sort by:
                </label>
                <select
                  className="w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
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
              <div className="mt-8 mb-4">
                <div className="text-center bg-amber-500   text-white font-bold py-2 px-4 rounded mb-8">
                  Rate this restaurant
                </div>
                <p className="block text-gray-700 text-lg font-bold mb-2">
                  Current Rating: {rating || resto.RATING}
                </p>
              </div>
              <RatingSection onRatingChange={handleRatingChange} />
            </div>
            <div className="w-3/4 p-6 border-l border-gray-200">
              {/* Contact and address section */}
              <div className="mb-4">
                <p className="block text-gray-700 text-lg font-semibold mb-2">
                  Contact Number: {resto.CONTACT_NUMBER}
                </p>
                <p className="block text-gray-700 text-lg font-semibold mb-2">
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
