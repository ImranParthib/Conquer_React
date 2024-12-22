import React from 'react';
import { useParams } from 'react-router-dom';
import PropertyInfo from './components/PropertyInfo';
import ImageGallery from './components/ImageGallery';
import ContactSection from './components/ContactSection';
import { useProperty } from './hooks/useProperty';

export default function PropertyDetail() {
  const { id } = useParams();
  const { property, loading, error } = useProperty(id);

  if (loading) {
    return <PropertyDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-red-600">Error loading property details. Please try again later.</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Property not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ImageGallery images={property.property_images || []} />
          <PropertyInfo property={property} />
        </div>
        <div className="lg:col-span-1">
          <ContactSection property={property} />
        </div>
      </div>
    </div>
  );
}

function PropertyDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
        </div>
      </div>
    </div>
  );
}