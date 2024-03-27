import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../index.css";

export default function Navbar() {
  return (
    <div className="w-full h-20 flex items-center justify-between shadow-md px-8">
      <Link to="/home">
        <h1 className="text-3xl font-bold">FoodOS</h1>
      </Link>
      <div className="flex items-center justify-between w-[27%] gap-3">
        <SearchBar />
        <Link to="/cart">
          <button className="px-4 py-3 bg-amber-400 text-white rounded-md hover:bg-amber-500 hover:-translate-y-1 hover:shadow-lg duration-100">
            <i className="ri-shopping-cart-2-fill"></i>
          </button>
        </Link>
        <Link to="/profile">
          <button className="px-4 py-3 bg-amber-400 text-white rounded-md hover:bg-amber-500 hover:-translate-y-1 hover:shadow-lg duration-100">
            <i className="ri-user-fill"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}
