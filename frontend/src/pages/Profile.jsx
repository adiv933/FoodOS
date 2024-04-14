/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Modal, Snackbar } from "@mui/material";


function OrderList({ orderData }) {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);

  const handleOpen = (index, id) => {
    setOpenModalIndex(index);
    axios.get(`http://localhost:4000/orderDetails/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setOrderDetail(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpenModalIndex(null);
    setOrderDetail([]);
  };

  return (
    <>
      {orderData.map((order, index) => (
        order.TOTAL_AMOUNT && (
          <div className="border-2 p-2 h-fit my-4 rounded" key={index} onClick={() => handleOpen(index, order.ORDER_ID)}>
            <Modal
              open={openModalIndex === index}
              onClose={handleClose}
            >
              <div className="w-[50%] h-[75%] mx-auto mt-24 text-black p-6 overflow-auto bg-blur1">
                <h1 className="text-2xl">Order details for order#{order.ORDER_ID}</h1>
                {orderDetail.map((data, dataIndex) => (
                  <div key={dataIndex} className="p-4 h-fit my-4 rounded shadow-lg bg-amber-400">
                    <p>
                      <b>Dish name:</b> {data.NAME}
                    </p>
                    <p>
                      <b>Price:</b> ₹{data.PRICE}
                    </p>
                    <p>
                      <b>Date:</b> {order.ORDER_TIMESTAMP}
                    </p>
                  </div>
                ))}
                <p className="text-xl mt-16 font-semibold ">
                  Total Price: ₹{order.TOTAL_AMOUNT}
                </p>
                <p className="mt-6 font-semibold ">
                  Press <b>ESC</b> to close
                </p>
              </div>
            </Modal >
            <p>
              <b>Order </b>#{order.ORDER_ID}
            </p>
            <p>
              <b>Date:</b> {order.ORDER_TIMESTAMP}
            </p>
            <p>
              <b>Price:</b> ₹{order.TOTAL_AMOUNT}
            </p>
          </div >
        )
      ))
      }
    </>
  );
}


export default function Profile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:4000/profile`)
      .then((res) => {
        if (res.status === 200) {
          setUserData(res.data[0]);
          const { NAME, MOBILE_NUMBER, ADDRESS } = res.data[0];
          setName(NAME);
          setMobileNumber(MOBILE_NUMBER);
          setAddress(ADDRESS);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setIsEditing((prev) => !prev);
  };

  const handleOrderClick = () => {
    handleTabChange("orderHistory");
    axios
      .get("http://localhost:4000/allOrders")
      .then((res) => {
        if (res.status === 200) {
          setOrderData(res.data);
          // console.log("Order History", res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-screen">
      {userData ? (
        <>
          <Navbar />

          <div className="flex w-[90%] h-[75%] mx-auto rounded overflow-hidden shadow-md">
            <div className="flex flex-col w-1/4 bg-blur2 py-4 pl-4 ">
              {/* User image */}
              <div className="p-4 mb-8 mr-4">
                <img
                  src="https://i.pravatar.cc/"
                  alt="User"
                  className="w-48 h-48 rounded-full mx-auto mb-4 border-2 border-black "
                />
                <h1 className="font-semibold text-center">{name}</h1>
              </div>

              {/* Sidebar tabs */}
              <div className="flex flex-col">
                <button
                  className={`py-2 px-4 mb-2 rounded-l-full ${activeTab === "profile"
                    ? "bg-amber-300 rounded-r-0"
                    : "bg-blur1 rounded-full mr-2  hover:bg-amber-400"
                    }`}
                  onClick={() => handleTabChange("profile")}
                >
                  Profile
                </button>
                <button
                  className={`py-2 px-4 mb-2 rounded-l-full ${activeTab === "orderHistory"
                    ? "bg-amber-300 rounded-r-0"
                    : "bg-blur1 rounded-full mr-2 hover:bg-amber-400"
                    }`}
                  onClick={() => handleOrderClick()}
                >
                  Order History
                </button>
              </div>

              {/* Signout button */}
              <button
                onClick={() => {
                  axios
                    .post("http://localhost:4000/logout")
                    .then((res) => console.log(res))
                    .catch((err) => {
                      console.log(err);
                    });
                  navigate("/login");
                }}
                className="py-2 px-4 mt-auto mx-4 bg-red-500 hover:bg-red-600   text-white rounded text-center hover:-translate-y-1 hover:shadow-lg duration-100"
              >
                Log Out
              </button>
            </div>

            {/* Right side content */}
            <div className=" p-8 bg-white w-[75%]">
              {activeTab === "profile" && (
                <form
                  className=" mx-auto bg-white  rounded h-full px-8 pt-6 pb-8 mb-4"
                  action="http://localhost:4000/profile"
                  method="POST"
                >
                  <div className="flex flex-wrap w-full h-full">
                    <div className="w-1/2 p-2 mb-4 bg-gray-100 shadow-md rounded">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Name:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="w-1/2 p-2 mb-4 bg-gray-100 shadow-md rounded">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="mobileNumber"
                      >
                        Mobile Number:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="mobileNumber"
                        type="text"
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="w-1/2 p-2 mb-4 bg-gray-100 shadow-md rounded">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="address"
                      >
                        Address:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        name="address"
                        value={
                          address ||
                          (isEditing ? "" : "No address provided yet")
                        }
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>


                  {!isEditing ? (
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:-translate-y-1 hover:shadow-lg duration-100"
                      onClick={handleClick}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <button
                        className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:-translate-y-1 hover:shadow-lg duration-100"
                        type="submit"
                      >
                        Save Changes
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:-translate-y-1 hover:shadow-lg duration-100"
                        onClick={handleClick}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              )}

              {activeTab === "orderHistory" && (
                <div className="bg-white p-4 rounded shadow h-full overflow-auto">
                  {/* Display order history here */}
                  <h2 className="border-b-2 p-2 mb-8 text-xl">Order History</h2>
                  <OrderList orderData={orderData} />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col w-[40%] h-[80%] bg-blur1 rounded border-2 mx-auto mt-12 p-16">
          <h1 className="text-2xl font-semibold my-8 text-center">
            Login or create account to start ordering
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="w-fit mx-auto bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:-translate-y-1 hover:shadow-lg duration-100"
          >
            To Login Page
          </button>
        </div>
      )}
    </div>
  );
}

