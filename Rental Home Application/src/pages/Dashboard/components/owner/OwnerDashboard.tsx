import React from 'react';
import PropertyList from './PropertyList';
import PropertyStats from './PropertyStats';
import { useOwnerProperties } from '../../hooks/useOwnerProperties';

export default function OwnerDashboard() {
  const { properties, loading, error } = useOwnerProperties();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
      <PropertyStats properties={properties} />
      <PropertyList properties={properties} loading={loading} error={error} />
    </div>
  );
}