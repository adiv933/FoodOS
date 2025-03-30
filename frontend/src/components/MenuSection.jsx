/* eslint-disable react/prop-types */
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
    // console.log(item);
    setIsAdded(true);
    axios
<<<<<<< HEAD
      .post("http://localhost:4000/order/addtocart", { item })
      .then((response) => {
        console.log("SUCCESS!!! Response from server:", response);
=======
      .post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/order/addtocart`,
        { item },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        // console.log(`Added ${item.NAME} to cart`);
        // console.log("SUCCESS!!! Response from server:", response);
>>>>>>> b2b42a57e1ced389e4e9999761f4c1656034eb71
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  return (
    <div className="mb-4 flex h-32 items-center rounded border-2 px-4 ">
      <img
        src={item.IMG_SRC}
        alt={item.NAME}
        className="mr-8 h-20 w-20 transform rounded object-cover object-center transition-transform duration-300 ease-in-out hover:scale-110 "
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.NAME}</h3>
        <p className="flex gap-1 text-gray-600">
          Rating: {item.RATING}
          <StarIcon sx={{ color: yellow[700] }} />
        </p>
      </div>
      <div className="flex items-center">
        <p className="mr-4 text-xl font-semibold text-gray-700">
          ₹{item.PRICE}{" "}
        </p>
        <Tooltip title={isAdded ? "" : "Add to cart"}>
          <button
            className={`rounded bg-amber-500 px-4 py-2 font-bold text-white hover:bg-amber-700  ${
              isAdded
                ? "cursor-not-allowed opacity-50"
                : "duration-200 hover:-translate-y-1"
            }`}
            onClick={handleClick}
            disabled={isAdded}
          >
            {isAdded ? (
              <i className="ri-shopping-cart-2-fill"></i>
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
      <h2 className="my-8 text-3xl font-semibold ">{children}</h2>
      {menuItems ? (
        menuItems.map((item, index) => <MenuItem key={index} item={item} />)
      ) : (
        <h1 className="text-black">Menu not added yet.</h1>
      )}
    </div>
  );
};

export default MenuSection;
