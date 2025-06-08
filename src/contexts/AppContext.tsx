import { createContext, useContext, useState, ReactNode } from 'react';

interface Student {
  name: string;
  email: string;
  education: string;
  resumeText: string | null;
  careerGoal: string | null;
  skillGaps: string[] | null;
  recommendedJobs: Job[] | null;
  careerPlan: string | null;
}

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

interface AppContextType {
  student: Student;
  setStudent: (student: Student) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  resumeUploaded: boolean;
  setResumeUploaded: (uploaded: boolean) => void;
  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
}

const defaultStudent: Student = {
  name: '',
  email: '',
  education: '',
  resumeText: null,
  careerGoal: null,
  skillGaps: null,
  recommendedJobs: null,
  careerPlan: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student>(defaultStudent);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  return (
    <AppContext.Provider
      value={{
        student,
        setStudent,
        isProcessing,
        setIsProcessing,
        activeStep,
        setActiveStep,
        resumeUploaded,
        setResumeUploaded,
        uploadProgress,
        setUploadProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}