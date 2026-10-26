import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Route, 
  BrainCircuit, 
  CalendarCheck, 
  BatteryCharging, 
  Users, 
  ShieldAlert, 
  History, 
  CreditCard,
  Settings,
  HelpCircle,
  X,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navGroups = [
    {
      title: 'MAIN',
      links: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Nearby Stations', path: '/stations', icon: Map },
        { name: 'Route Planner', path: '/route-planner', icon: Route },
        { name: 'AI Recommendations', path: '/recommendations', icon: BrainCircuit },
      ]
    },
    {
      title: 'CHARGING',
      links: [
        { name: 'Slot Booking', path: '/booking', icon: CalendarCheck },
        { name: 'Battery Status', path: '/battery', icon: BatteryCharging },
        { name: 'Community Chargers', path: '/community', icon: Users },
      ]
    },
    {
      title: 'SUPPORT',
      links: [
        { name: 'Emergency Rescue', path: '/rescue', icon: ShieldAlert },
        { name: 'Trip History', path: '/trips', icon: History },
        { name: 'Payments', path: '/payments', icon: CreditCard },
      ]
    },
    {
      title: 'AI DEMOS',
      links: [
        { name: 'Load Balancer', path: '/load-balancer', icon: BrainCircuit },
      ]
    }
  ];

  const bottomLinks = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help', path: '/help', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-600">
            <Zap className="h-6 w-6 fill-current" />
            <div>
              <h1 className="font-bold text-xl leading-tight text-slate-900 tracking-tight">GRIDWISE</h1>
              <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">EV Mobility Intelligence</p>
            </div>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden p-1 text-slate-500 hover:bg-slate-100 rounded-md">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6 scrollbar-hide">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          isActive 
                            ? 'bg-blue-600 text-white shadow-md shadow-gridwise-blue/20' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                        }`
                      }
                      onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="p-4 border-t border-slate-100">
          <ul className="space-y-1">
            {bottomLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                    }`
                  }
                  onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
