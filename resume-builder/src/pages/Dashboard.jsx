import React, { useEffect, useState } from "react";
import {
  CloudIcon,
  FilePenIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";

const Dashboard = () => {
  const [allResume, setAllResume] = useState([]);
  const loadAllResume = async () => {
    setAllResume(dummyResumeData);
  };

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0484c7", "#16a34a"];

  useEffect(() => {
    loadAllResume();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, John Doe
        </p>
        <div className="flex gap-4">
          <button
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 
          text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg 
          transition-all duration-300"
          >
            <PlusIcon
              className="size-11 transition-all duration-300 p-2.5 
            bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full"
            />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>
          <button
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 
          text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg 
          transition-all duration-300"
          >
            <CloudIcon
              className="size-11 transition-all duration-300 p-2.5 
            bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full"
            />
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>
        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4 ">
          {allResume.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                className=" relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center
            rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300
            "
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + `40`,
                }}
                key={index}
              >
                <FilePenIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:text-purple-600 transition-all duration-300"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px]"
                  style={{ color: baseColor + `90` }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <TrashIcon
                    className="size-7 p-1.5 hover bg-white/50 rounded text-slate-700
                  transition-colors"
                  />
                  <PencilIcon
                    className="size-7 p-1.5 hover bg-white/50 rounded text-slate-700
                  transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
