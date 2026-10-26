import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarDays, AlertTriangle, Loader2 } from 'lucide-react';

import { Booking } from '../types/booking';
import { stationApi } from '../services/stationApi';
import { bookingApi } from '../services/bookingApi';

import BookingStepper from '../components/booking/BookingStepper';
import StationSelector from '../components/booking/StationSelector';
import DateSelector from '../components/booking/DateSelector';
import TimeSlotSelector from '../components/booking/TimeSlotSelector';
import ChargerSelector from '../components/booking/ChargerSelector';
import DurationSelector from '../components/booking/DurationSelector';
import SmartBookingCard from '../components/booking/SmartBookingCard';
import AvailabilityTimeline from '../components/booking/AvailabilityTimeline';
import BookingSummary from '../components/booking/BookingSummary';
import DemandForecastChart from '../components/demand/DemandForecastChart';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import BookingSuccess from '../components/booking/BookingSuccess';
import ActiveBookingMonitor from '../components/booking/ActiveBookingMonitor';

const SlotBooking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialStation = searchParams.get('station') || null;

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(initialStation);
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);
  const [selectedConnectorId, setSelectedConnectorId] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const [stations, setStations] = useState<any[]>([]);
  const [connectors, setConnectors] = useState<any[]>([]);
  const [loadingFeasibility, setLoadingFeasibility] = useState(false);
  const [feasibilityError, setFeasibilityError] = useState<string | null>(null);
  const [alternativeStation, setAlternativeStation] = useState<any | null>(null);

  // Generate dynamic dates
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      id: `day-${i}`,
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      shortDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rawDate: d.toISOString().split('T')[0]
    };
  });

  // Generate dynamic times
  const timeSlots = Array.from({ length: 24 }).map((_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const ampm = i < 12 ? 'AM' : 'PM';
    return { id: `time-${i}`, time: `${hour}:00 ${ampm}`, available: true };
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await stationApi.getNearby(13.0827, 80.2707, 15);
        setStations(data.data || []);
        if (initialStation && !selectedStationId) setSelectedStationId(initialStation);
      } catch (e) {}
    };
    loadData();
  }, [initialStation, selectedStationId]);

  useEffect(() => {
    if (selectedStationId && currentStep >= 2) {
      const loadChargers = async () => {
        try {
          const res = await stationApi.getChargers(selectedStationId);
          const chargers = res.data || [];
          const formatted = chargers.map((c: any) => ({
            id: c.charger_id || c.id || c._id,
            name: c.charger_name || c.name || c.charger_id || 'Unknown Charger',
            power: c.power_kw || c.maxPowerKw || 0,
            type: c.type || c.connector_type || 'Unknown Type',
            status: c.status || 'Unavailable',
            pricePerKwh: c.pricePerKwh || 0
          }));
          setConnectors(formatted);
        } catch (e) {}
      };
      loadChargers();
    }
  }, [selectedStationId, currentStep]);

  const station = stations.find(s => (s.id || s.station_id) === selectedStationId);
  const dateObj = dates.find(d => d.id === selectedDateId);
  const timeObj = timeSlots.find(t => t.id === selectedTimeId);
  const connector = connectors.find(c => c.id === selectedConnectorId);
  
  const energyKwh = connector ? Math.round((connector.power * selectedDuration) / 60) : 0;
  const cost = station ? energyKwh * (station.pricePerKwh || 0) : 0;

  const booking: Partial<Booking> = {
    stationId: selectedStationId || undefined,
    date: dateObj?.rawDate,
    time: timeObj?.time,
    connectorId: selectedConnectorId || undefined,
    durationMinutes: selectedDuration,
    estimatedEnergyKwh: energyKwh,
    estimatedCost: cost,
  };

  const handleApplySmartBooking = () => {
    setSelectedStationId(stations[0]?.id || stations[0]?.stationId || 'gridwise-central-hub');
    setSelectedDateId('day-0');
    setSelectedTimeId('time-10');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const checkFeasibility = async () => {
    setLoadingFeasibility(true);
    setFeasibilityError(null);
    try {
      const res = await bookingApi.checkFeasibility({
        stationId: selectedStationId,
        date: dateObj?.rawDate,
        startTime: timeObj?.time
      });
      
      if (res.data.feasible) {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setFeasibilityError(res.data.reason);
        if (res.data.alternativeStation) {
          setAlternativeStation(res.data.alternativeStation);
        }
      }
    } catch (e: any) {
      setFeasibilityError(e.message || 'Failed to check slot availability');
    } finally {
      setLoadingFeasibility(false);
    }
  };

  const handleContinue = () => {
    if (currentStep === 1 && selectedStationId) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2 && selectedDateId && selectedTimeId) {
      checkFeasibility();
    } else if (currentStep === 3 && selectedConnectorId && selectedDuration) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 4) {
      setShowConfirmModal(true);
    }
  };

  const confirmBooking = async () => {
    try {
      const res = await bookingApi.create({
        stationId: selectedStationId,
        chargerId: selectedConnectorId,
        date: dateObj?.rawDate,
        startTime: timeObj?.time,
        durationMinutes: selectedDuration,
        idempotencyKey: crypto.randomUUID(),
      });
      setShowConfirmModal(false);
      setBookingId(res.data.bookingId);
      setBookingConfirmed(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      alert("Failed to confirm booking.");
    }
  };

  const handleCancel = () => setShowCancelModal(true);

  const executeCancel = () => {
    setShowCancelModal(false);
    setCurrentStep(1);
    setSelectedStationId(initialStation);
    setSelectedDateId(null);
    setSelectedTimeId(null);
    setSelectedConnectorId(null);
    setSelectedDuration(30);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (bookingConfirmed) {
    return (
      <div className="max-w-[1600px] mx-auto min-h-full p-4 md:p-8">
        <ActiveBookingMonitor bookingId={bookingId} />
        <BookingSuccess 
          bookingId={bookingId}
          booking={booking as Booking}
          station={station!}
          connector={connector!}
          dateLabel={dateObj!.date}
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto min-h-full flex flex-col relative">
      {/* Modals */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 text-center animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Charging Slot?</h3>
            <p className="text-slate-500 mb-6 text-sm">Your charging slot will be reserved for the selected time.</p>
            
            <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Station</span><span className="font-bold text-slate-900">{station?.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Time</span><span className="font-bold text-slate-900">{dateObj?.shortDate}, {timeObj?.time}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500 font-bold">Connector</span><span className="font-bold text-slate-900">{connector?.name}</span></div>
              <div className="flex justify-between text-sm pt-2 border-t border-slate-200"><span className="text-slate-500 font-bold">Estimated Cost</span><span className="font-bold text-slate-900">₹{cost + 45}</span></div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowConfirmModal(false)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">Go Back</button>
              <button onClick={confirmBooking} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Cancel booking setup?</h3>
            <p className="text-slate-500 mb-6 text-sm">All your selections will be lost.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => setShowCancelModal(false)} className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">Continue Booking</button>
              <button onClick={executeCancel} className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-md">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Book a Charging Slot</h1>
            <span className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1 shadow-sm">
              <CalendarDays className="h-3 w-3" /> GRIDWISE CHARGING
            </span>
          </div>
          <p className="text-slate-500 font-medium">Reserve your charger before you arrive.</p>
        </div>
      </div>

      <BookingStepper currentStep={currentStep} />

      {currentStep === 4 ? (
        <BookingConfirmation 
          booking={booking as Booking}
          station={station!}
          connector={connector!}
          dateLabel={dateObj!.date}
          onConfirm={() => setShowConfirmModal(true)}
          onEdit={() => setCurrentStep(1)}
          onCancel={handleCancel}
        />
      ) : (
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 pb-12">
          
          {/* Left Column: Flow */}
          <div className="w-full xl:w-[65%] flex flex-col">
            {currentStep === 1 && (
              <StationSelector 
                stations={stations.map(s => ({
                  id: s.id || s.stationId || s._id, 
                  name: s.name, 
                  location: s.address || s.city || 'Unknown Location', 
                  availableConnectors: s.availableChargers || 0, 
                  totalConnectors: s.totalChargers || 0, 
                  power: s.maxPowerKw || s.powerCapacityKw || 0, 
                  pricePerKwh: s.pricePerKwh || 0,
                  distance: s.distanceKm || 0, 
                  rating: s.rating || 0
                }))} 
                selectedId={selectedStationId} 
                onSelect={setSelectedStationId} 
              />
            )}

            {currentStep === 2 && (
              <>
                <SmartBookingCard onApply={handleApplySmartBooking} />
                <DateSelector dates={dates} selectedId={selectedDateId} onSelect={setSelectedDateId} />
                <AvailabilityTimeline />
                <TimeSlotSelector slots={timeSlots} selectedId={selectedTimeId} onSelect={setSelectedTimeId} />
                
                {feasibilityError && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-red-700 font-bold">
                      <AlertTriangle className="w-5 h-5" />
                      Slot Unavailable
                    </div>
                    <p className="text-red-600 text-sm">{feasibilityError}</p>
                    
                    {alternativeStation && (
                      <div className="bg-white p-3 rounded-xl border border-red-100 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">{alternativeStation.name}</div>
                          <div className="text-xs text-slate-500">Suggested alternative with low congestion</div>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedStationId(alternativeStation.stationId);
                            setFeasibilityError(null);
                            setAlternativeStation(null);
                          }}
                          className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-sm rounded-lg transition-colors"
                        >
                          Switch Station
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {currentStep === 3 && (
              <>
                <ChargerSelector connectors={connectors} selectedId={selectedConnectorId} onSelect={setSelectedConnectorId} />
                <DurationSelector selectedDuration={selectedDuration} onSelect={setSelectedDuration} powerKw={connector?.power || 0} />
              </>
            )}
            
            {/* Mobile continue button */}
            <div className="xl:hidden mt-8">
              <button 
                disabled={(currentStep === 1 && !selectedStationId) || (currentStep === 2 && (!selectedDateId || !selectedTimeId)) || (currentStep === 3 && (!selectedConnectorId || !selectedDuration)) || loadingFeasibility}
                onClick={handleContinue}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loadingFeasibility ? <><Loader2 className="w-5 h-5 animate-spin"/> Checking...</> : 'Continue'}
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="hidden xl:block w-full xl:w-[35%] relative">
             <BookingSummary 
                booking={booking}
                station={station ? { id: station.stationId, name: station.name, address: station.address } as any : undefined}
                connector={connector}
                dateLabel={dateObj ? `${dateObj.label}, ${dateObj.date}` : undefined}
                onContinue={handleContinue}
                loading={loadingFeasibility}
             />
             
             {selectedStationId && (
               <div className="mt-6">
                 <DemandForecastChart stationId={selectedStationId} />
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotBooking;
