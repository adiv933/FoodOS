import { useState } from "react";
import DishCardView from "../components/DishCardView";
import Login from "../components/Login";
import Register from "../components/Register";

// export default function Login() {
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [registerData, setRegisterData] = useState({ name: "", mobile: "" });

//   const handleAlreadyHaveAccountClick = () => {
//     setName("");
//     setOtp("");
//     setMobile("");
//     setIsRegistered(!isRegistered);
//     setOtpSent(false); // Reset OTP sent status when toggling between registration and login
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isRegistered) {
//       // Handle login with OTP logic here
//       console.log({ mobile, otp });
//     } else {
//       setRegisterData({ ...registerData, [e.target.name]: e.target.value });
//       console.log(registerData);
//       // axios
//       //   .post("http://localhost:4000/login/new", { registerData })
//       //   .then((res) => console.log(res))
//       //   .catch((err) => console.log(err));
//     }
//   };

//   const handleMobileChange = (e) => {
//     const input = e.target.value;
//     const formattedInput = input.replace(/\D/g, "").slice(0, 10);
//     setMobile(formattedInput);
//     setOtpSent(false); // Reset OTP sent status when mobile number changes
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center overflow-hidden overscroll-y-hidden py-auto px-6 bg-amber-400 ">
//       <div className="relative h-[600px] w-[1000px] flex items-center justify-center ">
//         <div className="absolute left-24 p-8 w-[500px] h-[600px] shadow-2xl shadow-black-800 flex flex-col justify-center items-center">
//           <DishCardView />
//         </div>
//         <div className="absolute right-0 p-8 w-[500px] h-[500px] shadow-2xl shadow-black-800 bg-white rightCard">
//           <h2 className="text-2xl font-semibold mb-4 text-center">
//             {isRegistered ? "Login" : "Register"}
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {!isRegistered && (
//               <div>
//                 <label className="text-lg block mb-1">Name:</label>
//                 <input
//                   type="text"
//                   value={name}
//                   name="name"
//                   onChange={(e) => {
//                     // Allow only alphabets
//                     const formattedName = e.target.value.replace(
//                       /[^A-Z a-z]/gi,
//                       ""
//                     );
//                     setName(formattedName);
//                   }}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
//                 />
//               </div>
//             )}
//             <div>
//               <label className="text-lg block mb-1">Mobile Number:</label>
//               <input
//                 type="text"
//                 value={mobile}
//                 name="mobile"
//                 onChange={handleMobileChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
//               />
//             </div>
//             {mobile && (
//               <div>
//                 {!otpSent && (
//                   <button
//                     type="button"
//                     className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
//                   >
//                     Send OTP
//                   </button>
//                 )}
//               </div>
//             )}

//             {otpSent && (
//               <>
//                 <div>
//                   <label className="text-lg block mb-1">OTP:</label>
//                   <input
//                     type="text"
//                     value={otp}
//                     name="otp"
//                     onChange={(e) => setOtp(e.target.value)}
//                     maxLength={6} // Limiting OTP to 6 digits
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
//                   />
//                 </div>
//                 <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-600">
//                   {isRegistered ? "Login" : "Register"}
//                 </button>
//               </>
//             )}
//           </form>
//           <p className="mt-4">
//             {isRegistered
//               ? "Don't have an account? "
//               : "Already have an account? "}
//             <button
//               className="text-red-500 underline"
//               onClick={handleAlreadyHaveAccountClick}
//             >
//               {isRegistered ? "Register here" : "Login here"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function LoginRegisterForm() {
  const [isRegistered, setIsRegistered] = useState(false);
  const handleAlreadyHaveAccountClick = () => {
    setIsRegistered(!isRegistered);
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden overscroll-y-hidden py-auto px-6 bg-amber-400 ">
      <div className="relative h-[600px] w-[1000px] flex items-center justify-center ">
        <div className="absolute left-24 p-8 w-[500px] h-[600px] shadow-2xl shadow-black-800 flex flex-col justify-center items-center">
          <DishCardView />
        </div>
        <div className="absolute right-0 p-8 w-[500px] h-[500px] shadow-2xl shadow-black-800 bg-white rightCard">
          {isRegistered ? <Login /> : <Register />}
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
