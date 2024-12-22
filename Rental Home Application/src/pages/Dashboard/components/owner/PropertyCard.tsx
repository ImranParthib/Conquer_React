import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Eye } from 'lucide-react';
import type { Property } from '../../../../types';
import { formatPropertyType } from '../../utils/formatters';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const primaryImage = property.property_images?.[0]?.image_url;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48">
        <img
          src={primaryImage || 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80'}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm">
          {formatPropertyType(property.property_type)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
        <p className="text-gray-600">{property.area}, {property.city}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-semibold text-indigo-600">৳{property.price}</p>
          <div className="flex items-center gap-2">
            <Link
              to={`/properties/${property.id}`}
              className="p-2 text-gray-600 hover:text-indigo-600"
            >
              <Eye className="h-5 w-5" />
            </Link>
            <Link
              to={`/properties/${property.id}/edit`}
              className="p-2 text-gray-600 hover:text-indigo-600"
            >
              <Pencil className="h-5 w-5" />
            </Link>
            <button
              onClick={() => {/* TODO: Implement delete */}}
              className="p-2 text-gray-600 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}