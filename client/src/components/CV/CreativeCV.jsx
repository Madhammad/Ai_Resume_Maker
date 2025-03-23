import PropTypes from "prop-types";
import { GraduationCap, ShieldCheck } from "lucide-react";

export default function CreativeCV({
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
}) {
  const getSkillLevel = (level) => {
    if (level <= 20) return { label: "Basic" };
    if (level <= 40) return { label: "Good" };
    if (level <= 70) return { label: "Experienced" };
    return { label: "Expert", color: "bg-green-400" };
  };

  return (
    <div className="max- mx-auto bg-white shadow-xl  mt-8 border border-gray-200 ">
      <div className={` shadow-lg rounded-2xl`}>
        <div className="flex flex-row items-center justify-between p-6 text-white rounded-t-2xl">
          {/* Left Side (Name & Headline) */}
          <div className="flex flex-col md:flex-row gap-5 items-center basis-[35%]">
            <div className="relative text-center md:text-left">
              <h1 className="text-xl font-semibold leading-none mt-2 text-slate-200 z-10">
                {personalInfo.name}
              </h1>
              <p className="text-slate-400 font-medium text-opacity-80 text-xs mt-1">
                {personalInfo.headline}
              </p>
              <div
                className={`absolute left-0 top-14 h-3 w-full ${bgcolor} bg-opacity-50 -translate-y-1/2 z-0`}
              />
            </div>
          </div>

          {/* Profile Image */}
          {profileImage && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Right Side (Contact Info) */}
          <div className="mt-4 md:mt-0 flex flex-col gap-1 text-xs text-slate-300 text-center md:text-right basis-[30%]">
            <p className="font-semibold">{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.address}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        {/* siderbar */}
        <div className="basis-[30%] ">
          <div className="flex flex-col mb-5 p-2 border-b-2">
            <div className="relative inline-block mb-5">
              {/* Text with higher z-index */}
              <p className="text-2xl font-bold text-center text-slate-400 relative z-50">
                About
              </p>

              {/* Background highlight with dynamic color */}
              <div
                className={`absolute left-0 top-8 h-5 w-32 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
              ></div>
            </div>

            <p className={`text-gray-700 text-xs text-justify `}>{summary}</p>
          </div>

          {/* skills */}
          {skills.some((edu) => edu.name.trim() || edu.level !== 0) && (
            <div className="flex flex-col mb-10 p-2 border-b-2">
              <div className="relative inline-block mb-5">
                {/* Text with higher z-index */}
                <p className="text-2xl font-bold text-center text-slate-400 relative z-50">
                  Skills
                </p>

                {/* Background highlight with dynamic color */}
                <div
                  className={`absolute left-0 top-8 h-5 w-32 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                ></div>
              </div>
              <div className="grid  gap-4 ">
                {skills
                  ?.filter((edu) => edu.name.trim())
                  .map((skill, index) => {
                    const { label } = getSkillLevel(skill.level);
                    return (
                      <div key={index} className="flex flex-col  w-full">
                        <div className="flex justify-between gab-2 items-center">
                          <span className="text-xs font-medium text-gray-700">
                            {skill.name}
                          </span>
                          <span className="text-xs text-gray-500">{label}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          {/* languages */}
          {languages.some((edu) => edu.name.trim()) && (
            <div className="flex flex-col mb-10 p-2 border-b-2">
              <div className="relative inline-block mb-5">
                {/* Text with higher z-index */}
                <p className="text-2xl font-bold text-center text-slate-400 relative z-50">
                  Language
                </p>

                {/* Background highlight with dynamic color */}
                <div
                  className={`absolute left-0 top-8 h-5 w-32 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                ></div>
              </div>
              <div className="grid  gap-4 ">
                {languages
                  ?.filter((edu) => edu.name.trim())
                  .map((skill, index) => {
                    return (
                      <div key={index} className="flex flex-col  w-full">
                        <div className="flex justify-between gab-2 items-center">
                          <span className="text-xs font-medium text-gray-700">
                            {skill.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {skill.proficiency}
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
        <div className="basis-[70%]">
          {/* experience */}

          {experience.some(
            (edu) =>
              edu.jobTitle.trim() || edu.company.trim() || edu.details.trim()
          ) && (
            <div className="flex flex-col mb-5 p-3 border-b-2">
              <div className="relative inline-block mb-5">
                {/* Text with higher z-index */}
                <p className="text-xl font-bold  text-slate-400 relative z-50">
                  Experience
                </p>

                {/* Background highlight with dynamic color */}
                <div
                  className={`absolute left-0 top-8 h-5 w-36 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                ></div>
              </div>

              <div className="">
                {" "}
                {experience?.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                      <div>
                        <h3
                          className={`text-base font-bold ${textcolor} text-opacity-70`}
                        >
                          {exp.jobTitle}
                        </h3>
                        <p className="text-gray-500 text-xs">{exp.company}</p>
                      </div>
                      <p className="text-gray-500 text-xs">{exp.duration}</p>
                    </div>
                    <p className="text-gray-600 text-sm font-semibold">
                      Description:
                    </p>
                    <div
                      className="text-gray-700 text-xs mt-2 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: exp.details }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Project */}
          {projects.some(
            (edu) =>
              edu.title.trim() || edu.duration.trim() || edu.details.trim()
          ) && (
            <div className="flex flex-col mb-5 p-3 border-b-2">
              <div className="relative inline-block mb-5">
                {/* Text with higher z-index */}
                <p className="text-2xl font-bold  text-slate-400 relative z-50">
                  Project
                </p>

                {/* Background highlight with dynamic color */}
                <div
                  className={`absolute left-0 top-8 h-5 w-36 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                ></div>
              </div>

              <div className="">
                {" "}
                {projects
                  ?.filter(
                    (exp) =>
                      exp.title.trim() &&
                      exp.duration.trim() &&
                      exp.details.trim()
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
                        <p className="text-gray-500 text-xs">{exp.duration}</p>
                      </div>
                      <h5 className="text-gray-600 font-semibold text-xs">
                        Description:
                      </h5>
                      <div
                        className="text-gray-700 text-xs mt-2 leading-relaxed"
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
              edu.degree.trim() || edu.institution.trim() || edu.year.trim()
          ) && (
            <div className="flex flex-col mb-5 p-5 border-b-2">
              <div className="relative inline-block mb-5">
                {/* Text with higher z-index */}
                <p className="text-base font-bold  text-slate-400 relative z-50">
                  Education
                </p>

                {/* Background highlight with dynamic color */}
                <div
                  className={`absolute left-0 top-7 h-5 w-36 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                ></div>
              </div>

              <div className="">
                {" "}
                {education
                  ?.filter(
                    (edu) =>
                      edu.degree.trim() ||
                      edu.institution.trim() ||
                      edu.year.trim()
                  )
                  .map((edu, index) => (
                    <div key={index} className="text-gray-700 text-sm">
                      <h3
                        className={`font-bold flex items-start  gap-2 ${textcolor} `}
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
          {certificates.some(
            (edu) =>
              edu.name.trim() || edu.institution.trim() || edu.year.trim()
          ) && (
            <div className="flex flex-col mb-5 p-5 border-b-2">
              <div className="relative inline-block mb-5">
                {/* Text with higher z-index */}
                <p className="text-base font-bold  text-slate-400 relative z-50">
                  Certification
                </p>

                {/* Background highlight with dynamic color */}
                <div
                  className={`absolute left-0 top-7 h-5 w-36 ${bgcolor} bg-opacity-50 -translate-y-1/2 z-10`}
                ></div>
              </div>

              <div className="">
                {" "}
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
  );
}

CreativeCV.propTypes = {
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
