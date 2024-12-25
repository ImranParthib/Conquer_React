import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalRevenue: number;
  activeRentals: number;
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProperties: 0,
    totalRevenue: 0,
    activeRentals: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: usersCount },
          { count: propertiesCount },
          { data: payments },
          { count: activeRentalsCount }
        ] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact' }),
          supabase.from('properties').select('*', { count: 'exact' }),
          supabase.from('payments').select('amount').eq('status', 'paid'),
          supabase.from('properties').select('*', { count: 'exact' }).eq('is_available', false)
        ]);

        const totalRevenue = payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

        setStats({
          totalUsers: usersCount || 0,
          totalProperties: propertiesCount || 0,
          totalRevenue,
          activeRentals: activeRentalsCount || 0
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch admin stats'));
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading, error };
} 