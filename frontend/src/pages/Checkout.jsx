import Cart from "../components/Cart";
import Navbar from "../components/Navbar";
import { useState } from "react";

const Checkout = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("Credit Card"); // You can initialize with a default payment option

  return (
    <div className="w-full h-screen bg-no-repeat bg-top ">
      <Navbar />
      <div className="flex w-[90%] mx-auto bg-zinc-100 h-[75%] rounded-lg overflow-hidden shadow-md">
        {/* Left Section */}
        <div className="w-3/4 p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Address</h2>
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded px-2 py-1 h-20"
            ></textarea>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Payment Options</h2>
            <select
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="GPay">GPay</option>
              <option value="PayTM">PayTM</option>
              <option value="Credit Card">Credit Card</option>
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
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
