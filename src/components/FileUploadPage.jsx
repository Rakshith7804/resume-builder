/*
 - ResumeBuilder - A cool project for Building high quality and ATS friendly resumes in free...
 - Copyright (C) 2025 NishantkSingh0
 - Licensed under the GNU GPL v3.0 - see LICENSE file for details.
 */

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const FileUploadPage = () => {
  const [docUploaded, setDocUploaded] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const navigate = useNavigate();

  const handleDocUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.includes("pdf")) {
      toast.error("Please upload a PDF file.", { duration: 3000, position: "top-right" });
      return;
    }

    setDocUploaded(true);
    toast.success("Document uploaded successfully!", { duration: 3000, position: "top-right" });

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('http://localhost:5000/api/parse_resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to parse resume');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setParsedData(data);
      toast.success("Resume parsed successfully!", { duration: 3000, position: "top-right" });
    } catch (err) {
      console.error("Error parsing PDF:", err);
      toast.error("Failed to parse the resume. Please ensure it's a text-based PDF.", { duration: 3000, position: "top-right" });
      setParsedData(null);
    }
  };

  return (
    <div className="min-h-screen bg-white flex dark:bg-slate-900 flex-col items-center justify-center space-y-6 px-4">
      <Toaster position="top-right" />
      {/* PDF/DOCX Upload Container */}
      <div className="w-[90%] lg:w-4/5 mx-4 bg-gray-200 dark:bg-slate-800 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 space-y-4 sm:space-y-0 hover:shadow-lg transition-shadow duration-300">
        <div className="w-full sm:w-auto lg:ml-14">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {docUploaded ? "Document uploaded" : "Upload your existing resume to parse most data"}
          </p>
          <p className="text-md mt-1 font-semibold text-gray-500 dark:text-gray-400">
            {docUploaded
              ? parsedData
                ? "Resume parsed successfully! You can proceed."
                : "Parsing failed. Please upload a text-based PDF."
              : "Upload a PDF resume to extract data. DOCX files are not supported."}
          </p>
        </div>
        {docUploaded && parsedData ? (
          <button
            className="w-full lg:mr-14 sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            onClick={() => navigate("/GetInfo", { state: { jsonData: parsedData } })}
          >
            Continue 
          </button>
        ) : docUploaded ? (
          <button className="w-full lg:mr-14 sm:w-auto px-5 py-2 bg-red-600 text-white rounded-2xl hover:bg-red-700">
            X Continue
          </button>
        ) : (
          <label className="w-full lg:mr-12 sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-700 transition duration-300">
            <UploadCloud className="w-5 h-5 mr-2" /> .pdf
            <input
              type="file"
              accept=".pdf"
              onChange={handleDocUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default FileUploadPage;
