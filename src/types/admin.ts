export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'CPO Manager' | 'Fleet Manager' | 'Driver' | 'Planner' | 'Support';
  organization: string;
  status: 'Active' | 'Suspended' | 'Pending';
  joinedDate: string;
  lastActive: string;
}

export interface AdminSystemHealth {
  frontend: string;
  api: string;
  database: string;
  aiEngine: string;
  payment: string;
  overallScore: number;
}
