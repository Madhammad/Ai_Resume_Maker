import { FiPlus, FiTrash } from "react-icons/fi";
import { PropTypes } from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { LayoutGrid } from "lucide-react";

export default function Languages({ languages, setLanguages }) {
  const [name, setName] = useState("");
  const [proficiency, setLevel] = useState("Beginner");



  const [displayInput, setDispalyInput] = useState(true);

  const handleAddCertificate = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("All fields are required.");
      return;
    }
    setLanguages((prev) => [...prev, { name, proficiency }]);
    setName("");
    setLevel("Beginner");

    setDispalyInput(false);
  };

  const handleRemoveEdu = (index) => {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold  mb-6">Languages</h2>
      {languages.filter((edu) => edu.name.trim()).length > 0 && (
        <div className="space-y-4">
          {languages
            .filter((edu) => edu.name.trim())
            .map((edu, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    SKilss #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveEdu(index)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    <FiTrash className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-sx text-gray-600 dark:text-gray-300 uppercase">
                      Name
                    </h5>
                    <p className="font-medium text-xs text-gray-900 dark:text-gray-100">
                      {edu.name}
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-sx text-gray-600 dark:text-gray-300 uppercase">
                      Proficiency Level
                    </h5>
                    <p className="font-medium text-xs text-gray-900 dark:text-gray-100">
                      {edu.proficiency}
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
            placeholder="Skill Name"
            className="w-full p-2 border dark:bg-slate-700 dark:placeholder:text-slate-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="space-y-2">
            <div className="flex justify-between text-sm ">
              <span>Proficiency Level</span>
            </div>
            <select
              name="level"
              value={proficiency}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base border dark:bg-slate-700 dark:text-white focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleAddCertificate}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <FiPlus className="w-5 h-5" />
            Add Skill
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

Languages.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      proficiency: PropTypes.string.isRequired, // Change 'proficiency' to 'level'
    })
  ).isRequired,
  setLanguages: PropTypes.func.isRequired,
};
