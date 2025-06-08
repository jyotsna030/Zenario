# Zenario - AI-Powered Student Career Planning App

<div align="center">
  <img src="https://github.com/jyotsna030/Zenario/blob/main/screencapture-zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3-5173-6ba59070-local-credentialless-webcontainer-api-io-2025-06-06-11_06_29.png">
  
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 🚀 Overview

Zenario is a comprehensive AI-powered career planning platform designed specifically for students. It leverages advanced AI technologies to provide personalized career guidance, skill gap analysis, and job recommendations to help students navigate their professional journey with confidence.

### ✨ Key Features

- **📄 Smart Resume Analysis** - Upload and analyze resumes using AI-powered text extraction
- **🎯 Skill Gap Identification** - Discover missing skills needed for your dream career
- **🗺️ Interactive Career Mapping** - Visualize different career paths and progression timelines
- **💼 Personalized Job Recommendations** - Get matched with jobs based on your skills and goals
- **📈 Career Development Plans** - Receive customized 90-day action plans for career growth
- **📚 Learning Resource Suggestions** - Get curated learning materials to bridge skill gaps

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks and context
- **TypeScript 5.5.3** - Type-safe JavaScript development
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **React Router DOM 6.22.1** - Client-side routing
- **Lucide React** - Beautiful, customizable icons

### Development Tools
- **Vite 5.4.2** - Fast build tool and dev server
- **ESLint** - Code linting and quality assurance
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixes

### AI Services (Mocked for Demo)
- **Azure Document Intelligence** - Resume text extraction
- **Azure OpenAI GPT** - Career goal understanding and plan generation
- **Azure Machine Learning** - Skill gap analysis
- **Azure Maps API** - Job location recommendations

## 🏗️ Architecture

```
src/
├── components/           # Reusable UI components
│   └── layout/          # Layout components (Header, Sidebar, Footer)
├── contexts/            # React Context providers
├── pages/               # Main application pages
├── services/            # API service layers (mocked)
└── types/               # TypeScript type definitions
```

### Component Structure
- **Layout Components**: Responsive header, sidebar navigation, and footer
- **Page Components**: Feature-specific pages with dedicated functionality
- **Context Management**: Global state management for user data and app state
- **Service Layer**: Abstracted API calls with mock implementations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/zenario-career-app.git
   cd zenario-career-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📱 User Journey

### 1. Resume Upload
- Drag & drop or browse to upload PDF/DOC files
- Real-time upload progress with validation
- AI-powered text extraction and parsing

### 2. Skill Analysis
- Comprehensive skill categorization
- Visual skill level indicators
- Identification of strengths and gaps

### 3. Career Path Mapping
- Multiple career path options
- Timeline-based progression visualization
- Match percentage calculations

### 4. Job Recommendations
- Personalized job matching
- Skill-based filtering and search
- Detailed job descriptions and requirements

### 5. Career Dashboard
- Comprehensive career readiness score
- Personalized 90-day action plans
- Learning resource recommendations
- Progress tracking and analytics

## 🎨 Design Philosophy

### User Experience
- **Student-Centric Design**: Intuitive interface designed specifically for students
- **Progressive Disclosure**: Information revealed step-by-step to avoid overwhelm
- **Visual Feedback**: Clear progress indicators and status updates
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Visual Design
- **Modern Aesthetics**: Clean, professional design with thoughtful use of color
- **Consistent Branding**: Cohesive visual identity throughout the application
- **Accessibility**: High contrast ratios and keyboard navigation support
- **Micro-Interactions**: Subtle animations and hover effects for enhanced UX

## 🔧 Configuration

### Environment Variables
```env
# Development
VITE_APP_NAME=Zenario
VITE_APP_VERSION=0.1.0

# API Endpoints (Mocked)
VITE_AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT=mock-endpoint
VITE_AZURE_OPENAI_ENDPOINT=mock-endpoint
VITE_AZURE_ML_ENDPOINT=mock-endpoint
```

### Tailwind Configuration
The app uses a custom Tailwind configuration optimized for the design system:
- Custom color palette
- Extended spacing scale
- Responsive breakpoints
- Component-specific utilities

## 📊 Mock Data & Services

Since this is a demonstration app, all AI services are mocked with realistic data:

### Resume Service
- Simulates Azure Document Intelligence text extraction
- Returns structured resume data with skills, experience, and education

### Skill Analysis Service
- Mimics Azure ML skill gap analysis
- Provides categorized skill assessments with proficiency levels

### Career Path Service
- Generates multiple career progression options
- Includes timeline estimates and step-by-step guidance

### Job Recommendation Service
- Returns curated job listings with match percentages
- Filters based on skills, location, and career goals

## 🧪 Testing

### Manual Testing Checklist
- [ ] Resume upload functionality
- [ ] Skill analysis visualization
- [ ] Career path navigation
- [ ] Job recommendation filtering
- [ ] Responsive design across devices
- [ ] Error handling and edge cases

### Future Testing Implementation
- Unit tests with Jest and React Testing Library
- Integration tests for user workflows
- E2E tests with Playwright or Cypress
- Performance testing and optimization

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag & drop the `dist` folder
- **Vercel**: Connect GitHub repository for automatic deployments
- **AWS S3 + CloudFront**: Static hosting with CDN
- **Azure Static Web Apps**: Integrated with Azure services

## 🤝 Contributing

We welcome contributions to improve Zenario! Here's how you can help:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use ESLint configuration provided
- Maintain consistent code formatting
- Write descriptive commit messages
- Add comments for complex logic

### Areas for Contribution
- [ ] Real AI service integration
- [ ] Additional career path algorithms
- [ ] Enhanced data visualization
- [ ] Mobile app development
- [ ] Accessibility improvements
- [ ] Performance optimizations

## 📈 Roadmap

### Phase 1: Core Features ✅
- [x] Resume upload and parsing
- [x] Skill gap analysis
- [x] Career path mapping
- [x] Job recommendations
- [x] Career dashboard

### Phase 2: Enhanced Features 🚧
- [ ] Real-time job market data integration
- [ ] Advanced skill assessment quizzes
- [ ] Peer comparison and benchmarking
- [ ] Career mentor matching
- [ ] Interview preparation tools

### Phase 3: Advanced Features 🔮
- [ ] AI-powered interview simulation
- [ ] Salary negotiation guidance
- [ ] Professional network building
- [ ] Company culture matching
- [ ] Long-term career tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

