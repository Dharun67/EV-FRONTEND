import React from 'react';
import { Check } from 'lucide-react';

interface BookingStepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Station' },
  { id: 2, label: 'Date & Time' },
  { id: 3, label: 'Charger' },
  { id: 4, label: 'Confirmation' },
];

const BookingStepper: React.FC<BookingStepperProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-8 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 transform -translate-y-1/2 rounded-full"></div>
      
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        
        return (
          <div key={step.id} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all shadow-sm
              ${isCompleted ? 'bg-green-500 border-green-500 text-slate-900' : 
                isActive ? 'bg-blue-600 border-gridwise-blue text-slate-900 ring-4 ring-blue-100' : 
                'bg-white border-slate-300 text-slate-400'}`}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : step.id}
            </div>
            <span className={`mt-2 text-xs font-bold uppercase tracking-wider ${
              isCompleted ? 'text-green-600' : 
              isActive ? 'text-blue-600' : 
              'text-slate-400'
            }`}>
              {step.label}
            </span>
          </div>
        );
      })}

      {/* Dynamic Progress Bar */}
      <div 
        className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 transform -translate-y-1/2 rounded-full transition-all duration-300"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      ></div>
    </div>
  );
};

export default BookingStepper;
