import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Mail, Lock, User, AlertCircle, Loader2, Battery } from 'lucide-react';
import { authApi } from '../services/authApi';

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    evModel: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authApi.register(formData);
      navigate('/login', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gridwise-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="w-12 h-12 bg-gridwise-primary/10 rounded-xl flex items-center justify-center border border-gridwise-primary/20 mb-4">
          <Zap className="w-6 h-6 text-gridwise-primary" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-black tracking-tight text-gridwise-text">
          Join Grid<span className="text-gridwise-primary">Wise</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gridwise-text-muted">
          Create an account to start your smart EV journey.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gridwise-card py-8 px-4 shadow-sm border border-gridwise-border sm:rounded-2xl sm:px-10">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-gridwise-danger/10 border border-gridwise-danger/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-gridwise-danger shrink-0 mt-0.5" />
              <p className="text-sm text-gridwise-danger font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gridwise-text mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gridwise-text-muted" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="block w-full pl-10 pr-3 py-3 border border-gridwise-border rounded-xl bg-gridwise-bg text-gridwise-text placeholder-gridwise-text-muted focus:outline-none focus:ring-1 focus:ring-gridwise-primary focus:border-gridwise-primary/50 transition-colors sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gridwise-text mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gridwise-text-muted" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pl-10 pr-3 py-3 border border-gridwise-border rounded-xl bg-gridwise-bg text-gridwise-text placeholder-gridwise-text-muted focus:outline-none focus:ring-1 focus:ring-gridwise-primary focus:border-gridwise-primary/50 transition-colors sm:text-sm"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gridwise-text mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gridwise-text-muted" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pl-10 pr-3 py-3 border border-gridwise-border rounded-xl bg-gridwise-bg text-gridwise-text placeholder-gridwise-text-muted focus:outline-none focus:ring-1 focus:ring-gridwise-primary focus:border-gridwise-primary/50 transition-colors sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gridwise-text mb-1.5">
                EV Model (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Battery className="h-5 w-5 text-gridwise-text-muted" />
                </div>
                <input
                  type="text"
                  value={formData.evModel}
                  onChange={(e) => setFormData({...formData, evModel: e.target.value})}
                  className="block w-full pl-10 pr-3 py-3 border border-gridwise-border rounded-xl bg-gridwise-bg text-gridwise-text placeholder-gridwise-text-muted focus:outline-none focus:ring-1 focus:ring-gridwise-primary focus:border-gridwise-primary/50 transition-colors sm:text-sm"
                  placeholder="e.g. Tesla Model 3"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gridwise-primary hover:bg-gridwise-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gridwise-primary disabled:opacity-50 transition-all"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative flex justify-center text-sm">
              <span className="text-gridwise-text-muted font-medium">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-gridwise-primary hover:text-gridwise-primary-hover">
                  Sign in instead
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
