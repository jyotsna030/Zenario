import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, XCircle, ArrowRight, BookOpen, 
  Award, Briefcase, GraduationCap, Loader
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { mockAnalyzeSkills } from '../services/skillService';

interface SkillCategory {
  name: string;
  icon: React.ElementType;
  skills: {
    name: string;
    status: 'strong' | 'weak' | 'missing';
    level?: number;
  }[];
}

const SkillAnalysis = () => {
  const navigate = useNavigate();
  const { student, setStudent, isProcessing, setIsProcessing, setActiveStep } = useAppContext();
  const [analyzing, setAnalyzing] = useState(true);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  
  useEffect(() => {
    if (!student.resumeText) {
      navigate('/resume-upload');
      return;
    }
    
    const analyzeResume = async () => {
      setIsProcessing(true);
      setAnalyzing(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Mock skill analysis
        const { skillGaps, categories } = await mockAnalyzeSkills(student.resumeText);
        
        setStudent(prev => ({
          ...prev,
          skillGaps
        }));
        
        setSkillCategories(categories);
      } catch (error) {
        console.error('Error analyzing skills:', error);
      } finally {
        setAnalyzing(false);
        setIsProcessing(false);
      }
    };
    
    analyzeResume();
  }, [student.resumeText, navigate, setStudent, setIsProcessing]);

  const handleContinue = () => {
    setActiveStep(2);
    navigate('/career-map');
  };

  if (analyzing) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Analyzing Your Skills</h1>
            <p className="mt-2 text-blue-100">
              We're analyzing your resume to identify your strengths and skill gaps
            </p>
          </div>
          
          <div className="p-8 flex flex-col items-center">
            <Loader className="text-blue-600 animate-spin mb-4" size={48} />
            <h2 className="text-xl font-medium text-gray-800 mb-2">Processing your skills...</h2>
            <p className="text-gray-500 text-center max-w-md mb-8">
              Our AI is analyzing your resume to identify your skills, compare them with industry standards, and find potential gaps.
            </p>
            
            <div className="w-full max-w-md space-y-4">
              {[
                'Extracting skills from your resume...',
                'Comparing with industry requirements...',
                'Identifying skill gaps...',
                'Preparing personalized recommendations...'
              ].map((step, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-700">{step}</span>
                  <span className={index < 3 ? 'text-green-500' : 'text-blue-500'}>
                    {index < 3 ? <CheckCircle2 size={20} /> : <Loader size={20} className="animate-spin" />}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Skill Analysis Results</h1>
          <p className="mt-2 text-blue-100">
            Based on your resume and your career goal: {student.careerGoal}
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-medium text-green-800 mb-3 flex items-center">
                <CheckCircle2 className="mr-2" size={20} />
                Your Strengths
              </h3>
              <ul className="space-y-2">
                {skillCategories.flatMap(category => 
                  category.skills
                    .filter(skill => skill.status === 'strong')
                    .map((skill, index) => (
                      <li key={index} className="flex items-center text-green-700">
                        <CheckCircle2 className="mr-2 text-green-500" size={16} />
                        {skill.name}
                      </li>
                    ))
                )}
              </ul>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-medium text-red-800 mb-3 flex items-center">
                <XCircle className="mr-2" size={20} />
                Skill Gaps
              </h3>
              <ul className="space-y-2">
                {student.skillGaps?.map((skill, index) => (
                  <li key={index} className="flex items-center text-red-700">
                    <XCircle className="mr-2 text-red-500" size={16} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <h3 className="text-xl font-medium text-gray-800 mb-4">Detailed Skill Breakdown</h3>
          
          <div className="space-y-8 mb-8">
            {skillCategories.map((category, index) => (
              <div key={index}>
                <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
                  <category.icon className="mr-2 text-blue-600" size={20} />
                  {category.name}
                </h4>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className={`p-3 rounded-md border ${
                          skill.status === 'strong' 
                            ? 'bg-green-50 border-green-200' 
                            : skill.status === 'weak'
                              ? 'bg-yellow-50 border-yellow-200'
                              : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-medium ${
                            skill.status === 'strong' 
                              ? 'text-green-700' 
                              : skill.status === 'weak'
                                ? 'text-yellow-700'
                                : 'text-red-700'
                          }`}>
                            {skill.name}
                          </span>
                          {skill.status === 'strong' ? (
                            <CheckCircle2 className="text-green-500" size={16} />
                          ) : skill.status === 'weak' ? (
                            <span className="text-yellow-500 text-sm">Improve</span>
                          ) : (
                            <XCircle className="text-red-500" size={16} />
                          )}
                        </div>
                        
                        {skill.level !== undefined && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                skill.status === 'strong' 
                                  ? 'bg-green-500' 
                                  : skill.status === 'weak'
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                              }`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-blue-800 mb-2">Recommended Learning Resources:</h3>
            <ul className="space-y-3">
              {student.skillGaps?.slice(0, 3).map((skill, index) => (
                <li key={index} className="flex items-start">
                  <BookOpen className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="font-medium text-blue-800">{skill}</p>
                    <p className="text-sm text-blue-700">
                      {index === 0 ? 'Take "Advanced React Patterns" on Coursera' : 
                       index === 1 ? 'Enroll in "GraphQL Fundamentals" on Udemy' :
                       'Complete "Docker & Kubernetes" workshop series'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              Continue to Career Map
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAnalysis;