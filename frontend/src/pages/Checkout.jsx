/* eslint-disable react/prop-types */

import Navbar from "../components/Navbar";
import { useState } from "react";

const Cart = ({ name, mobile, address, paymentOption }) => {
  const [items, setItems] = useState([
    { id: 1, name: "Pizza", price: 300, quantity: 1 },
    { id: 11, name: "Momos", price: 300, quantity: 2 },
    { id: 2, name: "Chicken Kebab(4pcs)", price: 450, quantity: 1 },
    { id: 3, name: "Burger", price: 150, quantity: 1 },

    // Add more items as needed
  ]);

  const increaseQuantity = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 > 0 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const deleteItem = (id, name) => {
    let userConfirm = window.confirm(`Removing ${name}!`);
    if (userConfirm) {
      const newItems = items.filter((item) => item.id !== id);
      setItems([...newItems]);
    }
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="h-fit ">
      <div className="mb-8 ">
        <h2 className="text-xl font-semibold mb-2">Food Items</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <div className="w-2/3 border-b-2 border-black mb-2 p-1 mx-4">
              <span className="font-semibold">{item.name}</span>
              <span className="mx-2">(₹{item.price})</span>
            </div>
            <div className="flex bg-amber-200 rounded gap-3 w-16 p-2">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span className="">{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <span className="mx-2 font-semibold">
              ₹{item.price * item.quantity}
            </span>
            <button onClick={() => deleteItem(item.id, item.name)}>x</button>
          </div>
        ))}
      </div>
      <div className="p-2 mb-8 bg-white rounded">
        <h2 className="text-xl font-semibold mb-2 ">Final Summary</h2>
        {name && (
          <p>
            <span className="font-semibold">Name:</span> {name}
          </p>
        )}
        {mobile && (
          <p>
            <span className="font-semibold">Mobile:</span> {mobile}
          </p>
        )}
        {address && (
          <p>
            <span className="font-semibold">Address:</span> {address}
          </p>
        )}
        {paymentOption && (
          <p>
            <span className="font-semibold">Payment Option:</span>{" "}
            {paymentOption}
          </p>
        )}
        <p className="font-semibold">Total Bill: ₹{totalPrice}</p>
      </div>
      <button
        onClick
        className="bg-amber-500 hover:bg-amber-600 text-white px-12 py-3 rounded w-full"
      >
        Pay ₹{totalPrice}
      </button>
    </div>
  );
};

const Checkout = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("Credit Card"); // You can initialize with a default payment option

  return (
    <div className="w-full h-screen bg-no-repeat bg-top ">
      <Navbar />
      <div className="flex w-[90%] mx-auto  h-[75%] rounded overflow-hidden shadow-md ">
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
