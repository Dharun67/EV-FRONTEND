import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: 'Hi! I am GridWise AI. How can I assist you with your EV journey today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const userMsg = input;
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let reply = "I can help you find charging stations, predict wait times, or optimize your battery usage.";
      if (userMsg.toLowerCase().includes('station') || userMsg.toLowerCase().includes('charge')) {
        reply = "There's an Ultra-Fast 150kW charger 2.5km away with 2 slots available. Want me to route you there?";
      } else if (userMsg.toLowerCase().includes('battery')) {
        reply = "Based on your current driving style, your battery should last another 85km. I recommend charging at the next hub.";
      }

      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gridwise-primary text-gridwise-bg shadow-lg transition-all transform hover:scale-110 z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-[350px] max-h-[500px] flex flex-col bg-gridwise-card border border-gridwise-border shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gridwise-primary/20 to-transparent border-b border-gridwise-border">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gridwise-primary" />
            <h3 className="font-bold text-gridwise-text tracking-wide">GridWise AI</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gridwise-text-muted hover:text-gridwise-danger transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gridwise-bg/50 custom-scrollbar h-[350px]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user' ? 'bg-gridwise-action text-white rounded-br-none' : 'bg-gridwise-border text-gridwise-text rounded-bl-none'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 bg-gridwise-card border-t border-gridwise-border flex items-center gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask GridWise AI..."
            className="flex-1 bg-gridwise-bg border border-gridwise-border rounded-xl px-4 py-2 text-sm text-gridwise-text focus:outline-none focus:border-gridwise-primary transition-colors"
          />
          <button 
            onClick={handleSend}
            className="p-2 bg-gridwise-primary text-gridwise-bg rounded-xl hover:bg-gridwise-primary-hover transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AiChatWidget;
