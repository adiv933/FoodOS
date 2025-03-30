/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Checkout = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("Cash on Delivery");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_SERVER_URL}/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          // setUserData(res.data[0]);
          const { NAME, MOBILE_NUMBER, ADDRESS } = res.data[0];
          setName(NAME);
          setMobile(MOBILE_NUMBER);
          setAddress(ADDRESS);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
<<<<<<< HEAD
      .get("http://localhost:4000/order/checkout")
=======
      .get(`${import.meta.env.VITE_BASE_SERVER_URL}/order/checkout`, {
        withCredentials: true,
      })
>>>>>>> b2b42a57e1ced389e4e9999761f4c1656034eb71
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          setItems(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="h-screen w-full bg-top bg-no-repeat ">
      <Navbar />

      <div className="mx-auto flex h-[75%]  w-[90%] overflow-hidden rounded shadow-md">
        {!(name || mobile || address) ? (
          <div className="mx-auto flex items-center ">
            <CircularProgress color="warning" size={100} />
          </div>
        ) : (
          <>
            {/* Left Section */}
            <div className="bg-blur2 w-[60%] p-4 ">
              <div className="mb-4">
                <h2 className="mb-2 text-lg font-semibold">Personal Details</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-2 w-full rounded border bg-zinc-100 px-2 py-1"
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full rounded border bg-zinc-100 px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <h2 className="mb-2 text-lg font-semibold">Address</h2>
                <textarea
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-20 w-full rounded border bg-zinc-100 px-2 py-1"
                ></textarea>
              </div>
              <div>
                <h2 className="mb-2 text-lg font-semibold">Payment Options</h2>
                <select
                  value={paymentOption}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="w-full rounded border bg-zinc-100 px-2 py-1"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="GPay">GPay</option>
                  <option value="PayTM">PayTM</option>
                  <option value="Credit Card">Credit/Debit Card</option>
                  {/* Add other payment options */}
                </select>
              </div>
            </div>

            {/* Right Section */}
            <div className="bg-blur1 w-[40%] overflow-y-auto overflow-x-hidden p-4">
<<<<<<< HEAD
              <Cart
                name={name}
                mobile={mobile}
                address={address}
                paymentOption={paymentOption}
                items={items}
                setItems={setItems}
              />
=======
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <CircularProgress color="warning" size={100} />
                </div>
              ) : (
                <Cart
                  name={name}
                  mobile={mobile}
                  address={address}
                  paymentOption={paymentOption}
                  items={items}
                  setItems={setItems}
                />
              )}
>>>>>>> b2b42a57e1ced389e4e9999761f4c1656034eb71
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
