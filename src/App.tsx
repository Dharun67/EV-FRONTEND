import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import NearbyStations from './pages/NearbyStations';
import RoutePlanner from './pages/RoutePlanner';
import AIRecommendations from './pages/AIRecommendations';
import SlotBooking from './pages/SlotBooking';
import BatteryStatus from './pages/BatteryStatus';
import CommunityChargers from './pages/CommunityChargers';
import EmergencyRescue from './pages/EmergencyRescue';
import TripHistory from './pages/TripHistory';
import Payments from './pages/Payments';
import PlannerDashboard from './pages/PlannerDashboard';
import DemandIntelligence from './pages/DemandIntelligence';
import InfrastructureGap from './pages/InfrastructureGap';
import ComingSoon from './pages/ComingSoon';
import StationRecommendation from './pages/StationRecommendation';
import FleetManagement from './pages/FleetManagement';
import RevenueAnalytics from './pages/RevenueAnalytics';
import MaintenanceManagement from './pages/MaintenanceManagement';
import AIInsights from './pages/AIInsights';
import AdminDashboard from './pages/AdminDashboard';
import AdminManagement from './pages/AdminManagement';
import Settings from './pages/Settings';
import HelpSupport from './pages/HelpSupport';
import NetworkLoadBalancer from './pages/NetworkLoadBalancer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ScrollToTop from './components/ScrollToTop';

import React from 'react';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', backgroundColor: '#fee' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const RootRedirect = () => {
  const { loading } = useAuth();
  if (loading) return null;
  return <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="stations" element={<NearbyStations />} />
          <Route path="route-planner" element={<RoutePlanner />} />
          <Route path="recommendations" element={<AIRecommendations />} />
          <Route path="booking" element={<SlotBooking />} />
          <Route path="battery" element={<BatteryStatus />} />
          <Route path="community" element={<CommunityChargers />} />
          <Route path="rescue" element={<EmergencyRescue />} />
          <Route path="trips" element={<TripHistory />} />
          <Route path="payments" element={<Payments />} />
          <Route path="load-balancer" element={<NetworkLoadBalancer />} />
          
          {/* CPO Planner / Admin Routes */}
          <Route path="planner" element={<ProtectedRoute requireAdmin><PlannerDashboard /></ProtectedRoute>} />
          <Route path="planner/demand" element={<ProtectedRoute requireAdmin><DemandIntelligence /></ProtectedRoute>} />
          <Route path="planner/infrastructure" element={<ProtectedRoute requireAdmin><InfrastructureGap /></ProtectedRoute>} />
          
          <Route path="planner/recommendations" element={<ProtectedRoute requireAdmin><StationRecommendation /></ProtectedRoute>} />
          <Route path="planner/fleet" element={<ProtectedRoute requireAdmin><FleetManagement /></ProtectedRoute>} />
          <Route path="planner/revenue" element={<ProtectedRoute requireAdmin><RevenueAnalytics /></ProtectedRoute>} />
          <Route path="planner/maintenance" element={<ProtectedRoute requireAdmin><MaintenanceManagement /></ProtectedRoute>} />
          <Route path="planner/ai" element={<ProtectedRoute requireAdmin><AIInsights /></ProtectedRoute>} />
          <Route path="planner/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
          <Route path="planner/management" element={<ProtectedRoute requireAdmin><AdminManagement /></ProtectedRoute>} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<HelpSupport />} />
        </Route>
      </Routes>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
