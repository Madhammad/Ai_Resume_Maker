import { LayoutGrid } from "lucide-react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiTrash } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Projects({ projects, setProjects }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [details, setDetails] = useState("");

  const [displayInput, setDispalyInput] = useState(true);

  const handleAddEdu = (e) => {
    e.preventDefault();
    if (!title.trim() || !duration.trim() || !details.trim()) {
      toast.error("Education all field required");
      return;
    }

    setProjects((prev) => [...prev, { title, duration, details }]);

    setTitle("");
    setDuration("");
    setDetails("");

    setDispalyInput(false);
  };

  const handleRemoveEdu = (index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold  mb-6">Projects</h2>
      {projects.filter(
        (edu) => edu.title.trim() || edu.duration.trim() || edu.details.trim()
      ).length > 0 && (
        <div className="space-y-4">
          {projects
            .filter(
              (edu) =>
                edu.title.trim() || edu.duration.trim() || edu.details.trim()
            ) // Remove empty entries
            .map((edu, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    🎓 Project #{index + 1}
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
                    <h5 className="text-sm text-gray-600 dark:text-gray-300 uppercase">
                      Title
                    </h5>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {edu.title}
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-sm text-gray-600 dark:text-gray-300 uppercase">
                      Duration
                    </h5>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {edu.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Input fields for adding new education */}
      {displayInput && (
        <form className="flex flex-col space-y-2 mt-3">
          <input
            type="text"
            placeholder="Project Title"
            className="w-full dark:bg-slate-700 dark:placeholder:text-slate-400 p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Duration"
            className="w-full p-2 border dark:bg-slate-700 dark:placeholder:text-slate-400 rounded"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          {/* ReactQuill Container */}
          <div className="w-full">
            <ReactQuill
              placeholder="Project Details"
              theme="snow"
              value={details}
              onChange={setDetails}
              className="h-40 placeholder:text-slate-500"
            />

            {/* Button Outside ReactQuill */}
            <button
              type="submit"
              onClick={handleAddEdu}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-12"
            >
              <FiPlus className="w-5 h-5" />
              Add Project
            </button>
          </div>
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

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
    })
  ).isRequired,
  setProjects: PropTypes.func.isRequired,
};
