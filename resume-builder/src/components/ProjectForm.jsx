import React from "react";
import { Plus, Trash2, Sparkle, Code } from "lucide-react";

const ProjectForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const update = data.filter((_, i) => i !== index);
    onChange(update);
  };

  const updateProject = (index, field, value) => {
    const update = [...data];
    update[index] = { ...update[index], [field]: value };
    onChange(update);
  };
  return (
    <div className="space-y--6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3
              className="flex items-center gap-2 text-lg font-semibold
            text-gray-900"
            >
              Projects
            </h3>
            <p className="text-sm text-gray-500">Add your project details</p>
          </div>
          <button
            className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700
        rounded hover:bg-green-200 transition-colors "
            onClick={addProject}
          >
            <Plus className="size-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Code className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No Projects Added yet.</p>
          <p className="text-xs">Click "Add Project" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => {
            return (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-stat">
                  <h4>Project #{index + 1}</h4>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="grid  gap-3">
                  <input
                    type="text"
                    name=""
                    placeholder="Project Name"
                    className="px-3 py-2 text-sm rounded-lg"
                    value={project.name || ""}
                    onChange={(e) => {
                      updateProject(index, "name", e.target.value);
                    }}
                    id=""
                  />

                  <input
                    type="text"
                    name=""
                    placeholder="Project Type"
                    className="px-3 py-2 text-sm rounded-lg"
                    value={project.type || ""}
                    onChange={(e) => {
                      updateProject(index, "type", e.target.value);
                    }}
                    id=""
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor=""
                      className="text-sm font-medium text-gray-700"
                    >
                      Project Description
                    </label>
                    <button
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100
                  text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50"
                    >
                      <Sparkle className="w-3 h-3" />
                      Enhance with AI
                    </button>
                  </div>
                  <textarea
                    className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                    placeholder="Describe your key responsibilities and function"
                    rows={4}
                    value={project.description || ""}
                    onChange={(e) => {
                      updateProject(index, "description", e.target.value);
                    }}
                    id=""
                  ></textarea>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
