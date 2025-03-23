// import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/redux/userSlice";
import { URL_BACKEND } from "./../../constant";
import { toast } from "react-hot-toast";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confimedPassword, setconfimedPassword] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  // const { userId } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlesubmite = async (e) => {
    e.preventDefault();

    if (password !== confimedPassword) {
      toast.success("New password should be change");
      return;
    }

    try {
      const { data } = await axios.post(
        `${URL_BACKEND}/api/auth/resetPassword/${currentUser?._id}`,
        {
          password,
        },
        { withCredentials: true }
      );

      // console.log("data:", data.message);

      if (data.success === false) {
        return toast.error(data.message);
      }

      if (data.success) {
        toast.error("Password reset successfully");
        dispatch(signOut());
        navigate("/signIn");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="h-screen w-full  bg-slate-700 p-10">
        <div className=" w-full flex justify-center gap-10  ">
          <form
            onSubmit={handlesubmite}
            className="flex flex-col gap-2    mt-10 p-10 rounded-lg  bg-gray-500 text-white relative"
          >
            <div>
              <div className="mb-2 block">
                <label htmlFor="email2" value="New Password" />
              </div>
              <input
                id="password1"
                type="text"
                placeholder="password"
                required
                shadow
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <label htmlFor="password2" value="Confirm New Password" />
              </div>
              <input
                id="password2"
                type="password"
                required
                shadow
                onChange={(e) => setconfimedPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="mt-5">
              Set Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
