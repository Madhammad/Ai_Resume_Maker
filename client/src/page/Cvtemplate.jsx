import {
  Check,
  CircleCheck,
  CirclePlus,
  GraduationCap,
  Mail,
  MapPin,
  MapPinHouse,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { cv } from "../components/helper/CVdata";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Cvtemplate({ cvTemplate, setCVTemplate }) {
  const [selectedColor, setSelectedColor] = useState("bg-teal-500");

  // console.log(cvTemplate)

  const colors = [
    { bg: "bg-sky-800", text: "text-sky-800" },
    { bg: "bg-teal-500", text: "text-teal-500" },
    { bg: "bg-orange-800", text: "text-orange-800" },
    { bg: "bg-indigo-700", text: "text-indigo-700" },
    { bg: "bg-gray-700", text: "text-gray-700" },
    { bg: "bg-yellow-500", text: "text-yellow-500" },
    { bg: "bg-blue-500", text: "text-blue-500" },
  ];

  const [bgcolor, setBgcolor] = useState("bg-teal-500");
  const [textcolor, setTextcolor] = useState("text-teal-500");

  const getSkillLevel = (level) => {
    if (level <= 20) return { label: "Basic" };
    if (level <= 40) return { label: "Good" };
    if (level <= 70) return { label: "Experienced" };
    return { label: "Expert", color: "bg-green-400" };
  };

  return (
    <div className="container mx-auto py-5 md:px-20 relative">
      <h1
        className={`my-14 text-center  md:text-3xl font-bold tracking-wide 
              ${textcolor}  
             transition-all duration-300 shadow-lg hover:shadow-xl 
             w-fit rounded-lg mx-auto p-5 md:px-4 md:py-3
             `}
      >
        Select The Template To Create Your CV
      </h1>

      <Link
        to={"/createCv?tab=cvdata"}
        className="flex items-center gap-2 px-2  py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-fit mb-1  right-20 top-60 fixed"
      >
        <p className="text-xs">Next</p>
        <FiArrowRight className="w-5 h-5" />
      </Link>

      <div className="color section w-fit p-2 rounded-lg shadow-md fixed top-20 right-2 mt-4  z-10 dark:bg-[rgb(23,34,62)]">
        <h1 className="text-xs font-semibold dark:text-white text-gray-800 mb-3">
          Color
        </h1>
        <div className="flex gap-2 flex-col">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`${color.bg} h-5 w-5 rounded-full hover:scale-110 hover:shadow-md transition-all cursor-pointer flex items-center justify-center`}
              onClick={() => {
                setBgcolor(color.bg);
                setTextcolor(color.text);
                setSelectedColor(color.bg); // Update selected color
              }}
            >
              {selectedColor === color.bg && (
                <Check size={12} className="text-white text-[4px]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* //cvtemplate */}
      <div className="flex md:flex-row flex-wrap flex-col md:p-2  justify-center p-10 ">
        {/* classic */}
        <div className="shadow-lg md:max-w-48  p-2  border">
          <div className="flex justify-center items-center gap-3 mb-4">
            <p
              className=" text-xs font-medium cursor-pointer"
              onClick={() => setCVTemplate("classic")}
            >
              Classic
            </p>
            <CircleCheck
              className={cvTemplate === "classic" && "text-blue-600"}
            />
          </div>

          <div className=" shadow-lg border  bg-white p-2  mx-auto">
            <div>
              <div className="flex gap-10 items-center border-b pb-2">
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden border-4 ${bgcolor} flex justify-center items-center bg-opacity-40 ${textcolor}`}
                >
                  {cv.profileImage ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-4 border-white">
                      <img
                        src={cv.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <span className={`text-[4px] font-bold ${textcolor}`}>
                      {cv.personalInfo?.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="">
                  <h1 className={`text-[5px] font-bold ${textcolor} `}>
                    {cv.personalInfo?.name}
                  </h1>
                  <p
                    className={`${textcolor} text-[5px] text-opacity-50 text font-bold `}
                  >
                    {cv.personalInfo?.headline}
                  </p>

                  <p>
                    <span className="text-slate-500 font-bold text-[4px]">
                      Email:
                    </span>{" "}
                    <span
                      className={`${textcolor} font-bold text-opacity-40 text-[4px]`}
                    >
                      {cv.personalInfo?.email}
                    </span>
                  </p>
                  <p
                    className={`${textcolor} font-bold text-opacity-40 text-[4px]`}
                  >
                    <span className="text-slate-500 font-bold text-[4px]">
                      Phone:
                    </span>{" "}
                    {cv.personalInfo?.phone}
                  </p>
                  <p
                    className={`${textcolor} font-bold text-opacity-40 text-[4px]`}
                  >
                    <span className="text-slate-500 font-bold text-[4px]">
                      Address:
                    </span>{" "}
                    {cv.personalInfo?.address}
                  </p>
                  {cv.personalInfo?.linkdin && (
                    <p
                      className={`${textcolor} text-[5px] font-bold text-opacity-40`}
                    >
                      <span className="text-slate-500 font-bold">
                        linkedin:
                      </span>{" "}
                      {cv.personalInfo?.linkdin}
                    </p>
                  )}
                </div>
              </div>

              {/* Summary Section */}

              <div className="border-b pb-1">
                <h2 className={`text-[5px] font-semibold ${textcolor} mb-1`}>
                  Summary
                </h2>
                <p className="text-gray-600 text-[4px] text-justify leading-relaxed">
                  {cv.summary}
                </p>
              </div>

              {/* Education Section */}
              <div className="flex gap-2 border-b pb-2 justify-between">
                {/* eduction */}

                <div className="flex gap-4 pb-2">
                  <div className="">
                    <h2
                      className={`text-[5px] font-semibold ${textcolor} my-1 `}
                    >
                      Education
                    </h2>
                    <div className="space-y-1 ">
                      {cv.education.map((edu, index) => (
                        <div key={index} className="text-gray-700 ">
                          <h3
                            className={`${textcolor} text-[5px] text-opacity-70 font-bold`}
                          >
                            {edu.degree}
                          </h3>
                          <p className="text-[4px]">{edu.institution}</p>
                          <p className="text-gray-500 text-[4px]">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Certifications Section */}

                <div className="basis-[50%]">
                  <h2 className={`text-[5px] font-semibold ${textcolor} my-1`}>
                    Certifications
                  </h2>
                  <div className="space-y-1">
                    {cv.certifications?.map((cert, index) => (
                      <div key={index} className="text-gray-700 ">
                        <h3
                          className={`${textcolor} text-[5px] text-opacity-70 font-bold`}
                        >
                          {cert.title}
                        </h3>
                        <p className="text-[4px]">{cert.institution}</p>
                        <p className="text-gray-500 text-[4px]">
                          {cert?.duration}
                        </p>
                        <p className="text-gray-500 text-[4px]">{cert?.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* skills */}

              <div className=" border-b pb-1">
                <h2 className={`text-[5px] font-semibold ${textcolor} m-1`}>
                  Skills
                </h2>
                <div className="grid grid-cols-2 gap-1">
                  {cv.skills.map((skill, index) => (
                    <div key={index} className="flex flex-col gap-1 text-[4px]">
                      <span className=" font-medium text-gray-700">
                        {skill?.name}
                      </span>
                      <div className="w-full bg-gray-300 rounded-full h-0.5">
                        <div
                          className={`${bgcolor} h-0.5 rounded-full `}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* lang */}

              <div className="mb-1 border-b pb-1  rounded-lg">
                <h2 className={`text-[5px] font-bold ${textcolor} mb-1`}>
                  Languages
                </h2>
                <div className="flex flex-wrap gap-2 text-[4px]">
                  {cv.languages.map((language, index) => (
                    <div key={index} className="flex flex-col ">
                      <span className={`${textcolor} font-semibold`}>
                        {language?.name}
                      </span>
                      <span className=" font-medium text-slate-400">
                        {language?.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* project */}

              <div className="">
                <h2 className={`text-[5px] font-semibold ${textcolor} mb-1`}>
                  Projects
                </h2>
                {cv.projects
                  // Ensure only valid projects are shown
                  .map((exp, index) => (
                    <div key={index} className="mb-1">
                      <div className="flex justify-between items-center border-b pb-1 mb-1">
                        <div className="text-[4px]">
                          <h3
                            className={`${textcolor} text-opacity-70 font-bold`}
                          >
                            {exp?.title}
                          </h3>
                          <p className="text-gray-500 ">{exp.duration}</p>
                        </div>
                      </div>
                      <h5 className="text-gray-600 font-semibold text-[4px]">
                        Description:
                      </h5>
                      <div
                        className="text-gray-700 text-[4px] mt-1 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      ></div>
                    </div>
                  ))}
              </div>

              {/* Experience Section */}

              <div className="border-t">
                <h2 className={`text-[5px] font-semibold ${textcolor} mb-1`}>
                  Experience
                </h2>
                {cv.experience?.map((exp, index) => (
                  <div key={index} className="mb-1">
                    <div className="flex justify-between items-center pb-1 mb-1 text-[4px]">
                      <div>
                        <h3
                          className={`${textcolor} text-opacity-70 font-bold`}
                        >
                          {exp?.jobTitle}
                        </h3>
                        <p className="text-gray-500 ">{exp.company}</p>
                        <p className="text-gray-500 ">{exp.duration}</p>
                      </div>
                    </div>
                    <h5 className="text-gray-600 font-semibold text-[4px]">
                      Description:
                    </h5>
                    <div
                      className="text-gray-700 text-[4px] mt-2 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* end */}
            </div>
          </div>
        </div>

        {/* creativeCV */}
        <div className="shadow-lg md:max-w-48  p-2  border">
          <div className="flex justify-center items-center gap-3 mb-4">
            <p
              className=" font-medium cursor-pointer text-xs"
              onClick={() => setCVTemplate("creative")}
            >
              Creative
            </p>
            <CircleCheck
              className={cvTemplate === "creative" && "text-blue-600"}
            />
          </div>

          <div className=" mx-auto bg-white shadow-xl   border border-gray-200 ">
            <div className="">
              <div className="flex  items-center justify-between p-3 text-white rounded-t-2xl">
                <div className="flex gap-3 items-center basis-[30%] ">
                  <div className="relative">
                    <h1
                      className={`text-[6px] font-bold mt-4 text-slate-300 z-10 leading-none `}
                    >
                      {cv.personalInfo.name}
                    </h1>
                    <p className={`text-slate-400 text-[5px]  text-opacity-60`}>
                      {cv.personalInfo.headline}
                    </p>
                    <div
                      className={`absolute left-0 top-8 h-2 w-2/3 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-50 `}
                    ></div>
                  </div>
                </div>

                {cv.profileImage && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border-4 border-white">
                    <img
                      src={cv.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`mt-1 flex gap-1  flex-col text-[5px] text-slate-400`}
                >
                  <p>{cv.personalInfo.email}</p>
                  <p>{cv.personalInfo.phone} </p>
                  <p>{cv.personalInfo.address}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-1">
              {/* siderbar */}
              <div className="basis-[20%]">
                <div className="flex flex-col mb-1 p-1 border-b-2">
                  <div className="relative inline-block mb-2">
                    {/* Text with higher z-index */}
                    <p className="text-[6px] font-bold text-center text-slate-500 relative z-50">
                      About
                    </p>

                    {/* Background highlight with dynamic color */}
                    <div
                      className={`absolute left-0 top-2 h-2 w-8 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                    ></div>
                  </div>

                  <p className={`text-gray-700 text-[5px]  `}>{cv.summary}</p>
                </div>

                {/* skills */}
                <div className="flex flex-col mb-10 p-1 border-b-2">
                  <div className="relative inline-block mb-2">
                    {/* Text with higher z-index */}
                    <p className="text-[6px] font-bold text-center text-slate-500 relative z-50">
                      Skills
                    </p>

                    {/* Background highlight with dynamic color */}
                    <div
                      className={`absolute left-0 top-2 h-2 w-8 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                    ></div>
                  </div>
                  <div className="grid gap-1 ">
                    {cv.skills?.map((skill, index) => {
                      const { label } = getSkillLevel(skill.level);
                      return (
                        <div key={index} className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[5px]  text-gray-700">
                              {skill.name}
                            </span>
                            <span className="text-[5px] text-gray-500">
                              {label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* main */}
              <div className="">
                {/* experience */}
                <div className="flex flex-col p-2 border-b-2">
                  <div className="relative inline-block mb-2">
                    {/* Text with higher z-index */}
                    <p className="text-[6px] font-bold  text-slate-500 relative z-50">
                      Experience
                    </p>

                    {/* Background highlight with dynamic color */}
                    <div
                      className={`absolute left-0 top-2.5 h-2 w-12 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                    ></div>
                  </div>

                  <div className="">
                    {" "}
                    {cv.experience?.map((exp, index) => (
                      <div key={index} className="">
                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                          <div>
                            <p
                              className={`text-[5px] ${textcolor} text-opacity-70`}
                            >
                              {exp.title}
                            </p>
                            <p className="text-gray-500 text-[5px]">
                              {exp.company}
                            </p>
                          </div>
                          <p className="text-gray-500 text-[5px]">
                            {exp.duration}
                          </p>
                        </div>
                        <h5 className="text-gray-600  text-[5px]">
                          Description:
                        </h5>
                        <div
                          className="text-gray-700 text-[5px]  leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project */}

                <div className="flex flex-col  p-1 border-b-2">
                  <div className="relative inline-block ">
                    {/* Text with higher z-index */}
                    <p className="text-[6px] font-bold mb-2  text-slate-500 relative z-50">
                      Project
                    </p>

                    {/* Background highlight with dynamic color */}
                    <div
                      className={`absolute left-0 top-2 h-2 w-12 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                    ></div>
                  </div>

                  <div className="">
                    {" "}
                    {cv.projects?.map((exp, index) => (
                      <div key={index} className="">
                        <div className="flex justify-between items-center border-b pb-1 mb-1">
                          <div>
                            <h3
                              className={`text-[5px] font-bold ${textcolor} text-opacity-70`}
                            >
                              {exp.title}
                            </h3>
                            <p className="text-gray-500 text-[5px]">
                              {exp.company}
                            </p>
                          </div>
                          <p className="text-gray-500 text-[5px]">
                            {exp.duration}
                          </p>
                        </div>
                        <h5 className="text-gray-600 text-[5px] font-semibold">
                          Description:
                        </h5>
                        <div
                          className="text-gray-700 text-[5px] mt-2 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* education */}

                <div className="flex flex-col mb-1 p-2 border-b-2">
                  <div className="relative inline-block mb-2">
                    {/* Text with higher z-index */}
                    <p className="text-[6px] font-bold  text-slate-500 relative z-50">
                      Education
                    </p>

                    {/* Background highlight with dynamic color */}
                    <div
                      className={`absolute left-0 top-2 h-2 w-12 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                    ></div>
                  </div>

                  <div className="">
                    {" "}
                    {cv.education?.map((edu, index) => (
                      <div key={index} className="text-gray-700 text-[5px]">
                        <h3
                          className={`font-bold flex items-start  gap-1 ${textcolor} `}
                        >
                          <span>
                            <GraduationCap size={10} />
                          </span>
                          <span className="">{edu.degree}</span>
                        </h3>
                        <p>{edu.institution}</p>
                        <p className="text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* certifications */}
                <div className="flex flex-col mb-1 p-1 border-b-2">
                  <div className="relative inline-block mb-2">
                    {/* Text with higher z-index */}
                    <p className="text-[6px] font-bold  text-slate-500 relative z-50">
                      Certification
                    </p>

                    {/* Background highlight with dynamic color */}
                    <div
                      className={`absolute left-0 top-2 h-2 w-12 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                    ></div>
                  </div>

                  <div className="">
                    {" "}
                    {cv.certifications?.map((cert, index) => (
                      <div key={index} className="text-gray-700 text-[5px]">
                        <h3
                          className={`font-bold flex items-start  gap-1 ${textcolor} `}
                        >
                          <span>
                            <ShieldCheck size={10} />
                          </span>
                          <span>{cert.title}</span>
                        </h3>
                        <p>{cert.institution}</p>
                        <p className="text-gray-500">{cert.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ModernCV */}
        <div className="shadow-lg md:max-w-48  p-2  border">
          <div className="flex justify-center items-center gap-3 mb-4">
            <p
              className=" text-xs font-medium cursor-pointer"
              onClick={() => setCVTemplate("modern")}
            >
              Modern
            </p>
            <CircleCheck
              className={cvTemplate === "modern" && "text-blue-600"}
            />
          </div>
          <div className="mx-auto bg-white shadow-xl   border border-gray-200">
            {/* Head Section */}
            <div
              className={`flex items-center justify-center flex-col gap-1  ${bgcolor} p-1  text-white`}
            >
              <div
                className={`w-10 h-10 rounded-full overflow-hidden border-4 bg-white flex justify-center items-center bg-opacity-40 ${textcolor}`}
              >
                {cv.profileImage ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border-4 border-white">
                    <img
                      src={cv.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <span className="text-[6px] font-bold">
                    {cv.personalInfo?.name?.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center gap-1">
                <h1 className="tracking-[5px] text-[6px] font-semibold">
                  {cv.personalInfo?.name}
                </h1>
                <p className="text-gray-100 text-[6px] tracking-[2px]">
                  {cv.personalInfo?.headline}
                </p>
              </div>
            </div>

            {/* Body Section */}
            <div className="flex flex-col md:flex-row   font-sans">
              {/* Sidebar */}
              <div
                className={`${bgcolor} bg-opacity-30 p-3 w-full md:w-1/3 space-y-2  `}
              >
                {/* Contact Section */}
                <div>
                  <h2 className={`text-[6px] text-white font-semibold `}>
                    Contact
                  </h2>
                  <div className="space-y-1">
                    <div className="flex items-center  text-[3px] text-gray-700">
                      <Mail size={8} />
                      <p>{cv.personalInfo?.email}</p>
                    </div>
                    <div className="flex items-center text-[3px] text-gray-700">
                      <Phone size={10} />
                      <p>{cv.personalInfo?.phone}</p>
                    </div>
                    <div className="flex items-start gap-2 text-[2px] text-gray-700">
                      <MapPinHouse size={8} />
                      <p>{cv.personalInfo?.address}</p>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div>
                  <h2 className={`text-[6px]  font-semibold `}>Education</h2>
                  <div className="space-y-2 ">
                    {cv.education?.map((edu, index) => (
                      <div key={index} className="text-gray-700 text-[3px]">
                        <h3 className="font-bold flex items-start gap-1 ">
                          <span>
                            <GraduationCap size={8} />
                          </span>
                          <span>{edu.degree}</span>
                        </h3>
                        <p className="text-[3px]"> {edu.institution}</p>
                        <p className="text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications Section */}
                <div>
                  <h2 className={`text-[6px]  font-semibold `}>
                    Certifications
                  </h2>
                  <div className="space-y-1">
                    {cv.certifications?.map((cert, index) => (
                      <div key={index} className="text-gray-700 text-[3px]">
                        <h3 className="font-bold flex items-start  gap-1 ">
                          <span>
                            <ShieldCheck size={8} />
                          </span>
                          <span>{cert.title}</span>
                        </h3>
                        <p>{cert.institution}</p>
                        <p className="text-gray-500">{cert.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className={`text-[6px]  font-semibold`}>Language</h2>
                  <div className="space-y-2">
                    {cv.languages?.map((cert, index) => (
                      <div key={index} className="text-gray-700 text-[3px]">
                        <h3 className="font-bold flex items-start  gap-1 ">
                          <span className="">{cert.name}</span>
                          <span className="text-slate-500">
                            {cert.proficiency}
                          </span>
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="w-2/3  p-1 ">
                {/* Summary Section */}
                {cv.summary && (
                  <div className="mb-1">
                    <h2 className={`text-[6px] font-semibold ${textcolor} `}>
                      Objective
                    </h2>
                    <p className="text-gray-600 text-[5px] text-justify leading-relaxed">
                      {cv.summary}
                    </p>
                  </div>
                )}

                <div className="mb-1">
                  <h2 className={`text-[6px] ${textcolor} font-semibold mb-1`}>
                    Skills
                  </h2>
                  <div className="grid grid-cols-2 gap-1">
                    {cv.skills?.map((skill, index) => (
                      <div key={index} className="flex flex-col gap-1">
                        <span className="text-[5px]  text-gray-700">
                          {skill.name}
                        </span>
                        <div className="w-full bg-gray-100 rounded-full h-0.5">
                          <div
                            className={`${bgcolor} h-0.5 rounded-full`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* projects */}
                <div className={`my-2  bg-opacity-10 p-1 rounded-lg`}>
                  <h2 className={`text-[6px] font-semibold ${textcolor}  mb-1`}>
                    Project
                  </h2>
                  {cv.projects?.map((exp, index) => (
                    <div key={index} className="mb-1  rounded-lg">
                      <div className="flex justify-between items-center border-b pb-1 mb-1">
                        <div>
                          <h3 className={`text-[5px]  ${textcolor} opacity-70`}>
                            {exp.title}
                          </h3>
                          <p className="text-gray-500 text-[5px]">{exp.type}</p>
                        </div>
                      </div>
                      <h6 className="text-slate-400 text-[5px]">
                        Duration:{exp.duration}
                      </h6>
                      <p className="text-gray-600 text-[5px] font-semibold">
                        Description:
                      </p>
                      <div
                        className="text-gray-700 text-[5px]  leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      ></div>
                    </div>
                  ))}
                </div>
                {/* Experience Section */}
                <div className={`  bg-opacity-10 p-1 rounded-lg`}>
                  <h2 className={`text-[6px] font-semibold ${textcolor}  mb-1`}>
                    Experience
                  </h2>
                  {cv.experience?.map((exp, index) => (
                    <div key={index} className="">
                      <div className="flex justify-between items-center border-b pb-1 mb-1">
                        <div>
                          <h3
                            className={`text-[5px] font-bold ${textcolor} opacity-70`}
                          >
                            {exp.title}
                          </h3>
                          <p className="text-gray-500 text-[5px]">
                            {exp.company}
                          </p>
                        </div>
                        <p className="text-gray-500 text-[5px]">
                          {exp.duration}
                        </p>
                      </div>
                      <h5 className="text-gray-600 text-[5px] font-semibold">
                        Description:
                      </h5>
                      <div
                        className="text-gray-700 text-[5px] leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ProfessionalCV */}
        <div className="shadow-lg md:max-w-48  p-2  border">
          <div className="flex justify-center items-center gap-3 mb-4">
            <p
              className=" text-xs font-medium cursor-pointer"
              onClick={() => setCVTemplate("professional")}
            >
              Professional
            </p>
            <CircleCheck
              className={cvTemplate === "professional" && "text-blue-600"}
            />
          </div>
          <div className=" mx-auto bg-white shadow-xl  border border-gray-200">
            {/* Header Section */}
            <div className="flex flex-col items-center  p-2 text-white rounded-t-2xl">
              <div className="flex gap-2 items-center">
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden border-4 ${bgcolor} flex justify-center items-center bg-opacity-40 ${textcolor}`}
                >
                  {cv.profileImage ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-4 border-white">
                      <img
                        src={cv.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <span className="text-[6px] font-bold">
                      {cv.personalInfo?.name?.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="text-[6px]">
                  <h1 className={` font-semibold ${textcolor}`}>
                    {cv.personalInfo.name}
                  </h1>
                  <p className={`${textcolor} font-bold text-opacity-60`}>
                    {cv.personalInfo.headline}
                  </p>
                </div>
              </div>
              <div
                className={`mt-1  flex gap-3 text-[3px] ${textcolor} text-opacity-75`}
              >
                <p>
                  <Mail size={5} className="inline mr-1 " />{" "}
                  {cv.personalInfo.email} |
                </p>
                <p>
                  <Phone size={5} className="inline mr-1 " />{" "}
                  {cv.personalInfo.phone} |
                </p>
                <p>
                  <MapPin size={5} className="inline mr-1 " />{" "}
                  {cv.personalInfo.address}
                </p>
              </div>
            </div>
            <div className={`h-1 w-full ${bgcolor} `}></div>

            {/* Body Section */}
            <div className=" p-1">
              <div className="md:col-span-2 ">
                {/* Summary */}
                <div className="flex mb-1">
                  <p className={`text-gray-700 text-[5px] text-justify `}>
                    {cv.summary}
                  </p>
                </div>

                {/* experience */}
                <div className="flex">
                  <h1
                    className={` ${textcolor} font-semibold text-[6px] basis-[30%]`}
                  >
                    Experience
                  </h1>
                  <div className="">
                    {cv.experience?.map((exp, index) => (
                      <div key={index} className="">
                        <div className="flex justify-between items-center border-b pb-1 mb-1">
                          <div>
                            <h3
                              className={`text-[6px] font-bold ${textcolor} text-opacity-70`}
                            >
                              {exp.title}
                            </h3>
                            <p className="text-gray-500 text-[5px]">
                              {exp.company}
                            </p>
                          </div>
                          <p className="text-gray-500 text-[5px]">
                            {exp.duration}
                          </p>
                        </div>
                        <h5 className="text-gray-600 text-[5px] font-semibold">
                          Description:
                        </h5>
                        <div
                          className="text-gray-700 text-[5px] leading-relaxed details"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* project */}
                <div className="flex">
                  <h1
                    className={` ${textcolor} font-semibold text-[6px] basis-[30%]`}
                  >
                    Project
                  </h1>
                  <div className="">
                    {cv.projects?.map((exp, index) => (
                      <div key={index} className="mb-1">
                        <div className="flex justify-between items-center border-b pb-1 mb-1">
                          <div>
                            <h3
                              className={`text-[6px] font-bold ${textcolor} text-opacity-70`}
                            >
                              {exp.title}
                            </h3>
                          </div>
                          <p className="text-gray-500 text-[5px]">
                            {exp.duration}
                          </p>
                        </div>
                        <h5 className="text-gray-600 text-[5px] font-semibold">
                          Description:
                        </h5>
                        <div
                          className="text-gray-700 text-[5px] details leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* education */}
                <div className="flex my-1">
                  <h1
                    className={` ${textcolor} font-semibold text-[6px] basis-[30%]`}
                  >
                    Education
                  </h1>
                  <div className="basis-[70%]">
                    {cv.education?.map((edu, index) => (
                      <div key={index} className="text-gray-700 text-[6px]">
                        <h3
                          className={`font-bold flex items-start text-[5px] gap-1 ${textcolor} `}
                        >
                          <span>
                            <GraduationCap size={8} />
                          </span>
                          <span className="text-[5px]">{edu.degree}</span>
                        </h3>
                        <p className="text-[5px]">{edu.institution}</p>
                        <p className="text-gray-500 text-[5px]">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex my-1">
                  <h1
                    className={` ${textcolor} font-semibold text-[6px] basis-[30%]`}
                  >
                    Certifications
                  </h1>
                  <div className="space-y-1">
                    {cv.certifications?.map((cert, index) => (
                      <div key={index} className="text-gray-700 text-[5px]">
                        <h3
                          className={`font-bold flex  items-start  gap-2 ${textcolor} `}
                        >
                          <span>
                            <ShieldCheck size={8} />
                          </span>
                          <span className="">{cert.title}</span>
                        </h3>
                        <p className="text-[5px]"> {cert.institution}</p>
                        <p className="text-gray-500 text-[5px]">{cert.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex">
                  <h1
                    className={` ${textcolor} font-semibold text-[6px] basis-[30%]`}
                  >
                    Skills
                  </h1>
                  <div className="grid grid-cols-2 gap-1 basis-[60%]">
                    {cv.skills?.map((skill, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-1 text-[5px]"
                      >
                        <span className="  text-gray-700">{skill.name}</span>
                        <div className="w-full  bg-slate-200 rounded-full h-1">
                          <div
                            className={`${bgcolor} h-1 rounded-full`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex my-1">
                  <h1
                    className={` ${textcolor} font-semibold text-[6px] basis-[30%]`}
                  >
                    Languages
                  </h1>
                  <div className="grid grid-cols-2 gap-1 basis-[60%]">
                    {cv.languages?.map((cert, index) => (
                      <div key={index} className="text-gray-700 text-[5px]">
                        <h3 className="font-bold flex items-start  gap-2 ">
                          <span className="">{cert.name}</span>
                          <span className="text-slate-500">
                            {cert.proficiency}
                          </span>
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow-lg p-3  rounded-lg border flex justify-center items-center ">
          <div className="flex justify-center flex-col items-center gap-3 mb-4">
            <button
              className={`px-4 py-2 ${bgcolor} text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all `}
            >
              Coming Soon
            </button>
            <CirclePlus size={70} className={textcolor} />
          </div>
        </div>
      </div>
    </div>
  );
}
