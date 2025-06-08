// Mock service for job recommendations

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

/**
 * Simulates getting job recommendations based on career goal and skill gaps
 * @param careerGoal User's career goal
 * @param skillGaps User's identified skill gaps
 * @returns Promise with recommended jobs
 */
export const mockGetJobRecommendations = async (
  careerGoal: string,
  skillGaps: string[]
): Promise<Job[]> => {
  // In a real app, this would use Azure ML to find matching jobs from a database
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  // Generate a unique ID for each job
  const generateId = () => Math.random().toString(36).substring(2, 10);
  
  // Mock response - this would normally be returned from Azure ML and job database
  const mockJobs: Job[] = [
    {
      id: generateId(),
      title: 'Junior Frontend Developer',
      company: 'TechSolutions Inc.',
      location: 'San Francisco, CA',
      salary: '$75,000 - $95,000',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'Git', 'Responsive Design'],
      description: 'We are looking for a Junior Frontend Developer to join our team. You will be responsible for implementing visual elements that users see and interact with in a web application. You\'ll work closely with designers and other developers to create responsive and engaging user interfaces.',
      match: 85
    },
    {
      id: generateId(),
      title: 'Full-Stack Developer',
      company: 'InnovateApp',
      location: 'Remote',
      salary: '$90,000 - $120,000',
      skills: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'TypeScript'],
      description: 'InnovateApp is seeking a Full-Stack Developer to help build and maintain our web applications. The ideal candidate should have experience with both frontend and backend technologies, particularly React and Node.js. Experience with GraphQL and TypeScript is a plus.',
      match: 70
    },
    {
      id: generateId(),
      title: 'React Developer',
      company: 'WebFusion',
      location: 'New York, NY',
      salary: '$85,000 - $110,000',
      skills: ['React', 'JavaScript', 'Redux', 'HTML/CSS', 'RESTful APIs'],
      description: 'WebFusion is looking for a React Developer to join our growing team. You will be responsible for developing and implementing user interface components using React.js. You should be proficient in JavaScript, React, and have good understanding of React\'s ecosystem.',
      match: 80
    },
    {
      id: generateId(),
      title: 'Junior Software Engineer',
      company: 'GrowthTech',
      location: 'Austin, TX',
      salary: '$70,000 - $90,000',
      skills: ['JavaScript', 'React', 'Git', 'Problem Solving', 'Team Collaboration'],
      description: 'GrowthTech is seeking a Junior Software Engineer to join our development team. This role is perfect for recent graduates or those early in their career who have a solid foundation in programming concepts and are eager to learn and grow in a supportive environment.',
      match: 78
    },
    {
      id: generateId(),
      title: 'Frontend Engineer',
      company: 'PixelPerfect',
      location: 'Seattle, WA',
      salary: '$95,000 - $125,000',
      skills: ['React', 'TypeScript', 'CSS-in-JS', 'Performance Optimization', 'Accessibility'],
      description: 'PixelPerfect is looking for a Frontend Engineer who is passionate about creating beautiful, accessible, and high-performance web applications. You\'ll work on challenging projects and collaborate with a team of talented developers and designers.',
      match: 75
    },
    {
      id: generateId(),
      title: 'Full-Stack JavaScript Developer',
      company: 'ConnectTech',
      location: 'Chicago, IL',
      salary: '$85,000 - $115,000',
      skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
      description: 'ConnectTech is seeking a Full-Stack JavaScript Developer to help build and scale our web applications. The ideal candidate should have experience with JavaScript-based technologies on both the frontend and backend, particularly React and Node.js.',
      match: 72
    },
    {
      id: generateId(),
      title: 'Junior UI Developer',
      company: 'DesignFirst',
      location: 'Portland, OR',
      salary: '$65,000 - $85,000',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX', 'Responsive Design'],
      description: 'DesignFirst is looking for a Junior UI Developer to join our creative team. You\'ll work closely with designers to translate their mockups into functional user interfaces. This role is perfect for someone with a good eye for design and strong frontend skills.',
      match: 82
    },
    {
      id: generateId(),
      title: 'Web Developer',
      company: 'Digital Solutions',
      location: 'Denver, CO',
      salary: '$80,000 - $100,000',
      skills: ['JavaScript', 'React', 'HTML/CSS', 'RESTful APIs', 'Git'],
      description: 'Digital Solutions is seeking a Web Developer to help create responsive and dynamic web applications. You\'ll be responsible for implementing frontend components and integrating them with backend services. The ideal candidate should have strong JavaScript and React skills.',
      match: 77
    }
  ];
  
  // Sort by match percentage (descending)
  return mockJobs.sort((a, b) => b.match - a.match);
};