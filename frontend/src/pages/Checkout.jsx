/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import Loading from "../components/Loading";
import axios from "axios";

const Checkout = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("Cash on Delivery");
  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/profile");
      console.log(response.data);
      return response.data[0];
    } catch (error) {
      console.error("Error fetching user data:", error);
      return {};
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const temp = await fetchUserData();
      setUserData(temp);
      console.log(userData);
      setName(userData.NAME);
      setMobile(userData.MOBILE_NUMBER);
      setAddress(userData.ADDRESS);
      setPaymentOption(userData.paymentOption);
      setIsLoading(false);
    };

    fetchData();
    // axios
    //   .get(`http://localhost:4000/profile`)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setUserData(res.data);
    //       console.log("userdata in checkout", userData);
    //       setName(res.data.NAME);
    //       setMobile(res.data.MOBILE_NUMBER);
    //       setAddress(res.data.ADDRESS);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get("http://localhost:4000/checkout")
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
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

      <div className="flex w-[90%] mx-auto  h-[75%] rounded overflow-hidden shadow-md ">
        {isLoading ? (
          <Loading />
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
