import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function Order() {
  return (
    <div className="border-2 p-2 h-fit my-4 rounded">
      <p>order #</p>
      <p>date</p>
      <p>price</p>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");

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

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "mobileNumber":
        setMobileNumber(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsEditing((prev) => !prev);
  };

  const [activeTab, setActiveTab] = useState("profile");

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
                  className={`py-2 px-4 mb-2 rounded-l-full ${
                    activeTab === "profile"
                      ? "bg-amber-300 rounded-r-0"
                      : "bg-blur1 rounded-full mr-2  hover:bg-amber-400"
                  }`}
                  onClick={() => handleTabChange("profile")}
                >
                  Profile
                </button>
                <button
                  className={`py-2 px-4 mb-2 rounded-l-full ${
                    activeTab === "orderHistory"
                      ? "bg-amber-300 rounded-r-0"
                      : "bg-blur1 rounded-full mr-2 hover:bg-amber-400"
                  }`}
                  onClick={() => handleTabChange("orderHistory")}
                >
                  Order History
                </button>
              </div>

              {/* Signout button */}
              <Link
                to="/login"
                className="py-2 px-4 mt-auto mx-4 bg-red-500 hover:bg-red-600   text-white rounded text-center hover:-translate-y-1 hover:shadow-lg duration-100"
              >
                <button>Sign Out</button>
              </Link>
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        value={address || "No address provided yet"}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    {/* <div className="w-1/2 p-2 mb-4 bg-gray-100 shadow-md rounded">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Password:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div> */}
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
                  <Order />
                  <Order />
                  <Order />
                  <Order />
                  <Order />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        navigate("/login")
      )}
    </div>
  );
}
