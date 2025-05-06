import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ScanResumePage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState('');
  const [score, setScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleScan = async () => {
    if (!resumeFile || !jdText) {
      setError('Please upload a resume and enter a job description.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jd', jdText);

    try {
      const response = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to scan resume. Ensure the file format (PDF or DOC) is supported.');
      }

      setScore(data.score);
      setMatchedKeywords(data.matched_keywords);
      setError(null);
    } catch (err) {
      console.error('Error scanning resume:', err);
      setError(err.message);
      setScore(null);
      setMatchedKeywords([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 flex flex-col items-center py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Scan Your Resume</h1>
      <div className="w-full max-w-2xl bg-gray-200 rounded-xl p-6 shadow-md">
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Upload Resume (PDF or DOC)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="w-full p-2 border rounded text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Job Description</label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full p-2 border rounded h-32 text-gray-800"
          />
        </div>
        <button
          onClick={handleScan}
          disabled={!resumeFile || !jdText}
          className="w-full px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          Scan Resume
        </button>
        {error && (
          <div className="mt-6 text-center text-red-600">
            <p>{error}</p>
          </div>
        )}
        {score !== null && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-gray-800">
              Match Score: {score}%
            </p>
            <p className="text-gray-700">
              Matched Keywords: {matchedKeywords.join(', ') || 'None'}
            </p>
          </div>
        )}
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
  );
}

export default ScanResumePage;