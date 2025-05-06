/*
 - ResumeBuilder - A cool project for Building high quality and ATS friendly resumes in free...
 - Copyright (C) 2025 NishantkSingh0
 - Licensed under the GNU GPL v3.0 - see LICENSE file for details.
 */

 import { useEffect, useContext } from "react";
 import Typed from "typed.js"; 
 import Examplepages from './Examplepage.jsx';
 import { useNavigate } from 'react-router-dom';
 import { ThemeContext } from './ThemeContext';
 
 const features = [
   "Craft a stunning resume in just 8 to 10 minutes — no stress, no confusion.",
   "Our Assistant Bot guides you through the entire detail-filling process.",
   "Choose from high-performing, job-winning templates tailored for ATS.",
   "See your resume update in real time as you fill in your info — total control, zero surprises.",
   "Professionally designed templates for every style and industry.",
   "We never store your data or resumes — full confidentiality guaranteed.",
   "Runs on just ~1.8MB RAM with near 0% CPU usage — smoother than a breeze.",
   "Download your resume in PDF, HTML/CSS format, or JSON database.",
   "Use auto-filled JSON data to avoid re-entering details every time.",
   "Get real-time, relevant suggestions to speed up your form-filling time.",
   "No hidden fees. Students can fork and customize for their own college projects.",
   "Each section is crafted based on research-backed resume insights.",
   "You can view generated templates by navigating to Generated Resumes.",
   "Scan your resume against a job description to get a keyword match score.",
   "Build an AI-powered resume tailored to a job description with keyword optimization"
 ];
 
 const FrontPage = ({ views }) => {
   const { isDark } = useContext(ThemeContext);
   const navigate = useNavigate();
 
   const handleContinue = () => {
     navigate('/GetInfo');
   };
 
   const handleViewTemplates = () => {
     navigate('/ViewTemplates');
   };
 
   const handleAboutUs = () => {
     navigate('/AboutUs');
   };
 
   const handleScanResume = () => {
     navigate('/ScanResume');
   };
 
   const handleBuildResume = () => {
     navigate('/BuildResume');
   };
 
   const handleLogout = () => {
     localStorage.removeItem('authToken');
     navigate('/');
   };
 
   useEffect(() => {
     const typedMobile = new Typed("#mobile-typing-text", {
       strings: features,
       loop: true,
       typeSpeed: 35,
       backSpeed: 25,
       backDelay: 500,
       cursorChar: " ",
     });
 
     const typed = new Typed("#desktop-typing-text", {
       strings: features,
       loop: true,
       typeSpeed: 35,
       backSpeed: 25,
       backDelay: 500,
       cursorChar: " "
     });
 
     return () => {
       typedMobile.destroy();
       typed.destroy();
     };
   }, []);
 
   return (
     <div className={`flex flex-col ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'} text-center px-4`}>
       <div className="hidden md:flex justify-between items-center w-full px-6 py-3 bg-white shadow-md rounded-3xl mt-3">
         <div className="flex items-center space-x-4">
           {/* Removed Resume Templates and Scan Resume buttons from header */}
         </div>
         
         <h1 className="text-xl ml-10 font-bold text-gray-800 no-underline">
           <a href="https://github.com/NishantkSingh0/Resume-Builder" title="Address to GitHub repository of this project" target="_blank" rel="noopener noreferrer">
             <span className="lg:hidden">Resume Builder</span>
             <span className="hidden lg:block">Level Up Your First Impression</span>
           </a>
         </h1>
         <div className="flex space-x-4">
           <button
             className="px-4 py-[5px] bg-blue-500 text-white rounded-2xl hover:bg-blue-700 hover:scale-105"
             title="Our contributions and contact information"
             onClick={handleAboutUs}
           >
             About Us
           </button>
           <button
             className="px-4 py-[5px] bg-red-500 text-white rounded-2xl hover:bg-red-600 hover:scale-105"
             title="Log out and return to homepage"
             onClick={handleLogout}
           >
             Logout
           </button>
         </div>
       </div>
       <div className="hidden md:flex flex-col items-center justify-center flex-1 mt-8 mb-3">
         <Examplepages />    
         <span id="desktop-typing-text" className="hidden md:inline-block text-xl mt-6 md:text-2xl text-gray-100"></span>
         {/* Fill Form Section */}
         <div className="w-[80%] lg:w-4/5 mx-8 mb-12 bg-gray-200 mt-10 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 space-y-4 sm:space-y-0 hover:shadow-lg transition-shadow duration-300">
           <div className="w-full sm:w-auto lg:ml-14">
             <p className="text-lg font-semibold text-gray-800">
               Start by filling your details...
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               It mostly takes 8 to 10 minutes
             </p>
           </div>
           <button
             className="w-full sm:w-auto px-5 py-2 lg:mr-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
             onClick={handleContinue}
           >
             Start 
           </button>
         </div>
         {/* Resume Templates Section */}
         <div className="w-[80%] lg:w-4/5 mx-8 mb-12 bg-gray-200 mt-4 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 space-y-4 sm:space-y-0 hover:shadow-lg transition-shadow duration-300">
           <div className="w-full sm:w-auto lg:ml-14">
             <p className="text-lg font-semibold text-gray-800">
               Explore Resume Templates
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How it helps: Choose from a variety of professionally designed, ATS-friendly templates tailored for different industries and styles, ensuring your resume stands out.
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How to use: Click the button to browse our collection of templates. Select one that fits your style, and customize it with your details.
             </p>
           </div>
           <button
             className="w-full sm:w-auto px-5 py-2 lg:mr-14 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 hover:scale-105"
             onClick={handleViewTemplates}
             title="View Generated resume samples"
           >
             Resume Templates
           </button>
         </div>
         {/* Scan Resume Section */}
         <div className="w-[80%] lg:w-4/5 mx-8 mb-12 bg-gray-200 mt-4 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 space-y-4 sm:space-y-0 hover:shadow-lg transition-shadow duration-300">
           <div className="w-full sm:w-auto lg:ml-14">
             <p className="text-lg font-semibold text-gray-800">
               Scan Your Resume
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How it helps: Optimize your resume by scanning it against a job description to get a keyword match score, increasing your chances of passing ATS filters.
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How to use: Upload your resume and a job description. Our tool will analyze and provide a match score with suggestions to improve keyword alignment.
             </p>
           </div>
           <button
             className="w-full sm:w-auto px-5 py-2 lg:mr-14 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 hover:scale-105"
             onClick={handleScanResume}
             title="Scan your resume against a job description"
           >
             Scan Resume
           </button>
         </div>
         {/* AI-Powered Resume Building Section */}
         <div className="w-[80%] lg:w-4/5 mx-8 mb-12 bg-gray-200 mt-4 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 space-y-4 sm:space-y-0 hover:shadow-lg transition-shadow duration-300">
           <div className="w-full sm:w-auto lg:ml-14">
             <p className="text-lg font-semibold text-gray-800">
               Build AI-Powered Resume
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How it helps: Generate a tailored, ATS-friendly resume using AI, optimized for a specific job description with relevant keywords and professional content.
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How to use: Enter a job description and optionally upload your existing resume. Our AI will create a customized resume, downloadable as a PDF.
             </p>
           </div>
           <button
             className="w-full sm:w-auto px-5 py-2 lg:mr-14 bg-green-500 text-white rounded-2xl hover:bg-green-600 hover:scale-105"
             onClick={handleBuildResume}
             title="Build an AI-powered resume tailored to a job description"
           >
             Build Resume
           </button>
         </div>
       </div>
 
       {/* Mobile View */}
       <div className="flex md:hidden justify-between items-center w-full h-14 px-6 py-3 bg-white shadow-md mt-6 rounded-3xl">
         <div className="md:hidden flex space-x-4">
           <button
             className="px-4 py-[5px] bg-blue-500 text-white rounded-2xl hover:bg-blue-700 hover:scale-105"
             onClick={handleViewTemplates}
             title="View Generated resume samples"
           >
             Generated
           </button>
           <button
             className="px-4 py-[5px] bg-blue-500 text-white rounded-2xl hover:bg-blue-700 hover:scale-105"
             onClick={handleScanResume}
             title="Scan your resume against a job description"
           >
             Scan
           </button>
           <button
             className="px-4 py-[5px] bg-green-500 text-white rounded-2xl hover:bg-green-600 hover:scale-105"
             onClick={handleBuildResume}
             title="Build an AI-powered resume"
           >
             Build
           </button>
           <button
             className="px-4 py-[3px] bg-blue-500 text-white rounded-full hover:bg-blue-700"
             onClick={handleContinue}
           >
             Continue
           </button>
         </div>
       </div>
 
       <div className="md:hidden flex justify-center flex-col items-center flex-grow">
         <h1 className="text-2xl md:hidden sm:text-3xl font-bold mb-3 text-gray-100">
           Resume Builder
         </h1> 
         <p className="text-sm sm:text-lg text-gray-500 font-semibold mb-4">
           <span id="mobile-typing-text" className="md:hidden text-xl sm:text-2xl text-gray-100 h-6 mb-4"></span>
         </p>
         <a
           onClick={handleViewTemplates}
           className="cursor-pointer text-gray-600 font-bold"
         >
           Generated Templates
         </a> 
         {/* Fill Form Section */}
         <div className="w-[90%] lg:w-4/5 mx-4 bg-gray-200 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 space-y-4 sm:space-y-0 hover:shadow-lg transition-shadow duration-300">
           <div className="w-full sm:w-auto lg:ml-14">
             <p className="text-lg font-semibold text-gray-800">
               Start by filling your details...
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               It mostly takes 8 to 10 minutes
             </p>
           </div>
           <button
             className="w-full sm:w-auto px-5 py-2 lg:mr-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
             onClick={handleContinue}
           >
             Continue 
           </button>
         </div>
         {/* Resume Templates Section */}
         <div className="w-[90%] lg:w-4/5 mx-4 mb-12 bg-gray-200 mt-4 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 space-y-4 sm:space-y-0 hover:shadow-lg transition-shadow duration-300">
           <div className="w-full sm:w-auto lg:ml-14">
             <p className="text-lg font-semibold text-gray-800">
               Explore Resume Templates
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How it helps: Choose from a variety of professionally designed, ATS-friendly templates tailored for different industries and styles, ensuring your resume stands out.
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How to use: Click the button to browse our collection of templates. Select one that fits your style, and customize it with your details.
             </p>
           </div>
           <button
             className="w-full sm:w-auto px-5 py-2 lg:mr-14 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 hover:scale-105"
             onClick={handleViewTemplates}
             title="View Generated resume samples"
           >
             Resume Templates
           </button>
         </div>
         {/* Scan Resume Section */}
         <div className="w-[90%] lg:w-4/5 mx-4 mb-12 bg-gray-200 mt-4 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 space-y-4 sm:space-y-0 hover:shadow-lg transition-shadow duration-300">
           <div className="w-full sm:w-auto lg:ml-14">
             <p className="text-lg font-semibold text-gray-800">
               Scan Your Resume
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How it helps: Optimize your resume by scanning it against a job description to get a keyword match score, increasing your chances of passing ATS filters.
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How to use: Upload your resume and a job description. Our tool will analyze and provide a match score with suggestions to improve keyword alignment.
             </p>
           </div>
           <button
             className="w-full sm:w-auto px-5 py-2 lg:mr-14 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 hover:scale-105"
             title="Scan your resume against a job description"
           >
             Scan Resume
           </button>
         </div>
         {/* AI-Powered Resume Building Section */}
         <div className="w-[90%] lg:w-4/5 mx-4 mb-12 bg-gray-200 mt-4 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 space-y-4 sm:space-y-0 hover:shadow-lg transition-shadow duration-300">
           <div className="w-full sm:w-auto lg:ml-14">
             <p className="text-lg font-semibold text-gray-800">
               Build AI-Powered Resume
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How it helps: Generate a tailored, ATS-friendly resume using AI, optimized for a specific job description with relevant keywords and professional content.
             </p>
             <p className="text-md mt-1 font-semibold text-gray-500">
               How to use: Enter a job description and optionally upload your existing resume. Our AI will create a customized resume, downloadable as a PDF.
             </p>
           </div>
           <button
             className="w-full sm:w-auto px-5 py-2 lg:mr-14 bg-green-500 text-white rounded-2xl hover:bg-green-600 hover:scale-105"
             onClick={handleBuildResume}
             title="Build an AI-powered resume tailored to a job description"
           >
             Build Resume
           </button>
         </div>
       </div>
 
       <div className="md:hidden absolute bottom-4 font-bold text-gray-100 left-1/2 -translate-x-1/2 text-center">
         <br />
         <a
           onClick={handleAboutUs}
           className="cursor-pointer mr-4"
         >
           About Us
         </a>
         <a
           onClick={handleLogout}
           className="cursor-pointer"
         >
           Logout
         </a>
       </div>
     </div>
   );
 };
 
 export default FrontPage;