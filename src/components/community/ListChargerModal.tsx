import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { stationApi } from '../../services/stationApi';

interface ListChargerModalProps {
  onClose: () => void;
}

const ListChargerModal: React.FC<ListChargerModalProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Home',
    powerKw: '',
    address: '',
    connectorType: 'Type 2',
    pricePerKwh: '',
    amenities: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await stationApi.createStation({
        name: formData.name,
        type: formData.type,
        powerKw: Number(formData.powerKw),
        address: formData.address,
        location: {
          type: 'Point',
          coordinates: [76.9558, 11.0168] // Placeholder for geocoding
        },
        zone: 'Coimbatore',
        zoneType: 'Urban',
        connector_type: formData.connectorType,
        pricePerKwh: Number(formData.pricePerKwh)
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to create station:', error);
      alert('Failed to list charger. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-8 text-center animate-in fade-in zoom-in duration-200">
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Charger Submitted</h3>
          <p className="text-slate-500 mb-8 text-sm">Your charger has been submitted for review. We will notify you once it is live on the community map.</p>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-slate-900">List Your Charger</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Charger Name</label>
            <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="e.g. My Home EV Charger" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-gridwise-blue outline-none" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Charger Type</label>
              <select required name="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-gridwise-blue outline-none appearance-none">
                <option value="Home">Home</option>
                <option value="Apartment">Apartment</option>
                <option value="Workplace">Workplace</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Charging Power (kW)</label>
              <input required name="powerKw" value={formData.powerKw} onChange={handleChange} type="number" min="1" step="0.1" placeholder="e.g. 7.4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-gridwise-blue outline-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Location / Address</label>
            <input required name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Street, City, Postal Code" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-gridwise-blue outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Connector Type</label>
              <select required name="connectorType" value={formData.connectorType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-gridwise-blue outline-none appearance-none">
                <option value="Type 2">Type 2</option>
                <option value="CCS2">CCS2</option>
                <option value="CHAdeMO">CHAdeMO</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Price per kWh (₹)</label>
              <input required name="pricePerKwh" value={formData.pricePerKwh} onChange={handleChange} type="number" min="0" step="0.5" placeholder="e.g. 12" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-gridwise-blue outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Amenities (comma separated)</label>
            <input name="amenities" value={formData.amenities} onChange={handleChange} type="text" placeholder="e.g. Parking, Wi-Fi, Restroom" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-gridwise-blue outline-none" />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 text-slate-900 rounded-xl font-bold transition-all shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Submitting...' : 'Submit Charger'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListChargerModal;
