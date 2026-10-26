import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string; // e.g., 'max-w-2xl'
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, icon, children, maxWidth = 'max-w-2xl' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200`}>
        
        <div className="bg-slate-50 border-b border-slate-200 p-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
              {subtitle && <p className="text-xs font-medium text-slate-500">{subtitle}</p>}
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;
