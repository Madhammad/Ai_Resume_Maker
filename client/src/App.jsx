import { Route, Routes, useNavigate } from "react-router-dom";
import { SignUp } from "./page/SignUp";
import { SignIn } from "./page/SignIn";
import Dashbored from "./page/Dashbored";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signOut } from "../store/redux/userSlice";
import Header from "./components/Header";
import Home from "./page/Home";
import { EmailVerification } from "./page/EmailVerification";

import ResetPasswordVerifiyToken from "./page/ResetPasswordVerifiyToken";
import { ResetPassword } from "./page/ResetPassword";
import { Toaster } from "react-hot-toast";
import { URL_BACKEND } from "../constant";
import CreateCv from "./page/CreateCv";
import CVPage from "./page/CVPage";
import DownloadCV from "./page/DownloadCV";
import Footer from "./components/Footer";
import AllCVs from "./page/AllCVs";
import About from "./page/About";
import AllUserCVs from "./page/AllUserCVs ";
import ForgetPassword from './page/ForgetPassword';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSignOut = async () => {
    try {
      await axios.post(
        `${URL_BACKEND}/api/auth/signOut`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(signOut());
      navigate("/signIn");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header handleSignOut={handleSignOut} />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/emailVerification" element={<EmailVerification />} />
        <Route
          path="/dashbored"
          element={<Dashbored handleSignOut={handleSignOut} />}
        />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route
          path="/passwordresetVerifiyToken"
          element={<ResetPasswordVerifiyToken />}
        />
        <Route
          path={"/resetPassword/:userid"}
          element={<ResetPassword />}
        />

        <Route path="/createCv" element={<CreateCv />} />

        <Route path="/allCVs" element={<AllCVs />} />
        <Route path="/alluserCVs" element={<AllUserCVs />} />
        <Route path="/CVPage" element={<CVPage />} />
        <Route path="/downloadCV/:cvId" element={<DownloadCV />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
