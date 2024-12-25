import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AdminStats from './components/AdminStats';
import UserManagement from './components/UserManagement';
import PropertyManagement from './components/PropertyManagement';
import PaymentOverview from './components/PaymentOverview';

export default function AdminDashboard() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      navigate('/');
    }
  }, [user, profile, loading, navigate]);

  if (loading || !user || profile?.role !== 'admin') {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <AdminStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UserManagement />
        <PaymentOverview />
      </div>
      <PropertyManagement />
    </div>
  );
} 