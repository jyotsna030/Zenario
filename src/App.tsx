import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ResumeUpload from './pages/ResumeUpload';
import SkillAnalysis from './pages/SkillAnalysis';
import CareerMap from './pages/CareerMap';
import JobRecommendations from './pages/JobRecommendations';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume-upload" element={<ResumeUpload />} />
            <Route path="/skill-analysis" element={<SkillAnalysis />} />
            <Route path="/career-map" element={<CareerMap />} />
            <Route path="/job-recommendations" element={<JobRecommendations />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;