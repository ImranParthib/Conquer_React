import React from 'react';
import { Search, Home, Key } from 'lucide-react';

const steps = [
  {
    title: 'Search',
    description: 'Browse through our extensive collection of rental properties',
    icon: Search,
  },
  {
    title: 'Find',
    description: 'Discover the perfect home that matches your needs',
    icon: Home,
  },
  {
    title: 'Move In',
    description: 'Complete the booking process and move into your new home',
    icon: Key,
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-xl text-gray-500">
            Find your perfect rental home in three simple steps
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-md mb-4">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {index + 1}. {step.title}
                </h3>
                <p className="mt-2 text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}