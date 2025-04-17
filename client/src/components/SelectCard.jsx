import React from 'react';

export default function SelectCard({ label, children }) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}
