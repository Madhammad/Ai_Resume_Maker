import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { toast } from "react-hot-toast";
import PersonalInfo from "./steps/PersonalInfo";
import Education from "./steps/Education";
import Certificates from "./steps/Certificates";
import Skills from "./steps/Skills";
import Projects from "./steps/Projects";
import Experience from "./steps/Experience";
import Languages from "./steps/Languages";
import CVPage from "./../page/CVPage";
import axios from "axios";
import { URL_BACKEND } from "../../constant";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";

const CVData = ({ cvTemplate }) => {
  const { token } = useSelector((state) => state.user);

  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();

  

  const [errors, setErrors] = useState({});

  const [bgcolor, setBgcolor] = useState("bg-teal-500");
  const [textcolor, setTextcolor] = useState("text-teal-500");

  const [onlyCVDisplay, setOnlyCVDisplay] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkdin: "",
    headline: "",
  });

  const [education, setEducation] = useState([
    {
      degree: "",
      institution: "",
      year: "",
    },
  ]);

  const [certificates, setCertificates] = useState([
    {
      name: "",
      institution: "",
      duration: "",
      year: "",
    },
  ]);

  const [skills, setSkills] = useState([]);

  const [projects, setProjects] = useState([
    {
      title: "",
      duration: "",
      details: "",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      jobTitle: "",
      company: "",
      duration: "",
      details: "",
    },
  ]);

  const [languages, setLanguages] = useState([
    {
      name: "",
      proficiency: "",
    },
  ]);

  const [summary, setSummary] = useState("");

  const [baseImage, setBaseImage] = useState("");
  const [file, setFile] = useState(null);

  // const [formData, setFormData] = useState({});

  // console.log(cvTemplate)

  const steps = [
    "Personal Info",
    "Education",
    "Certificates",
    "Skills",
    "Projects",
    "Experience",
    "Languages",
    "Summary",
    "Profile Image",
  ];

  const prompt = `Generate a professional CV summary for ${personalInfo.name}. 
  Include details on:  
  ${
    experience?.length
      ? `- **Experience**: ${experience
          .map((exp) => `${exp.jobTitle} at ${exp.company} (${exp.years})`)
          .join(", ")}`
      : ""
  }  
  ${
    education?.length
      ? `- **Education**: ${education
          .map((edu) => `${edu.degree} from ${edu.institution} (${edu.year})`)
          .join(", ")}`
      : ""
  }  
  ${
    certificates?.length ? `- **Certificates**: ${certificates.join(", ")}` : ""
  }  
  ${skills?.length ? `- **Skills**: ${skills.join(", ")}` : ""}  
  ${
    projects?.length
      ? `- **Projects**: ${projects.map((proj) => proj.title).join(", ")}`
      : ""
  }  
  
  Ensure the summary is clear, engaging, and contains at least 50 words, maximum 100 words.`;

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!personalInfo?.name?.trim()) {
          newErrors.name = "Name is required";
          toast.error("Name is Required");
        }
        if (!personalInfo?.email?.trim()) {
          newErrors.name = "Name is required";
          toast.error("email is Required");
        }
        if (!personalInfo?.address?.trim()) {
          newErrors.name = "Name is required";
          toast.error("address is Required");
        }

        break;
      case 8: // Add validation for summary step
        if (!summary.trim()) {
          newErrors.summary = "Summary is required";
        }
        break;
      // Add validations for other steps
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      ></div>
    </div>
  );

  const handleGenerateSummary = async () => {
    try {
      const res = await axios.post(
        `${URL_BACKEND}/api/interview/generSummary`,
        { prompt },
        { withCredentials: true }
      );

      // console.log("Full Response:", res);

      const summaryText = res.data?.response || res.data?.data?.response;

      if (summaryText) {
        setSummary(summaryText);
      } else {
        console.error("Unexpected API response format:", res.data);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  const handleUpdloadImage = async (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBaseImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOnlyCVDisplay(true);
  };

  const createCV = async () => {
    const removeEmptyValues = (obj) => {
      return Object.fromEntries(
        Object.entries(obj).filter(
          ([_, value]) => value !== "" && value !== undefined
        )
      );
    };

    // Function to remove empty objects in arrays
    const cleanArray = (arr) => {
      return arr
        .map((item) => removeEmptyValues(item)) // Remove empty fields
        .filter((item) => Object.keys(item).length > 0); // Remove empty objects
    };

    const formData = new FormData();

    formData.append("cvprofileImage", file); // Append the file

    formData.append(
      "personalInfo",
      JSON.stringify(removeEmptyValues(personalInfo || {}))
    );
    formData.append("education", JSON.stringify(cleanArray(education || [])));
    formData.append(
      "certificates",
      JSON.stringify(cleanArray(certificates || []))
    );
    formData.append("skills", JSON.stringify(cleanArray(skills || [])));
    formData.append("projects", JSON.stringify(cleanArray(projects || [])));
    formData.append("experience", JSON.stringify(cleanArray(experience || [])));
    formData.append("languages", JSON.stringify(cleanArray(languages || [])));
    formData.append("summary", summary.trim());
    formData.append("cvtemplate", cvTemplate);
    formData.append("color", JSON.stringify({ bgcolor, textcolor }));

    try {
      const { data } = await axios.post(
        `${URL_BACKEND}/api/Aicv/createCV`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Your CV Is Create Successfully");
        navigate(`/downloadCV/${data.data.newCV._id}`);

        // console.log("data", data.data.newCV);
      }

      if (!data.success) {
        console.log(data.message);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfo
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
          />
        );
      case 2:
        return (
          <Education
            education={education}
            setEducation={setEducation}
            errors={errors}
          />
        );

      // certificates
      case 3:
        return (
          <Certificates
            certificates={certificates}
            setCertificates={setCertificates}
          />
        );
      // skills
      case 4:
        return <Skills skills={skills} setSkills={setSkills} />;
      //project
      case 5:
        return <Projects projects={projects} setProjects={setProjects} />;

      //experience
      case 6:
        return (
          <Experience experience={experience} setExperience={setExperience} />
        );

      // languages
      case 7:
        return <Languages languages={languages} setLanguages={setLanguages} />;

      //Summary

      case 8:
        return (
          <div className="space-y-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <div className="flex justify-between">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                Summary
              </p>

              <button
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition text-xs"
                type="button"
                onClick={handleGenerateSummary}
              >
                <LoaderCircle className="animate-spin" />
                Generate Summary AI
              </button>
            </div>

            <div className="space-y-4">
              <textarea
                placeholder="Professional summary *"
                className="w-full p-4 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 rounded-lg h-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              Profile Image
            </p>

            {baseImage && (
              <img
                src={baseImage}
                alt="Uploaded Preview"
                className="w-full h-72 object-cover rounded-lg mt-4"
              />
            )}

            <div className="flex items-center justify-between border-4 border-indigo-500 border-dotted p-3 gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="p-2 w-full border-gray-200 dark:border-gray-700 bg-slate-100 text-slate-400 text-xs md:w-1/3 border rounded-lg dark:bg-gray-800"
              />
              <button
                type="button"
                className="p-2 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                onClick={handleUpdloadImage}
              >
                Upload Image
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row justify-center p-6 md:p-10 items-start gap-6`}
    >
      {/* Left Section - Form */}
      {!onlyCVDisplay && (
        <div className="w-full md:w-2/4 p-6 dark:bg-[rgb(26,37,67)] bg-white rounded-2xl shadow-xl dark:text-white ">
          {renderProgressBar()}

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Create Your CV
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Step {currentStep} of {steps.length}
            </p>
          </div>

          <form className="space-y-6">
            {renderStep()}

            <div className="flex justify-between items-center mt-8">
              {/* Previous Button */}
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-all"
              >
                <FiArrowLeft className="w-5 h-5" />
                Previous
              </button>

              {/* Next / Submit Button */}
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Next
                  <FiArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all"
                >
                  Add CV Data
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Right Section - CV Preview */}
      <div className="w-full md:w-2/4 px-5 border-l-2   ">
        <CVPage
          textcolor={textcolor}
          bgcolor={bgcolor}
          setBgcolor={setBgcolor}
          setTextcolor={setTextcolor}
          personalInfo={personalInfo}
          education={education}
          certificates={certificates}
          skills={skills}
          projects={projects}
          experience={experience}
          languages={languages}
          summary={summary}
          setSummary={setSummary}
          cvTemplate={cvTemplate}
          onlyCVDisplay={onlyCVDisplay}
          profileImage={baseImage}
        />
        {onlyCVDisplay && (
          <button
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all mt-5"
            onClick={createCV}
          >
            Complete & Generate CV
          </button>
        )}
      </div>
    </div>
  );
};

export default CVData;
