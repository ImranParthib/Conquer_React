import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import OwnerDashboard from './components/owner/OwnerDashboard';
import TenantDashboard from './components/tenant/TenantDashboard';
import DashboardSkeleton from './components/DashboardSkeleton';

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {profile.role === 'owner' ? <OwnerDashboard /> : <TenantDashboard />}
    </div>
  );
}