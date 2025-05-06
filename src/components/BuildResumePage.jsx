import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { toast } from 'react-hot-toast';

function BuildResumePage() {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', address: '' },
    education: [],
    skills: [],
    workExperience: [],
    projects: [],
    certifications: [],
    summary: '',
    jobDescription: ''
  });
  const [generatedResume, setGeneratedResume] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      question: 'Let’s start building your resume! What’s your full name?',
      field: 'personalInfo.name',
      type: 'text'
    },
    {
      question: 'Great! What’s your email address?',
      field: 'personalInfo.email',
      type: 'text',
      validate: (value) => /^[\w.-]+@[\w.-]+\.\w+$/.test(value) ? '' : 'Please enter a valid email.'
    },
    {
      question: 'What’s your phone number? (e.g., 123-456-7890)',
      field: 'personalInfo.phone',
      type: 'text',
      validate: (value) => /\d{3}-\d{3}-\d{4}/.test(value) ? '' : 'Please use format 123-456-7890.'
    },
    {
      question: 'What’s your address? (City, State, ZIP)',
      field: 'personalInfo.address',
      type: 'text'
    },
    {
      question: 'Let’s add your education. Please enter one degree (e.g., B.S. Computer Science, XYZ University, 2020-2024). Type "done" to finish or "skip" to move on.',
      field: 'education',
      type: 'text',
      isArray: true,
      done: 'done',
      skip: 'skip'
    },
    {
      question: 'Now, let’s list your skills. Enter one skill at a time (e.g., React, Python). Type "done" to finish or "skip" to move on.',
      field: 'skills',
      type: 'text',
      isArray: true,
      done: 'done',
      skip: 'skip'
    },
    {
      question: 'Let’s add your work experience. Enter one job (e.g., Software Engineer at ABC Corp, Developed web apps, 2022-2023). Type "done" to finish or "skip" to move on.',
      field: 'workExperience',
      type: 'text',
      isArray: true,
      done: 'done',
      skip: 'skip'
    },
    {
      question: 'Any projects to include? Enter one project (e.g., E-commerce Website, Built with React and Node.js, 2023). Type "done" to finish or "skip" to move on.',
      field: 'projects',
      type: 'text',
      isArray: true,
      done: 'done',
      skip: 'skip'
    },
    {
      question: 'Any certifications? Enter one (e.g., AWS Certified Developer, 2023). Type "done" to finish or "skip" to move on.',
      field: 'certifications',
      type: 'text',
      isArray: true,
      done: 'done',
      skip: 'skip'
    },
    {
      question: 'Please paste the job description for the role you’re targeting. This helps tailor your resume. Type "skip" to skip.',
      field: 'jobDescription',
      type: 'textarea',
      skip: 'skip'
    },
    {
      question: 'Ready to generate your resume! Click "Generate Resume" to proceed or go back to edit.',
      field: null,
      type: 'generate'
    }
  ];

  useEffect(() => {
    // Initialize chat with the first question
    setChatMessages([{ sender: 'bot', text: steps[0].question }]);
  }, []);

  const handleInputSubmit = () => {
    if (!userInput.trim() && steps[currentStep].type !== 'generate') return;

    const step = steps[currentStep];
    const newMessages = [...chatMessages, { sender: 'user', text: userInput }];

    // Validate input if validation function exists
    let validationError = '';
    if (step.validate) {
      validationError = step.validate(userInput);
      if (validationError) {
        setChatMessages([...newMessages, { sender: 'bot', text: validationError }]);
        setUserInput('');
        return;
      }
    }

    // Handle input based on step
    if (step.isArray && userInput.toLowerCase() === step.done) {
      // Move to next step when "done" is entered for array fields
      setCurrentStep(currentStep + 1);
      setChatMessages([...newMessages, { sender: 'bot', text: steps[currentStep + 1].question }]);
    } else if (userInput.toLowerCase() === step.skip && step.skip) {
      // Skip optional steps
      setCurrentStep(currentStep + 1);
      setChatMessages([...newMessages, { sender: 'bot', text: steps[currentStep + 1].question }]);
    } else if (step.field && step.type !== 'generate') {
      // Update resumeData
      const newResumeData = { ...resumeData };
      if (step.isArray) {
        newResumeData[step.field].push(userInput);
      } else {
        const fieldParts = step.field.split('.');
        if (fieldParts.length === 2) {
          newResumeData[fieldParts[0]][fieldParts[1]] = userInput;
        } else {
          newResumeData[step.field] = userInput;
        }
      }
      setResumeData(newResumeData);

      // For array fields, ask for another entry
      if (step.isArray) {
        setChatMessages([...newMessages, { sender: 'bot', text: `Got it! Add another ${step.field} or type "done" to finish, "skip" to move on.` }]);
      } else {
        // Move to next step
        setCurrentStep(currentStep + 1);
        setChatMessages([...newMessages, { sender: 'bot', text: steps[currentStep + 1].question }]);
      }
    }

    setUserInput('');
  };

  const handleGenerateResume = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/build_resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to build resume');
      }

      setGeneratedResume(data.resume_data);
      setPdfUrl(data.pdf_url);
      setChatMessages([...chatMessages, { sender: 'bot', text: 'Your resume has been generated! Scroll down to view and download.' }]);
      toast.success('Resume generated successfully!');
    } catch (err) {
      console.error('Error building resume:', err);
      setChatMessages([...chatMessages, { sender: 'bot', text: `Error: ${err.message}` }]);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setChatMessages([...chatMessages, { sender: 'bot', text: steps[currentStep - 1].question }]);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'} flex flex-col items-center py-12 px-6`}>
      <h1 className="text-3xl font-bold mb-6">Build Your Resume with AI</h1>
      <div className={`w-full max-w-2xl ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-xl p-6 shadow-md flex flex-col h-[70vh]`}>
        <div className="flex-1 overflow-y-auto mb-4 p-4 border rounded ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'}">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
              <span className={`inline-block p-2 rounded-lg ${msg.sender === 'bot' ? (isDark ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-800') : (isDark ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white')}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        {currentStep < steps.length && steps[currentStep].type !== 'generate' && (
          <div className="flex items-center space-x-2">
            {steps[currentStep].type === 'textarea' ? (
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your response..."
                className={`flex-1 p-2 border rounded ${isDark ? 'bg-gray-600 text-gray-200 border-gray-500' : 'bg-white text-gray-800 border-gray-300'}`}
              />
            ) : (
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                placeholder="Type your response..."
                className={`flex-1 p-2 border rounded ${isDark ? 'bg-gray-600 text-gray-200 border-gray-500' : 'bg-white text-gray-800 border-gray-300'}`}
              />
            )}
            <button
              onClick={handleInputSubmit}
              className={`px-4 py-2 rounded-xl ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              Send
            </button>
          </div>
        )}
        {currentStep < steps.length && steps[currentStep].type === 'generate' && (
          <div className="flex justify-between">
            <button
              onClick={goBack}
              className={`px-4 py-2 rounded-xl ${isDark ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
            >
              Go Back
            </button>
            <button
              onClick={handleGenerateResume}
              disabled={isLoading}
              className={`px-4 py-2 rounded-xl ${isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white disabled:opacity-50`}
            >
              {isLoading ? 'Generating...' : 'Generate Resume'}
            </button>
          </div>
        )}
      </div>
      {generatedResume && (
        <div className={`w-full max-w-2xl mt-6 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-xl p-6 shadow-md`}>
          <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Generated Resume</h2>
          <div className={`text-left ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <p><strong>Name:</strong> {generatedResume.personalInfo.name}</p>
            <p><strong>Email:</strong> {generatedResume.personalInfo.email}</p>
            <p><strong>Phone:</strong> {generatedResume.personalInfo.phone}</p>
            <p><strong>Address:</strong> {generatedResume.personalInfo.address}</p>
            <p><strong>Summary:</strong> {generatedResume.summary}</p>
            <p><strong>Skills:</strong> {generatedResume.skills.join(', ')}</p>
            <p><strong>Education:</strong></p>
            {generatedResume.education.map((edu, index) => (
              <p key={index}>{edu}</p>
            ))}
            <p><strong>Work Experience:</strong></p>
            {generatedResume.workExperience.map((exp, index) => (
              <p key={index}>{exp}</p>
            ))}
            <p><strong>Projects:</strong></p>
            {generatedResume.projects.map((proj, index) => (
              <p key={index}>{proj}</p>
            ))}
            <p><strong>Certifications:</strong></p>
            {generatedResume.certifications.map((cert, index) => (
              <p key={index}>{cert}</p>
            ))}
          </div>
          {pdfUrl && (
            <a
              href={`http://localhost:5000${pdfUrl}`}
              download="generated_resume.pdf"
              className={`mt-4 inline-block px-4 py-2 rounded-xl ${isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white`}
            >
              Download PDF
            </a>
          )}
        </div>
      )}
      <button
        onClick={() => navigate('/')}
        className={`mt-6 px-4 py-2 rounded-2xl ${isDark ? 'bg-blue-400 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
      >
        Back to Home
      </button>
    </div>
  );
}

export default BuildResumePage;