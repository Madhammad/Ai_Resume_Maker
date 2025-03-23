import { cv } from "../helper/CVdata";
import PropTypes from "prop-types";
import {
  Phone,
  MapPinHouse,
  GraduationCap,
  ShieldCheck,
  MailCheck,
} from "lucide-react";

export default function ModernCV({
  textcolor,
  bgcolor,
  personalInfo,
  certificates,
  education,
  skills,
  projects,
  experience,
  languages,
  summary,
  profileImage
}) {
  return (
    <>
      <div className="max-w-2xl mx-auto bg-white shadow-xl  border border-gray-200">
        {/* Head Section */}
        <div
          className={`flex items-center justify-center flex-col gap-1  ${bgcolor} p-3  text-white`}
        >
          <div
            className={`w-20 h-20 rounded-full overflow-hidden bg-white flex justify-center items-center bg-opacity-40 ${textcolor}`}
          >
            {profileImage ? (
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <span className="text-5xl font-bold">
                {personalInfo?.name?.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center gap-1">
            <h1 className="tracking-[10px] text-3xl font-semibold">
              {personalInfo?.name}
            </h1>
            <p className="text-gray-100 text-lg tracking-[2px]">
              {personalInfo?.headline}
            </p>
          </div>
        </div>

        {/* Body Section */}
        <div className="flex flex-col md:flex-row   font-sans">
          {/* Sidebar */}
          <div
            className={`${bgcolor} bg-opacity-30 p-4 w-[40%] space-y-6 mt-3 `}
          >
            {/* Contact Section */}
            <div>
              <h2 className={`text-xl ${textcolor} font-semibold mb-4`}>
                Contact
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[9px] text-gray-700">
                  <MailCheck size={15} className={textcolor} />
                  <p>{personalInfo?.email}</p>
                </div>
                <div className="flex items-center gap-2 text-[9px] text-gray-700">
                  <Phone size={15} className={textcolor} />
                  <p>{personalInfo?.phone}</p>
                </div>
                <div className="flex items-start gap-2 text-[9px] text-gray-700">
                  <MapPinHouse size={15} className={textcolor} />
                  <p>{personalInfo?.address}</p>
                </div>
              </div>
            </div>

            {/* Education Section */}
            {education?.some(
              (edu) =>
                edu.degree.trim() || edu.institution.trim() || edu.year.trim()
            ) && (
              <div>
                <h2 className={`text-xl ${textcolor} font-semibold mb-4`}>
                  Education
                </h2>
                <div className="space-y-2 ">
                  {education
                    ?.filter(
                      (edu) =>
                        edu.degree.trim() ||
                        edu.institution.trim() ||
                        edu.year.trim()
                    )
                    .map((edu, index) => (
                      <div key={index} className="text-gray-700">
                        <h3 className="font-bold flex items-start text-xs  gap-2 ">
                          <span>
                            <GraduationCap
                              size={20}
                              className={` ${textcolor} opacity-80`}
                            />
                          </span>
                          <span className={` ${textcolor} opacity-80`}>
                            {edu.degree}
                          </span>
                        </h3>
                        <p className="text-[10px]">{edu.institution}</p>
                        <p className="text-gray-500 text-[0.875rem]">{edu.year}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {/* Certifications Section */}

            {certificates.some(
              (edu) =>
                edu.name.trim() || edu.institution.trim() || edu.year.trim()
            ) && (
              <div>
                <h2 className={`text-xl ${textcolor} font-semibold mb-4`}>
                  Certifications
                </h2>
                <div className="space-y-2">
                  {certificates
                    ?.filter(
                      (edu) =>
                        edu.name.trim() ||
                        edu.institution.trim() ||
                        edu.duration.trim() ||
                        edu.year.trim()
                    )
                    .map((cert, index) => (
                      <div key={index} className="text-gray-700 text-xs">
                        <h3 className="font-bold flex items-start  gap-2 ">
                          <span>
                            <ShieldCheck
                              size={20}
                              className={` ${textcolor} opacity-80`}
                            />
                          </span>
                          <span className={` ${textcolor} opacity-80`}>
                            {cert.name}
                          </span>
                        </h3>
                        <p>{cert.institution}</p>
                        <p className="text-gray-500">{cert.year}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {languages.some((edu) => edu.name.trim()) && (
              <div>
                <h2 className={`text-xl ${textcolor} font-semibold mb-4`}>
                  Language
                </h2>
                <div className="space-y-2">
                  {languages
                    ?.filter((edu) => edu.name.trim())
                    .map((cert, index) => (
                      <div key={index} className="text-gray-700 text-xs">
                        <h3 className="font-bold flex items-start  gap-2 ">
                          <span className="">{cert.name}</span>
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

          {/* Main Content */}
          <div className="w-full md:w-2/3  p-4 ">
            {/* Summary Section */}
            {summary && (
              <div className="my-4">
                <h2 className={`text-xl font-semibold ${textcolor}  mb-3`}>
                  Objective
                </h2>
                <p className="text-gray-600 text-[0.7rem] text-justify leading-relaxed">
                  {cv.summary}
                </p>
              </div>
            )}

            {/* Skills Section */}
            {skills.some((edu) => edu.name.trim() || edu.level !== 0) && (
              <div className="mb-4">
                <h2 className={`text-lg ${textcolor} font-semibold mb-2`}>
                  Skills
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {skills
                    ?.filter((edu) => edu.name.trim())
                    .map((skill, index) => (
                      <div key={index} className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-700 text-[0.7rem]">
                          {skill.name}
                        </span>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className={`${bgcolor} h-2 rounded-full`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* projects */}
            {projects.some(
              (edu) =>
                edu.title.trim() || edu.duration.trim() || edu.details.trim()
            ) && (
              <div className={`my-4 ${bgcolor} bg-opacity-10 p-2 rounded-lg`}>
                <h2 className={`text-xl font-semibold ${textcolor}  mb-3`}>
                  Project
                </h2>
                {projects
                  ?.filter(
                    (exp) =>
                      exp.title.trim() &&
                      exp.duration.trim() &&
                      exp.details.trim()
                  )
                  .map((exp, index) => (
                    <div key={index} className="mb-4  rounded-lg">
                      <div className="flex justify-between items-center border-b pb-2 mb-2">
                        <div>
                          <h3
                            className={`text-[0.9rem] font-bold ${textcolor} opacity-70`}
                          >
                            {exp.title}
                          </h3>
                          <p className="text-gray-500 text-[0.7rem]">
                            {exp.type}
                          </p>
                        </div>
                      </div>
                      <h6 className="text-slate-400 text-[0.7rem]">
                        Duration:{exp.duration}
                      </h6>
                      <h5 className="text-gray-600 font-semibold text-[0.7rem]">
                        Description:
                      </h5>
                      <div
                        className="text-gray-700 text-[0.7rem] mt-2 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: exp.details }}
                      ></div>
                    </div>
                  ))}
              </div>
            )}

            {/* Experience Section */}
            {experience.some(
              (edu) =>
                edu.jobTitle.trim() || edu.company.trim() || edu.details.trim()
            ) && (
              <div className={`my-4 ${bgcolor} bg-opacity-10 p-2 rounded-lg`}>
                <h2 className={`text-xl font-semibold ${textcolor}  mb-3`}>
                  Experience
                </h2>
                {experience?.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                      <div>
                        <h3
                          className={`text-[0.7rem] font-bold ${textcolor} opacity-70`}
                        >
                          {exp.jobTitle}
                        </h3>
                        <p className="text-gray-500 text-[0.7rem]">
                          {exp.company}
                        </p>
                      </div>
                      <p className="text-gray-500 text-[0.7rem]">
                        {exp.duration}
                      </p>
                    </div>
                    <h5 className="text-gray-600 font-semibold text-[0.7rem]">
                      Description:
                    </h5>
                    <div
                      className="text-gray-700 text-[0.7rem] mt-2 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: exp.details }}
                    ></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

ModernCV.propTypes = {
  textcolor: PropTypes.string.isRequired,
  bgcolor: PropTypes.string.isRequired,
  certificates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      institution: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    })
  ),
  personalInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    linkdin: PropTypes.string,
    headline: PropTypes.string,
  }).isRequired,

  education: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string.isRequired,
      institution: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    })
  ).isRequired,
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
  summary: PropTypes.string.isRequired,
};
