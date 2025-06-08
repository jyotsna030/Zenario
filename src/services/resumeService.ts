// Mock service for resume text extraction

/**
 * Simulates extracting text from a resume file using Azure Document Intelligence
 * @param file Resume file (PDF or DOC)
 * @returns Promise with extracted text
 */
export const mockExtractResumeText = async (file: File): Promise<string> => {
  // In a real app, this would upload the file to Azure Document Intelligence
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response - this would normally be returned from Azure Document Intelligence
  const mockResumeText = `
  Alex Johnson
  alex.johnson@example.com | (555) 123-4567
  
  EDUCATION
  Bachelor of Science in Computer Science
  University of Technology | 2018 - 2022
  
  EXPERIENCE
  Junior Web Developer
  TechStart Solutions | June 2022 - Present
  - Developed responsive web applications using React
  - Collaborated with design team to implement UI components
  - Assisted in API integration and data management
  
  IT Intern
  InnovateTech | Summer 2021
  - Supported development team in creating new features
  - Conducted code reviews and quality assurance testing
  - Participated in daily stand-up meetings and sprint planning
  
  SKILLS
  - Programming: JavaScript, HTML, CSS, Python
  - Frameworks: React, Node.js
  - Tools: Git, VS Code, Jira
  - Other: Responsive Design, API Integration
  
  PROJECTS
  Personal Portfolio Website
  - Created a responsive portfolio website using React and Tailwind CSS
  - Implemented animations and interactive UI elements
  
  Weather Forecast App
  - Developed a weather application that fetches data from OpenWeather API
  - Implemented geolocation features and interactive weather displays
  `;
  
  return mockResumeText;
};