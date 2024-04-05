import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../index.css";
import { useLocation } from "react-router-dom";
import Cart from "./Cart";

export default function Navbar() {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  return (
    <div className="w-full h-20 flex items-center justify-between shadow-md px-8  mb-12">
      <Link to="/home">
        <h1 className="text-3xl font-bold">FoodOS</h1>
      </Link>
      <div
        style={
          location.pathname !== "/checkout" && location.pathname !== "/profile"
            ? { width: "27%" }
            : {}
        }
        className="flex items-center justify-between gap-3"
      >
        {" "}
        {location.pathname !== "/checkout" &&
          location.pathname !== "/profile" && <SearchBar />}
        <div className="flex gap-2.5 ml-0">
          <Cart />
          <Link to="/profile">
            <button
              className={`px-4 py-3 bg-${
                isProfilePage ? "amber-500" : "amber-400"
              } text-white rounded-md 
        ${
          isProfilePage
            ? ""
            : "hover:bg-amber-500 hover:-translate-y-1 hover:shadow-lg duration-100"
        }`}
            >
              <i className={`ri-user-fill`}></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
