import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 p-4 rounded-xl border shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300 ${bgColor}`}>
      <Icon className={`w-5 h-5 ${type === 'success' ? 'text-green-500' : 'text-red-500'}`} />
      <span className={`text-sm font-bold ${textColor}`}>{message}</span>
    </div>
  );
};

export default Toast;
