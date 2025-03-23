import { LayoutGrid } from "lucide-react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiTrash } from "react-icons/fi";

export default function Skills({ skills, setSkills }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(0);

  const [displayInput, setDispalyInput] = useState(true);

  const handleAddCertificate = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("All fields are required.");
      return;
    }

    setSkills((prve) => [...prve, { name, level }]);

    setName("");
    setLevel(0);
    setDispalyInput(false);
  };

  const handleRemoveEdu = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold  mb-6">Skills</h2>
      {skills.filter((edu) => edu.name.trim() || edu.level !== 0).length >
        0 && (
        <div className="space-y-4">
          {skills
            .filter((edu) => edu.name.trim() || edu.level !== 0)
            .map((edu, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Skills #{index + 1}
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
                      {edu.level}
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
            <div className="flex justify-between text-sm text-gray-600">
              <span>Proficiency Level</span>
              <span>{level}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full range-lg "
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value, 10))}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Basic</span>
              <span>Expert</span>
            </div>
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

Skills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.number, // level is a number
    })
  ),
  setSkills: PropTypes.func,
};
