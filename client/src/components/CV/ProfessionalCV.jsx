import { GraduationCap, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import PropTypes from "prop-types";

const ProfessionalCV = ({
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
  profileImage,
}) => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl mt-8 border border-gray-200">
      {/* Header Section */}
      <div className="flex flex-col items-center  p-6 text-white rounded-t-2xl">
        <div className="flex gap-5 items-center">
          <div
            className={`w-28 h-28 rounded-full overflow-hidden ${bgcolor} flex justify-center items-center bg-opacity-40 ${textcolor}`}
          >
            {profileImage ? (
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white">
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

          <div className="">
            <h1 className={`text-3xl font-semibold mt-4 ${textcolor}`}>
              {personalInfo.name}
            </h1>
            <p className={`${textcolor} font-bold text-opacity-60`}>
              {personalInfo.headline}
            </p>
          </div>
        </div>
        <div
          className={`mt-2  flex gap-1 text-[8px] ${textcolor} text-opacity-75`}
        >
          <p>
            <Mail size={10} className="inline " /> {personalInfo.email} |
          </p>
          <p>
            <Phone size={10} className="inline " /> {personalInfo.phone} |
          </p>
          <p>
            <MapPin size={10} className="inline " /> {personalInfo.address}
          </p>
        </div>
      </div>
      <div className={`h-3 w-full ${bgcolor} `}></div>

      {/* Body Section */}
      <div className=" p-5">
        <div className="md:col-span-2 ">
          {/* Summary */}
          <div className="flex mb-10">
            <p className={`text-gray-700 text-sm text-justify `}>{summary}</p>
          </div>

          {/* experience */}
          {experience.some(
            (edu) =>
              edu.jobTitle.trim() || edu.company.trim() || edu.details.trim()
          ) && (
            <div className="flex gap-5">
              <h1
                className={` ${textcolor} font-semibold text-base basis-[30%]`}
              >
                Experience
              </h1>
              <div className="">
                {experience?.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                      <div>
                        <h6
                          className={`text-base font-bold ${textcolor} text-opacity-70`}
                        >
                          {exp.jobTitle}
                        </h6>
                        <p className="text-gray-500 text-sm">{exp.company}</p>
                      </div>
                      <p className="text-gray-500 text-sm">{exp.duration}</p>
                    </div>
                    <h5 className="text-gray-600 text-sm font-semibold">
                      Description:
                    </h5>
                    <div
                      className="text-gray-700 text-sm mt-2 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: exp.details }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* project */}
          {projects.some(
            (edu) =>
              edu.title.trim() || edu.duration.trim() || edu.details.trim()
          ) && (
            <div className="flex gap-5">
              <h1
                className={` ${textcolor} font-semibold text-base basis-[30%]`}
              >
                Project
              </h1>
              <div className="">
                {projects
                  ?.filter(
                    (exp) =>
                      exp.title.trim().length > 0 ||
                      exp.duration.trim().length > 0 ||
                      exp.details.trim().length > 0
                  )
                  .map((exp, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-center border-b pb-2 mb-2">
                        <div>
                          <h3
                            className={`text-base font-bold ${textcolor} text-opacity-70`}
                          >
                            {exp.title}
                          </h3>
                        </div>
                        <p className="text-gray-500 text-sm">{exp.type}</p>
                      </div>
                      <h5 className="text-gray-600 text-sm font-semibold">
                        Description:
                      </h5>
                      <div
                        className="text-gray-700 text-sm mt-2 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: exp.details }}
                      ></div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* education */}
          {education?.some(
            (edu) =>
              edu.degree.trim().length > 0 ||
              edu.institution.trim().length > 0 ||
              edu.year.trim().length > 0
          ) && (
            <div className="flex gap-5">
              <h1
                className={`${textcolor} font-semibold text-base basis-[30%]`}
              >
                Education
              </h1>
              <div>
                {education
                  ?.filter(
                    (edu) =>
                      edu.degree.trim().length > 0 ||
                      edu.institution.trim().length > 0 ||
                      edu.year.trim().length > 0
                  )
                  .map((edu, index) => (
                    <div key={index} className="text-gray-700 text-sm mb-4">
                      <h3
                        className={`font-bold flex items-start text-base gap-2 ${textcolor}`}
                      >
                        <span>
                          <GraduationCap size={20} />
                        </span>
                        <span>{edu.degree}</span>
                      </h3>
                      <p>{edu.institution}</p>
                      <p className="text-gray-500">{edu.year}</p>
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
            <div className="flex gap-5 mt-5">
              <h1
                className={` ${textcolor} font-semibold text-base basis-[30%]`}
              >
                Certifications
              </h1>
              <div className="space-y-3">
                {certificates
                  ?.filter(
                    (edu) =>
                      edu.name.trim() ||
                      edu.institution.trim() ||
                      edu.duration.trim() ||
                      edu.year.trim()
                  )
                  .map((cert, index) => (
                    <div key={index} className="text-gray-700 text-sm">
                      <h3
                        className={`font-bold flex items-start  gap-2 ${textcolor} `}
                      >
                        <span>
                          <ShieldCheck size={20} />
                        </span>
                        <span className="tect-re">{cert.name}</span>
                      </h3>
                      <p>{cert.duration}</p>
                      <p>{cert.institution}</p>
                      <p className="text-gray-500">{cert.year}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {skills.some((edu) => edu.name.trim() || edu.level !== 0) && (
            <div className="flex mt-5">
              <h1
                className={` ${textcolor} font-semibold text-base basis-[30%]`}
              >
                Skills
              </h1>
              <div className="grid grid-cols-2 gap-4 basis-[60%]">
                {skills
                  ?.filter((edu) => edu.name.trim())
                  .map((skill, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-700">
                        {skill.name}
                      </span>
                      <div className="w-full  bg-slate-200 rounded-full h-2">
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
          {languages.some((edu) => edu.name.trim()) && (
            <div className="flex mt-5">
              <h1
                className={` ${textcolor} font-semibold text-base basis-[30%]`}
              >
                Languages
              </h1>
              <div className="grid grid-cols-2 gap-4 basis-[60%]">
                {languages
                  ?.filter((edu) => edu.name.trim())
                  .map((cert, index) => (
                    <div key={index} className="text-gray-700 text-xs">
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
  );
};

export default ProfessionalCV;

ProfessionalCV.propTypes = {
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
