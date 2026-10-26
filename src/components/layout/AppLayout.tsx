import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, Map, Route, Activity, User, 
  Menu, X, Zap, Bell, Search, LogOut,
  MapPin, Navigation, CalendarDays, BatteryCharging,
  Users, ShieldAlert, FileText, CreditCard, BrainCircuit
} from 'lucide-react';
import AiChatWidget from '../AiChatWidget';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, 50);
  }, [location.pathname]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const desktopNavItems = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'Explore', icon: Map, path: '/stations' },
    { name: 'Route Planner', icon: Route, path: '/route-planner' },
    { name: 'Trips', icon: MapPin, path: '/trips' },
    { name: 'Activity', icon: Activity, path: '/booking' },
    { name: 'Community Chargers', icon: Users, path: '/community' },
    { name: 'Emergency Rescue', icon: ShieldAlert, path: '/rescue' },
    ...(user?.role === 'Admin' ? [
      { name: 'CPO Intelligence', icon: BrainCircuit, path: '/planner/admin' },
      { name: 'Admin Management', icon: FileText, path: '/planner/management' }
    ] : []),
    { name: 'Profile', icon: User, path: '/settings' },
  ];

  const bottomNavItems = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'Explore', icon: Map, path: '/stations' },
    { name: 'Trips', icon: Route, path: '/route-planner' },
    { name: 'Activity', icon: Activity, path: '/booking' },
    { name: 'Profile', icon: User, path: '/settings' },
  ];

  const NavItem = ({ item }: { item: any }) => (
    <NavLink
      to={item.path}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? 'bg-gridwise-bg border border-gridwise-primary/30 text-gridwise-primary '
            : 'text-gridwise-text-muted hover:bg-gridwise-bg hover:text-gridwise-text'
        }`
      }
    >
      <item.icon className="w-5 h-5" />
      <span className="font-semibold text-sm">{item.name}</span>
    </NavLink>
  );

  return (
    <div className="h-screen w-full bg-gridwise-bg flex overflow-hidden text-gridwise-text font-inter">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[280px] bg-gridwise-card border-r border-gridwise-border
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col hidden lg:flex
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center px-6 mb-4">
          <div className="flex items-center gap-2 text-gridwise-text">
            <Zap className="w-8 h-8 text-gridwise-primary" fill="currentColor" />
            <span className="text-2xl font-black tracking-tight">Grid<span className="text-gridwise-primary">Wise</span></span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar flex flex-col gap-2">
          <nav className="flex flex-col gap-2">
            {desktopNavItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 mt-auto">
          <div className="p-4 bg-gridwise-card shadow-sm border border-gridwise-border rounded-xl flex items-center justify-between premium-shadow-hover transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gridwise-primary/10 flex items-center justify-center text-gridwise-primary font-bold uppercase border border-gridwise-primary/20">
                {user?.name?.substring(0, 2) || 'US'}
              </div>
              <div>
                <p className="text-sm font-bold text-gridwise-text leading-tight capitalize">{user?.name || 'User'}</p>
                <p className="text-xs text-gridwise-action capitalize">{user?.role?.toLowerCase() || 'driver'}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-gridwise-danger hover:bg-gridwise-danger/10 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden pb-16 lg:pb-0 relative z-0">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md shadow-sm border-b border-gridwise-border flex items-center justify-between px-4 lg:px-8 flex-shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-2 lg:hidden">
            <Zap className="w-6 h-6 text-gridwise-primary rounded-full animate-pulse-soft" fill="currentColor" />
            <span className="text-xl font-black tracking-tight text-gridwise-text">Grid<span className="text-gridwise-primary">Wise</span></span>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gridwise-text-muted" />
              <input 
                type="text" 
                placeholder="Search stations, routes..." 
                className="w-full pl-10 pr-4 py-2 bg-gridwise-bg border border-gridwise-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gridwise-primary focus:border-gridwise-primary/50 transition-all text-gridwise-text placeholder-gridwise-text-muted"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="p-2 text-gridwise-text-muted hover:bg-gridwise-bg rounded-lg relative transition-colors hidden sm:block">
              <Search className="w-5 h-5 lg:hidden" />
            </button>
            <button className="p-2 text-gridwise-text-muted hover:bg-gridwise-bg rounded-lg relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gridwise-primary rounded-full border border-gridwise-bg"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-scroll overflow-x-hidden p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="animate-slide-up w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-card rounded-b-none rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gridwise-border px-2 py-2 flex justify-around items-center z-50">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg transition-all ${
                isActive ? 'text-gridwise-primary' : 'text-gridwise-text-muted hover:text-gridwise-text'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-6 h-6 ${isActive ? '' : ''}`} />
                <span className="text-[10px] mt-1 font-medium">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Floating AI Chat Widget */}
      <AiChatWidget />
    </div>
  );
};

export default AppLayout;
