import React, { useState, useEffect } from 'react';
import { AlertOctagon, CheckCircle, Clock, ShieldAlert, Loader2, ArrowRight } from 'lucide-react';
import { getApi, postApi } from '../../utils/api';
import { useSocket } from '../../utils/socket';

export const IncidentDashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const socket = useSocket();

  const fetchIncidents = async () => {
    try {
      const res = await getApi<any[]>('incidents');
      if (res) setIncidents(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  useEffect(() => {
    if (!socket) return;
    
    // Listen for new incidents or updates to refresh the dashboard
    socket.on('incident:created', fetchIncidents);
    socket.on('incident:updated', fetchIncidents);
    socket.on('incident:resolved', fetchIncidents);

    return () => {
      socket.off('incident:created', fetchIncidents);
      socket.off('incident:updated', fetchIncidents);
      socket.off('incident:resolved', fetchIncidents);
    };
  }, [socket]);

  const handleApprove = async (incidentId: string) => {
    setProcessingId(incidentId);
    try {
      await postApi(`/incidents/${incidentId}/approve-action`, {});
      await fetchIncidents();
    } catch (e) {
      alert("Failed to approve action");
    } finally {
      setProcessingId(null);
    }
  };

  const handleResolve = async (incidentId: string) => {
    setProcessingId(incidentId);
    try {
      await postApi(`/incidents/${incidentId}/resolve`, {});
      await fetchIncidents();
    } catch (e) {
      alert("Failed to resolve incident");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  const openCount = incidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED').length;
  const criticalCount = incidents.filter(i => i.severity === 'CRITICAL' && i.status !== 'RESOLVED').length;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            Automated Incident Response
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time emergency detection and automated mitigation engine.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></span>
            <span className="text-sm font-bold text-slate-700">{openCount} Active Incidents</span>
          </div>
          <div className="bg-red-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-red-100">
             <span className="text-sm font-bold text-red-600">{criticalCount} Critical</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Incident ID & Type</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Resource</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Severity</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Detected / Automated Action</th>
              <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Admin Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {incidents.map((inc) => (
              <tr key={inc.incidentId} className={`hover:bg-slate-50 transition-colors ${inc.status === 'ACTION_REQUIRED' ? 'bg-amber-50/50' : ''}`}>
                <td className="py-4 px-4">
                  <div className="font-bold text-slate-900">{inc.incidentId}</div>
                  <div className="text-xs font-semibold text-slate-500">{inc.type}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="font-bold text-slate-700">{inc.stationId}</div>
                  <div className="text-xs text-slate-500">{inc.chargerId || 'Station Wide'}</div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
                    ${inc.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : 
                      inc.severity === 'HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}
                  `}>
                    {inc.severity}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    {inc.status === 'RESOLVED' ? <CheckCircle className="w-4 h-4 text-green-500" /> : 
                     inc.status === 'ACTION_REQUIRED' ? <AlertOctagon className="w-4 h-4 text-amber-500" /> : 
                     <Clock className="w-4 h-4 text-slate-400" />}
                    <span className={`font-semibold text-sm ${inc.status === 'RESOLVED' ? 'text-green-600' : 'text-slate-700'}`}>
                      {inc.status.replace('_', ' ')}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-xs text-slate-500 mb-1">{new Date(inc.detectedAt).toLocaleString()}</div>
                  <div className="text-xs font-bold text-indigo-600 bg-indigo-50 inline-block px-2 py-0.5 rounded border border-indigo-100">
                    {inc.automatedAction || 'None'}
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  {inc.status === 'ACTION_REQUIRED' && (
                    <button 
                      onClick={() => handleApprove(inc.incidentId)}
                      disabled={processingId === inc.incidentId}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      {processingId === inc.incidentId ? <Loader2 className="w-3 h-3 animate-spin"/> : 'Approve Action'}
                    </button>
                  )}
                  {inc.status !== 'ACTION_REQUIRED' && inc.status !== 'RESOLVED' && inc.status !== 'CLOSED' && (
                     <button 
                       onClick={() => handleResolve(inc.incidentId)}
                       disabled={processingId === inc.incidentId}
                       className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1"
                     >
                       {processingId === inc.incidentId ? <Loader2 className="w-3 h-3 animate-spin"/> : 'Mark Resolved'}
                     </button>
                  )}
                </td>
              </tr>
            ))}
            
            {incidents.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">
                  No incidents detected.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
