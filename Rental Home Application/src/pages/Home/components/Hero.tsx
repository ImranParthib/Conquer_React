import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="relative">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80)',
          filter: 'brightness(0.7)'
        }}
      />
      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find Your Perfect Home in Bangladesh
          </h1>
          <p className="mt-6 text-xl text-gray-100">
            Discover rental properties for families, bachelors, and students across Bangladesh
          </p>
          <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
            <div className="flex">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, property type..."
                  className="block w-full rounded-l-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-r-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}