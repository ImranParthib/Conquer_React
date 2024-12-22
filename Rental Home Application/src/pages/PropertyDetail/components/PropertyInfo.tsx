import React from 'react';
import { Bed, Bath, MapPin } from 'lucide-react';
import type { Property } from '../../../types';
import { formatPropertyType } from '../utils/formatters';

interface PropertyInfoProps {
  property: Property;
}

export default function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div className="mt-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
        <p className="mt-2 text-gray-600 flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          {property.area}, {property.city}
        </p>
      </div>

      <div className="flex items-center gap-6 py-4 border-y">
        <div className="flex items-center gap-2">
          <Bed className="h-5 w-5 text-gray-600" />
          <span>{property.room_count} Rooms</span>
        </div>
        <div className="flex items-center gap-2">
          <Bath className="h-5 w-5 text-gray-600" />
          <span>{property.bathroom_count} Bathrooms</span>
        </div>
        <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
          {formatPropertyType(property.property_type)}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {property.property_amenities?.map(({ amenities }) => (
            <div
              key={amenities.name}
              className="flex items-center gap-2 text-gray-600"
            >
              <span className="w-5 h-5">{amenities.icon}</span>
              <span>{amenities.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}