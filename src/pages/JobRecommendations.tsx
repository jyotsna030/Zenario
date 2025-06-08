import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Star, ArrowRight, Filter, Search, Loader } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { mockGetJobRecommendations } from '../services/jobService';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  skills: string[];
  description: string;
  match: number; // Percentage match based on skills
}

const JobRecommendations = () => {
  const navigate = useNavigate();
  const { student, setStudent, isProcessing, setIsProcessing, setActiveStep } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'high-match', 'entry-level'

  useEffect(() => {
    if (!student.careerGoal) {
      navigate('/career-map');
      return;
    }

    const loadJobs = async () => {
      setIsProcessing(true);
      setLoading(true);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock job recommendations
        const recommendedJobs = await mockGetJobRecommendations(
          student.careerGoal || '',
          student.skillGaps || []
        );
        
        setJobs(recommendedJobs);
        setSelectedJob(recommendedJobs[0]);

        // Update student data
        setStudent(prev => ({
          ...prev,
          recommendedJobs: recommendedJobs
        }));
      } catch (error) {
        console.error('Error fetching job recommendations:', error);
      } finally {
        setLoading(false);
        setIsProcessing(false);
      }
    };

    loadJobs();
  }, [student.careerGoal, student.skillGaps, navigate, setStudent, setIsProcessing]);

  const handleContinue = () => {
    setActiveStep(4);
    navigate('/dashboard');
  };

  const filteredJobs = jobs
    .filter(job => {
      // Apply search filter
      if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !job.company.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply category filter
      if (filter === 'high-match' && job.match < 80) {
        return false;
      }
      if (filter === 'entry-level' && !job.title.toLowerCase().includes('junior') && 
          !job.title.toLowerCase().includes('entry')) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => b.match - a.match);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Finding Job Recommendations</h1>
            <p className="mt-2 text-blue-100">
              We're searching for jobs that match your skills and career goals
            </p>
          </div>
          
          <div className="p-8 flex flex-col items-center">
            <Loader className="text-blue-600 animate-spin mb-4" size={48} />
            <h2 className="text-xl font-medium text-gray-800 mb-2">Searching job listings...</h2>
            <p className="text-gray-500 text-center max-w-md">
              Our AI is analyzing thousands of job postings to find the best matches for your profile and career goals.
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
          <h1 className="text-2xl font-bold">Recommended Jobs</h1>
          <p className="mt-2 text-blue-100">
            Based on your skills and career goals as a {student.careerGoal}
          </p>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column - Job list with filters */}
            <div className="md:w-2/5">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search jobs or companies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-4 flex space-x-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    filter === 'all'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  All Jobs
                </button>
                <button
                  onClick={() => setFilter('high-match')}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    filter === 'high-match'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  High Match (80%+)
                </button>
                <button
                  onClick={() => setFilter('entry-level')}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    filter === 'entry-level'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Entry Level
                </button>
              </div>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedJob?.id === job.id
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-800">{job.title}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.match >= 80
                              ? 'bg-green-100 text-green-800'
                              : job.match >= 60
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {job.match}% Match
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{job.company}</p>
                      <div className="flex items-center text-gray-500 text-sm mt-2">
                        <MapPin size={14} className="mr-1" />
                        <span>{job.location}</span>
                        <span className="mx-2">•</span>
                        <DollarSign size={14} className="mr-1" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No jobs match your current filters. Try adjusting your search.
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column - Job details */}
            <div className="md:w-3/5 border rounded-lg p-6">
              {selectedJob ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedJob.title}</h2>
                    <div className="flex items-center text-gray-700 mb-4">
                      <Briefcase size={16} className="mr-2" />
                      <span className="font-medium">{selectedJob.company}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={16} className="mr-1" />
                        <span>{selectedJob.salary}</span>
                      </div>
                      <div className="flex items-center">
                        <Star size={16} className="mr-1 text-yellow-500" />
                        <span className="font-medium">{selectedJob.match}% Match</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedJob.skills.map((skill, index) => {
                        const isGap = student.skillGaps?.includes(skill);
                        return (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isGap
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {skill} {isGap && '(Gap)'}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Job Description</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>{selectedJob.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Skill Match Analysis</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Overall Match</span>
                        <span className="font-medium">{selectedJob.match}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                          className={`h-2 rounded-full ${
                            selectedJob.match >= 80
                              ? 'bg-green-500'
                              : selectedJob.match >= 60
                              ? 'bg-yellow-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${selectedJob.match}%` }}
                        ></div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-green-700">Matching Skills</span>
                          <span className="font-medium text-green-700">
                            {selectedJob.skills.filter(skill => !student.skillGaps?.includes(skill)).length} / {selectedJob.skills.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-red-700">Missing Skills</span>
                          <span className="font-medium text-red-700">
                            {selectedJob.skills.filter(skill => student.skillGaps?.includes(skill)).length} / {selectedJob.skills.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button className="border border-blue-600 text-blue-600 py-2 px-6 rounded-md hover:bg-blue-50 transition-colors">
                      Save Job
                    </button>
                    <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Select a job to view details
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleContinue}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              Generate Career Plan
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRecommendations;