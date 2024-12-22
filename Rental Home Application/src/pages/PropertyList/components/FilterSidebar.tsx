import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Home, Tag, Wifi, Fan, Tv } from 'lucide-react';
import { PROPERTY_TYPES, ROOM_OPTIONS, AMENITIES } from '../constants';

interface FilterSidebarProps {
  className?: string;
}

export default function FilterSidebar({ className }: FilterSidebarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = React.useState({
    min: searchParams.get('minPrice') || '',
    max: searchParams.get('maxPrice') || ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    setPriceRange(prev => ({ ...prev, [type]: value }));
    if (value) {
      handleFilterChange(`${type}Price`, value);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = searchParams.get('amenities')?.split(',') || [];
    let newAmenities: string[];
    
    if (currentAmenities.includes(amenity)) {
      newAmenities = currentAmenities.filter(a => a !== amenity);
    } else {
      newAmenities = [...currentAmenities, amenity];
    }

    if (newAmenities.length > 0) {
      handleFilterChange('amenities', newAmenities.join(','));
    } else {
      const params = new URLSearchParams(searchParams);
      params.delete('amenities');
      setSearchParams(params);
    }
  };

  return (
    <div className={`${className} space-y-6`}>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
        
        <div className="space-y-6">
          {/* Property Type */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Property Type
            </h4>
            <div className="space-y-2">
              {PROPERTY_TYPES.map(type => (
                <label key={type.value} className="flex items-center">
                  <input
                    type="radio"
                    name="propertyType"
                    value={type.value}
                    checked={searchParams.get('type') === type.value}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-600">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Price Range
            </h4>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Min Price"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Room Count */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Room Count</h4>
            <select
              value={searchParams.get('rooms') || ''}
              onChange={(e) => handleFilterChange('rooms', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Any</option>
              {ROOM_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Amenities</h4>
            <div className="space-y-2">
              {AMENITIES.map(amenity => (
                <label key={amenity.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={searchParams.get('amenities')?.split(',').includes(amenity.value)}
                    onChange={() => handleAmenityToggle(amenity.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-600">{amenity.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}