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

  useEffect(() => {
    axios
      .get(`http://localhost:4000/profile`)
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
      .get("http://localhost:4000/checkout")
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          setItems(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full h-screen bg-no-repeat bg-top ">
      <Navbar />

      <div className="flex w-[90%] mx-auto  h-[75%] rounded overflow-hidden shadow-md">
        {!(name || mobile || address) ? (
          <div className="flex mx-auto items-center ">
            <CircularProgress color="warning" size={100} />
          </div>
        ) : (
          <>
            {/* Left Section */}
            <div className="w-[60%] p-4 bg-blur2 ">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded px-2 py-1 mb-2 bg-zinc-100"
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border rounded px-2 py-1 bg-zinc-100"
                />
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Address</h2>
                <textarea
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded px-2 py-1 h-20 bg-zinc-100"
                ></textarea>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Payment Options</h2>
                <select
                  value={paymentOption}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="w-full border rounded px-2 py-1 bg-zinc-100"
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
            <div className="w-[40%] p-4 bg-blur1 overflow-x-hidden overflow-y-auto">
              <Cart
                name={name}
                mobile={mobile}
                address={address}
                paymentOption={paymentOption}
                items={items}
                setItems={setItems}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
