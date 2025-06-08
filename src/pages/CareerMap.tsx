import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, ArrowRight, TrendingUp, Clock, Award, Loader } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { mockGenerateCareerPaths } from '../services/careerService';

interface CareerPath {
  title: string;
  timeline: string;
  description: string;
  steps: {
    title: string;
    type: 'job' | 'skill' | 'education';
    description: string;
    timeframe: string;
  }[];
  matchPercentage: number;
}

const CareerMap = () => {
  const navigate = useNavigate();
  const { student, setStudent, isProcessing, setIsProcessing, setActiveStep } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [selectedPath, setSelectedPath] = useState<number>(0);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);

  useEffect(() => {
    if (!student.skillGaps) {
      navigate('/skill-analysis');
      return;
    }

    const loadCareerPaths = async () => {
      setIsProcessing(true);
      setLoading(true);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock career path generation
        const paths = await mockGenerateCareerPaths(student.careerGoal || '', student.skillGaps || []);
        setCareerPaths(paths);

        // Update student data
        setStudent(prev => ({
          ...prev,
          careerGoal: paths[0].title // Set the most recommended path as the career goal
        }));
      } catch (error) {
        console.error('Error generating career paths:', error);
      } finally {
        setLoading(false);
        setIsProcessing(false);
      }
    };

    loadCareerPaths();
  }, [student.skillGaps, student.careerGoal, navigate, setStudent, setIsProcessing]);

  const handleContinue = () => {
    setActiveStep(3);
    navigate('/job-recommendations');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Mapping Your Career Path</h1>
            <p className="mt-2 text-blue-100">
              We're generating potential career paths based on your skills and goals
            </p>
          </div>
          
          <div className="p-8 flex flex-col items-center">
            <Loader className="text-blue-600 animate-spin mb-4" size={48} />
            <h2 className="text-xl font-medium text-gray-800 mb-2">Creating your career map...</h2>
            <p className="text-gray-500 text-center max-w-md">
              Our AI is analyzing industry trends, job market data, and your skill profile to create personalized career paths.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Your Career Path Options</h1>
          <p className="mt-2 text-blue-100">
            Explore potential career paths based on your skills and interests
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {careerPaths.map((path, index) => (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedPath === index
                    ? 'border-blue-600 shadow-md ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedPath(index)}
              >
                <div className={`p-4 ${selectedPath === index ? 'bg-blue-50' : 'bg-white'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800">{path.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        path.matchPercentage > 80
                          ? 'bg-green-100 text-green-800'
                          : path.matchPercentage > 60
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {path.matchPercentage}% Match
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <Clock size={14} className="mr-1" />
                    <span>{path.timeline}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{path.description}</p>
                </div>
                <div className={`h-2 ${
                  path.matchPercentage > 80
                    ? 'bg-green-500'
                    : path.matchPercentage > 60
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
                }`}></div>
              </div>
            ))}
          </div>

          {careerPaths.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {careerPaths[selectedPath].title} Path
              </h2>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                
                {/* Timeline events */}
                <div className="space-y-8">
                  {careerPaths[selectedPath].steps.map((step, index) => (
                    <div key={index} className="relative flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`z-10 flex items-center justify-center w-16 h-16 rounded-full ${
                          step.type === 'job' 
                            ? 'bg-purple-100 text-purple-600' 
                            : step.type === 'skill'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-green-100 text-green-600'
                        }`}>
                          {step.type === 'job' ? (
                            <Briefcase size={24} />
                          ) : step.type === 'skill' ? (
                            <TrendingUp size={24} />
                          ) : (
                            <Award size={24} />
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">{step.timeframe}</div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex-1">
                        <h3 className={`font-medium mb-2 ${
                          step.type === 'job' 
                            ? 'text-purple-700' 
                            : step.type === 'skill'
                              ? 'text-blue-700'
                              : 'text-green-700'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center">
              <MapPin className="mr-2" size={18} />
              Top Cities for {careerPaths[selectedPath]?.title || 'This Career'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              {['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA'].map((city, index) => (
                <div key={index} className="bg-white p-3 rounded border border-blue-100 text-center">
                  <p className="font-medium text-gray-800">{city}</p>
                  <p className="text-sm text-gray-500">${70 + index * 5}k - ${120 + index * 10}k</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              View Job Recommendations
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerMap;