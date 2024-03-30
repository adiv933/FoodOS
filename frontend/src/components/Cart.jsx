/* eslint-disable react/prop-types */
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
    <div className="h-fit">
      <div className="mb-8 ">
        <h2 className="text-xl font-semibold mb-2">Food Items</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <div className="w-2/3 border-b-2 border-black mb-2 p-1 mx-4">
              <span className="font-semibold">{item.name}</span>
              <span className="mx-2">(₹{item.price})</span>
            </div>
            <div className="flex bg-amber-200 rounded-lg gap-3 w-16 p-2">
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
      <div className="p-2 mb-8 bg-zinc-100 rounded-md">
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

export default Cart;
