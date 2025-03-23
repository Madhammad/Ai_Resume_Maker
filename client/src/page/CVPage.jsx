import { useState } from "react";

import ProfessionalCV from "../components/CV/ProfessionalCV";
import ModernCV from "./../components/CV/ModernCV";
import { Check } from "lucide-react";
import ClassicCv from "./../components/CV/ClassicCv";
import CreativeCV from "./../components/CV/CreativeCV";
import { PropTypes } from "prop-types";

export default function CVPage({
  textcolor,
  bgcolor,
  setBgcolor,
  setTextcolor,
  personalInfo,
  education,
  certificates,
  skills,
  projects,
  experience,
  languages,
  summary,
  cvTemplate,
  onlyCVDisplay,
  profileImage,
}) {
  const [selectedColor, setSelectedColor] = useState("bg-teal-500");

  const colors = [
    { bg: "bg-sky-800", text: "text-sky-800" },
    { bg: "bg-teal-500", text: "text-teal-500" },
    { bg: "bg-orange-800", text: "text-orange-800" },
    { bg: "bg-indigo-700", text: "text-indigo-700" },
    { bg: "bg-gray-700", text: "text-gray-700" },
    { bg: "bg-yellow-500", text: "text-yellow-500" },
    { bg: "bg-blue-500", text: "text-blue-500" },
  ];

  // AI

  return (
    <div className="container mx-auto">
      {!onlyCVDisplay && (
        <div className="color section w-fit p-2 rounded-lg shadow-md fixed top-20 right-0 mt-4  z-10 dark:bg-[rgb(23,34,62)]">
          <h1 className="text-[7px] font-semibold dark:text-white text-gray-800 mb-3">
            Color
          </h1>
          <div className="flex gap-2 flex-col">
            {colors.map((color) => (
              <div
                key={color.bg}
                className={`${color.bg} h-5 w-5 rounded-full hover:scale-110 hover:shadow-md transition-all cursor-pointer flex items-center justify-center`}
                onClick={() => {
                  setBgcolor(color.bg);
                  setTextcolor(color.text);
                  setSelectedColor(color.bg); // Update selected color
                }}
              >
                {selectedColor === color.bg && (
                  <Check size={12} className="text-white" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {cvTemplate === "classic" && (
        <ClassicCv
          textcolor={textcolor}
          bgcolor={bgcolor}
          personalInfo={personalInfo}
          education={education}
          certificates={certificates}
          projects={projects}
          experience={experience}
          languages={languages}
          summary={summary}
          skills={skills}
          profileImage={profileImage}
        />
      )}
      {cvTemplate === "modern" && (
        <ModernCV
          textcolor={textcolor}
          bgcolor={bgcolor}
          personalInfo={personalInfo}
          education={education}
          certificates={certificates}
          projects={projects}
          experience={experience}
          languages={languages}
          summary={summary}
          skills={skills}
          profileImage={profileImage}
        />
      )}
      {cvTemplate === "professional" && (
        <ProfessionalCV
          textcolor={textcolor}
          bgcolor={bgcolor}
          personalInfo={personalInfo}
          education={education}
          certificates={certificates}
          projects={projects}
          experience={experience}
          languages={languages}
          summary={summary}
          skills={skills}
          profileImage={profileImage}
        />
      )}
      {cvTemplate === "creative" && (
        <CreativeCV
          textcolor={textcolor}
          bgcolor={bgcolor}
          personalInfo={personalInfo}
          education={education}
          certificates={certificates}
          projects={projects}
          experience={experience}
          languages={languages}
          summary={summary}
          skills={skills}
          profileImage={profileImage}
        />
      )}
    </div>
  );
}

CVPage.propTypes = {
  textcolor: PropTypes.string,
  bgcolor: PropTypes.string,
  setBgcolor: PropTypes.func,
  setTextcolor: PropTypes.func,
  personalInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    linkdin: PropTypes.string,
    headline: PropTypes.string,
  }),
  certificates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      institution: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    })
  ),
  education: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string.isRequired,
      institution: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    })
  ),
  experience: PropTypes.arrayOf(
    PropTypes.shape({
      jobTitle: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
    })
  ),
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      proficiency: PropTypes.string.isRequired,
    })
  ),
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired, // level is a number
    })
  ),
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
    })
  ),
  summary: PropTypes.string,
};
