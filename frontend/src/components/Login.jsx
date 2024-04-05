function Login() {
  return (
    <div>
      <h1 className="text-center text-3xl mb-8">Login</h1>
      <form
        action="http://localhost:4000/login"
        method="POST"
        className="mx-auto w-full max-w-sm"
      >
        <div className="mb-4">
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
        <div className="mb-4">
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
