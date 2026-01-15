import React, { act, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import Dashboard from "./Dashboard";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  FileText,
  FolderIcon,
  GraduationCap,
  SparkleIcon,
  User,
  ChevronRight,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  const [activeSessionIndex, setActiveSessionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const section = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: SparkleIcon },
  ];

  const actvieSection = section[activeSessionIndex];
  useEffect(() => {
    loadExistingResume();
  }, []);
  return (
    <div>
      <div className="mx-14 my-4">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 
        hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Pannel Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6  pt-1">
              {/* Progress Bar using active section index */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600
              border-none transition-all duration-2000"
                style={{
                  width: `${(activeSessionIndex * 100) / section.length - 1} %`,
                }}
              />

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex justify-between items-center mb-6 border-b border-fray-300 py-1">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) => {
                      setResumeData((prev) => ({ ...prev, template }));
                    }}
                  />
                </div>
                <div className="flex-items-center">
                  {activeSessionIndex !== 0 && (
                    <button
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium
                    text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSessionIndex === 0}
                      onClick={() => {
                        setActiveSessionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0)
                        );
                      }}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium
                    text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSessionIndex === section.length - 1 && `opacity-50`
                    }`}
                    disabled={activeSessionIndex === section.length}
                    onClick={() => {
                      setActiveSessionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, section.length - 1)
                      );
                    }}
                  >
                    <ChevronRight className="size-4" /> Next
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {actvieSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) => {
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }));
                    }}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
              </div>
            </div>
          </div>
          {/* {Right Pannel} */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div>{/* Buttons */}</div>
            {/* Resume Preview */}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
