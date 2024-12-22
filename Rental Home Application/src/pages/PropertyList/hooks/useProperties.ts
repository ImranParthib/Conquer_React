import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import type { Property } from '../../../types';

export function useProperties(searchParams: URLSearchParams) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        let query = supabase
          .from('properties')
          .select(`
            *,
            property_images!inner(image_url),
            property_amenities!inner(
              amenities(name, icon)
            )
          `)
          .eq('is_available', true);

        // Apply filters
        const type = searchParams.get('type');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const rooms = searchParams.get('rooms');
        const amenities = searchParams.get('amenities');
        const search = searchParams.get('search');

        if (type) {
          query = query.eq('property_type', type);
        }

        if (minPrice) {
          query = query.gte('price', minPrice);
        }

        if (maxPrice) {
          query = query.lte('price', maxPrice);
        }

        if (rooms) {
          query = query.eq('room_count', rooms);
        }

        if (amenities) {
          query = query.contains('amenities', amenities.split(','));
        }

        if (search) {
          query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,area.ilike.%${search}%,city.ilike.%${search}%`);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) throw supabaseError;
        setProperties(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch properties'));
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [searchParams]);

  return { properties, loading, error };
}