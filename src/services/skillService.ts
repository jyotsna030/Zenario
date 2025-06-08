// Mock service for skill analysis

import { BookOpen, Code, Server, Users } from 'lucide-react';

interface SkillAnalysisResult {
  skillGaps: string[];
  categories: {
    name: string;
    icon: React.ElementType;
    skills: {
      name: string;
      status: 'strong' | 'weak' | 'missing';
      level?: number;
    }[];
  }[];
}

/**
 * Simulates analyzing skills from a resume using Azure ML
 * @param resumeText Extracted text from resume
 * @returns Promise with skill analysis results
 */
export const mockAnalyzeSkills = async (resumeText: string): Promise<SkillAnalysisResult> => {
  // In a real app, this would send the resume text to Azure ML for analysis
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock response - this would normally be returned from Azure ML
  const mockSkillGaps = [
    'React Advanced Patterns',
    'GraphQL',
    'Docker & Kubernetes',
    'TypeScript',
    'CI/CD Pipelines'
  ];
  
  const mockCategories = [
    {
      name: 'Frontend Development',
      icon: Code,
      skills: [
        { name: 'HTML/CSS', status: 'strong', level: 90 },
        { name: 'JavaScript', status: 'strong', level: 85 },
        { name: 'React Basics', status: 'strong', level: 80 },
        { name: 'React Advanced Patterns', status: 'missing' },
        { name: 'Responsive Design', status: 'strong', level: 75 },
        { name: 'TypeScript', status: 'missing' }
      ]
    },
    {
      name: 'Backend Development',
      icon: Server,
      skills: [
        { name: 'Node.js', status: 'weak', level: 60 },
        { name: 'RESTful APIs', status: 'weak', level: 65 },
        { name: 'GraphQL', status: 'missing' },
        { name: 'Python', status: 'weak', level: 50 }
      ]
    },
    {
      name: 'DevOps & Tools',
      icon: BookOpen,
      skills: [
        { name: 'Git', status: 'strong', level: 80 },
        { name: 'Docker & Kubernetes', status: 'missing' },
        { name: 'CI/CD Pipelines', status: 'missing' },
        { name: 'VS Code', status: 'strong', level: 90 }
      ]
    },
    {
      name: 'Soft Skills',
      icon: Users,
      skills: [
        { name: 'Team Collaboration', status: 'strong', level: 85 },
        { name: 'Communication', status: 'strong', level: 80 },
        { name: 'Problem Solving', status: 'strong', level: 75 },
        { name: 'Project Management', status: 'weak', level: 55 }
      ]
    }
  ];
  
  return {
    skillGaps: mockSkillGaps,
    categories: mockCategories
  };
};