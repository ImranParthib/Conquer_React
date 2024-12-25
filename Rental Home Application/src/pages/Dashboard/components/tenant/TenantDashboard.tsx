import React from 'react';
import SavedProperties from './SavedProperties';
import PropertySearch from './PropertySearch';
import PaymentHistory from '../PaymentHistory';

export default function TenantDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
      <PropertySearch />
      <PaymentHistory />
      <SavedProperties />
    </div>
  );
}