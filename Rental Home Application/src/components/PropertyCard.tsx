import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Tag } from 'lucide-react';
import type { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const primaryImage = property.property_images?.[0]?.image_url;

  return (
    <Link to={`/properties/${property.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1">
        <div className="relative h-48">
          <img
            src={primaryImage || 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm">
            {property.property_type.replace('_', ' ')}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
            {property.title}
          </h3>
          <p className="mt-1 text-gray-500">{property.area}, {property.city}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.room_count}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathroom_count}</span>
              </div>
            </div>
            <div className="flex items-center text-indigo-600">
              <Tag className="h-4 w-4 mr-1" />
              <span className="font-semibold">৳{property.price}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}