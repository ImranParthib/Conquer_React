import React from 'react';

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <p className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
}