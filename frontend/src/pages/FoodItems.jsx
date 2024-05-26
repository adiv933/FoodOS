import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuSection from "../components/MenuSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FoodItems() {
  const location = useLocation();
  const state = location.state;
  const desiredDishName = state?.dishName;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/restaurant/search/${desiredDishName}`)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="h-screen w-full bg-top bg-no-repeat ">
      <Navbar />
      <div className="overflow bg-blur2 mx-auto  flex h-fit w-[90%] rounded p-8 ">
        {data.length ? (
          <MenuSection menuItems={data}>
            {`Search results for ${desiredDishName}`}
          </MenuSection>
        ) : (
          <h1 className="text-3xl">
            {`No results found for ${desiredDishName}`}
          </h1>
        )}
      </div>
      <Footer />
    </div>
  );
}
