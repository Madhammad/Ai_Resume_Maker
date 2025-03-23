import { useEffect, useRef, useState } from "react";
import { GraduationCap, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import axios from "axios";
import { URL_BACKEND } from "../../constant";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { MdOutlineMailOutline } from "react-icons/md";
import { CiPhone } from "react-icons/ci";

import { useSelector } from "react-redux";
import { FiTrash } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci";
import { usePDF } from "react-to-pdf";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

export default function DownloadformData() {
  const { token, currentUser } = useSelector((state) => state.user);

  const [bgcolor, setBgcolor] = useState("");
  const [textcolor, setTextcolor] = useState("");
  const [cvTemplate, setCVTemplate] = useState("");

  const [rgbColor, setRgbColor] = useState("");

  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const { cvId } = useParams();

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  useEffect(() => {
    const getformData = async () => {
      try {
        const { data } = await axios.get(`${URL_BACKEND}/api/Aicv/cv/${cvId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          console.log(data.data.cv);

          setFormData(data.data.cv);
          setBgcolor(data.data.cv?.color?.bgcolor);
          setTextcolor(data.data.cv?.color?.textcolor);
          setCVTemplate(data.data.cv.cvtemplate);
        }

        if (!data.success) {
          console.log(data.message);
        }
      } catch (error) {
        console.error("API request failed:", error);
      }
    };

    getformData();
  }, [cvId, token]);

  useEffect(() => {
    const colorfn = (color) => {
      const colorMap = {
        "bg-sky-800": "rgb(7, 89, 133)",
        "bg-teal-500": "rgb(20, 184, 166)",
        "bg-orange-800": "rgb(154, 52, 18)",
        "bg-indigo-700": "rgb(67, 56, 202)",
        "bg-gray-700": "rgb(55, 65, 81)",
        "bg-yellow-500": "rgb(234, 179, 8)",
        "bg-blue-500": "rgb(59, 130, 246)",
      };

      return colorMap[color] || "rgb(107, 114, 128)"; // Default gray
    };

    setRgbColor(colorfn(bgcolor)); // Update state with RGB color
  }, [bgcolor]);

  const getSkillLevel = (level) => {
    if (level <= 20) return { label: "Basic" };
    if (level <= 40) return { label: "Good" };
    if (level <= 70) return { label: "Experienced" };
    return { label: "Expert", color: "bg-green-400" };
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${URL_BACKEND}/api/Aicv/deleteCV/${cvId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Your CV Is Create Successfully");
        navigate("/");

        // console.log("data", data.data.newCV);
      }

      if (!data.success) {
        console.log(data.message);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  return (
    <div className=" flex flex-col p-5 items-center gap-5">
      <div className=" flex items-center gap-10 ">
        {formData.user === currentUser._id && (
          <button
            onClick={() => toPDF()}
            className=" bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all mx-auto"
          >
            Download PDF
          </button>
        )}
        {(formData.user === currentUser._id || currentUser.admin) && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition duration-200"
          >
            <FiTrash className="w-6 h-6" />
          </button>
        )}
      </div>
      {/* classic */}
      {cvTemplate === "classic" && (
        <div className="shadow-lg ">
          <div
            className="md:max-w-3xl w-full   bg-white p-10  mx-auto"
            ref={cvTemplate === "classic" && targetRef}
          >
            <div>
              <div className="flex gap-10 items-center border-b pb-3">
                <div
                  style={{ backgroundColor: rgbColor, color: textcolor }}
                  className={`w-36 h-36 rounded-full overflow-hidden border-4  flex justify-center items-center bg-opacity-40 `}
                >
                  {formData?.cvprojectImage?.secure_url ? (
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white">
                      <img
                        src={formData.cvprojectImage.secure_url}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <span
                      style={{ color: rgbColor }}
                      className={`text-5xl font-bold `}
                    >
                      {formData?.personalInfo?.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="">
                  <h1
                    style={{ color: rgbColor, opacity: 0.7 }}
                    className={`text-xl font-bold `}
                  >
                    {formData?.personalInfo?.name}
                  </h1>
                  <p style={{ color: rgbColor }} className={` font-bold mb-4`}>
                    {formData?.personalInfo?.headline}
                  </p>

                  <p>
                    <span className="text-slate-500 font-bold text-xs">
                      Email:
                    </span>{" "}
                    <span
                      style={{ color: rgbColor, opacity: 0.7 }}
                      className={` font-bold  text-xs`}
                    >
                      {formData?.personalInfo?.email}
                    </span>
                  </p>
                  <p className={` font-bold  text-xs`}>
                    <span className="text-slate-500 font-bold">Phone:</span>{" "}
                    <span style={{ color: rgbColor, opacity: 0.7 }}>
                      {formData?.personalInfo?.phone}
                    </span>
                  </p>
                  <p
                    style={{ color: rgbColor }}
                    className={` font-bold text-opacity-40 text-xs`}
                  >
                    <span className="text-slate-500 font-bold">Address:</span>{" "}
                    <span style={{ color: rgbColor, opacity: 0.7 }}>
                      {formData?.personalInfo?.address}
                    </span>
                  </p>
                  {formData?.personalInfo?.linkdin && (
                    <p
                      style={{ color: rgbColor }}
                      className={` text-xs font-bold text-opacity-40`}
                    >
                      <span className="text-slate-500 font-bold">
                        linkedin:
                      </span>{" "}
                      <span style={{ color: rgbColor, opacity: 0.7 }}>
                        {formData?.personalInfo?.linkdin}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Summary Section */}

              <div className="border-b pb-3">
                <h2
                  style={{ color: rgbColor }}
                  className={`text-lg font-semibold mb-1`}
                >
                  Summary
                </h2>
                <p className="text-gray-600 text-xs text-justify leading-relaxed">
                  {formData?.summary}
                </p>
              </div>

              {/* Education Section */}
              <div className="flex gap-5 border-b pb-3 justify-between">
                {/* eduction */}

                {formData?.education?.length > 0 && (
                  <div className="flex gap-4 pb-2">
                    <div className="">
                      <h2
                        style={{ color: rgbColor }}
                        className={`text-lg font-semibold  my-3 `}
                      >
                        Education
                      </h2>
                      <div className="space-y-3">
                        {formData?.education?.map((edu, index) => (
                          <div key={index} className="text-gray-700 ">
                            <h3
                              style={{ color: rgbColor }}
                              className={`  font-bold`}
                            >
                              {edu?.degree}
                            </h3>
                            <p>{edu.institution}</p>
                            <p className="text-gray-500 text-xs">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Certifications Section */}
                {formData?.certificates?.length > 0 && (
                  <div className="basis-[50%]">
                    <h2
                      style={{ color: rgbColor }}
                      className={`text-lg font-semibold  my-3`}
                    >
                      Certifications
                    </h2>
                    <div className="space-y-3 ">
                      {formData?.certificates?.map((cert, index) => (
                        <div key={index} className="text-gray-700 ">
                          <h3
                            style={{ color: rgbColor }}
                            className={` font-bold`}
                          >
                            {cert.name}
                          </h3>
                          <p>{cert.institution}</p>
                          <p className="text-gray-500 text-xs">
                            {cert?.duration}
                          </p>
                          <p className="text-gray-500 text-xs">{cert?.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* skills */}
              {formData?.skills?.length > 0 && (
                <div className=" border-b pb-3">
                  <h2
                    style={{ color: rgbColor }}
                    className={`text-lg font-semibold  my-3`}
                  >
                    Skills
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {formData?.skills?.map((skill, index) => (
                      <div key={index} className="flex flex-col gap-1 ">
                        <span className=" font-medium text-gray-700">
                          {skill?.name}
                        </span>
                        <div className="w-2/3 bg-gray-300 rounded-full h-1.5">
                          <div
                            className={` h-1.5 rounded-full `}
                            style={{
                              width: `${skill.level}%`,
                              background: rgbColor,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* lang */}
              {formData?.languages?.length > 0 && (
                <div className="mb-3 border-b pb-3  rounded-lg">
                  <h2
                    style={{ color: rgbColor }}
                    className={`text-lg font-bold  my-3`}
                  >
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {formData?.languages?.map((language, index) => (
                      <div key={index} className="flex flex-col ">
                        <span className={`text-black  font-semibold mb-4`}>
                          {language?.name}
                        </span>
                        <span className="text-sm font-medium text-slate-400">
                          {language?.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* project */}

              {formData?.projects?.length > 0 && (
                <div className="">
                  <h2
                    style={{ color: rgbColor }}
                    className={`text-lg font-semibold  mb-2`}
                  >
                    Projects
                  </h2>
                  {formData?.projects?.map((exp, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between items-center border-b pb-2 mb-2">
                        <div>
                          <h3
                            style={{ color: rgbColor }}
                            className={` text-opacity-70 font-bold`}
                          >
                            {exp?.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {exp.duration}
                          </p>
                        </div>
                      </div>
                      <h5 className="text-gray-600 font-semibold">
                        Description:
                      </h5>
                      <div
                        style={{ borderBottom: `1px solid ${rgbColor}` }}
                        className="text-gray-700 text-sm mt-2 details leading-relaxed pb-5"
                        dangerouslySetInnerHTML={{ __html: exp.details }}
                      ></div>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience Section */}
              {formData?.experience?.length > 0 && (
                <div className="border-t">
                  <h2
                    style={{ color: rgbColor }}
                    className={`text-xl font-semibold  mb-2`}
                  >
                    Experience
                  </h2>
                  {formData?.experience?.map((exp, index) => (
                    <div key={index} className="mb-2   ">
                      <div className="flex justify-between items-center pb-2 mb-2">
                        <div>
                          <h3
                            style={{ color: rgbColor }}
                            className={` text-opacity-70 font-bold`}
                          >
                            {exp?.jobTitle}
                          </h3>
                          <p className="text-gray-500 text-sm">{exp.company}</p>
                          <p className="text-gray-500 text-sm">
                            {exp.duration}
                          </p>
                        </div>
                      </div>
                      <h5 className="text-gray-600 font-semibold">
                        Description:
                      </h5>
                      <div
                        style={{ borderBottom: `1px solid ${rgbColor}` }}
                        className="text-gray-700 text-sm mt-2 details leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: exp.details }}
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

      {/* creative */}
      {cvTemplate === "creative" && (
        <div className="">
          <div
            className="max-w-3xl mx-auto bg-white shadow-xl border border-gray-200 p-10"
            ref={cvTemplate === "creative" && targetRef}
          >
            {/* head */}
            <div className="">
              <div className="flex  items-center justify-between p-3 text-white rounded-t-2xl">
                <div className="flex gap-3 items-center basis-[30%] ">
                  <div className="relative">
                    <h1
                      className={`text-4xl font-semibold mt-4 text-slate-300 z-10 leading-none  `}
                    >
                      {formData?.personalInfo?.name}
                    </h1>
                    <p className={`text-slate-400 text-lg  text-opacity-60`}>
                      {formData?.personalInfo?.headline}
                    </p>
                  </div>
                </div>

                {formData?.cvprojectImage?.secure_url && (
                  <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white">
                    <img
                      src={formData?.cvprojectImage.secure_url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`mt-2 flex gap-1  flex-col text-xs text-slate-400`}
                >
                  <p>{formData?.personalInfo?.email}</p>
                  <p>{formData?.personalInfo?.phone} </p>
                  <p>{formData?.personalInfo?.address}</p>
                  <p>{formData?.personalInfo?.linkdin}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-10">
              {/* siderbar */}
              <div className="basis-[50%]">
                <div className="flex flex-col mb-2 border-b-2 py-3">
                  <div className="relative inline-block mb-2 ">
                    <p className="text-lg font-bold  text-slate-500 relative z-50">
                      About
                    </p>

                    <div
                      style={{ background: rgbColor }}
                      className={`absolute left-0 top-7 h-5 w-24 bg-opacity-50 -translate-y-1/2 z-10`}
                    ></div>
                  </div>

                  <p className={`text-gray-700 text-xs `}>
                    {formData?.summary}
                  </p>
                </div>

                {/* skills */}
                {formData?.skills?.length > 0 && (
                  <div className="flex flex-col mb-10 border-b-2 pb-3">
                    <div className="relative inline-block mb-3">
                      {/* Text with higher z-index */}
                      <p className="text-lg font-bold  text-slate-500 relative z-50">
                        Skills
                      </p>

                      {/* Background highlight with dynamic color */}
                      <div
                        style={{ background: rgbColor }}
                        className={`absolute left-0 top-7 h-5 w-24 bg-opacity-50 -translate-y-1/2 z-10`}
                      ></div>
                    </div>
                    <div className="grid gap-3 ">
                      {formData?.skills?.map((skill, index) => {
                        const { label } = getSkillLevel(skill?.level);
                        return (
                          <div key={index} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs  text-gray-700">
                                {skill?.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* lang */}
                {formData?.languages?.length > 0 && (
                  <div className="flex flex-col mb-10 border-b-2 pb-3">
                    <div className="relative inline-block mb-3">
                      {/* Text with higher z-index */}
                      <p className="text-lg font-bold  text-slate-500 relative z-50">
                        Languages
                      </p>

                      {/* Background highlight with dynamic color */}
                      <div
                        style={{ background: rgbColor }}
                        className={`absolute left-0 top-7 h-5 w-24  bg-opacity-50 -translate-y-1/2 z-10`}
                      ></div>
                    </div>
                    <div className="grid gap-3 ">
                      {formData?.languages?.map((skill, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs  text-gray-700">
                                {skill?.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {skill?.proficiency}
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
                {formData?.experience?.length > 0 && (
                  <div className="flex flex-col mb-3 p-2 border-b-2">
                    <div className="relative inline-block mb-3">
                      {/* Text with higher z-index */}
                      <p className="text-2xl font-bold  text-slate-500 relative z-50">
                        Experience
                      </p>

                      {/* Background highlight with dynamic color */}
                      <div
                        style={{ background: rgbColor }}
                        className={`absolute left-0 top-8 h-5 w-36  bg-opacity-50 -translate-y-1/2 z-10`}
                      ></div>
                    </div>

                    <div className="">
                      {" "}
                      {formData?.experience?.map((exp, index) => (
                        <div key={index} className="mb-2">
                          <div className="flex justify-between items-center border-b pb-2 mb-2">
                            <div>
                              <p
                                style={{ color: rgbColor }}
                                className={`text-xs  text-opacity-70`}
                              >
                                {exp.title}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {exp.company}
                              </p>
                            </div>
                            <p className="text-gray-500 text-xs">
                              {exp.duration}
                            </p>
                          </div>
                          <h5 className="text-gray-600 text-xs ">
                            Description:
                          </h5>
                          <div
                            className="text-gray-700 text-xs details leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: exp.details }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project */}
                {formData?.projects?.length > 0 && (
                  <div className="flex flex-col mb-2 px-2 border-b-2">
                    <div className="relative inline-block mb-5">
                      {/* Text with higher z-index */}
                      <p className="text-2xl font-bold  text-slate-500 relative z-50">
                        Project
                      </p>

                      {/* Background highlight with dynamic color */}
                      <div
                        style={{ background: rgbColor }}
                        className={`absolute left-0 top-8 h-5 w-36 bg-opacity-50 -translate-y-1/2 z-10`}
                      ></div>
                    </div>

                    <div className="">
                      {" "}
                      {formData?.projects?.map((exp, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between items-center border-b pb-2 mb-2">
                            <div>
                              <h3
                                style={{ color: rgbColor }}
                                className={`text-xs font-bold  text-opacity-70`}
                              >
                                {exp.title}
                              </h3>
                              <p className="text-gray-500 text-xs">
                                {exp.company}
                              </p>
                            </div>
                            <p className="text-gray-500 text-xs">
                              {exp.duration}
                            </p>
                          </div>
                          <h5 className="text-gray-600 text-xs font-semibold">
                            Description:
                          </h5>
                          <div
                            className="text-gray-700 details text-xs mt-2 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: exp.details }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* education */}

                {formData?.education?.length > 0 && (
                  <div className="flex flex-col mb-5 px-2 border-b-2">
                    <div className="relative inline-block mb-5">
                      {/* Text with higher z-index */}
                      <p className="text-2xl font-bold  text-slate-500 relative z-50">
                        Education
                      </p>

                      {/* Background highlight with dynamic color */}
                      <div
                        style={{ background: rgbColor }}
                        className={`absolute left-0 top-8 h-5 w-36  bg-opacity-50 -translate-y-1/2 z-10`}
                      ></div>
                    </div>

                    <div className="">
                      {" "}
                      {formData?.education?.map((edu, index) => (
                        <div key={index} className="text-gray-700 text-sm mb-4">
                          <h3
                            style={{ color: rgbColor }}
                            className={`font-bold flex items-start  gap-2  `}
                          >
                            <span>
                              <GraduationCap size={20} />
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
                {formData?.certificates?.length > 0 && (
                  <div className="flex flex-col mb-5 p-5 border-b-2">
                    <div className="relative inline-block mb-5">
                      {/* Text with higher z-index */}
                      <p className="text-2xl font-bold  text-slate-500 relative z-50">
                        Certification
                      </p>

                      {/* Background highlight with dynamic color */}
                      <div
                        style={{ background: rgbColor }}
                        className={`absolute left-0 top-8 h-5 w-36  bg-opacity-50 -translate-y-1/2 z-10`}
                      ></div>
                    </div>

                    <div className="">
                      {" "}
                      {formData?.certificates?.map((cert, index) => (
                        <div key={index} className="text-gray-700 text-sm">
                          <h3
                            style={{ color: rgbColor }}
                            className={`font-bold flex items-start  gap-2  `}
                          >
                            <span>
                              <ShieldCheck size={20} />
                            </span>
                            <span>{cert.name}</span>
                          </h3>
                          <p>{cert.institution}</p>
                          <p className="text-gray-500">{cert.duration}</p>
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

      {/* Modern  modern*/}
      {cvTemplate === "modern" && (
        <div className="shadow-lg  rounded-lg">
          <div
            className="max-w-4xl  mx-auto bg-white shadow-xl  mt-8 "
            ref={cvTemplate === "modern" && targetRef}
          >
            {/* Head Section */}
            <div
              style={{ backgroundColor: rgbColor }}
              className={`flex items-center justify-center flex-col gap-2  p-4 text-white`}
            >
              <div
                className={`w-28 h-28 rounded-full overflow-hidden bg-white flex justify-center items-center bg-opacity-40`}
              >
                {formData?.cvprojectImage?.secure_url ? (
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white">
                    <img
                      src={formData?.cvprojectImage?.secure_url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <span className="text-lg font-bold">
                    {formData?.personalInfo?.name?.charAt(0)}
                  </span>
                )}
              </div>

              <div className="flex flex-col items-center gap-1">
                <h1 className="tracking-[13px] text-3xl font-semibold">
                  {formData?.personalInfo?.name}
                </h1>
                <p className="text-gray-100 text-lg tracking-[2px]">
                  {formData?.personalInfo?.headline}
                </p>
              </div>
            </div>

            {/* Body Section */}
            <div
              style={{ color: rgbColor }}
              className="flex flex-col md:flex-row   font-sans"
            >
              {/* Sidebar */}
              <div
                style={{ backgroundColor: rgbColor }}
                className={`  py-3 px-6  space-y-6 mt-3 basis-[30%]`}
              >
                {/* Contact Section */}
                <div>
                  <h2 className={`text-lg  font-semibold mb-2`}>Contact</h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>
                        <MdOutlineMailOutline />
                      </span>
                      <p className="flex-1">{formData?.personalInfo?.email}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>
                        <CiPhone />
                      </span>
                      <p className="flex-1">{formData?.personalInfo?.phone}</p>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <span>
                        <IoLocationOutline />
                      </span>
                      <p className="flex-1">
                        {formData?.personalInfo?.address}
                      </p>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <span>
                        <CiLinkedin />
                      </span>
                      <p className="flex-1">
                        {formData?.personalInfo?.linkdin}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                {formData?.education?.length > 0 && (
                  <div>
                    <h2 className={`text-lg font-semibold mb-2`}>Education</h2>
                    <div className="space-y-2 ">
                      {formData?.education?.map((edu, index) => (
                        <div key={index} className="text-gray-700 text-sm mb-4">
                          <h3 className="font-bold flex items-start gap-2 ">
                            <span>
                              <GraduationCap size={20} />
                            </span>
                            <span>{edu.degree}</span>
                          </h3>
                          <p className="text-sm"> {edu.institution}</p>
                          <p className="text-gray-500">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications Section */}
                {formData?.certificates?.length > 0 && (
                  <div>
                    <h2
                      style={{ color: rgbColor }}
                      className={`text-lg font-semibold mb-2`}
                    >
                      Certifications
                    </h2>
                    <div className="space-y-1">
                      {formData?.certificates?.map((cert, index) => (
                        <div key={index} className="text-gray-700 text-sm mb-4">
                          <h3 className="font-bold flex items-start  gap-2 ">
                            <span>
                              <ShieldCheck size={20} />
                            </span>
                            <span>{cert.name}</span>
                          </h3>
                          <p>{cert.institution}</p>
                          <p className="text-gray-500">{cert.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData?.languages?.length > 0 && (
                  <div>
                    <h2 className={`text-lg  font-semibold mb-2`}>Language</h2>
                    <div className="space-y-2">
                      {formData?.languages?.map((cert, index) => (
                        <div key={index} className="text-gray-700 text-sm">
                          <h3 className="font-bold flex justify-between items-start  gap-2 ">
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
              <div className="  py-2 px-6 basis-[70%] ">
                {/* Summary Section */}
                {formData?.summary && (
                  <div className="my-4">
                    <h2
                      style={{ color: rgbColor }}
                      className={`text-lg font-semibold   mb-2`}
                    >
                      Objective
                    </h2>
                    <p className="text-gray-600 text-sm text-justify leading-relaxed">
                      {formData?.summary}
                    </p>
                  </div>
                )}

                {formData?.skills?.length > 0 && (
                  <div className="mb-2">
                    <h2
                      style={{ color: rgbColor }}
                      className={`text-lg  font-semibold mb-2`}
                    >
                      Skills
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {formData?.skills?.map((skill, index) => (
                        <div key={index} className="flex flex-col gap-1">
                          <span className="text-sm mb-2  text-gray-700">
                            {skill.name}
                          </span>
                          <div className="w-2/3 bg-gray-100 rounded-full h-1">
                            <div
                              className={` h-1 rounded-full`}
                              style={{
                                width: `${skill.level}%`,
                                background: rgbColor,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* projects */}
                {formData?.projects?.length > 0 && (
                  <div className={`my-4  p-2 rounded-lg`}>
                    <h2
                      style={{ color: rgbColor }}
                      className={`text-xl font-semibold   mb-2`}
                    >
                      Project
                    </h2>
                    {formData?.projects?.map((exp, index) => (
                      <div key={index} className="mb-2  rounded-lg">
                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                          <div>
                            <div
                              style={{ color: rgbColor }}
                              className={`text-sm font-bold  opacity-70 flex items-center justify-center`}
                            >
                              <span>{exp.title}</span>
                            </div>
                          </div>
                        </div>
                        <h6 className="text-slate-500 mb-2 text-sm">
                          Duration: {exp.duration}
                        </h6>
                        <p className="text-gray-600 text-sm font-semibold">
                          Description:
                        </p>
                        <div
                          className="text-gray-700 text-xs mt-2  leading-relaxed details"
                          dangerouslySetInnerHTML={{ __html: exp.details }}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Experience Section */}
                {formData?.experience?.length > 0 && (
                  <div className={`my-2  p-2 rounded-lg`}>
                    <h2
                      style={{ color: rgbColor }}
                      className={`text-lg font-semibold   mb-2`}
                    >
                      Experience
                    </h2>
                    {formData?.experience?.map((exp, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                          <div>
                            <div
                              style={{ color: rgbColor }}
                              className={`text-sm font-bold  opacity-70 flex items-center justify-center`}
                            >
                              <span>{exp.jobTitle}</span>
                            </div>
                            <p className="text-gray-500 text-sm">
                              {exp.company}
                            </p>
                          </div>
                          <p className="text-gray-500 text-sm">
                            {exp.duration}
                          </p>
                        </div>
                        <h5 className="text-gray-600 text-sm font-semibold">
                          Description:
                        </h5>
                        <div
                          className="text-gray-700 text-xs mt-2 leading-relaxed details"
                          dangerouslySetInnerHTML={{ __html: exp.details }}
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

      {/* Professional */}
      {cvTemplate === "professional" && (
        <div className="shadow-lg  ">
          <div
            className="max-w-4xl mx-auto bg-white shadow-xl  mt-8 p-10"
            ref={cvTemplate === "professional" && targetRef}
          >
            {/* Header Section */}
            <div
              style={{ color: rgbColor }}
              className="flex flex-col items-center  p-2 text-white"
            >
              <div className="flex gap-5 items-center">
                <div
                  className={`w-36 h-36 rounded-full overflow-hidden border-4  flex justify-center items-center bg-opacity-40 `}
                >
                  {formData?.cvprojectImage?.secure_url ? (
                    <div className="w-36 h-36 rounded-full overflow-hidden ">
                      <img
                        src={formData?.cvprojectImage?.secure_url}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <span className="text-5xl font-bold">
                      {formData?.personalInfo?.name?.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="">
                  <h1 className={`text-4xl font-semibold mt-4 mb-2 `}>
                    {formData?.personalInfo?.name}
                  </h1>
                  <p className={` font-bold text-opacity-60`}>
                    {formData?.personalInfo?.headline}
                  </p>
                </div>
              </div>
              <div className={`mt-5 mb-1  flex gap-3 text-sm  text-opacity-75`}>
                <p>
                  <Mail size={20} className="inline mr-1 " />{" "}
                  {formData?.personalInfo?.email} |
                </p>
                <p>
                  <Phone size={20} className="inline mr-1 " />{" "}
                  {formData?.personalInfo?.phone} |
                </p>
                <p>
                  <MapPin size={20} className="inline mr-1 " />{" "}
                  {formData?.personalInfo?.address}
                </p>
              </div>
            </div>
            <div style={{ rgbColor }} className={`h-3 w-full  `}></div>

            {/* Body Section */}
            <div className=" p-3 ">
              <div className="md:col-span-2  ">
                {/* Summary */}
                <div className="flex mb-7">
                  <p className={`text-gray-700 text-sm text-justify `}>
                    {formData?.summary}
                  </p>
                </div>

                {/* experience */}
                {formData?.experience?.length > 0 && (
                  <div className="flex mb-5">
                    <h1
                      style={{ color: rgbColor }}
                      className={`  font-semibold text-2xl basis-[30%]`}
                    >
                      Experience
                    </h1>
                    <div className="">
                      {formData?.experience?.map((exp, index) => (
                        <div key={index} className="mb-5">
                          <div className="flex justify-between items-center border-b pb-2 mb-2">
                            <div>
                              <h3
                                style={{ color: rgbColor }}
                                className={`text-base font-bold  text-opacity-70`}
                              >
                                {exp.jobTitle}
                              </h3>
                              <p className="text-gray-500 text-sm">
                                {exp.company}
                              </p>
                            </div>
                            <p className="text-gray-500 text-sm">
                              {exp.duration}
                            </p>
                          </div>
                          <h5 className="text-gray-600 text-sm font-semibold">
                            Description:
                          </h5>
                          <div
                            className="text-gray-700 text-xs details mt-1 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: exp.details }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* project */}
                {formData?.projects?.length > 0 && (
                  <div className="flex mb-5">
                    <h1
                      style={{ color: rgbColor }}
                      className={`  font-semibold text-2xl basis-[30%]`}
                    >
                      Project
                    </h1>
                    <div className="">
                      {formData?.projects?.map((exp, index) => (
                        <div key={index} className="mb-2">
                          <div className="flex justify-between items-center border-b pb-2 mb-2">
                            <div>
                              <h3
                                style={{ color: rgbColor }}
                                className={`text-base font-bold  text-opacity-70`}
                              >
                                {exp.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-gray-500 text-sm mb-2">
                            Duration: {exp.duration}
                          </p>
                          <h5 className="text-gray-600 text-sm font-semibold">
                            Description:
                          </h5>
                          <div
                            className="text-gray-700 text-xs details leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: exp.details }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* education */}
                {formData?.education?.length > 0 && (
                  <div className="flex mb-5">
                    <h1
                      style={{ color: rgbColor }}
                      className={`  font-semibold text-2xl basis-[30%]`}
                    >
                      Education
                    </h1>
                    <div className="basis-[70%]">
                      {formData?.education?.map((edu, index) => (
                        <div key={index} className="text-gray-700 text-sm mb-5">
                          <h3
                            style={{ color: rgbColor }}
                            className={`font-bold flex items-start text-sm gap-2  `}
                          >
                            <span>
                              <GraduationCap size={20} />
                            </span>
                            <span className="text-base">{edu.degree}</span>
                          </h3>
                          <p className="text-sm">{edu.institution}</p>
                          <p className="text-gray-500 text-sm">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData?.certifications?.length > 0 && (
                  <div className="flex mb-5">
                    <h1
                      style={{ color: rgbColor }}
                      className={`  font-semibold text-2xl basis-[30%]`}
                    >
                      Certifications
                    </h1>
                    <div className="space-y-3">
                      {formData?.certifications?.map((cert, index) => (
                        <div key={index} className="text-gray-700 text-sm mb-5">
                          <h3
                            style={{ color: rgbColor }}
                            className={`font-bold flex text-sm items-start  gap-2  `}
                          >
                            <span>
                              <ShieldCheck size={20} />
                            </span>
                            <span className="text-sm">{cert.title}</span>
                          </h3>
                          <p className="text-xs"> {cert.institution}</p>
                          <p className="text-gray-500 text-xs">{cert.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData?.skills?.length > 0 && (
                  <div className="flex mb-10">
                    <h1
                      style={{ color: rgbColor }}
                      className={`  font-semibold text-2xl basis-[30%]`}
                    >
                      Skills
                    </h1>
                    <div className="grid grid-cols-2 gap-4 basis-[60%]">
                      {formData?.skills?.map((skill, index) => (
                        <div key={index} className="flex flex-col gap-4">
                          <span className="text-xs  text-gray-700">
                            {skill.name}
                          </span>
                          <div className="w-full  bg-slate-200 rounded-full h-1">
                            <div
                              className={` h-1 rounded-full`}
                              style={{
                                width: `${skill.level}%`,
                                background: rgbColor,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData?.languages?.length > 0 && (
                  <div className="flex items-center mb-4">
                    <h1
                      style={{ color: rgbColor }}
                      className={`  font-semibold text-2xl basis-[30%]`}
                    >
                      Languages
                    </h1>
                    <div className="grid grid-cols-2 gap-4 basis-[60%]">
                      {formData?.languages?.map((cert, index) => (
                        <div key={index} className="text-gray-700 text-sm">
                          <h3 className="font-bold flex items-start  gap-2 ">
                            <span className="">{cert.name}:</span>
                            <span className="text-slate-400">
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
}
