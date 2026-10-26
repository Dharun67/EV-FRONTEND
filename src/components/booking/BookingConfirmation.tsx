import React from 'react';
import { Booking, BookingStation, ChargerConnector } from '../../types/booking';

interface BookingConfirmationProps {
  booking: Booking;
  station: BookingStation;
  connector: ChargerConnector;
  dateLabel: string;
  onConfirm: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ 
  booking, station, connector, dateLabel, onConfirm, onEdit, onCancel 
}) => {
  const total = booking.estimatedCost + 10 + 35; // including mock fees

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Review Your Booking</h2>
      
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-100">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Station</p>
            <p className="font-bold text-slate-900 text-lg">{station.name}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date</p>
            <p className="font-bold text-slate-900 text-lg">{dateLabel}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Time</p>
            <p className="font-bold text-slate-900 text-lg">{booking.time}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Connector</p>
            <p className="font-bold text-slate-900 text-lg">{connector.name}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</p>
            <p className="font-bold text-slate-900 text-lg">{booking.durationMinutes} minutes</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Estimated Cost</p>
            <p className="font-bold text-slate-900 text-lg">₹{total}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onConfirm}
            className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md hover:shadow-lg text-lg"
          >
            Confirm Booking
          </button>
          <button 
            onClick={onEdit}
            className="sm:w-1/3 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
          >
            Edit Booking
          </button>
        </div>
      </div>
      
      <div className="text-center">
        <button 
          onClick={onCancel}
          className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
        >
          Cancel Booking Setup
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
