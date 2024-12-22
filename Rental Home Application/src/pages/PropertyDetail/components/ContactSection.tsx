import React from 'react';
import { Phone, Mail, Tag } from 'lucide-react';
import type { Property } from '../../../types';
import { useAuth } from '../../../hooks/useAuth';

interface ContactSectionProps {
  property: Property;
}

export default function ContactSection({ property }: ContactSectionProps) {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">৳{property.price}</h2>
        <span className="text-gray-500">per month</span>
      </div>

      {user ? (
        <div className="space-y-4">
          <a
            href={`tel:${property.contact_phone}`}
            className="flex items-center gap-2 w-full justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Phone className="h-5 w-5" />
            Call Owner
          </a>
          <a
            href={`mailto:${property.contact_email}`}
            className="flex items-center gap-2 w-full justify-center border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <Mail className="h-5 w-5" />
            Email Owner
          </a>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to contact the owner</p>
          <a
            href="/login"
            className="inline-block w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Log In
          </a>
        </div>
      )}
    </div>
  );
}