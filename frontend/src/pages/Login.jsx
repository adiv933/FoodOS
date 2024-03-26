import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import burger from "../../public/assets/loginCarousal/burger.jpg";
import dosa from "../../public/assets/loginCarousal/dosa.jpg";
import momos from "../../public/assets/loginCarousal/momos.jpg";
import pavbhaji from "../../public/assets/loginCarousal/pavbhaji.jpg";
import paneer from "../../public/assets/loginCarousal/paneer.jpg";
import cholabhatura from "../../public/assets/loginCarousal/cholabhatura.jpg";

const dishes = [
  {
    key: 0,
    dishName: "Dosa",
    dishOneliner: "Crunchy bliss, bursting with flavor!",
    dishImg: dosa,
  },
  {
    key: 1,
    dishName: "Momos",
    dishOneliner: "Succulent bites of pure delight!",
    dishImg: momos,
  },
  {
    key: 2,
    dishName: "Paneer Makhani",
    dishOneliner: "Creamy indulgence in every spoon!",
    dishImg: paneer,
  },
  {
    key: 3,
    dishName: "Burger",
    dishOneliner: "Satisfying bites of culinary joy!",
    dishImg: burger,
  },
  {
    key: 4,
    dishName: "Pav Bhaji",
    dishOneliner: "Spicy comfort in every bite!",
    dishImg: pavbhaji,
  },
  {
    key: 5,
    dishName: "Chole Bhature",
    dishOneliner: "Rich flavors, pure satisfaction!",
    dishImg: cholabhatura,
  },
];

// eslint-disable-next-line react/prop-types
const DishCard = ({ dishName, dishOneliner, dishImg }) => {
  return (
    <div className="relative w-full h-full">
      <img
        className="w-full h-full object-cover"
        src={dishImg}
        alt={dishName}
        style={{ width: "100%", height: "100%" }}
      />
      <div className="absolute inset-0 flex flex-col-reverse items-end">
        <div className="w-full bg-gradient-to-b from-transparent to-black text-white p-4">
          <h2 className="text-3xl font-bold mx-6">{dishName}</h2>
          <p className="text-md mx-6 mb-8">{dishOneliner}</p>
        </div>
      </div>
    </div>
  );
};

const DishCardView = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % dishes.length);
    }, 3500); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-sm mx-auto  w-full h-full">
      {dishes.map((dish, index) => (
        <div
          key={index}
          className={`absolute inset-0 duration-1000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <DishCard
            dishName={dish.dishName}
            dishOneliner={dish.dishOneliner}
            dishImg={dish.dishImg}
          />
        </div>
      ))}
    </div>
  );
};

export default function Login() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleAlreadyHaveAccountClick = () => {
    setIsRegistered(!isRegistered);
    setOtpSent(false); // Reset OTP sent status when toggling between registration and login
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistered) {
      // Handle login with OTP logic here
      console.log("Login with OTP:", mobile, otp);
    } else {
      // Handle registration logic here
      console.log("Register:", name, mobile);
    }
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    setOtpSent(false); // Reset OTP sent status when mobile number changes
  };

  const handleSendOtpClick = () => {
    // In a real scenario, you would send OTP via SMS or email here
    console.log("OTP sent to:", mobile);
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden overscroll-y-hidden py-auto px-6 bg-amber-400 ">
      <div className="relative h-[600px] w-[1000px] flex items-center justify-center ">
        <div className="absolute left-24 p-8 w-[500px] h-[600px] shadow-2xl shadow-black-800 flex flex-col justify-center items-center">
          <DishCardView />
        </div>
        <div className="absolute right-0 p-8 w-[500px] h-[500px] shadow-2xl shadow-black-800 bg-white rightCard">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {isRegistered ? "Login" : "Register"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isRegistered && (
              <div>
                <label className="text-lg block mb-1">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                />
              </div>
            )}
            <div>
              <label className="text-lg block mb-1">Mobile Number:</label>
              <input
                type="text"
                value={mobile}
                onChange={handleMobileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              />
            </div>
            {mobile && (
              <div>
                {!otpSent && (
                  <button
                    type="button"
                    onClick={handleSendOtpClick}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  >
                    Send OTP
                  </button>
                )}
              </div>
            )}

            {otpSent && (
              <>
                <div>
                  <label className="text-lg block mb-1">OTP:</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                  />
                </div>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-600">
                  <Link to="/home" className="px-40 py-2">
                    {isRegistered ? "Login" : "Register"}
                  </Link>
                </button>
              </>
            )}
          </form>
          <p className="mt-4">
            {isRegistered
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              className="text-red-500 underline"
              onClick={handleAlreadyHaveAccountClick}
            >
              {isRegistered ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
