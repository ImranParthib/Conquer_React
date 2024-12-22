import React from 'react';
import { Heart } from 'lucide-react';
import { useSavedProperties } from '../../hooks/useSavedProperties';
import PropertyCard from '../../../PropertyList/components/PropertyCard';

export default function SavedProperties() {
  const { properties, loading, error } = useSavedProperties();

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error loading saved properties</div>;
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No saved properties</h3>
        <p className="text-gray-600">
          Properties you save will appear here
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Saved Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}