import React from 'react';
import Hero from './components/Hero';
import FeaturedProperties from './components/FeaturedProperties';
import HowItWorks from './components/HowItWorks';

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <FeaturedProperties />
      <HowItWorks />
    </div>
  );
}