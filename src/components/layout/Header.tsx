import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { student } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <Zap className={`${isScrolled ? 'text-blue-600' : 'text-white'}`} />
            <span className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              Zenario
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" label="Home" isScrolled={isScrolled} currentPath={location.pathname} />
            <NavLink to="/dashboard" label="Dashboard" isScrolled={isScrolled} currentPath={location.pathname} />
            <NavLink to="/resume-upload" label="Upload Resume" isScrolled={isScrolled} currentPath={location.pathname} />
            {student.resumeText && (
              <>
                <NavLink to="/skill-analysis\" label="Skills\" isScrolled={isScrolled} currentPath={location.pathname} />
                <NavLink to="/career-map" label="Career Map" isScrolled={isScrolled} currentPath={location.pathname} />
                <NavLink to="/job-recommendations" label="Jobs" isScrolled={isScrolled} currentPath={location.pathname} />
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={`${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/dashboard" label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/resume-upload" label="Upload Resume" onClick={() => setMobileMenuOpen(false)} />
            {student.resumeText && (
              <>
                <MobileNavLink to="/skill-analysis\" label="Skills\" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink to="/career-map" label="Career Map" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink to="/job-recommendations" label="Jobs" onClick={() => setMobileMenuOpen(false)} />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  isScrolled: boolean;
  currentPath: string;
}

const NavLink = ({ to, label, isScrolled, currentPath }: NavLinkProps) => {
  const isActive = currentPath === to;
  
  return (
    <Link
      to={to}
      className={`transition-colors duration-200 font-medium ${
        isActive
          ? isScrolled
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-white border-b-2 border-white'
          : isScrolled
            ? 'text-gray-700 hover:text-blue-600'
            : 'text-gray-100 hover:text-white hover:border-b-2 hover:border-white'
      }`}
    >
      {label}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileNavLink = ({ to, label, onClick }: MobileNavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? 'bg-blue-100 text-blue-600'
          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Header;