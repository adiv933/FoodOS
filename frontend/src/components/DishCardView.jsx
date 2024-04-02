/* eslint-disable react/prop-types */
import burger from "../../public/assets/loginCarousal/burger.jpg";
import dosa from "../../public/assets/loginCarousal/dosa.jpg";
import momos from "../../public/assets/loginCarousal/momos.jpg";
import pavbhaji from "../../public/assets/loginCarousal/pavbhaji.jpg";
import paneer from "../../public/assets/loginCarousal/paneer.jpg";
import cholabhatura from "../../public/assets/loginCarousal/cholabhatura.jpg";
import { useState, useEffect } from "react";

const dishes = [
  {
    key: 0,
    dishName: "Dosa",
    dishOneliner: "Crunchy bliss, bursting with flavor!",
    dishImg: dosa,
  },
  {
    key: 1,
    dishName: "Momos",
    dishOneliner: "Succulent bites of pure delight!",
    dishImg: momos,
  },
  {
    key: 2,
    dishName: "Paneer Makhani",
    dishOneliner: "Creamy indulgence in every spoon!",
    dishImg: paneer,
  },
  {
    key: 3,
    dishName: "Burger",
    dishOneliner: "Satisfying bites of culinary joy!",
    dishImg: burger,
  },
  {
    key: 4,
    dishName: "Pav Bhaji",
    dishOneliner: "Spicy comfort in every bite!",
    dishImg: pavbhaji,
  },
  {
    key: 5,
    dishName: "Chole Bhature",
    dishOneliner: "Rich flavors, pure satisfaction!",
    dishImg: cholabhatura,
  },
];

const DishCard = ({ dishName, dishOneliner, dishImg }) => {
  return (
    <div className="relative w-full h-full">
      <img
        className="w-full h-full object-cover"
        src={dishImg}
        alt={dishName}
        style={{ width: "100%", height: "100%" }}
      />
      <div className="absolute inset-0 flex flex-col-reverse items-end">
        <div className="w-full bg-gradient-to-b from-transparent to-black text-white p-4">
          <h2 className="text-3xl font-bold mx-6">{dishName}</h2>
          <p className="text-md mx-6 mb-8">{dishOneliner}</p>
        </div>
      </div>
    </div>
  );
};

const DishCardView = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % dishes.length);
    }, 3500); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-sm mx-auto  w-full h-full">
      {dishes.map((dish, index) => (
        <div
          key={index}
          className={`absolute inset-0 duration-1000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <DishCard
            dishName={dish.dishName}
            dishOneliner={dish.dishOneliner}
            dishImg={dish.dishImg}
          />
        </div>
      ))}
    </div>
  );
};

export default DishCardView;
