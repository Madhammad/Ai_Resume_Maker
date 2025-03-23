import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { FaExpeditedssl } from "react-icons/fa6";
import axios from "axios";
import { update } from "../../store/redux/userSlice";
import { toast } from "react-hot-toast";

export function DashProfile({ handleSignOut }) {
  const { currentUser, loading } = useSelector((state) => state.user);

  const [isUpdate, setUpdate] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const dispatch = useDispatch();

  const startUpdate = () => {
    setUpdate((prevState) => !prevState);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    console.log(name, email);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/auth/updateUser/${currentUser._id}`,
        {
          name: name,
          email: email,
        },
        {
          withCredentials: true,
        }
      );

      console.log("updatedUser", data.data);

      if (!data.success) {
        toast.error(data.message || "error in Sign In");
      } else {
        dispatch(update(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full relative">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-4">
        <div>
          <input
            id="name"
            type="text"
            defaultValue={currentUser.username}
            required
            onChange={(e) => setName(e.target.value)}
            readOnly={!isUpdate}
          />
        </div>
        <div>
          <input
            id="email1"
            type="email"
            defaultValue={currentUser.email}
            required
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!isUpdate}
          />
        </div>

        <button type="submit" disabled={!isUpdate} onClick={handleUpdate}>
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      <div className="text-red-800 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>

      <div
        className="absolute top-10 right-0 text-yellow-50 text-2xl  "
        onClick={startUpdate}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {!isUpdate ? <FaExpeditedssl /> : <CiEdit />}
      </div>
      {isHover && (
        <div className="absolute top-10 text-xs right-8  bg-blue-300 p-2 rounded-3xl text-slate-500">
          Click to Update Profile
        </div>
      )}
    </div>
  );
}
