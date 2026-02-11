import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../utils/constants';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'glass-header' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Left Section: Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img src="/src/assets/images/win-logo.png" alt="ETV WIN" className="h-8 md:h-12 w-auto" />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-white' : 'text-text-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Search & Profile */}
        <div className="flex items-center gap-4 md:gap-6">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="text"
              placeholder="Titles, people, genres"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/50 border border-white/20 text-white text-sm rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-primary w-48 lg:w-64 transition-all"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white">
              <Search size={18} />
            </button>
          </form>

          <div className="flex items-center gap-4">
            <button className="text-text-muted hover:text-white md:hidden">
              <Search size={20} />
            </button>
            <button className="text-text-muted hover:text-white relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full text-white">3</span>
            </button>
            <button className="hidden sm:flex items-center gap-2 text-text-muted hover:text-white">
              <div className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center border border-white/10 overflow-hidden">
                <img src="/src/assets/images/profile-img.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </button>
            <button 
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background h-screen w-full fixed top-16 left-0 p-6 z-40 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xl font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <Link to="/profile" className="text-lg text-text-muted">Account</Link>
            <Link to="/help" className="text-lg text-text-muted">Help Center</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default React.memo(Header);
