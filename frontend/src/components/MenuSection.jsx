/* eslint-disable react/prop-types */
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartOutLinedIcon from "@mui/icons-material/RemoveShoppingCartOutLined";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

const MenuItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    handleAddToCart();
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    console.log(`Added ${item.NAME} to cart`);
    axios
      .post("http://localhost:4000/addtocart", { item })
      .then((response) => {
        console.log("SUCCESS!!! Response from server:", response);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  return (
    <div className="flex items-center mb-4 px-4 border-2 rounded h-32 ">
      <img
        src={item.IMG_SRC}
        alt={item.NAME}
        className="w-20 h-20 mr-8 rounded object-cover object-center transition-transform duration-300 ease-in-out transform hover:scale-110 "
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.NAME}</h3>
        <p className="text-gray-600 flex gap-1">
          Rating: {item.RATING}
          <StarIcon sx={{ color: yellow[700] }} />
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-gray-700 mr-4 font-semibold text-xl">
          ₹{item.PRICE}{" "}
        </p>
        <Tooltip title={isAdded ? "" : "Add to cart"}>
          <button
            className={`bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded  ${
              isAdded
                ? "opacity-50 cursor-not-allowed"
                : "hover:-translate-y-1 duration-200"
            }`}
            onClick={handleClick}
            disabled={isAdded}
          >
            {isAdded ? (
              <RemoveShoppingCartOutLinedIcon />
            ) : (
              <AddShoppingCartIcon />
            )}
          </button>
        </Tooltip>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message={`${item.NAME} was added to Cart`}
        />
      </div>
    </div>
  );
};

const MenuSection = ({ menuItems, children }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold my-8 ">{children}</h2>
      {menuItems.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </div>
  );
};

export default MenuSection;
