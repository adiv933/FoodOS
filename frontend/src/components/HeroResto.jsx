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
    deliveryTime: "30-40 minutes",
    url: cake2,
    rating: 3.9,
  },
  {
    id: 2,
    name: "Spice Junction",
    address: "9 Spice Market, Manipal, Karnataka, India",
    contact: "+91 1234432112",
    deliveryTime: "25-35 minutes",
    url: north1,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Tandoori Terrace",
    address: "10 Tandoori Lane, Manipal, Karnataka, India",
    contact: "+91 9988776655",
    deliveryTime: "30-40 minutes",
    url: north2,
    rating: 1.9,
  },
  {
    id: 4,
    name: "SpeedyBites",
    address: "4 Fast Lane, Manipal, Karnataka, India",
    contact: "+91 8899776655",
    deliveryTime: "15-25 minutes",
    url: burger2,
    rating: 5.0,
  },
  {
    id: 5,
    name: "QuickBite Burgers",
    address: "3 Fast Food Corner, Manipal, Karnataka, India",
    contact: "+91 9988776655",
    deliveryTime: "20-30 minutes",
    url: burger1,
    rating: 4.5,
  },
  {
    id: 6,
    name: "Noodle Haven",
    address: "7 Ramen Street, Manipal, Karnataka, India",
    contact: "+91 5544332211",
    deliveryTime: "20-30 minutes",
    url: north5,
    rating: 4.0,
  },
  {
    id: 7,
    name: "Flourish Bakery",
    address: "2 Bakers Lane, Manipal, Karnataka, India",
    contact: "+91 9876543210",
    deliveryTime: "25-35 minutes",
    url: cake1,
    rating: 3.3,
  },
  {
    id: 8,
    name: "Crunchy Cravings",
    address: "5 Foodie Plaza, Manipal, Karnataka, India",
    contact: "+91 7766554433",
    deliveryTime: "20-30 minutes",
    url: burger3,
    rating: 4.2,
  },
  {
    id: 9,
    name: "Pizza Paradise",
    address: "6 Pizza Tower, Manipal, Karnataka, India",
    contact: "+91 6655443322",
    deliveryTime: "25-35 minutes",
    url: pizza1,
    rating: 4.7,
  },
  {
    id: 10,
    name: "Ramen Rendezvous",
    address: "8 Noodle Lane, Manipal, Karnataka, India",
    contact: "+91 3322114455",
    deliveryTime: "20-30 minutes",
    url: chinese1,
    rating: 3.5,
  },
  {
    id: 11,
    name: "Curry Kingdom",
    address: "11 Curry Corner, Manipal, Karnataka, India",
    contact: "+91 8877665544",
    deliveryTime: "25-35 minutes",
    url: north3,
    rating: 4.5,
  },
  {
    id: 12,
    name: "Naan Nook",
    address: "12 Naan Street, Manipal, Karnataka, India",
    contact: "+91 7766889955",
    deliveryTime: "30-40 minutes",
    url: north4,
    rating: 4.5,
  },
];

const RestoCard = ({ resto }) => {
  return (
    <Link to={`/restaurant/${resto.id}`} className="hover:no-underline">
      {" "}
      {/* Use Link to wrap the RestoCard */}
      <div className="w-80 h-96 rounded-md mb-8 transition-transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl duration-200  bg-zinc-100 overflow-hidden">
        <div className="h-2/3 bg-amber-400 overflow-hidden relative">
          <img
            src={resto.url}
            alt={resto.name}
            className="w-full h-full object-cover "
          />
          <div className="absolute bottom-0 left-0 bg-red w-full h-full bg-gradient-to-t from-black opacity-50"></div>
        </div>
        <div className="p-2">
          <h1 className="text-2xl font-semibold">{resto.name}</h1>
          <div className="flex justify-between">
            <h1>Rating: {resto.rating}</h1>
            <h1>{resto.deliveryTime}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

const RestoCardView = () => {
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
    <div className="bg-amber-300 rounded-md mt-12 p-8 pb-20">
      <h1 className="text-2xl font-semibold mb-8">
        Top restuarant chains in Manipal
      </h1>
      <RestoCardView />
    </div>
  );
}
