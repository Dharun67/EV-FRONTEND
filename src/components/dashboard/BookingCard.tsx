import React from 'react';
import type { Booking } from '../../types';
import { Calendar, Clock, MapPin, PlugZap } from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Upcoming Booking</h2>
          <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
            <MapPin className="h-4 w-4 text-blue-600" />
            {booking.stationName}
          </div>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-lg border border-blue-100">
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-500">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Date</p>
            <p className="text-sm font-bold text-slate-900">{booking.date}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-500">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Time</p>
            <p className="text-sm font-bold text-slate-900">{booking.time}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-500">
            <PlugZap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Connector</p>
            <p className="text-sm font-bold text-slate-900">{booking.connector}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-500">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Duration</p>
            <p className="text-sm font-bold text-slate-900">{booking.durationMin} mins</p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex gap-3">
        <button className="flex-1 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
          View Booking
        </button>
        <button className="flex-1 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-semibold rounded-xl transition-colors shadow-sm">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
