import { FiPlus, FiTrash } from "react-icons/fi";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { LayoutGrid } from "lucide-react";

export default function Education({ education, setEducation }) {
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [year, setYear] = useState("");

  const [displayInput, setDispalyInput] = useState(true);

  // Function to add a new education entry
  const handleAddEdu = (e) => {
    e.preventDefault();

    if (!degree.trim() || !institution.trim() || !year.trim()) {
      toast.error("Education all field required");
      return;
    }

    setEducation((prev) => [...prev, { degree, institution, year }]);

    setDegree("");
    setInstitution("");
    setYear("");
    setDispalyInput(false);
  };

  // Function to remove an education entry
  const handleRemoveEdu = (index) => {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Education</h2>

      {/* Render only if there are education entries */}

      {education.filter(
        (edu) => edu.degree.trim() || edu.institution.trim() || edu.year.trim()
      ).length > 0 && (
        <div className="space-y-4">
          {education
            .filter(
              (edu) =>
                edu.degree.trim() || edu.institution.trim() || edu.year.trim()
            ) // Remove empty entries
            .map((edu, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    🎓 Education #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveEdu(index)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    <FiTrash className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-sm text-gray-600 dark:text-gray-300 uppercase">
                      Degree
                    </h5>
                    <p className=" text-gray-900 dark:text-gray-100 text-sm">
                      {edu.degree}
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-sm text-gray-600 dark:text-gray-300 uppercase">
                      Institution
                    </h5>
                    <p className=" text-gray-900 text-sm dark:text-gray-100">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-sm text-gray-600 dark:text-gray-300 uppercase">
                      Year
                    </h5>
                    <p className=" text-sm text-gray-900 dark:text-gray-100">
                      {edu.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {displayInput && (
        <form className=" flex flex-col space-y-2 mt-3">
          <input
            type="text"
            placeholder="Degree Name"
            className="w-full dark:bg-slate-700 dark:placeholder:text-slate-300 p-2 border rounded"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />

          <input
            type="text"
            placeholder="Institution"
            className="w-full p-2 border dark:bg-slate-700 dark:placeholder:text-slate-300 rounded"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />

          <input
            type="text"
            placeholder="Year"
            className="w-full p-2 border dark:bg-slate-700 dark:placeholder:text-slate-300 rounded"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleAddEdu}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-4"
          >
            <FiPlus className="w-5 h-5" />
            Add Education
          </button>
        </form>
      )}

      {!displayInput && (
        <button
          className="flex items-center gap-2 text-green-700 hover:text-green-800 mt-4"
          onClick={() => setDispalyInput(true)}
        >
          {" "}
          <LayoutGrid className="w-5 h-5" />
          Add More ...
        </button>
      )}
    </div>
  );
}

Education.propTypes = {
  education: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string.isRequired,
      institution: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    })
  ).isRequired,
  setEducation: PropTypes.func.isRequired,
};
