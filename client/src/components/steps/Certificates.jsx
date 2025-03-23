import { FiPlus, FiTrash } from "react-icons/fi";
import { PropTypes } from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { LayoutGrid } from "lucide-react";

export default function Certificates({ certificates, setCertificates }) {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");

  const [displayInput, setDispalyInput] = useState(true);

  const handleAddCertificate = (e) => {
    e.preventDefault();

    if (!name.trim() || !institution.trim() || !year.trim()) {
      toast.error("Education all field required");
      return;
    }

    setCertificates((prve) => [...prve, { name, institution, year, duration }]);

    setName("");
    setInstitution("");
    setDuration("");
    setYear("");

    setDispalyInput(false);
  };

  const handleRemoveEdu = (index) => {
    setCertificates((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Certification</h2>

      {certificates.filter(
        (edu) =>
          edu.name.trim() ||
          edu.institution.trim() ||
          edu.year.trim() ||
          edu.duration.trim()
      ).length > 0 && (
        <div className="space-y-4">
          {certificates
            .filter(
              (edu) =>
                edu.name.trim() ||
                edu.institution.trim() ||
                edu.year.trim() ||
                edu.duration.trim()
            ) // Remove empty entries
            .map((edu, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    🎓 Certification #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveEdu(index)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    <FiTrash className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-sx text-gray-600 dark:text-gray-300 uppercase">
                      Degree
                    </h5>
                    <p className="font-medium text-xs text-gray-900 dark:text-gray-100">
                      {edu.name}
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-sx text-gray-600 dark:text-gray-300 uppercase">
                      Institution
                    </h5>
                    <p className="font-medium text-xs text-gray-900 dark:text-gray-100">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-sx text-gray-600 dark:text-gray-300 uppercase">
                      Duration
                    </h5>
                    <p className="font-medium text-sx text-gray-900 dark:text-gray-100">
                      {edu.duration}
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-sm text-gray-600 dark:text-gray-300 text-sx uppercase">
                      Year
                    </h5>
                    <p className="font-medium text-sx text-gray-900 dark:text-gray-100">
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
            placeholder="Certificate Name"
            className="w-full dark:bg-slate-700 dark:placeholder:text-slate-300 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            placeholder="Duration"
            className="w-full p-2 border dark:bg-slate-700 dark:placeholder:text-slate-300 rounded"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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
            onClick={handleAddCertificate}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <FiPlus className="w-5 h-5" />
            Add Certificate
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

Certificates.propTypes = {
  certificates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      institution: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCertificates: PropTypes.func.isRequired,
};
