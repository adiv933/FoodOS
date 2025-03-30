function Register() {
  return (
    <>
      <div>
        <h1 className="mb-2 text-center text-3xl">Register</h1>

        <form
          action="http://localhost:4000/auth/register"
          method="POST"
          className="mx-auto w-full max-w-sm"
        >
          <div className="mb-2">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full rounded-md border p-2"
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
              Register
            </button>
          </div>
        </form>
      </div>
      <div>

      </div>
    </>
  );
}

export default Register;
