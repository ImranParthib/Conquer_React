import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import type { Property } from '../../../types';

export function useOwnerProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error: supabaseError } = await supabase
          .from('properties')
          .select(`
            *,
            property_images(image_url),
            property_amenities!inner(
              amenities(name, icon)
            )
          `)
          .eq('owner_id', user.id);

        if (supabaseError) throw supabaseError;
        setProperties(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch properties'));
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  return { properties, loading, error };
}