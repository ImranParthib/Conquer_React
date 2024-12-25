import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'tenant' | 'owner' | 'admin';
  full_name: string;
  phone_number: string;
  created_at: string;
  is_verified: boolean;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchUsers() {
    try {
      setLoading(true);
      const { data, error: supabaseError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;
      setUsers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch users'));
    } finally {
      setLoading(false);
    }
  }

  async function updateUserRole(userId: string, role: User['role']) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);

      if (error) throw error;
      await fetchUsers(); // Refresh the list
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update user role');
    }
  }

  async function toggleUserVerification(userId: string, isVerified: boolean) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_verified: isVerified })
        .eq('id', userId);

      if (error) throw error;
      await fetchUsers(); // Refresh the list
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update user verification');
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, updateUserRole, toggleUserVerification };
} 