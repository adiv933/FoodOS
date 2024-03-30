/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

const Restaurant = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full h-screen bg-no-repeat bg-top">
      <Navbar />
      <div className=" w-[90%] mx-auto">
        <div className="restaurant-info bg-amber-500 text-white p-4 rounded-md">
          {/* <h2 className="text-xl font-bold">{resto.NAME}</h2>
            <p className="mb-2">Address: {resto.ADDRESS}</p>
            <p className="mb-2">Contact Number: {resto.CONTACT_NUMBER}</p>
            <p className="mb-2">Delivery Time: {resto.DELIVERY_TIME}</p>
            <p className="mb-2">Rating: {resto.RATING}</p> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Restaurant;
