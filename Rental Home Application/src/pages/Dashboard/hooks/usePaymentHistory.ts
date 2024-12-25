import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/useAuth';

interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  created_at: string;
  sslcommerz_transaction_id: string | null;
  property: {
    id: string;
    title: string;
    area: string;
    city: string;
  };
}

export function usePaymentHistory() {
  const { user, profile } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPayments() {
      try {
        if (!user) throw new Error('Not authenticated');

        let query = supabase
          .from('payments')
          .select(`
            *,
            property:properties(
              id,
              title,
              area,
              city
            )
          `);

        // Filter based on user role
        if (profile?.role === 'tenant') {
          query = query.eq('tenant_id', user.id);
        } else if (profile?.role === 'owner') {
          query = query.eq('property.owner_id', user.id);
        }

        const { data, error: supabaseError } = await query
          .order('created_at', { ascending: false });

        if (supabaseError) throw supabaseError;
        setPayments(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch payment history'));
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, [user, profile]);

  return { payments, loading, error };
} 