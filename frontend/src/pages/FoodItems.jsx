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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
<<<<<<< HEAD
      .get(`http://localhost:4000/restaurant/search/${desiredDishName}`)
=======
      .get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/restaurant/search/${desiredDishName}`,
        {
          withCredentials: true,
        },
      )
>>>>>>> b2b42a57e1ced389e4e9999761f4c1656034eb71
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          setData(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [desiredDishName]);

  return (
    <div className="h-screen w-full bg-top bg-no-repeat ">
      <Navbar />
<<<<<<< HEAD
      <div className="overflow bg-blur2 mx-auto  flex h-fit w-[90%] rounded p-8 ">
        {data.length ? (
          <MenuSection menuItems={data}>
            {`Search results for ${desiredDishName}`}
          </MenuSection>
=======
      <div className="bg-blur2 container mx-auto rounded p-8">
        {isLoading ? (
          <div className="text-center text-xl">Loading...</div>
>>>>>>> b2b42a57e1ced389e4e9999761f4c1656034eb71
        ) : (
          <>
            <MenuSection menuItems={data}>
              <div className="mb-4 text-2xl">{`Search results for ${desiredDishName}`}</div>
            </MenuSection>
            {!data.length && (
              <h1 className="mt-4 text-center text-3xl">{`No results found for ${desiredDishName}`}</h1>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
