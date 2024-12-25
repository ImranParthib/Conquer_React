import React from 'react';
import { Users, Home, DollarSign, Activity } from 'lucide-react';
import { useAdminStats } from '../hooks/useAdminStats';

const STAT_CARDS = [
  {
    title: 'Total Users',
    icon: Users,
    color: 'bg-blue-500',
    valueKey: 'totalUsers'
  },
  {
    title: 'Total Properties',
    icon: Home,
    color: 'bg-green-500',
    valueKey: 'totalProperties'
  },
  {
    title: 'Total Revenue',
    icon: DollarSign,
    color: 'bg-purple-500',
    valueKey: 'totalRevenue',
    format: (value: number) => `৳${value.toLocaleString()}`
  },
  {
    title: 'Active Rentals',
    icon: Activity,
    color: 'bg-orange-500',
    valueKey: 'activeRentals'
  }
];

export default function AdminStats() {
  const { stats, loading, error } = useAdminStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAT_CARDS.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-600">Error loading admin statistics</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {STAT_CARDS.map((card) => {
        const StatIcon = card.icon;
        const value = stats[card.valueKey];
        const displayValue = card.format ? card.format(value) : value;

        return (
          <div key={card.title} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className={`${card.color} p-3 rounded-lg`}>
                <StatIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{displayValue}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 