import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyGrid from './components/PropertyGrid';
import FilterSidebar from './components/FilterSidebar';
import { useProperties } from './hooks/useProperties';

export default function PropertyList() {
  const [searchParams] = useSearchParams();
  const { properties, loading, error } = useProperties(searchParams);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Properties</h1>
        <p className="mt-2 text-gray-600">Find your perfect rental property in Bangladesh</p>
      </div>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <FilterSidebar className="lg:col-span-3" />
        <PropertyGrid 
          className="lg:col-span-9"
          properties={properties}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}