import { useEffect, useState } from "react";
import { DashProfile } from "./../components/DashProfile";
import { DashSide } from "./../components/DashSide";
import { useLocation } from "react-router-dom";
import DashPasswordUpdate from "../components/DashPasswordUpdate";
import AllUserCVs from "./AllUserCVs ";

function Dashbored({ handleSignOut }) {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");

    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-blue-400">
      <div>
        <DashSide handleSignOut={handleSignOut} />
      </div>
      {tab === "profile" && <DashProfile handleSignOut={handleSignOut} />}
      {tab === "changePassword" && <DashPasswordUpdate />}
      {tab === "userCv" && <AllUserCVs />}
    </div>
  );
}

export default Dashbored;
