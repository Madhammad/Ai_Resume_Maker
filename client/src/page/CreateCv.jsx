import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cvtemplate from "./Cvtemplate";
import CVData from "./../components/CVData";

export default function CreateCv() {
  const location = useLocation();
  const [tab, setTab] = useState();

  const [cvTemplate, setCVTemplate] = useState("classic");

  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const tabform = urlPrams.get("tab");

    if (tabform) {
      setTab(tabform);
    }
  }, [location.search]);

  return (
    <div>
      {tab === "cvtemplate" && (
        <Cvtemplate cvTemplate={cvTemplate} setCVTemplate={setCVTemplate} />
      )}
      {tab === "cvdata" && <CVData  cvTemplate={cvTemplate}/>}
    </div>
  );
}
