import React, { useState } from 'react';
import { Search, Book, MessageCircle, Phone, Mail, FileText, ChevronDown, ExternalLink, Shield } from 'lucide-react';

const HelpSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I start a charging session?",
      a: "Navigate to the 'Nearby Stations' page, select a station, and click 'Book Slot'. Once you arrive at the station, plug in the connector and tap 'Start Charging' on your app or scan the QR code on the charger."
    },
    {
      q: "What payment methods are supported?",
      a: "GridWise supports all major credit/debit cards, UPI, Apple Pay, Google Pay, and our native GridWise Wallet. You can manage your payment methods in the Payments section."
    },
    {
      q: "How is the AI Route Planner different from standard maps?",
      a: "Our Route Planner is specifically designed for EVs. It considers your vehicle's current battery, charging speed, elevation changes, weather, and real-time charger availability to suggest the optimal route with guaranteed charging stops."
    },
    {
      q: "Can I cancel a reserved charging slot?",
      a: "Yes, you can cancel a reservation up to 15 minutes before the scheduled time without any penalty. Late cancellations may incur a small fee to prevent blocking chargers for other users."
    },
    {
      q: "What should I do if a charger is out of order?",
      a: "If you encounter a broken charger, please report it immediately using the 'Report Issue' button on the station's details page. Our maintenance team will be notified instantly."
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto min-h-full flex flex-col">
      {/* Header & Search */}
      <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-slate-900 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">How can we help you?</h1>
          <p className="text-blue-100 font-medium mb-8 text-lg">Search for guides, FAQs, or contact our support team.</p>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for articles, questions, or topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-blue-400/50 shadow-lg text-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: FAQs */}
        <div className="w-full lg:w-2/3">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Book className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                  openFaq === idx ? 'border-gridwise-blue shadow-md' : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-200 ${
                    openFaq === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Documentation</h3>
              <p className="text-sm font-medium text-slate-500">Read our detailed user guides and manuals.</p>
            </div>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-gridwise-blue rounded-xl font-bold shadow-sm transition-all flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4" /> View Docs <ExternalLink className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>

        {/* Right Column: Contact Options */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Contact Support</h3>
            
            <div className="flex flex-col gap-4">
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-gridwise-blue hover:bg-blue-50 transition-colors text-left group">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-slate-900 transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Live Chat</h4>
                  <p className="text-sm font-medium text-slate-500">Typical reply: Under 5 mins</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-gridwise-blue hover:bg-blue-50 transition-colors text-left group">
                <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-slate-900 transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email Us</h4>
                  <p className="text-sm font-medium text-slate-500">support@gridwise.com</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-gridwise-blue hover:bg-blue-50 transition-colors text-left group">
                <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-slate-900 transition-colors">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Call Support</h4>
                  <p className="text-sm font-medium text-slate-500">1-800-GRIDWISE</p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 text-slate-900 shadow-sm mt-auto relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield className="h-24 w-24" />
             </div>
             <h3 className="font-bold text-lg mb-2 relative z-10">Emergency Rescue?</h3>
             <p className="text-slate-400 text-sm font-medium mb-4 relative z-10">Stranded with an empty battery or facing a critical issue on the road?</p>
             <button className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-sm transition-colors relative z-10">
               Request EV Rescue
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
