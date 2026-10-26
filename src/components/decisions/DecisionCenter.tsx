import React, { useState, useEffect } from 'react';
import { getApi, postApi } from '../../utils/api';
import { useSocket } from '../../utils/socket';
import { BrainCircuit, CheckCircle, ShieldAlert, Loader2, Play, XOctagon } from 'lucide-react';

interface DecisionLog {
  decisionId: string;
  timestamp: string;
  stationId?: string;
  chargerId?: string;
  action: string;
  priority: string;
  reason: string;
  evidence: string[];
  status: string;
  executionResult?: string;
}

export const DecisionCenter: React.FC = () => {
  const [decisions, setDecisions] = useState<DecisionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const socket = useSocket();

  const fetchDecisions = async () => {
    try {
      const res = await getApi<DecisionLog[]>('stations');
      if (res && Array.isArray(res)) setDecisions(res);
      else setDecisions([]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecisions();
  }, []);

  useEffect(() => {
    if (!socket) return;
    
    socket.on('decision:approvalRequired', fetchDecisions);
    socket.on('decision:executed', fetchDecisions);
    socket.on('decision:failed', fetchDecisions);

    return () => {
      socket.off('decision:approvalRequired', fetchDecisions);
      socket.off('decision:executed', fetchDecisions);
      socket.off('decision:failed', fetchDecisions);
    };
  }, [socket]);

  const handleApprove = async (id: string) => {
    setProcessing(id);
    try {
      await postApi(`/decisions/${id}/approve`, {});
      await fetchDecisions();
    } catch (e) {
      alert("Failed to approve action");
    } finally {
      setProcessing(null);
    }
  };
  
  const handleReject = async (id: string) => {
    setProcessing(id);
    try {
      await postApi(`/decisions/${id}/reject`, {});
      await fetchDecisions();
    } catch (e) {
      alert("Failed to reject action");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;
  }

  const activeCount = (decisions || []).filter(d => d.status === 'PENDING_APPROVAL').length;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-indigo-600" />
            AI Decision Center
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Centralized deterministic rules engine orchestrating real-time system responses.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-amber-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-amber-100">
             <span className="text-sm font-bold text-amber-700">{activeCount} Pending Approvals</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(decisions || []).map((dec) => (
          <div key={dec.decisionId} className={`p-4 rounded-xl border ${
            dec.status === 'PENDING_APPROVAL' ? 'border-amber-200 bg-amber-50/30 shadow-md' :
            dec.status === 'EXECUTED' ? 'border-green-200 bg-green-50/30' :
            dec.status === 'FAILED' ? 'border-red-200 bg-red-50/30' :
            'border-slate-200 bg-slate-50/50'
          }`}>
            <div className="flex justify-between items-start mb-3">
              <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider
                ${dec.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' : 
                  dec.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' : 
                  dec.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-200 text-slate-600'}
              `}>
                {dec.priority} Priority
              </span>
              <span className="text-xs text-slate-400 font-medium">{new Date(dec.timestamp).toLocaleTimeString()}</span>
            </div>
            
            <h3 className="font-bold text-slate-800 text-sm mb-1">{dec.action.replace(/_/g, ' ')}</h3>
            
            <div className="mb-3">
              <p className="text-xs text-slate-600 italic">" {dec.reason} "</p>
            </div>
            
            <div className="mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Evidence Context</p>
              <ul className="text-xs text-slate-600 space-y-1">
                {dec.evidence.map((ev, idx) => (
                  <li key={idx} className="flex gap-1">
                    <span className="text-slate-300">•</span> {ev}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100/50">
              <div className="flex items-center gap-1">
                {dec.status === 'PENDING_APPROVAL' ? <ShieldAlert className="w-4 h-4 text-amber-500" /> :
                 dec.status === 'EXECUTED' ? <CheckCircle className="w-4 h-4 text-green-500" /> :
                 <XOctagon className="w-4 h-4 text-red-500" />}
                <span className={`text-xs font-bold ${
                  dec.status === 'PENDING_APPROVAL' ? 'text-amber-600' :
                  dec.status === 'EXECUTED' ? 'text-green-600' : 'text-slate-500'
                }`}>
                  {dec.status.replace(/_/g, ' ')}
                </span>
              </div>
              
              {dec.status === 'PENDING_APPROVAL' && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleReject(dec.decisionId)}
                    disabled={processing === dec.decisionId}
                    className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                    title="Reject"
                  >
                    <XOctagon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleApprove(dec.decisionId)}
                    disabled={processing === dec.decisionId}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-slate-900 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    {processing === dec.decisionId ? <Loader2 className="w-3 h-3 animate-spin"/> : 'Approve'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {(!decisions || decisions.length === 0) && (
        <div className="text-center py-8 text-slate-500 text-sm">
          No automated decisions recorded yet.
        </div>
      )}
    </div>
  );
};
