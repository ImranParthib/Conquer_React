import React from 'react';
import { Home, Eye, DollarSign } from 'lucide-react';
import type { Property } from '../../../../types';

interface PropertyStatsProps {
  properties: Property[];
}

export default function PropertyStats({ properties }: PropertyStatsProps) {
  const stats = React.useMemo(() => [
    {
      label: 'Total Properties',
      value: properties.length,
      icon: Home,
      color: 'bg-blue-500',
    },
    {
      label: 'Available',
      value: properties.filter(p => p.is_available).length,
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      label: 'Total Revenue',
      value: `৳${properties.reduce((sum, p) => sum + Number(p.price), 0)}`,
      icon: DollarSign,
      color: 'bg-purple-500',
    },
  ], [properties]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg shadow-sm p-6 flex items-center"
        >
          <div className={`${stat.color} p-3 rounded-lg`}>
            <stat.icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}