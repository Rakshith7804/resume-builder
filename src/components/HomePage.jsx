import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from './ThemeContext';
import { toast } from 'react-hot-toast';

// Animation variants for framer-motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

function HomePage() {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '' });

  // Simulated users (replace with backend API in production)
  const users = JSON.parse(localStorage.getItem('users')) || {};

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (users[email] && users[email].password === password) {
      localStorage.setItem('authToken', 'dummy-token');
      toast.success('Login successful!');
      setIsLoginOpen(false);
      navigate('/frontpage');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = signupData;
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (users[email]) {
      toast.error('Email already registered');
      return;
    }
    users[email] = { password };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('authToken', 'dummy-token');
    toast.success('Signup successful!');
    setIsSignupOpen(false);
    navigate('/frontpage');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'} flex flex-col`}>
      {/* Hero Section */}
      <motion.section
        className="py-20 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to ResumeBuilder</h1>
        <p className="text-xl mb-8">Create ATS-friendly resumes with AI in minutes!</p>
        <div className="space-x-4">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Login
          </button>
          <button
            onClick={() => setIsSignupOpen(true)}
            className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
          >
            Sign Up
          </button>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'AI-Powered Resume Builder',
              desc: 'Build professional resumes with our interactive chatbot, tailored to your job description.',
              icon: '🤖'
            },
            {
              title: 'ATS Optimization',
              desc: 'Create resumes that pass Applicant Tracking Systems with keyword-rich content.',
              icon: '✅'
            },
            {
              title: 'Resume Scanner',
              desc: 'Upload your resume to analyze its compatibility with job descriptions.',
              icon: '📄'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} hover:scale-105 transition-transform`}
              variants={slideIn}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className={`py-16 px-6 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            {
              step: 'Step 1: Sign Up or Login',
              desc: 'Create an account or log in to access our resume-building tools.'
            },
            {
              step: 'Step 2: Build Your Resume',
              desc: 'Use our AI chatbot to input your details and generate a tailored resume.'
            },
            {
              step: 'Step 3: Download & Apply',
              desc: 'Download your ATS-friendly PDF resume and apply to jobs with confidence.'
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4"
              variants={slideIn}
            >
              <div className="text-2xl font-bold text-blue-600">{index + 1}</div>
              <div>
                <h3 className="text-xl font-semibold">{step.step}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Helps You Section */}
      <motion.section
        className="py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-center mb-12">How It Helps You</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            Our ResumeBuilder empowers you to create professional resumes that stand out. With AI-driven customization, your resume is tailored to match job descriptions, increasing your chances of passing ATS filters. Save time, boost confidence, and land your dream job with a resume that showcases your skills and experience effectively.
          </p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={`py-8 px-6 ${isDark ? 'bg-gray-900' : 'bg-gray-800'} text-white text-center`}>
        <h3 className="text-xl font-semibold mb-4">About Us</h3>
        <p className="max-w-2xl mx-auto mb-4">
          ResumeBuilder is a project by a passionate team dedicated to helping job seekers succeed. We leverage AI technology to simplify resume creation, making it accessible and effective for everyone. Our mission is to empower you with tools to achieve your career goals.
        </p>
        <p>&copy; 2025 ResumeBuilder. All rights reserved.</p>
      </footer>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className={`p-6 rounded-lg ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} w-full max-w-md`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsLoginOpen(false)}
                  className={`px-4 py-2 rounded ${isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-400'} text-gray-800`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                  Login
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className={`p-6 rounded-lg ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} w-full max-w-md`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsSignupOpen(false)}
                  className={`px-4 py-2 rounded ${isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-400'} text-gray-800`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default HomePage;