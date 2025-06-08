import { useNavigate } from 'react-router-dom';
import { FileText, LineChart, Map, Briefcase, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: 'Resume Analysis',
      description: 'Upload your resume and get instant feedback on how it aligns with your career goals.'
    },
    {
      icon: LineChart,
      title: 'Skill Gap Analysis',
      description: 'Identify missing skills needed for your dream job and get personalized learning recommendations.'
    },
    {
      icon: Map,
      title: 'Career Mapping',
      description: 'Visualize different career paths and understand the journey to reach your career goals.'
    },
    {
      icon: Briefcase,
      title: 'Job Recommendations',
      description: 'Discover jobs that match your skills and aspirations with personalized recommendations.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Plan Your Career Journey with AI-Powered Guidance
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Upload your resume, discover your skill gaps, and get personalized career recommendations to achieve your professional goals.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => navigate('/resume-upload')}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2" size={18} />
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  View Demo
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Students planning career"
                className="rounded-lg shadow-2xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How Zenario Helps Your Career Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="bg-blue-50 p-3 rounded-full w-fit mb-4">
                  <feature.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Students Say About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Johnson',
                role: 'Computer Science Student',
                image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                quote: 'Zenario helped me identify the skills I was missing for my dream tech job. Within 3 months of following their recommendations, I landed an internship!'
              },
              {
                name: 'Sophia Williams',
                role: 'Business Administration Graduate',
                image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                quote: 'The career mapping feature showed me paths I hadn\'t even considered. Now I have a clear direction for my professional development.'
              },
              {
                name: 'Marcus Chen',
                role: 'Engineering Student',
                image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                quote: 'The AI-powered resume analysis gave me specific feedback that no career counselor had ever provided. It was like having a personal career coach.'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col h-full"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 flex-grow italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Career Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Upload your resume today and get personalized guidance to help you achieve your career goals.
          </p>
          <button
            onClick={() => navigate('/resume-upload')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;