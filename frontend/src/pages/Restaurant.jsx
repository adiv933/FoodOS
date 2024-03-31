/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Restaurant = () => {
  const [resto, setResto] = useState([]);
  const location = useLocation();
  const { id } = location.state;
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:4000/restaurant/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setResto(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full h-screen bg-no-repeat bg-top">
      <Navbar />
      <div className=" w-[90%] mx-auto">
        <div className="restaurant-info bg-amber-500 text-white p-4 rounded-md">
          <img src={resto.IMG_SRC} alt="" />
          <h2 className="text-xl font-bold">{resto.NAME}</h2>
          <p className="mb-2">Address: {resto.ADDRESS}</p>
          <p className="mb-2">Contact Number: {resto.CONTACT_NUMBER}</p>
          <p className="mb-2">Delivery Time: {resto.DELIVERY_TIME}</p>
          <p className="mb-2">Rating: {resto.RATING}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Restaurant;
