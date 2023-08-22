import Link from "next/link";

export default function Login() {
  return (
    <div className="flex-1 flex flex-col gap-20 items-center justify-center bg-white">
      <h1>Welcome Back</h1>
      <form className="flex flex-col flex-initial gap-5">
        <label>
          <h3>Email Address</h3>
          <input
            type="text"
            placeholder="email@example.com"
            className="text-gray-600 bg-gray-50 border text-sm rounded-lg p-2"
          />
        </label>
        <label>
          <h3>Password</h3>
          <input
            type="text"
            placeholder="enter password"
            className="text-gray-600 bg-gray-50 border text-sm rounded-lg p-2"
          />
        </label>
        <button
          type="submit"
          className="mt-16 text-white bg-primary hover:bg-green-600 rounded-full text-sm w-full px-5 py-2.5"
        >
          Login
        </button>
        <Link href="/" className="text-primary underline text-sm text-center">
          Forgot your password?
        </Link>
      </form>
    </div>
  );
}
