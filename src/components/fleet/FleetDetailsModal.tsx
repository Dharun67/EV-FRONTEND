import React from 'react';
import Modal from '../shared/Modal';
import { FleetVehicle } from '../../types/fleet';
import { Truck } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vehicle: FleetVehicle | null;
}

const FleetDetailsModal: React.FC<Props> = ({ isOpen, onClose, vehicle }) => {
  if (!vehicle) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Vehicle Details: ${vehicle.id}`}
      subtitle={`${vehicle.fleetName} • ${vehicle.model}`}
      icon={<Truck className="w-6 h-6 text-blue-600" />}
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Status</p>
            <StatusBadge status={vehicle.status} />
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Battery Level</p>
            <p className={`text-2xl font-black ${vehicle.batteryLevel < 20 ? 'text-red-600' : 'text-slate-900'}`}>{vehicle.batteryLevel}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Est. Range</p>
            <p className="text-lg font-bold text-slate-900">{vehicle.rangeKm} km</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Energy Consumed</p>
            <p className="text-lg font-bold text-slate-900">{vehicle.energyConsumedKWh} kWh</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Charging Cost</p>
            <p className="text-lg font-bold text-slate-900">₹{vehicle.costInr}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Last Station</p>
            <p className="text-sm font-bold text-slate-900">{vehicle.currentStation || 'N/A'}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3">Recent Charging History</h4>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center justify-center h-24">
            <p className="text-sm font-medium text-slate-400">Charging history visualization available in production</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FleetDetailsModal;
