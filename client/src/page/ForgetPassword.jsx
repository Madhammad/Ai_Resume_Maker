import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/redux/userSlice";
import { toast } from "react-hot-toast";
import { URL_BACKEND } from "./../../constant";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

 

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlesubmite = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${URL_BACKEND}/api/auth/forgetPassword`,
        {
          email,
        },
        { withCredentials: true }
      );

      if (data.success === false) {
        return toast.error(data.message);
      }

      if (data.success) {
        const { user, token } = data.data;

        dispatch(signIn({ user, token }));
        toast.success(data.message);
        navigate("/passwordresetVerifiyToken");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center  p-6">
        <div className="w-full max-w-md">
          <form
            onSubmit={handlesubmite}
            className="flex flex-col gap-4 shadow-lg rounded-xl p-8"
          >
            <div>
              <label htmlFor="email" className="block  font-medium mb-2">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@AiRumse.com"
                required
                className="w-full p-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700  py-2 rounded-lg"
            >
              Send Verify Token
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
