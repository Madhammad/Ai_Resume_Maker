import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/redux/userSlice";
import { URL_BACKEND } from "../../constant";
import toast from "react-hot-toast";
import Logo from "./../components/helper/Logo";

export function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesubmite = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${URL_BACKEND}/api/auth/signIn`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (!data.success) {
        setLoading(false);
        return toast.error(data.message || "error in Sign In");
      }

      if (data.success) {
        setLoading(false);
        dispatch(signIn(data.data));
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="p-6 max-w-3xl w-full shadow-lg rounded-lg flex flex-col md:flex-row md:items-center gap-8">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left">
          <Logo />
          <p className="text-gray-600 text-sm mt-4">
            This is Project Lab App. You can sign up with your email and save
            your project.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <form
            onSubmit={handlesubmite}
            className="flex flex-col gap-4 text-gray-700 "
          >
            {/* Email Input */}
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-gray-700 font-semibold">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@airesume.com"
                required
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="password2"
                className="text-gray-700 font-semibold"
              >
                Your Password
              </label>
              <input
                id="password2"
                type="password"
                required
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>

            {/* Forgot Password Link */}
            <Link
              to="/forgetPassword"
              className="text-sm text-gray-500 hover:underline font-semibold text-right"
            >
              Forgot Password?
            </Link>
          </form>

          {/* Sign Up Link */}
          <div className="flex justify-center text-sm mt-4">
            <span className="text-gray-600">Don't have an account?</span>
            <Link
              to="/signUp"
              className="text-blue-500 font-semibold ml-1 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
