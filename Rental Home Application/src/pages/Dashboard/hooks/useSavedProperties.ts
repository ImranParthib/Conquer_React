import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import type { Property } from '../../../types';

export function useSavedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSavedProperties() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error: supabaseError } = await supabase
          .from('saved_properties')
          .select(`
            properties (
              *,
              property_images(image_url),
              property_amenities!inner(
                amenities(name, icon)
              )
            )
          `)
          .eq('user_id', user.id);

        if (supabaseError) throw supabaseError;
        setProperties(data?.map(item => item.properties) || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch saved properties'));
      } finally {
        setLoading(false);
      }
    }

    fetchSavedProperties();
  }, []);

  return { properties, loading, error };
}