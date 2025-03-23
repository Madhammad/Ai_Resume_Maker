import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { URL_BACKEND } from "../../constant";
import { toast } from "react-hot-toast";

export default function DashPasswordUpdate() {
  const { currentUser } = useSelector((state) => state.user);

  const [oldPassword, setoldPassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${URL_BACKEND}/api/auth/passwordChange/${currentUser._id}`,
        {
          oldPassword,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("updatedPassword", data);

      if (data.success === false) {
        return toast.error(data.message);
        // console.log("error", errorMsg);
      }

      if (data.success === true) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full relative">
      <h1 className="my-7 text-center font-semibold text-3xl">
        Password Change
      </h1>

      <form className="flex flex-col gap-4">
        <input type="file" accept="image/*" hidden />
        <div>
          <input
            id="password1"
            type="text"
            placeholder="Old Password"
            required
            onChange={(e) => setoldPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            id="password2"
            type="text"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" onClick={handleUpdate}>
          Password Update
        </button>
      </form>
    </div>
  );
}
