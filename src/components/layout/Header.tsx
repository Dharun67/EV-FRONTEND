import React from 'react';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
// Mock import removed
const mockUser: any = {};
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  
  // Basic route name formatting
  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    if (!path) return 'Dashboard';
    return path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-900 hidden sm:block">{getPageTitle()}</h2>
          <p className="text-xs text-slate-500 hidden sm:block">EV Mobility Intelligence</p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <Search className="h-5 w-5" />
        </button>
        
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        <button className="flex items-center gap-3 p-1 pr-2 hover:bg-slate-50 rounded-full transition-colors border border-transparent hover:border-slate-200">
          <img 
            src={mockUser.avatarUrl} 
            alt={mockUser.name} 
            className="h-8 w-8 rounded-full border border-slate-200 bg-slate-100 object-cover"
          />
          <div className="text-left hidden md:block">
            <p className="text-sm font-semibold text-slate-900 leading-tight">{mockUser.name}</p>
            <p className="text-xs text-slate-500 leading-tight">{mockUser.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
        </button>
      </div>
    </header>
  );
};

export default Header;
