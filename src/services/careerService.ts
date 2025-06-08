// Mock service for career path generation

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

/**
 * Simulates generating career paths based on career goal and skill gaps
 * @param careerGoal User's career goal
 * @param skillGaps User's identified skill gaps
 * @returns Promise with generated career paths
 */
export const mockGenerateCareerPaths = async (
  careerGoal: string,
  skillGaps: string[]
): Promise<CareerPath[]> => {
  // In a real app, this would use Azure GPT to generate personalized career paths
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock response - this would normally be returned from Azure GPT
  const mockCareerPaths: CareerPath[] = [
    {
      title: 'Full-Stack Developer',
      timeline: '1-2 years',
      description: 'Focus on building end-to-end web applications with modern JavaScript frameworks and backend technologies.',
      steps: [
        {
          title: 'Master React Advanced Patterns',
          type: 'skill',
          description: 'Learn context API, hooks, render props, and HOCs to build scalable React applications.',
          timeframe: '2-3 months'
        },
        {
          title: 'Learn GraphQL & TypeScript',
          type: 'skill',
          description: 'Develop skills in GraphQL API design and TypeScript for type-safe development.',
          timeframe: '3-4 months'
        },
        {
          title: 'Junior Full-Stack Developer',
          type: 'job',
          description: 'Apply for positions that involve both frontend and backend development with React and Node.js.',
          timeframe: '4-6 months'
        },
        {
          title: 'Learn DevOps Fundamentals',
          type: 'skill',
          description: 'Get comfortable with Docker, Kubernetes, and CI/CD pipelines for modern deployment.',
          timeframe: '3-4 months'
        },
        {
          title: 'Mid-Level Full-Stack Developer',
          type: 'job',
          description: 'Progress to a role with more responsibility in architecture and team leadership.',
          timeframe: '1-2 years'
        }
      ],
      matchPercentage: 85
    },
    {
      title: 'Frontend Specialist',
      timeline: '1-1.5 years',
      description: 'Specialize in creating exceptional user interfaces and experiences with advanced frontend technologies.',
      steps: [
        {
          title: 'Master React & TypeScript',
          type: 'skill',
          description: 'Focus on advanced React patterns and TypeScript for robust frontend applications.',
          timeframe: '3-4 months'
        },
        {
          title: 'Learn UI/UX Design Principles',
          type: 'education',
          description: 'Take courses on design systems, accessibility, and user experience design.',
          timeframe: '2-3 months'
        },
        {
          title: 'Frontend Developer',
          type: 'job',
          description: 'Secure a position focused on building modern, responsive user interfaces.',
          timeframe: '3-5 months'
        },
        {
          title: 'Master State Management & Performance',
          type: 'skill',
          description: 'Learn advanced state management with Redux, Context API, and application performance optimization.',
          timeframe: '2-3 months'
        },
        {
          title: 'Senior Frontend Developer',
          type: 'job',
          description: 'Progress to a senior role focusing on architecture and leading frontend initiatives.',
          timeframe: '1-1.5 years'
        }
      ],
      matchPercentage: 90
    },
    {
      title: 'DevOps Engineer',
      timeline: '1.5-2 years',
      description: 'Transition to a role focused on automating and optimizing development and deployment workflows.',
      steps: [
        {
          title: 'Learn Docker & Kubernetes',
          type: 'skill',
          description: 'Master containerization and orchestration technologies for modern application deployment.',
          timeframe: '3-4 months'
        },
        {
          title: 'CI/CD & Infrastructure as Code',
          type: 'skill',
          description: 'Learn tools like Jenkins, GitHub Actions, Terraform, and AWS CloudFormation.',
          timeframe: '3-4 months'
        },
        {
          title: 'Cloud Certification',
          type: 'education',
          description: 'Obtain AWS, Azure, or GCP certification to validate cloud expertise.',
          timeframe: '2-3 months'
        },
        {
          title: 'Junior DevOps Engineer',
          type: 'job',
          description: 'Secure an entry-level DevOps position to apply and expand your skills.',
          timeframe: '4-6 months'
        },
        {
          title: 'DevOps Engineer',
          type: 'job',
          description: 'Progress to a full DevOps role with responsibilities for the entire CI/CD pipeline.',
          timeframe: '1.5-2 years'
        }
      ],
      matchPercentage: 70
    }
  ];
  
  return mockCareerPaths;
};