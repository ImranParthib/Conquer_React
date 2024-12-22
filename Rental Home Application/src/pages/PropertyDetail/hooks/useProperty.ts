import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import type { Property } from '../../../types';

export function useProperty(id: string | undefined) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchProperty() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('properties')
          .select(`
            *,
            property_images(image_url),
            property_amenities!inner(
              amenities(name, icon)
            )
          `)
          .eq('id', id)
          .single();

        if (supabaseError) throw supabaseError;
        setProperty(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch property'));
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [id]);

  return { property, loading, error };
}