/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RatingSection from "../components/RatingSection";

// const defaultMenuItems = [
//   {
//     NAME: "Spaghetti Carbonara",
//     IMAGE: "spaghetti_carbonara.jpg",
//     RATING: 4.8,
//     PRICE: 1500,
//   },
//   {
//     NAME: "Margherita Pizza",
//     IMAGE: "margherita_pizza.jpg",
//     RATING: 4.5,
//     PRICE: 1200,
//   },
//   {
//     NAME: "Chicken Alfredo",
//     IMAGE: "chicken_alfredo.jpg",
//     RATING: 4.7,
//     PRICE: 1700,
//   },
//   { NAME: "Caesar Salad", IMAGE: "caesar_salad.jpg", RATING: 4.3, PRICE: 900 },
//   { NAME: "Cheeseburger", IMAGE: "cheeseburger.jpg", RATING: 4.6, PRICE: 800 },
//   {
//     NAME: "Sushi Platter",
//     IMAGE: "sushi_platter.jpg",
//     RATING: 4.9,
//     PRICE: 2200,
//   },
//   { NAME: "Pad Thai", IMAGE: "pad_thai.jpg", RATING: 4.4, PRICE: 1300 },
//   { NAME: "Tiramisu", IMAGE: "tiramisu.jpg", RATING: 4.7, PRICE: 600 },
// ];

const MenuItem = ({ NAME, IMAGE, RATING, PRICE }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Simulate adding to cart functionality
    setIsAdded(true);
    console.log(`Added ${NAME} to cart`);
  };

  return (
    <div className="flex items-center mb-4 px-4 border-2 rounded h-32">
      <img
        src={IMAGE}
        alt={NAME}
        className="w-20 h-20 mr-8 rounded object-cover"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{NAME}</h3>
        <p className="text-gray-600">Rating: {RATING}</p>
      </div>
      <div className="flex items-center">
        <p className="text-gray-600 mr-4">₹{PRICE}</p>
        <button
          className={`bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded ${
            isAdded ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

const MenuSection = ({ menuItems }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold my-8 ">Menu</h2>
      {menuItems.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </div>
  );
};

const Restaurant = () => {
  const [resto, setResto] = useState({});
  const [menuItems, setMenuItems] = useState({});
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchResto = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/restaurant/${id}`);
        if (res.status === 200) {
          setResto(res.data);
        }
      } catch (err) {
        console.log("error in receiving");
        console.log(err);
      }
    };
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/restaurant/${id}/menu`
        );
        if (res.status === 200) {
          setMenuItems(res.data);
        }
      } catch (err) {
        console.log("error in receiving");
        console.log(err);
      }
    };
    fetchResto();
    fetchMenuItems();
  }, []);

  const [sortBy, setSortBy] = useState("default");

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
      <Navbar />
      <div className="w-[90%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative mb-8 border-b-2">
          <img
            className="w-full h-96 object-cover object-center"
            src={resto.IMG_SRC}
            alt={resto.NAME}
          />
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 px-6 pb-4">
            <h2 className="text-6xl font-semibold text-white">{resto.NAME}</h2>
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
                Current Rating: {resto.RATING}
              </p>
            </div>
            <RatingSection />
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
            <MenuSection menuItems={sortedMenuItems} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Restaurant;
