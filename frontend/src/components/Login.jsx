function Login() {
<<<<<<< HEAD
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
      const response = await axios.post("http://localhost:4000/auth/login", {
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
=======
>>>>>>> b2b42a57e1ced389e4e9999761f4c1656034eb71
  return (
    <div>
      <h1 className="mb-2 text-center text-3xl">Login</h1>

      <form
        action={`${import.meta.env.VITE_BASE_SERVER_URL}/auth/login`}
        method="POST"
        className="mx-auto w-full max-w-sm"
      >
        <div className="mb-2">
          <label htmlFor="mobileNumber" className="block text-gray-700">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobileNumber"
            pattern="[0-9]{10}"
            required
            className="mt-1 w-full appearance-none rounded-md border p-2"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <div className="my-4">
          <button
            type="submit"
            className="w-full rounded-md bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 focus:bg-amber-600 focus:outline-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
