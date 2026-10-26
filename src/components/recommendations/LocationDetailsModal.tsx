import React from 'react';
import Modal from '../shared/Modal';
import { StationCandidate } from '../../types/stationRecommendation';
import StatusBadge from '../shared/StatusBadge';
import { IndianRupee, Zap, BatteryCharging, MapPin, Target } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  candidate: StationCandidate | null;
  onAddQueue: (candidate: StationCandidate) => void;
}

const LocationDetailsModal: React.FC<Props> = ({ isOpen, onClose, candidate, onAddQueue }) => {
  if (!candidate) return null;

  const total = candidate.recommendedMix.ac + candidate.recommendedMix.dc + candidate.recommendedMix.ultra;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={candidate.name}
      subtitle={`Opportunity Score: ${candidate.opportunityScore}/100`}
      icon={<MapPin className="w-6 h-6 text-blue-600" />}
      maxWidth="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Location Metrics</h4>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Demand Score</span>
                <span className="text-sm font-bold text-slate-900">{candidate.demandScore}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Infrastructure Gap</span>
                <span className="text-sm font-bold text-slate-900">{candidate.infrastructureGap}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">EV Growth</span>
                <span className="text-sm font-bold text-slate-900">{candidate.evGrowth}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Accessibility</span>
                <span className="text-sm font-bold text-slate-900">{candidate.accessibilityScore}/100</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Capacity Needs</h4>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Current Chargers</span>
                <span className="text-sm font-bold text-slate-900">{candidate.currentChargers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Required Chargers</span>
                <span className="text-sm font-bold text-slate-900">{candidate.requiredChargers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Coverage</span>
                <span className="text-sm font-bold text-slate-900">{candidate.coverage}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Recommended Charger Mix ({total} Total)</h4>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-2xl font-black text-blue-600">{candidate.recommendedMix.ac}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">AC</p>
              </div>
              <div className="border-l border-r border-slate-200">
                <p className="text-2xl font-black text-orange-600">{candidate.recommendedMix.dc}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">DC Fast</p>
              </div>
              <div>
                <p className="text-2xl font-black text-purple-600">{candidate.recommendedMix.ultra}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Ultra Fast</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-500" /> 
              Projected ROI Estimate
            </h4>
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-emerald-800">Est. Investment</span>
                <span className="text-sm font-bold text-emerald-900">₹{candidate.financials.estInvestmentCr} Cr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-emerald-800">Annual Revenue</span>
                <span className="text-sm font-bold text-emerald-900">₹{candidate.financials.estAnnualRevenueL} L</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-emerald-800">Annual Energy</span>
                <span className="text-sm font-bold text-emerald-900">{candidate.financials.estAnnualEnergyMWh} MWh</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-emerald-200/50">
                <span className="text-sm font-bold text-emerald-800">Payback Period</span>
                <span className="text-sm font-black text-emerald-900">{candidate.financials.paybackYears} Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <button 
          onClick={onClose}
          className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          Close
        </button>
        <button 
          onClick={() => {
            onAddQueue(candidate);
            onClose();
          }}
          className="px-4 py-2 text-sm font-bold text-slate-900 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md shadow-blue-500/20"
        >
          Add to Planning Queue
        </button>
      </div>
    </Modal>
  );
};

export default LocationDetailsModal;
