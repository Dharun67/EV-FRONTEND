import React from 'react';
import { Booking, BookingStation, ChargerConnector } from '../../types/booking';
import CostBreakdown from './CostBreakdown';
import { ArrowRight } from 'lucide-react';

interface BookingSummaryProps {
  booking: Partial<Booking>;
  station?: BookingStation;
  connector?: ChargerConnector;
  dateLabel?: string;
  onContinue: () => void;
  loading?: boolean;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ booking, station, connector, dateLabel, onContinue, loading }) => {
  const isComplete = booking.stationId && booking.date && booking.time && booking.connectorId && booking.durationMinutes;

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm sticky top-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Booking Summary</h2>
      
      <div className="space-y-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Station</span>
          <span className="font-bold text-slate-900">{station ? station.name : '--'}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date</span>
            <span className="font-bold text-slate-900">{dateLabel || '--'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Time</span>
            <span className="font-bold text-slate-900">{booking.time || '--'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Connector</span>
            <span className="font-bold text-slate-900">{connector ? connector.name : '--'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Charging Power</span>
            <span className="font-bold text-slate-900">{connector ? `${connector.power} kW` : '--'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</span>
            <span className="font-bold text-slate-900">{booking.durationMinutes ? `${booking.durationMinutes} min` : '--'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Energy</span>
            <span className="font-bold text-slate-900">{booking.estimatedEnergyKwh ? `${booking.estimatedEnergyKwh} kWh` : '--'}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Price</span>
          <span className="font-bold text-slate-900">{station ? `₹${station.pricePerKwh}/kWh` : '--'}</span>
        </div>
      </div>

      <CostBreakdown energyCost={booking.estimatedCost || 0} />

      <button 
        disabled={!isComplete || loading}
        onClick={onContinue}
        className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? 'Processing...' : (
          <>
            Continue to Confirmation <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
};

export default BookingSummary;
