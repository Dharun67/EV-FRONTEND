import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, ShieldCheck, LayoutDashboard } from 'lucide-react';

const Home: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-hidden">
      {/* Navbar */}
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-900">
          <Zap className="w-8 h-8 text-blue-600" fill="currentColor" />
          <span className="text-2xl font-black tracking-tight">Grid<span className="text-blue-600">Wise</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {user && (
                user.role === 'ADMIN' ? (
                  <button 
                    onClick={() => navigate('/planner')}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-900 px-5 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-slate-900/20"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Admin Panel</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-slate-900 px-5 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </button>
                )
              )}
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Next-Gen EV Mobility Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
            The Smartest Way to <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Power Your EV Journey
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            GridWise connects EV drivers with optimal charging stations while providing Charge Point Operators (CPOs) with AI-driven infrastructure intelligence.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {user && (
              <button 
                onClick={() => navigate(user.role === 'ADMIN' ? '/planner' : '/dashboard')}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-600/20 hover:-translate-y-1"
              >
                Go to {user.role === 'ADMIN' ? 'Admin Panel' : 'Dashboard'}
              </button>
            )}
          </div>
        </div>

        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-[-1] h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </main>
    </div>
  );
};

export default Home;
