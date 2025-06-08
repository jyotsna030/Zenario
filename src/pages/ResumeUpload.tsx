import { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, File, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { mockExtractResumeText } from '../services/resumeService';

const ResumeUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const {
    isProcessing,
    setIsProcessing,
    setStudent,
    setResumeUploaded,
    uploadProgress,
    setUploadProgress,
    setActiveStep
  } = useAppContext();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setFileError('Please upload a PDF or Word document');
      return false;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size should be less than 5MB');
      return false;
    }
    
    setFileError(null);
    return true;
  };

  const handleFile = async (file: File) => {
    if (!validateFile(file)) return;
    
    setFileName(file.name);
    setIsProcessing(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 95) {
        clearInterval(interval);
        progress = 100;
      }
      setUploadProgress(Math.min(Math.round(progress), 100));
    }, 300);
    
    try {
      // Mock API call to extract text from resume
      const resumeText = await mockExtractResumeText(file);
      
      // Update student data with extracted resume text
      setStudent(prev => ({
        ...prev,
        resumeText,
        name: 'Alex Johnson', // Mock data
        email: 'alex.johnson@example.com', // Mock data
        education: 'Bachelor of Science in Computer Science, University of Technology', // Mock data
        careerGoal: 'Software Developer specializing in full-stack web development'
      }));
      
      setResumeUploaded(true);
      clearInterval(interval);
      setUploadProgress(100);
      
      // Wait a bit to show 100% progress
      setTimeout(() => {
        setActiveStep(1);
        navigate('/skill-analysis');
      }, 1000);
    } catch (error) {
      clearInterval(interval);
      setFileError('Failed to process the resume. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Upload Your Resume</h1>
          <p className="mt-2 text-blue-100">
            We'll analyze your resume to understand your skills and career goals
          </p>
        </div>
        
        <div className="p-6">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              disabled={isProcessing}
            />
            
            {!isProcessing && !fileName && (
              <div className="flex flex-col items-center">
                <Upload className="text-blue-600 mb-4\" size={48} />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Drag & drop your resume here
                </h3>
                <p className="text-gray-500 mb-4">
                  Supports PDF, DOC, DOCX (Max 5MB)
                </p>
                <button
                  onClick={handleButtonClick}
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                  disabled={isProcessing}
                >
                  Browse Files
                </button>
              </div>
            )}
            
            {isProcessing && (
              <div className="flex flex-col items-center">
                <Loader className="text-blue-600 mb-4 animate-spin" size={48} />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Processing your resume...
                </h3>
                <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-gray-500">{uploadProgress}% complete</p>
              </div>
            )}
            
            {!isProcessing && fileName && (
              <div className="flex flex-col items-center">
                <CheckCircle className="text-green-500 mb-4" size={48} />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Resume uploaded successfully!
                </h3>
                <div className="flex items-center bg-gray-100 p-3 rounded-md mt-2">
                  <File className="text-blue-600 mr-2" size={20} />
                  <span className="text-gray-700">{fileName}</span>
                </div>
              </div>
            )}
          </div>
          
          {fileError && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
              <AlertCircle className="mr-2 flex-shrink-0" size={18} />
              <span>{fileError}</span>
            </div>
          )}
          
          <div className="mt-8 bg-blue-50 p-4 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">How it works:</h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm mr-2">1</span>
                Upload your resume (PDF or Word format)
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm mr-2">2</span>
                Our AI analyzes your skills, experience, and education
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm mr-2">3</span>
                Get insights on skill gaps and career recommendations
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm mr-2">4</span>
                Receive a personalized career development plan
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;