function Register() {
  return (
    <div>
      <h1 className="text-center text-3xl mb-2">Register</h1>

      <form
        action="http://localhost:4000/register"
        method="POST"
        className="max-w-sm mx-auto w-full"
      >
        <div className="mb-2">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="mobileNumber" className="block text-gray-700">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobileNumber"
            pattern="[0-9]{10}"
            required
            className="mt-1 p-2 w-full border rounded-md appearance-none"
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
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="my-4">
          <button
            type="submit"
            className="bg-amber-500 text-white py-2 px-4 rounded-md w-full hover:bg-amber-600 focus:outline-none focus:bg-amber-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
