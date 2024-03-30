/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import burger1 from "../../public/assets/restos/burger1.jpeg";
import burger2 from "../../public/assets/restos/burger2.jpeg";
import burger3 from "../../public/assets/restos/burger3.jpeg";
import cake1 from "../../public/assets/restos/cake1.jpeg";
import cake2 from "../../public/assets/restos/cake2.jpeg";
import chinese1 from "../../public/assets/restos/chinese1.jpeg";
import north1 from "../../public/assets/restos/north1.jpeg";
import north2 from "../../public/assets/restos/north2.jpeg";
import north3 from "../../public/assets/restos/north3.jpeg";
import north4 from "../../public/assets/restos/north4.jpeg";
import north5 from "../../public/assets/restos/north5.jpeg";
import pizza1 from "../../public/assets/restos/pizza1.jpeg";

const restaurants = [
  {
    id: 1,
    name: "The Sweet Spot Bakery",
    address: "1 Bakery Street, Manipal, Karnataka, India",
    contact: "+91 1234567890",
    delivery_time: "30-40 minutes",
    img_src: cake2,
    rating: 3.9,
  },
  {
    id: 2,
    name: "Spice Junction",
    address: "9 Spice Market, Manipal, Karnataka, India",
    contact: "+91 1234432112",
    delivery_time: "25-35 minutes",
    img_src: north1,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Tandoori Terrace",
    address: "10 Tandoori Lane, Manipal, Karnataka, India",
    contact: "+91 9988776655",
    delivery_time: "30-40 minutes",
    img_src: north2,
    rating: 1.9,
  },
  {
    id: 4,
    name: "SpeedyBites",
    address: "4 Fast Lane, Manipal, Karnataka, India",
    contact: "+91 8899776655",
    delivery_time: "15-25 minutes",
    img_src: burger2,
    rating: 5.0,
  },
  {
    id: 5,
    name: "QuickBite Burgers",
    address: "3 Fast Food Corner, Manipal, Karnataka, India",
    contact: "+91 9988776655",
    delivery_time: "20-30 minutes",
    img_src: burger1,
    rating: 4.5,
  },
  {
    id: 6,
    name: "Noodle Haven",
    address: "7 Ramen Street, Manipal, Karnataka, India",
    contact: "+91 5544332211",
    delivery_time: "20-30 minutes",
    img_src: north5,
    rating: 4.0,
  },
  {
    id: 7,
    name: "Flourish Bakery",
    address: "2 Bakers Lane, Manipal, Karnataka, India",
    contact: "+91 9876543210",
    delivery_time: "25-35 minutes",
    img_src: cake1,
    rating: 3.3,
  },
  {
    id: 8,
    name: "Crunchy Cravings",
    address: "5 Foodie Plaza, Manipal, Karnataka, India",
    contact: "+91 7766554433",
    delivery_time: "20-30 minutes",
    img_src: burger3,
    rating: 4.2,
  },
  {
    id: 9,
    name: "Pizza Paradise",
    address: "6 Pizza Tower, Manipal, Karnataka, India",
    contact: "+91 6655443322",
    delivery_time: "25-35 minutes",
    img_src: pizza1,
    rating: 4.7,
  },
  {
    id: 10,
    name: "Ramen Rendezvous",
    address: "8 Noodle Lane, Manipal, Karnataka, India",
    contact: "+91 3322114455",
    delivery_time: "20-30 minutes",
    img_src: chinese1,
    rating: 3.5,
  },
  {
    id: 11,
    name: "Curry Kingdom",
    address: "11 Curry Corner, Manipal, Karnataka, India",
    contact: "+91 8877665544",
    delivery_time: "25-35 minutes",
    img_src: north3,
    rating: 4.5,
  },
  {
    id: 12,
    name: "Naan Nook",
    address: "12 Naan Street, Manipal, Karnataka, India",
    contact: "+91 7766889955",
    delivery_time: "30-40 minutes",
    img_src: north4,
    rating: 4.5,
  },
];

const RestoCard = ({ resto }) => {
  return (
    <Link
      to={`/restaurant/${resto.id}${resto.name}`}
      className="hover:no-underline"
    >
      <div className="w-72 h-96 rounded-md mb-8 transition-transform hover:scale-105 hover:-translate-y-2 shadow-md hover:shadow-xl duration-200 bg-white overflow-hidden">
        <div className="h-2/3  overflow-hidden relative">
          <img
            src={resto.img_src}
            alt={resto.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-red w-full h-full bg-gradient-to-t from-black opacity-50 "></div>
        </div>
        <div className="p-2">
          <h1 className="text-2xl font-semibold">{resto.name}</h1>
          <div className="flex justify-between">
            <h1>Rating: {resto.rating}</h1>
            <h1>{resto.delivery_time}</h1>
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
  return (
    <div className="bg-amber-300 rounded-md p-8 pb-20">
      <h1 className="text-2xl font-semibold mb-8">
        Top restuarant chains in Manipal
      </h1>
      <RestoCardView restaurants={restaurants} />
    </div>
  );
}
