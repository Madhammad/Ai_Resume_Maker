// import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/redux/userSlice";
import { URL_BACKEND } from "../../constant";
import toast from "react-hot-toast";
import Logo from "../components/helper/Logo";

export function SignUp() {
  const [username, setUsername] = useState("");
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
        `${URL_BACKEND}/api/auth/register`,
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("data", data);

      if (data.success === false) {
        setLoading(false);
        return toast.error(data.message || "error in Sign In");
      }

      if (data.success === true) {
        const { user, token } = data.data;
        setLoading(false);

        dispatch(signIn({ user, token }));

        toast.success(data.message);
        navigate("/emailVerification");
      }
    } catch (error) {
      console.log("error:", error);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="p-6 max-w-3xl w-full  shadow-lg rounded-lg flex flex-col md:flex-row md:items-center gap-8">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left">
          <Logo />
          <p className="text-gray-600 text-sm mt-4">
            This is Project Lab App. You can sign up with your email and save
            your project.
          </p>
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="flex-1">
          <form
            onSubmit={handlesubmite}
            className="flex flex-col gap-4 text-gray-700"
          >
            {/* Username Input */}
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className=" font-semibold">
                Username
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your username"
                required
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-gray-700 font-semibold">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@mern.com"
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
                Password
              </label>
              <input
                id="password2"
                type="password"
                placeholder="********"
                required
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          {/* Already have an account? */}
          <div className="flex justify-center text-sm mt-4">
            <span className="text-gray-600">Already have an account?</span>
            <Link
              to="/signIn"
              className="text-blue-500 font-semibold ml-1 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
