import React from 'react';
import PropertyCard from '../../../components/PropertyCard';
import type { Property } from '../../../types';

interface PropertyGridProps {
  properties: Property[];
  loading: boolean;
  error: Error | null;
  className?: string;
}

export default function PropertyGrid({ properties, loading, error, className }: PropertyGridProps) {
  if (loading) {
    return (
      <div className={className}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-t-lg"></div>
              <div className="bg-white p-4 rounded-b-lg space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} text-center py-12`}>
        <p className="text-red-600">Error loading properties. Please try again later.</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className={`${className} text-center py-12`}>
        <p className="text-gray-500">No properties found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}