/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Modal } from "@mui/material";

function OrderList({ orderData }) {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);

  const handleOpen = (index, id) => {
    setOpenModalIndex(index);
    axios
      .get(`http://localhost:4000/order/orderDetails/${id}`)
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
      {orderData.map(
        (order, index) =>
          order.TOTAL_AMOUNT && (
            <div
              className="my-4 h-fit cursor-pointer rounded border-2 p-2 duration-100 hover:-translate-y-1 hover:shadow hover:shadow-amber-500"
              key={index}
              onClick={() => handleOpen(index, order.ORDER_ID)}
            >
              <Modal open={openModalIndex === index} onClose={handleClose}>
                <div className="bg-blur1 mx-auto mt-24 h-[75%] w-[50%] overflow-auto p-6 text-black">
                  <h1 className="text-2xl">
                    Order details for order#{order.ORDER_ID}
                  </h1>
                  {orderDetail.map((data, dataIndex) => (
                    <div
                      key={dataIndex}
                      className="my-4 h-fit rounded bg-amber-400 p-4 shadow-lg"
                    >
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
                  <p className="mt-16 text-xl font-semibold ">
                    Total Price: ₹{order.TOTAL_AMOUNT}
                  </p>
                  <p className="mt-6 font-semibold ">
                    Press <b>ESC</b> to close
                  </p>
                </div>
              </Modal>
              <p>
                <b>Order </b>#{order.ORDER_ID}
              </p>
              <p>
                <b>Date:</b> {order.ORDER_TIMESTAMP}
              </p>
              <p>
                <b>Price:</b> ₹{order.TOTAL_AMOUNT}
              </p>
            </div>
          ),
      )}
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
      .get("http://localhost:4000/order/allOrders")
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
    <div className="h-screen w-full">
      {userData ? (
        <>
          <Navbar />

          <div className="mx-auto flex h-[75%] w-[90%] overflow-hidden rounded shadow-md">
            <div className="bg-blur2 flex w-1/4 flex-col py-4 pl-4 ">
              {/* User image */}
              <div className="mb-8 mr-4 p-4">
                <img
                  src="https://i.pravatar.cc/"
                  alt="User"
                  className="mx-auto mb-4 h-48 w-48 rounded-full border-2 border-black "
                />
                <h1 className="text-center font-semibold">{name}</h1>
              </div>

              {/* Sidebar tabs */}
              <div className="flex flex-col">
                <button
                  className={`mb-2 rounded-l-full px-4 py-2 ${
                    activeTab === "profile"
                      ? "rounded-r-0 bg-amber-300"
                      : "bg-blur1 mr-2 rounded-full  hover:bg-amber-400"
                  }`}
                  onClick={() => handleTabChange("profile")}
                >
                  Profile
                </button>
                <button
                  className={`mb-2 rounded-l-full px-4 py-2 ${
                    activeTab === "orderHistory"
                      ? "rounded-r-0 bg-amber-300"
                      : "bg-blur1 mr-2 rounded-full hover:bg-amber-400"
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
                    .post("http://localhost:4000/auth/logout")
                    .then((res) => console.log(res))
                    .catch((err) => {
                      console.log(err);
                    });
                  navigate("/login");
                }}
                className="mx-4 mt-auto rounded bg-red-500 px-4 py-2   text-center text-white duration-100 hover:-translate-y-1 hover:bg-red-600 hover:shadow-lg"
              >
                Log Out
              </button>
            </div>

            {/* Right side content */}
            <div className=" w-[75%] bg-white p-8">
              {activeTab === "profile" && (
                <form
                  className=" mx-auto mb-4  h-full rounded bg-white px-8 pb-8 pt-6"
                  action="http://localhost:4000/profile"
                  method="POST"
                >
                  <div className="flex h-full w-full flex-wrap">
                    <div className="mb-4 w-1/2 rounded bg-gray-100 p-2 shadow-md">
                      <label
                        className="mb-2 block text-sm font-bold text-gray-700"
                        htmlFor="name"
                      >
                        Name:
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border bg-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="mb-4 w-1/2 rounded bg-gray-100 p-2 shadow-md">
                      <label
                        className="mb-2 block text-sm font-bold text-gray-700"
                        htmlFor="mobileNumber"
                      >
                        Mobile Number:
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border bg-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="mobileNumber"
                        type="text"
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="mb-4 w-1/2 rounded bg-gray-100 p-2 shadow-md">
                      <label
                        className="mb-2 block text-sm font-bold text-gray-700"
                        htmlFor="address"
                      >
                        Address:
                      </label>
                      <input
                        className="focus:shadow-outline w-full appearance-none rounded border bg-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
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
                      className="focus:shadow-outline rounded bg-gray-500 px-4 py-2 font-bold text-white duration-100 hover:-translate-y-1 hover:bg-gray-700 hover:shadow-lg focus:outline-none"
                      onClick={handleClick}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <button
                        className="focus:shadow-outline rounded bg-amber-500 px-4 py-2 font-bold text-white duration-100 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-lg focus:outline-none"
                        type="submit"
                      >
                        Save Changes
                      </button>
                      <button
                        className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white duration-100 hover:-translate-y-1 hover:bg-red-700 hover:shadow-lg focus:outline-none"
                        onClick={handleClick}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              )}

              {activeTab === "orderHistory" && (
                <div className="h-full overflow-auto rounded bg-white p-4 shadow">
                  {/* Display order history here */}
                  <h2 className="mb-8 border-b-2 p-2 text-xl">Order History</h2>
                  <OrderList orderData={orderData} />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-blur1 mx-auto mt-12 flex h-[80%] w-[40%] flex-col rounded border-2 p-16">
          <h1 className="my-8 text-center text-2xl font-semibold">
            Login or create account to start ordering
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="focus:shadow-outline mx-auto w-fit rounded bg-amber-500 px-4 py-2 font-bold text-white duration-100 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-lg focus:outline-none"
          >
            To Login Page
          </button>
        </div>
      )}
    </div>
  );
}
