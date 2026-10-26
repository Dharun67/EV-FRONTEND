import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApi, setAuthToken } from '../utils/api';
import { authApi } from '../services/authApi';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  status: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  token: string | null;
  login: (e: string, p: string) => Promise<any>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('gridwise_token'));
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (tokenStr: string) => {
    try {
      setAuthToken(tokenStr);
      const res = await authApi.getMe();
      setUser(res?.user || res?.data || res);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('gridwise_token');
      setAuthToken(null);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    const newToken = res.token || res.data?.token;
    if (!newToken) throw new Error("No token received");
    
    setToken(newToken);
    localStorage.setItem('gridwise_token', newToken);
    await fetchUserProfile(newToken);
    return res;
  };

  const refreshProfile = async () => {
    if (token) {
      await fetchUserProfile(token);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        await fetchUserProfile(token);
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const signOut = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gridwise_token');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, login, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
