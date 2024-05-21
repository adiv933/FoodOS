import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminLogin = (e) => {
    e.preventDefault();

    setIsAdmin(true);
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "admin" && password === "admin") {
      navigate("/admin/add/restaurant");
    }
    try {
      const response = await axios.post("http://localhost:4000/login", {
        name,
        password,
      });
      if (response.data && Object.keys(response.data).length > 0) {
        console.log("Login successful:", response.data);

        navigate("/home", { state: { userData: response.data } });
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
      <h1 className="mb-8 text-center text-3xl">
        {isAdmin ? "Hello Admin" : "Login"}
      </h1>
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
            className="mt-1 w-full rounded-md border p-2"
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
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>
        <div className="my-8">
          <button
            type="submit"
            className="w-full rounded-md bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 focus:bg-amber-600 focus:outline-none"
          >
            Login
          </button>
        </div>
        <button className="text-red-500 underline" onClick={handleAdminLogin}>
          Admin login
        </button>
      </form>
    </div>
  );
}

export default Login;
