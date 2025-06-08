// Mock service for career plan generation

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  skills: string[];
  description: string;
  match: number;
}

/**
 * Simulates generating a personalized career plan using OpenAI GPT
 * @param careerGoal User's career goal
 * @param skillGaps User's identified skill gaps
 * @param recommendedJobs User's recommended jobs
 * @returns Promise with generated career plan text
 */
export const mockGenerateCareerPlan = async (
  careerGoal: string,
  skillGaps: string[],
  recommendedJobs: Job[]
): Promise<string> => {
  // In a real app, this would use OpenAI GPT to generate a personalized career plan
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response - this would normally be returned from OpenAI GPT
  const mockCareerPlan = `
Complete the "Advanced React Patterns" course on Frontend Masters to master context API, hooks, and component composition.

Build a personal project that demonstrates your React skills and incorporates TypeScript for your portfolio.

Take the "GraphQL Fundamentals" course on Udemy and create a small API project to practice your skills.

Join 2-3 local tech meetups or virtual communities to expand your network in the developer community.

Contribute to an open-source React project to gain collaboration experience and enhance your GitHub profile.

Apply for 3-5 Junior Frontend Developer positions per week, focusing on companies that use React as their primary frontend technology.

Set up informational interviews with 2-3 professionals working in your target role to gain insights and advice.

Complete a Docker & Kubernetes workshop or online course to understand containerization and deployment.

Create a study schedule to prepare for technical interviews, focusing on JavaScript fundamentals, React concepts, and problem-solving.
`.trim();
  
  return mockCareerPlan;
};