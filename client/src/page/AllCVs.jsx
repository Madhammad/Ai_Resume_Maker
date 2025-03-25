import axios from "axios";
import { useEffect, useState } from "react";
import { URL_BACKEND } from "../../constant";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  LoaderCircle,
  Mail,
  MapPin,
  MapPinHouse,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useSelector } from "react-redux";
import { FiTrash } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AllCVs() {
  const getSkillLevel = (level) => {
    if (level <= 20) return { label: "Basic" };
    if (level <= 40) return { label: "Good" };
    if (level <= 70) return { label: "Experienced" };
    return { label: "Expert", color: "bg-green-400" };
  };

  const [getAllCVs, setgetAllCVs] = useState([]);

  const [loading, setLoading] = useState(false);

  const { token, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://ai-resume-maker-fol6.onrender.com/api/Aicv/getAllcv`,
          {
            withCredentials: true,
          }
        );

        if (data.success) {
          setLoading(false);
          setgetAllCVs(data.data.cvs);
        } else {
          console.log("Error:", data.message);
          setLoading(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          setLoading(false);
          console.log("Request canceled:", error.message);
        } else {
          console.error("API request failed:", error);
          setLoading(false);
        }
      }
    };

    fetchCVs();

    // console.log(getAllCVs);
  }, []);

  const handleDelete = async (cvid) => {
    try {
      const { data } = await axios.delete(
        `${URL_BACKEND}/api/Aicv/deleteCV/${cvid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Your CV is deleted Successfully");
        setgetAllCVs((prevCVs) => prevCVs.filter((cv) => cv._id !== cvid));
      }

      if (!data.success) {
        console.log(data.message);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  return (
    <div>
      <div className="w-full px-4 md:px-8 my-8 md:my-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 leading-tight text-center">
          Recent Resumes
        </h1>
        <div className="rounded-xl p-4 md:p-6 shadow-xl grid md:grid-cols-4 w-full relative min-h-[200px]">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center">
              <LoaderCircle color="green" size={100} className="animate-spin" />
            </div>
          )}
          {getAllCVs?.map((cv) => {
            return (
              <div
                className=" group relative md:p-2 flex items-center flex-col gap-3 flexw"
                key={cv._id}
              >
                <div className="hover">
                  <button className="absolute md:top-2 md:right-2 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 text-xs">
                    <Link to={token ? `/downloadCV/${cv._id}` : "/signIn"}>
                      View
                    </Link>
                  </button>
                  {currentUser?.isAdminRole && (
                    <button
                      type="button"
                      onClick={() => handleDelete(cv._id)}
                      className="text-red-500 hover:text-red-700 transition duration-200"
                    >
                      <FiTrash className="w-6 h-6" />
                    </button>
                  )}
                </div>

                {/* classic */}
                {cv.cvtemplate === "classic" && (
                  <div className="shadow-lg md:max-w-72  p-2  border">
                    <div className=" shadow-lg border  bg-white p-2  mx-auto">
                      <div>
                        <div className="flex gap-10 items-center border-b pb-2">
                          <div
                            className={`w-10 h-10 rounded-full overflow-hidden border-4 ${cv.color.bgcolor} flex justify-center items-center bg-opacity-40 ${cv.color.textcolor}`}
                          >
                            {cv?.cvprojectImage?.secure_url ? (
                              <div className="w-10 h-10 rounded-full overflow-hidden border-4 border-white">
                                <img
                                  src={cv?.cvprojectImage?.secure_url}
                                  alt="Profile"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <span
                                className={`text-[4px] font-bold ${cv.color.textcolor}`}
                              >
                                {cv?.personalInfo?.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div className="">
                            <h1
                              className={`text-[5px] font-bold ${cv.color.textcolor} `}
                            >
                              {cv?.personalInfo?.name}
                            </h1>
                            <p
                              className={`${cv.color.textcolor} text-[5px] text-opacity-50 text font-bold `}
                            >
                              {cv?.personalInfo?.headline}
                            </p>

                            <p>
                              <span className="text-slate-500 font-bold text-[4px]">
                                Email:
                              </span>{" "}
                              <span
                                className={`${cv.color.textcolor} font-bold text-opacity-40 text-[4px]`}
                              >
                                {cv?.personalInfo?.email}
                              </span>
                            </p>
                            <p
                              className={`${cv.color.textcolor} font-bold text-opacity-40 text-[4px]`}
                            >
                              <span className="text-slate-500 font-bold text-[4px]">
                                Phone:
                              </span>{" "}
                              {cv?.personalInfo?.phone}
                            </p>
                            <p
                              className={`${cv.color.textcolor} font-bold text-opacity-40 text-[4px]`}
                            >
                              <span className="text-slate-500 font-bold text-[4px]">
                                Address:
                              </span>{" "}
                              {cv?.personalInfo?.address}
                            </p>
                            {cv?.personalInfo?.linkdin && (
                              <p
                                className={`${cv.color.textcolor} text-[5px] font-bold text-opacity-40`}
                              >
                                <span className="text-slate-500 font-bold">
                                  linkedin:
                                </span>{" "}
                                {cv?.personalInfo?.linkdin}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Summary Section */}

                        <div className="border-b pb-1">
                          <h2
                            className={`text-[5px] font-semibold ${cv.color.textcolor} mb-1`}
                          >
                            Summary
                          </h2>
                          <p className="text-gray-600 text-[4px] text-justify leading-relaxed">
                            {cv?.summary}
                          </p>
                        </div>

                        {/* Education Section */}
                        <div className="flex gap-2 border-b pb-2 justify-between">
                          {/* eduction */}

                          <div className="flex gap-4 pb-2">
                            {cv?.education?.length > 0 && (
                              <div className="">
                                <h2
                                  className={`text-[5px] font-semibold ${cv.color.textcolor} my-1 `}
                                >
                                  Education
                                </h2>
                                <div className="space-y-1 ">
                                  {cv?.education.map((edu, index) => (
                                    <div key={index} className="text-gray-700 ">
                                      <h3
                                        className={`${cv.color.textcolor} text-[5px] text-opacity-70 font-bold`}
                                      >
                                        {edu.degree}
                                      </h3>
                                      <p className="text-[4px]">
                                        {edu.institution}
                                      </p>
                                      <p className="text-gray-500 text-[4px]">
                                        {edu.year}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Certifications Section */}

                          {cv?.certificates?.length > 0 && (
                            <div className="basis-[50%]">
                              <h2
                                className={`text-[5px] font-semibold ${cv.color.textcolor} my-1`}
                              >
                                Certifications
                              </h2>
                              <div className="space-y-1">
                                {cv?.certificates?.map((cert, index) => (
                                  <div key={index} className="text-gray-700 ">
                                    <h3
                                      className={`${cv.color.textcolor} text-[5px] text-opacity-70 font-bold`}
                                    >
                                      {cert.title}
                                    </h3>
                                    <p className="text-[4px]">
                                      {cert.institution}
                                    </p>
                                    <p className="text-gray-500 text-[4px]">
                                      {cert?.duration}
                                    </p>
                                    <p className="text-gray-500 text-[4px]">
                                      {cert?.year}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* skills */}

                        {cv?.skills?.length > 0 && (
                          <div className=" border-b pb-1">
                            <h2
                              className={`text-[5px] font-semibold ${cv.color.textcolor} m-1`}
                            >
                              Skills
                            </h2>
                            <div className="grid grid-cols-2 gap-1">
                              {cv?.skills.map((skill, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col gap-1 text-[4px]"
                                >
                                  <span className=" font-medium text-gray-700">
                                    {skill?.name}
                                  </span>
                                  <div className="w-full bg-gray-300 rounded-full h-0.5">
                                    <div
                                      className={`${cv.color.bgcolor} h-0.5 rounded-full `}
                                      style={{ width: `${skill.level}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* lang */}

                        {cv?.language?.length > 0 && (
                          <div className="mb-1 border-b pb-1  rounded-lg">
                            <h2
                              className={`text-[5px] font-bold ${cv.color.textcolor} mb-1`}
                            >
                              Languages
                            </h2>
                            <div className="flex flex-wrap gap-2 text-[4px]">
                              {cv?.languages.map((language, index) => (
                                <div key={index} className="flex flex-col ">
                                  <span
                                    className={`${cv.color.textcolor} font-semibold`}
                                  >
                                    {language?.name}
                                  </span>
                                  <span className=" font-medium text-slate-400">
                                    {language?.proficiency}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* project */}
                        {cv?.projects?.length > 0 && (
                          <div className="">
                            <h2
                              className={`text-[5px] font-semibold ${cv.color.textcolor} mb-1`}
                            >
                              Projects
                            </h2>
                            {cv?.projects
                              // Ensure only valid projects are shown
                              .map((exp, index) => (
                                <div key={index} className="mb-1">
                                  <div className="flex justify-between items-center border-b pb-1 mb-1">
                                    <div className="text-[4px]">
                                      <h3
                                        className={`${cv.color.textcolor} text-opacity-70 font-bold`}
                                      >
                                        {exp?.title}
                                      </h3>
                                      <p className="text-gray-500 ">
                                        {exp.duration}
                                      </p>
                                    </div>
                                  </div>
                                  <h5 className="text-gray-600 font-semibold text-[4px]">
                                    Description:
                                  </h5>
                                  <div
                                    className="text-gray-700 text-[4px] mt-1 leading-relaxed details"
                                    dangerouslySetInnerHTML={{
                                      __html: exp.details,
                                    }}
                                  ></div>
                                </div>
                              ))}
                          </div>
                        )}

                        {/* Experience Section */}
                        {cv?.experience?.length > 0 && (
                          <div className="border-t">
                            <h2
                              className={`text-[5px] font-semibold ${cv.color.textcolor} mb-1`}
                            >
                              Experience
                            </h2>
                            {cv?.experience?.map((exp, index) => (
                              <div key={index} className="mb-1">
                                <div className="flex justify-between items-center pb-1 mb-1 text-[4px]">
                                  <div>
                                    <h3
                                      className={`${cv.color.textcolor} text-opacity-70 font-bold`}
                                    >
                                      {exp?.jobTitle}
                                    </h3>
                                    <p className="text-gray-500 ">
                                      {exp.company}
                                    </p>
                                    <p className="text-gray-500 ">
                                      {exp.duration}
                                    </p>
                                  </div>
                                </div>
                                <h5 className="text-gray-600 font-semibold text-[4px]">
                                  Description:
                                </h5>
                                <div
                                  className="text-gray-700 text-[4px] mt-2 leading-relaxed details"
                                  dangerouslySetInnerHTML={{
                                    __html: exp.details,
                                  }}
                                ></div>
                              </div>
                            ))}
                          </div>
                        )}
                        {/* end */}
                      </div>
                    </div>
                  </div>
                )}
                {/* creativeCV */}
                {cv.cvtemplate === "creative" && (
                  <div className="shadow-lg  md:max-w-72  p-2  border">
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
                              <p
                                className={`text-slate-400 text-[5px]  text-opacity-60`}
                              >
                                {cv.personalInfo.headline}
                              </p>
                              <div
                                className={`absolute left-0 top-8 h-2 w-2/3 ${cv.color.bgcolor} bg-opacity-50 -translate-y-1/2 z-50 `}
                              ></div>
                            </div>
                          </div>

                          {cv?.cvprojectImage?.secure_url && (
                            <div className="w-10 h-10 rounded-full overflow-hidden border-4 border-white">
                              <img
                                src={cv?.cvprojectImage?.secure_url}
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
                                className={`absolute left-0 top-2 h-2 w-8 ${cv.color.bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                              ></div>
                            </div>

                            <p className={`text-gray-700 text-[5px]  `}>
                              {cv?.summary}
                            </p>
                          </div>

                          {/* skills */}
                          {cv?.skills?.length > 0 && (
                            <div className="flex flex-col mb-10 p-1 border-b-2">
                              <div className="relative inline-block mb-2">
                                {/* Text with higher z-index */}
                                <p className="text-[6px] font-bold text-center text-slate-500 relative z-50">
                                  Skills
                                </p>

                                {/* Background highlight with dynamic color */}
                                <div
                                  className={`absolute left-0 top-2 h-2 w-8 ${cv.color.bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                                ></div>
                              </div>
                              <div className="grid gap-1 ">
                                {cv?.skills?.map((skill, index) => {
                                  const { label } = getSkillLevel(skill.level);
                                  return (
                                    <div
                                      key={index}
                                      className="flex flex-col gap-2"
                                    >
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
                          )}
                        </div>
                        {/* main */}
                        <div className="">
                          {/* experience */}
                          {cv?.experience?.length > 0 && (
                            <div className="flex flex-col p-2 border-b-2">
                              <div className="relative inline-block mb-2">
                                {/* Text with higher z-index */}
                                <p className="text-[6px] font-bold  text-slate-500 relative z-50">
                                  Experience
                                </p>

                                {/* Background highlight with dynamic color */}
                                <div
                                  className={`absolute left-0 top-2.5 h-2 w-12 ${cv.color.bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                                ></div>
                              </div>

                              <div className="">
                                {" "}
                                {cv?.experience?.map((exp, index) => (
                                  <div key={index} className="">
                                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                                      <div>
                                        <p
                                          className={`text-[5px] ${cv.color.textcolor} text-opacity-70`}
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
                                      className="text-gray-700 details text-[5px]  leading-relaxed"
                                      dangerouslySetInnerHTML={{
                                        __html: exp.details,
                                      }}
                                    ></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Project */}

                          {cv?.projects?.length > 0 && (
                            <div className="flex flex-col  p-1 border-b-2">
                              <div className="relative inline-block ">
                                {/* Text with higher z-index */}
                                <p className="text-[6px] font-bold mb-2  text-slate-500 relative z-50">
                                  Project
                                </p>

                                {/* Background highlight with dynamic color */}
                                <div
                                  className={`absolute left-0 top-2 h-2 w-12 ${cv.color.bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                                ></div>
                              </div>

                              <div className="">
                                {" "}
                                {cv?.projects?.map((exp, index) => (
                                  <div key={index} className="">
                                    <div className="flex justify-between items-center border-b pb-1 mb-1">
                                      <div>
                                        <h3
                                          className={`text-[5px] font-bold ${cv.color.textcolor} text-opacity-70`}
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
                                      className="text-gray-700 text-[5px] mt-2 leading-relaxed details"
                                      dangerouslySetInnerHTML={{
                                        __html: exp.details,
                                      }}
                                    ></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* education */}

                          {cv?.education?.length > 0 && (
                            <div className="flex flex-col mb-1 p-2 border-b-2">
                              <div className="relative inline-block mb-2">
                                {/* Text with higher z-index */}
                                <p className="text-[6px] font-bold  text-slate-500 relative z-50">
                                  Education
                                </p>

                                {/* Background highlight with dynamic color */}
                                <div
                                  className={`absolute left-0 top-2 h-2 w-12 ${cv?.color?.bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                                ></div>
                              </div>

                              <div className="">
                                {" "}
                                {cv?.education?.map((edu, index) => (
                                  <div
                                    key={index}
                                    className="text-gray-700 text-[5px]"
                                  >
                                    <h3
                                      className={`font-bold flex items-start  gap-1 ${edu?.color?.textcolor} `}
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
                          )}
                          {/* certifications */}
                          {cv?.certificates?.length > 0 && (
                            <div className="flex flex-col mb-1 p-1 border-b-2">
                              <div className="relative inline-block mb-2">
                                {/* Text with higher z-index */}
                                <p className="text-[6px] font-bold  text-slate-500 relative z-50">
                                  Certification
                                </p>

                                {/* Background highlight with dynamic color */}
                                <div
                                  className={`absolute left-0 top-2 h-2 w-12 ${cv.color.bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                                ></div>
                              </div>

                              <div className="">
                                {" "}
                                {cv?.certificates?.map((cert, index) => (
                                  <div
                                    key={index}
                                    className="text-gray-700 text-[5px]"
                                  >
                                    <h3
                                      className={`font-bold flex items-start  gap-1 ${cv.color.textcolor} `}
                                    >
                                      <span>
                                        <ShieldCheck size={10} />
                                      </span>
                                      <span>{cert.name}</span>
                                    </h3>
                                    <p>{cert.institution}</p>
                                    <p>{cert.duration}</p>
                                    <p className="text-gray-500">{cert.year}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* ModernCV */}
                {cv.cvtemplate === "modern" && (
                  <div className="shadow-lg md:max-w-72    border">
                    <div className="mx-auto bg-white shadow-xl p-2  border border-gray-200">
                      {/* Head Section */}
                      <div
                        className={`flex items-center justify-center flex-col gap-1  ${cv.color.bgcolor} p-1  text-white`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full overflow-hidden  flex justify-center items-center bg-opacity-40 ${cv.color.textcolor}`}
                        >
                          {cv?.cvprojectImage?.secure_url ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden ">
                              <img
                                src={cv?.cvprojectImage?.secure_url}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <span className="text-[6px] font-bold">
                              {cv?.personalInfo?.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <h1 className="tracking-[5px] text-[6px] font-semibold">
                            {cv?.personalInfo?.name}
                          </h1>
                          <p className="text-gray-100 text-[6px] tracking-[2px]">
                            {cv?.personalInfo?.headline}
                          </p>
                        </div>
                      </div>

                      {/* Body Section */}
                      <div className="flex flex-row   font-sans">
                        {/* Sidebar */}
                        {/* Sidebar */}
                        <div
                          className={`${cv.color.bgcolor} bg-opacity-30 p-3 w-1/3 space-y-2`}
                        >
                          {/* Contact Section */}
                          <div>
                            <h2
                              className={`text-[6px] text-white font-semibold `}
                            >
                              Contact
                            </h2>
                            <div className="space-y-1 mt-2">
                              <div className="flex items-center  text-[3px] text-gray-700">
                                <div className="flex gap-1 items-center">
                                  <Mail size={8} />
                                  {""}
                                  <p>{cv?.personalInfo?.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-[3px] text-gray-700">
                                <Phone size={8} />
                                <p>{cv?.personalInfo?.phone}</p>
                              </div>
                              <div className="flex items-start gap-2 text-[3px] text-gray-700">
                                <MapPinHouse size={8} />
                                <p>{cv?.personalInfo?.address}</p>
                              </div>
                            </div>
                          </div>

                          {/* Education Section */}
                          {cv?.education?.length > 0 && (
                            <div>
                              <h2
                                className={`text-[6px] text-white font-semibold `}
                              >
                                Education
                              </h2>
                              <div className="space-y-2 ">
                                {cv?.education?.map((edu, index) => (
                                  <div
                                    key={index}
                                    className="text-gray-700 text-[3px]"
                                  >
                                    <h3 className="font-bold flex items-start gap-1 ">
                                      <span>
                                        <GraduationCap
                                          size={8}
                                          className={` ${cv.color.textcolor} opacity-80`}
                                        />
                                      </span>
                                      <span
                                        className={` ${cv.color.textcolor} opacity-80`}
                                      >
                                        {edu.degree}
                                      </span>
                                    </h3>
                                    <p className="text-[3px]">
                                      {" "}
                                      {edu.institution}
                                    </p>
                                    <p className="text-gray-500">{edu.year}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Certifications Section */}
                          {cv?.certificates?.length > 0 && (
                            <div>
                              <h2
                                className={`text-[6px] text-white font-semibold `}
                              >
                                Certifications
                              </h2>
                              <div className="space-y-1">
                                {cv?.certificates?.map((cert, index) => (
                                  <div
                                    key={index}
                                    className="text-gray-700 text-[3px]"
                                  >
                                    <h3 className="font-bold flex items-start  gap-1 ">
                                      <span>
                                        <ShieldCheck
                                          size={8}
                                          className={` ${cv.color.textcolor} opacity-80`}
                                        />
                                      </span>
                                      <span
                                        className={` ${cv.color.textcolor} opacity-80`}
                                      >
                                        {cert.title}
                                      </span>
                                    </h3>
                                    <p>{cert.institution}</p>
                                    <p className="text-gray-500">{cert.year}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {cv?.languages?.length > 0 && (
                            <div>
                              <h2
                                className={`text-[6px] text-white font-semibold`}
                              >
                                Language
                              </h2>
                              <div className="space-y-2">
                                {cv?.languages?.map((cert, index) => (
                                  <div
                                    key={index}
                                    className="text-gray-700 text-[3px]"
                                  >
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
                          )}
                        </div>

                        {/* Main Content */}
                        <div className="w-2/3  p-1 ">
                          {/* Summary Section */}
                          {cv?.summary && (
                            <div className="mb-1">
                              <h2
                                className={`text-[6px] font-semibold ${cv.color.textcolor} `}
                              >
                                Objective
                              </h2>
                              <p className="text-gray-600 text-[5px] text-justify leading-relaxed">
                                {cv?.summary}
                              </p>
                            </div>
                          )}

                          {cv?.skills?.length > 0 && (
                            <div className="mb-1">
                              <h2
                                className={`text-[6px] ${cv.color.textcolor} font-semibold mb-1`}
                              >
                                Skills
                              </h2>
                              <div className="grid grid-cols-2 gap-1">
                                {cv?.skills?.map((skill, index) => (
                                  <div
                                    key={index}
                                    className="flex flex-col gap-1"
                                  >
                                    <span className="text-[5px]  text-gray-700">
                                      {skill.name}
                                    </span>
                                    <div className="w-full bg-gray-100 rounded-full h-0.5">
                                      <div
                                        className={`${cv.color.bgcolor} h-0.5 rounded-full`}
                                        style={{ width: `${skill.level}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* projects */}
                          {cv?.projects?.length > 0 && (
                            <div
                              className={`my-2 bg-opacity-10 p-1 rounded-lg`}
                            >
                              <h2
                                className={`text-[6px] font-semibold ${cv.color.textcolor}  mb-1`}
                              >
                                Project
                              </h2>
                              {cv?.projects?.map((exp, index) => (
                                <div key={index} className="mb-1  rounded-lg">
                                  <div className="flex justify-between items-center border-b pb-1 mb-1">
                                    <div>
                                      <h3
                                        className={`text-[5px]  ${cv.color.textcolor} opacity-70`}
                                      >
                                        {exp.title}
                                      </h3>
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
                                    dangerouslySetInnerHTML={{
                                      __html: exp.details,
                                    }}
                                  ></div>
                                </div>
                              ))}
                            </div>
                          )}
                          {/* Experience Section */}
                          {cv?.experience?.length > 0 && (
                            <div className={`  bg-opacity-10 p-1 rounded-lg`}>
                              <h2
                                className={`text-[6px] font-semibold ${cv.color.textcolor}  mb-1`}
                              >
                                Experience
                              </h2>
                              {cv?.experience?.map((exp, index) => (
                                <div key={index} className="">
                                  <div className="flex justify-between items-center border-b pb-1 mb-1">
                                    <div>
                                      <h3
                                        className={`text-[5px] font-bold ${cv.color.textcolor} opacity-70`}
                                      >
                                        {exp.jobTitle}
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
                                    dangerouslySetInnerHTML={{
                                      __html: exp.details,
                                    }}
                                  ></div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* ProfessionalCV */}
                {cv.cvtemplate === "professional" && (
                  <div className="shadow-lg md:max-w-72    border">
                    <div className=" mx-auto bg-white shadow-xl  border border-gray-200 p-5">
                      {/* Header Section */}
                      <div className="flex flex-col items-center  p-2 text-white rounded-t-2xl">
                        <div className="flex gap-2 items-center">
                          <div
                            className={`w-10 h-10 rounded-full overflow-hidden border-4 ${cv.color.bgcolor} flex justify-center items-center bg-opacity-40 ${cv.color.textcolor}`}
                          >
                            {cv?.cvprojectImage?.secure_url ? (
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img
                                  src={cv?.cvprojectImage?.secure_url}
                                  alt="Profile"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <span className="text-[6px] font-bold">
                                {cv?.personalInfo?.name.charAt(0)}
                              </span>
                            )}
                          </div>

                          <div className="text-[6px]">
                            <h1
                              className={` font-semibold ${cv.color.textcolor}`}
                            >
                              {cv.personalInfo.name}
                            </h1>
                            <p
                              className={`${cv.color.textcolor} font-bold text-opacity-60`}
                            >
                              {cv.personalInfo.headline}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`mt-1  flex gap-3 text-[3px] ${cv.color.textcolor} text-opacity-75`}
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
                      <div className={`h-1 w-full ${cv.color.bgcolor} `}></div>

                      {/* Body Section */}
                      <div className=" p-1">
                        <div className="md:col-span-2 ">
                          {/* Summary */}
                          <div className="flex mb-1">
                            <p
                              className={`text-gray-700 text-[5px] text-justify `}
                            >
                              {cv?.summary}
                            </p>
                          </div>

                          {/* experience */}
                          {cv?.experience?.length > 0 && (
                            <div className="flex">
                              <h1
                                className={` ${cv.color.textcolor} font-semibold text-[6px] basis-[30%]`}
                              >
                                Experience
                              </h1>
                              <div className="">
                                {cv?.experience?.map((exp, index) => (
                                  <div key={index} className="">
                                    <div className="flex justify-between items-center border-b pb-1 mb-1">
                                      <div>
                                        <h3
                                          className={`text-[6px] font-bold ${cv.color.textcolor} text-opacity-70`}
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
                                      dangerouslySetInnerHTML={{
                                        __html: exp.details,
                                      }}
                                    ></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* project */}
                          {cv?.projects?.length > 0 && (
                            <div className="flex">
                              <h1
                                className={` ${cv.color.textcolor} font-semibold text-[6px] basis-[30%]`}
                              >
                                Project
                              </h1>
                              <div className="">
                                {cv?.projects?.map((exp, index) => (
                                  <div key={index} className="mb-1">
                                    <div className="flex justify-between items-center border-b pb-1 mb-1">
                                      <div>
                                        <h3
                                          className={`text-[6px] font-bold ${cv.color.textcolor} text-opacity-70`}
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
                                      className="text-gray-700 text-[5px]  leading-relaxed"
                                      dangerouslySetInnerHTML={{
                                        __html: exp.details,
                                      }}
                                    ></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* education */}

                          {cv?.education?.length > 0 && (
                            <div className="flex my-1">
                              <h1
                                className={` ${cv.color.textcolor} font-semibold text-[6px] basis-[30%]`}
                              >
                                Education
                              </h1>
                              <div className="basis-[70%]">
                                {cv?.education?.map((edu, index) => (
                                  <div
                                    key={index}
                                    className="text-gray-700 text-[6px]"
                                  >
                                    <h3
                                      className={`font-bold flex items-start text-[5px] gap-1 ${cv.color.textcolor} `}
                                    >
                                      <span>
                                        <GraduationCap size={8} />
                                      </span>
                                      <span className="text-[5px]">
                                        {edu.degree}
                                      </span>
                                    </h3>
                                    <p className="text-[5px]">
                                      {edu.institution}
                                    </p>
                                    <p className="text-gray-500 text-[5px]">
                                      {edu.year}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* certifications */}
                          {cv?.certificates?.length > 0 && (
                            <div className="flex my-1">
                              <h1
                                className={` ${cv.color.textcolor} font-semibold text-[6px] basis-[30%]`}
                              >
                                Certifications
                              </h1>
                              <div className="space-y-1">
                                {cv?.certificates?.map((cert, index) => (
                                  <div
                                    key={index}
                                    className="text-gray-700 text-[5px]"
                                  >
                                    <h3
                                      className={`font-bold flex  items-start  gap-2 ${cv.color.textcolor} `}
                                    >
                                      <span>
                                        <ShieldCheck size={8} />
                                      </span>
                                      <span className="">{cert.title}</span>
                                    </h3>
                                    <p className="text-[5px]">
                                      {" "}
                                      {cert.institution}
                                    </p>
                                    <p className="text-gray-500 text-[5px]">
                                      {cert.year}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {cv?.skills?.length > 0 && (
                            <div className="flex">
                              <h1
                                className={` ${cv.color.textcolor} font-semibold text-[6px] basis-[30%]`}
                              >
                                Skills
                              </h1>
                              <div className="grid grid-cols-2 gap-1 basis-[60%]">
                                {cv?.skills?.map((skill, index) => (
                                  <div
                                    key={index}
                                    className="flex flex-col gap-1 text-[5px]"
                                  >
                                    <span className="  text-gray-700">
                                      {skill.name}
                                    </span>
                                    <div className="w-full  bg-slate-200 rounded-full h-1">
                                      <div
                                        className={`${cv.color.bgcolor} h-1 rounded-full`}
                                        style={{ width: `${skill.level}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* lang */}
                          {cv?.languages?.length > 0 && (
                            <div className="flex my-1">
                              <h1
                                className={` ${cv.color.textcolor} font-semibold text-[6px] basis-[30%]`}
                              >
                                Languages
                              </h1>
                              <div className="grid grid-cols-2 gap-1 basis-[60%]">
                                {cv?.languages?.map((cert, index) => (
                                  <div
                                    key={index}
                                    className="text-gray-700 text-[5px]"
                                  >
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
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
