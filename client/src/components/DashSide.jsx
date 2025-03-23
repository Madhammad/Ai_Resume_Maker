// import { Sidebar } from "flowbite-react";
import { useState } from "react";
import { HiChartPie, HiTable, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export function DashSide({ handleSignOut }) {
  const { currentUser } = useSelector((state) => state.user);

  const [tab, setTab] = useState("");

  const location = useLocation();

  useState(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");

    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  return (
    <div className="bg-blue-400">
      <Link to="/dashbored?tab=userCv">
        active={tab === "userCv"}
        icon={HiChartPie}
        labelColor="dark" as="div" Resumes
      </Link>
      <Link to="/dashbored?tab=profile">
        active={tab === "profile"}
        icon={HiUser}
        label={currentUser?.role === "admin" ? "Admin" : "User"}
        labelColor="dark" as="div" Profile
      </Link>
      <Link to="/dashbored?tab=changePassword">
        active={tab === "changePassword"}
        icon={HiUser}
        // label={currentUser?.role === "admin" ? "Admin" : "User"}
        labelColor="dark" as="div" Change Password
      </Link>
      Sign Out
    </div>
  );
}
