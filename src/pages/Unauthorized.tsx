import React from 'react';
import { Link } from 'react-router-dom';

export const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="bg-white border border-red-200 rounded-lg p-8 max-w-md text-center shadow-sm">
        <h1 className="text-3xl font-bold text-red-600 mb-3">Access Denied</h1>
        <p className="text-gray-700 mb-6">You do not have permission to view this page.</p>
        <Link
          to="/"
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};