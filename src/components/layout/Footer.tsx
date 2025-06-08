import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Zenario. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-sm text-gray-600 mr-2">Made with</span>
            <Heart size={16} className="text-red-500" />
            <span className="text-sm text-gray-600 ml-2">for students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;