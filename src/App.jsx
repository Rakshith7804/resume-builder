/*
 - ResumeBuilder - A cool project for Building high quality and ATS friendly resumes in free...
 - Copyright (C) 2025 NishantkSingh0.github.io/
 - Licensed under the GNU GPL v3.0 - see LICENSE file for details.
 */

 import { useContext, useEffect, useState } from 'react';
 import { Routes, Route, Navigate } from 'react-router-dom';
 import HomePage from './components/HomePage';
 import FrontPage from './components/FrontPage';
 import GetInfo from './components/GetInfo';
 import Result from './components/Result';
 import AboutUs from './components/AboutUs';
 import { Toaster } from 'react-hot-toast';
 import { ThemeContext } from './components/ThemeContext';
 import ViewTemplates from './components/ViewTemplates';
 import FileUploadPage from './components/FileUploadPage';
 import Loader from './components/Loader';
 import ScanResumePage from './ScanResumePage';
 import BuildResumePage from './components/BuildResumePage';
 
 const FIREBASE_URL = 'https://resume-builder-suggestions-default-rtdb.firebaseio.com/Views.json';
 
 // Protected Route Component
 const ProtectedRoute = ({ children }) => {
   const isAuthenticated = !!localStorage.getItem('authToken');
   return isAuthenticated ? children : <Navigate to="/" />;
 };
 
 const App = () => {
   const { isDark } = useContext(ThemeContext);
   const [loading, setLoading] = useState(true);
   const [views, setViews] = useState(0);
 
   useEffect(() => {
     fetch(FIREBASE_URL)
       .then((res) => res.json())
       .then((current) => {
         const updated = (current || 0) + 1;
         fetch(FIREBASE_URL, {
           method: 'PUT',
           body: JSON.stringify(updated),
         });
         setViews(updated);
       });
   }, []);
 
   useEffect(() => {
     if (isDark) {
       document.documentElement.classList.add('dark');
     } else {
       document.documentElement.classList.remove('dark');
     }
   }, [isDark]);
 
   useEffect(() => {
     const timer = setTimeout(() => {
       setLoading(false);
     }, 2000);
     return () => clearTimeout(timer);
   }, []);
 
   if (loading) {
     return <Loader />;
   }
 
   return (
     <div>
       <Toaster />
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route
           path="/frontpage"
           element={
             <ProtectedRoute>
               <FrontPage views={views} />
             </ProtectedRoute>
           }
         />
         <Route path="/AboutUs" element={<AboutUs />} />
         <Route path="/FileUploadPage" element={<FileUploadPage />} />
         <Route path="/GetInfo" element={<GetInfo />} />
         <Route path="/Result" element={<Result />} />
         <Route path="/ScanResume" element={<ScanResumePage />} />
         <Route path="/ViewTemplates" element={<ViewTemplates />} />
         <Route path="/BuildResume" element={<BuildResumePage />} />
       </Routes>
     </div>
   );
 };
 
 export default App;