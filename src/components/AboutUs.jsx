/*
 - ResumeBuilder - A cool project for Building high quality and ATS friendly resumes in free...
 - Copyright (C) 2025 NishantkSingh0
 - Licensed under the GNU GPL v3.0 - see LICENSE file for details.
 */

 import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";
 import ExpandButton from './ExpandButton.jsx'
 
 const developers = [
   {
     name: "Rakshith KN",
     role: "Handled Frontend and backend processing",
     github: "Nishantksingh0",
     gitLink: "https://github.com/NishantkSingh0",
     linkedin: "Nishantksingh1",
     linLink: "https://www.linkedin.com/in/nishantksingh1",
     portfolio: "Nishantksingh0",
     prtLink: "https://nishantksingh0.github.io",
     email: "nishantsingh.talk",
     emailLink: "mailto:nishantsingh.talk@gmail.com"
   },
   {
     name: "Prajwal JS",
     role: "Handled Designing All Templates",
     github: "Amisha-Pal",
     gitLink: "https://github.com/Amisha-Pal",
     linkedin: "amisha-pal-70",
     linLink: "https://www.linkedin.com/in/amisha-pal-703493328/",
     portfolio: "Amisha.dev",
     prtLink: "",
     email: "amishapal992",
     emailLink: "mailto:amishapal9927@gmail.com"
   },
   {
     name: "Abhishak",
     role: "Handled Written Works of project",
     github: "Ankush2011",
     gitLink: "https://github.com/Ankush201109",
     linkedin: "Ankush-kumar-5",
     linLink: "https://www.linkedin.com/in/ankush-kumar-505318231",
     portfolio: "Ankush.dev",
     prtLink: "",
     email: "akbahot2004",
     emailLink: "mailto:akbahot2004@gmail.com"
   },
   {
     name: "Sanketh",
     role: "Enhanced UI by adding Nightmode's and Other essential components",
     github: "NishaKumari92",
     gitLink: "https://github.com/NishaKumari9279",
     linkedin: "nisha-kumari-59",
     linLink: "https://www.linkedin.com/in/nisha-kumari-598611344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
     portfolio: "Nisha.dev",
     prtLink: "",
     email: "nishakumari92",
     emailLink: "mailto:nishakumari927979@gmail.com"
   },
 ];
 
 function AboutUs() {
   return (
     <div className="min-h-screen bg-gray-300 py-12 px-6 flex flex-col items-center">
       <div>
         <h1 className="text-2xl font-extrabold text-center mb-2 text-gray-900 md:text-3xl"><i className="fas fa-user-alt"/> About Us</h1>
         <div className="w-[100%] h-1 bg-gray-800 mx-auto mb-10 mt-1 rounded"></div>
       </div>
 
       {/* Website Features and ATS Details */}
       <div className="w-full max-w-8xl bg-gray-200 p-6 shadow-lg mb-10">
         <h2 className="text-xl font-bold text-gray-800 mb-4">ResumeBuilder Features & ATS Optimization</h2>
         <p className="text-gray-700 mb-4">
           ResumeBuilder is a free, ATS-friendly platform designed to help users create professional resumes in just 8-10 minutes. Our goal is to simplify the resume-building process while ensuring compatibility with Applicant Tracking Systems (ATS) used by employers to screen candidates.
         </p>
         <div className="space-y-4">
           <div>
             <h3 className="text-lg font-semibold text-gray-800">Key Features</h3>
             <ul className="list-disc list-inside text-gray-700 space-y-2">
               <li>Craft stunning resumes quickly with an intuitive interface.</li>
               <li>Assistant bot guides users through data entry for accurate, complete resumes.</li>
               <li>Choose from ATS-optimized, job-winning templates tailored for various industries.</li>
               <li>Real-time resume previews update as you input data, ensuring total control.</li>
               <li>Lightweight performance (~1.8MB RAM, near 0% CPU usage) for a smooth experience.</li>
               <li>Download resumes in PDF, HTML/CSS, or JSON formats.</li>
               <li>Auto-filled JSON data prevents repetitive data entry.</li>
               <li>Real-time suggestions for keywords and formatting to enhance ATS compatibility.</li>
               <li>No data storage, ensuring full confidentiality.</li>
               <li>Free with no hidden fees; open-source for student customization.</li>
               <li>View generated templates via the <a href="/ViewTemplates" className="text-blue-600 hover:underline">GeneratedResumes</a> section.</li>
             </ul>
           </div>
           <div>
             <h3 className="text-lg font-semibold text-gray-800">ATS Optimization</h3>
             <p className="text-gray-700">
               Our platform is designed to maximize resume success with ATS software, which employers use to parse and rank applications. We incorporate:
             </p>
             <ul className="list-disc list-inside text-gray-700 space-y-2">
               <li><strong>Resume Parsing</strong>: Templates use clean, scannable layouts with standard fonts to ensure ATS can extract contact info, skills, and experience accurately.</li>
               <li><strong>Keyword Matching</strong>: The assistant bot suggests job-specific keywords to align resumes with job descriptions, improving ATS rankings.</li>
               <li><strong>Structured Sections</strong>: Clear headings (e.g., Skills, Experience, Education) help ATS categorize data effectively.</li>
             </ul>
           </div>
           <div>
             <h3 className="text-lg font-semibold text-gray-800">Workflow</h3>
             <p className="text-gray-700">
               ResumeBuilder streamlines the creation of ATS-friendly resumes through the following steps:
             </p>
             <ul className="list-decimal list-inside text-gray-700 space-y-2">
               <li><strong>Data Entry</strong>: Input details manually via the guided form or upload a PDF resume for automatic parsing.</li>
               <li><strong>Parsing</strong>: For uploaded PDFs, our system extracts structured data (contact, skills, experience) using advanced parsing technology.</li>
               <li><strong>Template Selection</strong>: Choose from a library of ATS-compatible templates designed for clarity and scannability.</li>
               <li><strong>Real-Time Editing</strong>: Edit and preview your resume live, with suggestions for ATS-friendly keywords and formatting.</li>
               <li><strong>Download</strong>: Export your resume in multiple formats, ready for submission to ATS-driven job applications.</li>
             </ul>
           </div>
         </div>
       </div>
 
       {/* Developers Section */}
       <div className="w-full max-w-8xl flex flex-row flex-wrap justify-center gap-6">
         {developers.map((dev, index) => (
           <div
             key={index}
             className="w-full sm:w-72 lg:w-64 min-h-72 bg-gray-200 rounded-2xl p-4 flex flex-col items-center justify-between text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
           >
             <div className="w-full bg-blue-600 text-lg font-bold p-2 rounded-2xl mb-3">
               <div className="flex items-center justify-center">
                 {dev.name}
                 {dev.name === "Rakshith KN" && <ExpandButton
                   content="/Resume-Builder/BinaryBunch.jpeg"
                   message="Have secured 3rd rank in University 24hr Hackathon (TechWizard) on"
                   linkText="Proctoring System"
                   linkUrl="https://github.com/NishantkSingh0/Proctoring-System"
                 />}
               </div>
             </div>
 
             <p className="text-green-700 text-sm font-semibold mb-3 flex-1 overflow-auto">
               {dev.role}
               {dev.name === "Rakshith KN" && <ExpandButton
                 content=" . . . "
                 message={[
                   "Developed and integrated frontend and backend systems.",
                   "Proposed innovative project ideas with structured workflows.",
                   "Researched high-rated resumes for optimization.",
                   "Analyzed ATS algorithms for effective resume selection.",
                   "Handled suggestion items and integrate with UI",
                   "Integrated Assistant bot to get info module",
                   "Managed live rendering of templates on data entry"
                 ]}
               />}
               {dev.name === "Prajwal JS" && <ExpandButton
                 content=" . . . "
                 message={[
                   "Designed all templates in HTML/CSS",
                   "Researched designs and innovation ideas",
                   "Gived optimization idea for various modules",
                   "Researched other Resume builder websites and suggested improvemnets"
                 ]}
               />}
               {dev.name === "Abhishak" && <ExpandButton
                 content=" . . . "
                 message={[
                   "Managed All written works (Synopsis, Project file)",
                   "Designed PPT for presentation",
                   "Researched other Resume builder websites and suggested improvemnets"
                 ]}
               />}
               {dev.name === "Sanketh" && <ExpandButton
                 content=" . . . "
                 message={[
                   "Enhanced UI by adding Nightmode's and Other essential components",
                   "Researched UI/UX best practices for resume builder",
                   "Suggested improvements for user interaction flows"
                 ]}
               />}
             </p>
 
             <div className="w-full flex justify-around items-center mb-3">
               <a
                 href={dev.gitLink}
                 onClick={(e) => { if (!dev.gitLink) e.preventDefault(); }}
                 title={`GitHub profile of ${dev.name}`}
                 aria-label={`GitHub profile of ${dev.name}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-gray-700 hover:text-blue-600"
               >
                 <FaGithub className="text-lg" />
               </a>
               <a
                 href={dev.linLink}
                 onClick={(e) => { if (!dev.linLink) e.preventDefault(); }}
                 title={`LinkedIn profile of ${dev.name}`}
                 aria-label={`LinkedIn profile of ${dev.name}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-gray-700 hover:text-blue-600"
               >
                 <FaLinkedin className="text-lg" />
               </a>
               <a
                 href={dev.prtLink}
                 onClick={(e) => { if (!dev.prtLink) e.preventDefault(); }}
                 title={dev.prtLink ? `Portfolio of ${dev.name}` : "Portfolio not available"}
                 aria-label={dev.prtLink ? `Portfolio of ${dev.name}` : "Portfolio not available"}
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`text-gray-700 ${!dev.prtLink ? "opacity-50 cursor-not-allowed" : "hover:text-blue-600"}`}
               >
                 <FaGlobe className="text-lg" />
               </a>
               <a
                 href={dev.emailLink}
                 onClick={(e) => { if (!dev.emailLink) e.preventDefault(); }}
                 title={`Email ${dev.name}`}
                 aria-label={`Email ${dev.name}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-gray-700 hover:text-blue-600"
               >
                 <FaEnvelope className="text-lg" />
               </a>
             </div>
           </div>
         ))}
       </div>
     </div>
   );
 }
 
 export default AboutUs;