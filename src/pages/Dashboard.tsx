import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, BookOpen, Briefcase, FileText, 
  LineChart, Target, MapPin, Lightbulb, Loader,
  ArrowRight
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { mockGenerateCareerPlan } from '../services/careerPlanService';

const Dashboard = () => {
  const navigate = useNavigate();
  const { student, setStudent, isProcessing, setIsProcessing } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!student.recommendedJobs) {
      // If user hasn't completed the journey, show a simplified dashboard
      return;
    }

    if (!student.careerPlan) {
      const generatePlan = async () => {
        setIsProcessing(true);
        setLoading(true);

        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 2500));

          // Mock career plan generation
          const careerPlan = await mockGenerateCareerPlan(
            student.careerGoal || '',
            student.skillGaps || [],
            student.recommendedJobs || []
          );

          setStudent(prev => ({
            ...prev,
            careerPlan
          }));
        } catch (error) {
          console.error('Error generating career plan:', error);
        } finally {
          setLoading(false);
          setIsProcessing(false);
        }
      };

      generatePlan();
    }
  }, [student.recommendedJobs, student.careerPlan, setStudent, setIsProcessing]);

  // For new users without resume upload
  if (!student.resumeText) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Welcome to Zenario</h1>
            <p className="mt-2 text-blue-100">
              Your AI-powered career guidance platform
            </p>
          </div>
          
          <div className="p-6">
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <FileText className="text-blue-600 h-16 w-16 md:h-24 md:w-24" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-800 mb-2">Start Your Career Journey</h2>
                  <p className="text-blue-700 mb-4">
                    Upload your resume to get personalized career guidance, skill gap analysis, and job recommendations.
                  </p>
                  <button
                    onClick={() => navigate('/resume-upload')}
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Upload Resume
                  </button>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-4">How Zenario Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <FileText className="text-purple-600" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-800">1. Resume Analysis</h3>
                </div>
                <p className="text-gray-600">
                  Upload your resume to have our AI extract and analyze your skills, experience, and education.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <LineChart className="text-blue-600" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-800">2. Skill Gap Analysis</h3>
                </div>
                <p className="text-gray-600">
                  Discover which skills you need to develop to achieve your career goals.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Target className="text-green-600" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-800">3. Career Path Mapping</h3>
                </div>
                <p className="text-gray-600">
                  Explore different career paths and understand what it takes to reach your goals.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <Briefcase className="text-yellow-600" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-800">4. Job Recommendations</h3>
                </div>
                <p className="text-gray-600">
                  Get personalized job recommendations based on your skills and career interests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Creating Your Career Plan</h1>
            <p className="mt-2 text-blue-100">
              We're generating a personalized career development plan
            </p>
          </div>
          
          <div className="p-8 flex flex-col items-center">
            <Loader className="text-blue-600 animate-spin mb-4" size={48} />
            <h2 className="text-xl font-medium text-gray-800 mb-2">Preparing your career plan...</h2>
            <p className="text-gray-500 text-center max-w-md">
              Our AI is analyzing your skills, career goals, and job market data to create a comprehensive development plan.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Your Career Dashboard</h1>
          <p className="mt-2 text-blue-100">
            Welcome, {student.name} | Career Goal: {student.careerGoal}
          </p>
        </div>
        
        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Award className="text-green-600" size={20} />
                </div>
                <h3 className="font-medium text-green-800">Career Readiness</h3>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-700">78%</div>
                  <p className="text-sm text-green-600">Overall readiness score</p>
                </div>
                <div className="w-24 h-24">
                  <div className="w-full h-full rounded-full border-8 border-green-200 relative">
                    <div 
                      className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-500"
                      style={{ 
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', 
                        clip: 'rect(0px, 24px, 48px, 0px)',
                        transform: 'rotate(280deg)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <LineChart className="text-blue-600" size={20} />
                </div>
                <h3 className="font-medium text-blue-800">Skill Development</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-700">Technical Skills</span>
                    <span className="font-medium text-blue-800">82%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-700">Soft Skills</span>
                    <span className="font-medium text-blue-800">75%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-700">Industry Knowledge</span>
                    <span className="font-medium text-blue-800">65%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Target className="text-purple-600" size={20} />
                </div>
                <h3 className="font-medium text-purple-800">Job Match</h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700 mb-2">
                  {student.recommendedJobs?.[0]?.match || 85}%
                </div>
                <p className="text-sm text-purple-600 mb-3">Match with top recommended job</p>
                <button
                  onClick={() => navigate('/job-recommendations')}
                  className="w-full bg-purple-600 text-white py-1.5 px-3 rounded text-sm hover:bg-purple-700 transition-colors"
                >
                  View All Job Matches
                </button>
              </div>
            </div>
          </div>
          
          {/* Career Plan Section */}
          {student.careerPlan && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="mr-2 text-blue-600" size={22} />
                Your Personalized Career Plan
              </h2>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="prose max-w-none text-gray-700">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Career Goal</h3>
                    <p>
                      Your goal is to become a <strong>{student.careerGoal}</strong>. Based on your current skills and experience, we've created a customized plan to help you achieve this goal.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">90-Day Action Plan</h3>
                    <ul className="space-y-3">
                      {student.careerPlan.split('\n').filter(line => line.trim()).map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-bold mr-3 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
                    <div className="flex items-start">
                      <Lightbulb className="text-yellow-600 mr-3 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-1">Pro Tip</h4>
                        <p className="text-yellow-700 text-sm">
                          Focus on one skill at a time rather than trying to learn everything at once. Start with the skills that have the highest impact on your most desired job positions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Learning Recommendations */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen className="mr-2 text-blue-600" size={22} />
              Recommended Learning Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {student.skillGaps?.slice(0, 3).map((skill, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-2">{skill}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {index === 0 
                        ? 'Master React hooks, context API, and advanced patterns'
                        : index === 1
                        ? 'Learn GraphQL queries, mutations, and server setup'
                        : 'Understand Docker containerization and Kubernetes orchestration'
                      }
                    </p>
                    <div className="flex space-x-2">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                        {index === 0 ? 'Course' : index === 1 ? 'Tutorial' : 'Workshop'}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs">
                        {index === 0 ? '12 hours' : index === 1 ? '8 hours' : '16 hours'}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      View Resource
                      <ArrowRight size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Job Recommendations Preview */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Briefcase className="mr-2 text-blue-600" size={22} />
              Top Job Recommendations
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {student.recommendedJobs?.slice(0, 2).map((job) => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="mb-3">
                    <h3 className="font-medium text-gray-800">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin size={14} className="mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.match >= 80
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {job.match}% Match
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                        +{job.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => navigate('/job-recommendations')}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      View Details
                      <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;