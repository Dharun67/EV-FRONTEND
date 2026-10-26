import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { getApi } from '../../utils/api';

const TripCalendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(28);
  const [tripDays, setTripDays] = useState<number[]>([2, 5, 8, 12, 14, 17, 20, 22, 25, 26, 27, 28]);
  const [tripData, setTripData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getApi<any[]>('trips');
        if (data && data.length > 0) {
          setTripData(data);
          setTripDays(data.map(d => d.day));
        }
      } catch (err) {
        console.error("Failed to fetch trips", err);
      }
    };
    fetchTrips();
  }, []);

  // Mock calendar generation (August 2026 starts on Saturday, 31 days)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const emptyStartDays = Array.from({ length: 5 }, (_, i) => i); // Offset for Sat start

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-slate-400" /> August 2026
        </h3>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft className="w-4 h-4 text-slate-500" /></button>
          <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight className="w-4 h-4 text-slate-500" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
          <div key={day} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyStartDays.map(d => (
          <div key={`empty-${d}`} className="h-10"></div>
        ))}
        {daysInMonth.map(day => {
          const hasTrip = tripDays.includes(day);
          const isSelected = selectedDay === day;
          return (
            <div 
              key={day} 
              onClick={() => setSelectedDay(day)}
              className={`h-10 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all relative ${
                isSelected ? 'bg-blue-600 text-white font-bold shadow-sm' : 'hover:bg-slate-50 text-slate-700 font-medium'
              }`}
            >
              <span className="text-sm">{day}</span>
              {hasTrip && !isSelected && (
                <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-blue-600"></div>
              )}
              {hasTrip && isSelected && (
                <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-white"></div>
              )}
            </div>
          )
        })}
      </div>

      {selectedDay && tripDays.includes(selectedDay) && (
        <div className="mt-6 pt-4 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{selectedDay} Aug 2026 Trips</p>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-medium text-slate-900">
            {tripData.find(t => t.day === selectedDay)?.details || 'Trip details for this date.'}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripCalendar;
