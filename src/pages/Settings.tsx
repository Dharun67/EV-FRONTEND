import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, Save, CheckCircle2, Sliders } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe },
  ];

  return (
    <div className="max-w-5xl mx-auto min-h-[calc(100vh-64px)] pb-20 relative">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-slate-50 border border-green-200/50 text-slate-900 text-sm font-bold px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(0,230,118,0.2)] z-50 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" /> Settings saved successfully
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sliders className="w-8 h-8 text-green-600" /> 
            Settings
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage your GridWise account preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-green-500 text-black rounded-xl font-black uppercase tracking-widest hover:bg-[#00c968] transition-all shadow-[0_0_15px_rgba(0,230,118,0.3)] disabled:opacity-50"
        >
          {isSaving ? (
            <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white shadow-sm border border-slate-200 rounded-xl rounded-2xl border border-slate-200 p-2 flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm whitespace-nowrap ${
                    isActive 
                      ? 'bg-green-500/10 text-green-600 border border-green-200/30' 
                      : 'text-slate-500 hover:bg-white/5 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-slate-500'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white shadow-sm border border-slate-200 rounded-xl border border-slate-200 rounded-3xl p-8">
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><User className="w-5 h-5 text-blue-600" /> Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" defaultValue="GridWise User" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-green-200/50 font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" defaultValue="user@gridwise.ai" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-green-200/50 font-medium" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Vehicle Model</label>
                    <input type="text" defaultValue="Tata Nexon EV" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-green-200/50 font-medium" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><Bell className="w-5 h-5 text-gridwise-warning" /> Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Charging Complete Alerts', desc: 'Get notified when your vehicle reaches 100% or target limit.', defaultChecked: true },
                    { title: 'Low Battery Warnings', desc: 'Alerts when battery drops below 15% and you are away from stations.', defaultChecked: true },
                    { title: 'Promotions & Offers', desc: 'Receive updates about discounted charging rates.', defaultChecked: false }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultChecked} />
                        <div className="w-11 h-6 bg-slate-50 border border-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs omitted for brevity, keeping UI structure intact */}
            {['security', 'appearance', 'language'].includes(activeTab) && (
              <div className="py-20 text-center">
                <Shield className="w-12 h-12 text-gridwise-border mx-auto mb-4" />
                <h2 className="text-lg font-bold text-slate-900">This section is available in GridWise Pro</h2>
                <p className="text-sm text-slate-500 mt-2">Upgrade to unlock advanced settings.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
