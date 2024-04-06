import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        name,
        password,
      });

      if (response.data && Object.keys(response.data).length > 0) {
        console.log("Login successful:", response.data);

        navigate("/home", { userData: response.data });
      } else {
        window.alert("Wrong name or password.");
        console.log("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="my-8">
          <button
            type="submit"
            className="bg-amber-500 text-white py-2 px-4 rounded-md w-full hover:bg-amber-600 focus:outline-none focus:bg-amber-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
