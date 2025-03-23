import PropTypes from "prop-types";

export default function ClassicformData({
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
  // console.log(formData)
  return (
    <div className="max-w-7xl  shadow-lg bg-white p-10 rounded-2xl mx-auto  ">
      <div>
        <div className="flex gap-10 items-center border-b pb-5">
          <div
            className={`w-40 h-40 rounded-full overflow-hidden border-4 ${bgcolor} flex justify-center items-center bg-opacity-40 ${textcolor}`}
          >
            {profileImage ? (
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <span className={`text-5xl font-bold ${textcolor}`}>
                {personalInfo?.name?.charAt(0)}
              </span>
            )}
          </div>
          <div className="">
            <h1 className={`text-3xl font-bold ${textcolor} `}>
              {personalInfo?.name}
            </h1>
            <p className={`${textcolor} text-opacity-50 font-bold mb-4`}>
              {personalInfo?.headline}
            </p>

            <p>
              <span className="text-slate-500 font-bold">Email:</span>{" "}
              <span className={`${textcolor} font-bold text-opacity-40`}>
                {personalInfo?.email}
              </span>
            </p>
            <p className={`${textcolor} font-bold text-opacity-40`}>
              <span className="text-slate-500 font-bold">Phone:</span>{" "}
              {personalInfo?.phone}
            </p>
            <p className={`${textcolor} font-bold text-opacity-40`}>
              <span className="text-slate-500 font-bold">Address:</span>{" "}
              {personalInfo?.address}
            </p>
            {personalInfo?.linkdin && (
              <p className={`${textcolor} font-bold text-opacity-40`}>
                <span className="text-slate-500 font-bold">linkedin:</span>{" "}
                {personalInfo?.linkdin}
              </p>
            )}
          </div>
        </div>

        {/* Summary Section */}

        <div className="border-b pb-4">
          <h2 className={`text-xl font-semibold ${textcolor} mb-3`}>Summary</h2>
          <p className="text-gray-600 text-sm text-justify leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Education Section */}
        <div className="flex gap-5 border-b pb-4 justify-between">
          {/* eduction */}
          {education?.some(
            (edu) =>
              edu.degree.trim() || edu.institution.trim() || edu.year.trim()
          ) && (
            <div className="flex gap-5 border-b pb-4">
              <div className="basis-[50%]">
                <h2 className={`text-xl font-semibold ${textcolor} m-3`}>
                  Education
                </h2>
                <div className="space-y-3">
                  {education
                    .filter(
                      (edu) =>
                        edu.degree.trim() ||
                        edu.institution.trim() ||
                        edu.year.trim()
                    ) // Filter out empty entries
                    .map((edu, index) => (
                      <div key={index} className="text-gray-700 text-sm">
                        <h3
                          className={`${textcolor} text-opacity-70 font-bold`}
                        >
                          {edu.degree}
                        </h3>
                        <p>{edu.institution}</p>
                        <p className="text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {certificates.some(
            (edu) =>
              edu.name.trim() || edu.institution.trim() || edu.year.trim()
          ) && (
            <div className="basis-[50%]">
              <h2 className={`text-xl font-semibold ${textcolor} m-3`}>
                Certifications
              </h2>
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
                      <h3 className={`${textcolor} text-opacity-70 font-bold`}>
                        {cert.name}
                      </h3>
                      <p>{cert.institution}</p>
                      <p className="text-gray-500">{cert?.duration}</p>
                      <p className="text-gray-500">{cert?.year}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* skills */}
        {skills.some((edu) => edu.name.trim() || edu.level !== 0) && (
          <div className=" border-b pb-4">
            <h2 className={`text-xl font-semibold ${textcolor} m-3`}>Skills</h2>
            <div className="grid grid-cols-2 gap-3">
              {skills
                ?.filter((edu) => edu.name.trim())
                .map((skill, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-gray-700">
                      {skill?.name}
                    </span>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className={`${bgcolor} h-2 rounded-full `}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* lang */}
        {languages.some((edu) => edu.name.trim()) && (
          <div className="mb-6  rounded-lg">
            <h2 className={`text-2xl font-bold ${textcolor} mb-4`}>
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {languages
                ?.filter((edu) => edu.name.trim())
                .map((language, index) => (
                  <div key={index} className="flex flex-col ">
                    <span className={`${textcolor} text-lg font-semibold`}>
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

        {projects.some(
          (edu) => edu.title.trim() || edu.duration.trim() || edu.details.trim()
        ) && (
          <div className="">
            <h2 className={`text-xl font-semibold ${textcolor} mb-3`}>
              Projects
            </h2>
            {projects
              .filter(
                (exp) =>
                  exp.title.trim() && exp.duration.trim() && exp.details.trim()
              ) // Ensure only valid projects are shown
              .map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <div>
                      <h3 className={`${textcolor} text-opacity-70 font-bold`}>
                        {exp?.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{exp.duration}</p>
                    </div>
                  </div>
                  <h5 className="text-gray-600 font-semibold">Description:</h5>
                  <div
                    className="text-gray-700 text-sm mt-2 leading-relaxed"
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
          <div className="border-t">
            <h2 className={`text-xl font-semibold ${textcolor} mb-3`}>
              Experience
            </h2>
            {experience?.map((exp, index) => (
              <div key={index} className="mb-4   ">
                <div className="flex justify-between items-center pb-2 mb-2">
                  <div>
                    <h3 className={`${textcolor} text-opacity-70 font-bold`}>
                      {exp?.jobTitle}
                    </h3>
                    <p className="text-gray-500 text-sm">{exp.company}</p>
                    <p className="text-gray-500 text-sm">{exp.duration}</p>
                  </div>
                </div>
                <h5 className="text-gray-600 font-semibold">Description:</h5>
                <div
                  className="text-gray-700 text-sm mt-2 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: exp.details }}
                ></div>
              </div>
            ))}
          </div>
        )}
        {/* end */}
      </div>
    </div>
  );
}

ClassicformData.propTypes = {
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
