import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, LineChart, Map, Briefcase, Award, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { student, activeStep, setActiveStep } = useAppContext();

  const steps = [
    { id: 0, path: '/resume-upload', label: 'Resume Upload', icon: FileText, disabled: false },
    { id: 1, path: '/skill-analysis', label: 'Skill Analysis', icon: LineChart, disabled: !student.resumeText },
    { id: 2, path: '/career-map', label: 'Career Map', icon: Map, disabled: !student.skillGaps },
    { id: 3, path: '/job-recommendations', label: 'Job Recommendations', icon: Briefcase, disabled: !student.careerGoal },
    { id: 4, path: '/dashboard', label: 'Career Plan', icon: Award, disabled: !student.recommendedJobs }
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleStepClick = (stepId: number, path: string, disabled: boolean) => {
    if (!disabled) {
      setActiveStep(stepId);
      navigate(path);
    }
  };

  // Only show on pages after login
  if (location.pathname === '/') {
    return null;
  }

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className={`font-semibold ${collapsed ? 'hidden' : 'block'}`}>Career Journey</h2>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {collapsed ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id, step.path, step.disabled)}
                disabled={step.disabled}
                className={`w-full flex items-center ${
                  collapsed ? 'justify-center' : 'justify-start'
                } px-3 py-3 rounded-md transition-colors ${
                  location.pathname === step.path
                    ? 'bg-blue-50 text-blue-600'
                    : step.disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <step.icon
                  size={20}
                  className={location.pathname === step.path ? 'text-blue-600' : ''}
                />
                <span
                  className={`ml-3 ${collapsed ? 'hidden' : 'block'} transition-opacity`}
                >
                  {step.label}
                </span>
                {!collapsed && activeStep > step.id && !step.disabled && (
                  <span className="ml-auto flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;