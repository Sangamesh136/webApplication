import React from 'react';
import { Bell, AlertCircle } from 'lucide-react';
import { useViolations } from '../../hooks/useViolations';
import ViolationCard from './ViolationCard';

export default function NotificationList() {
  const { violations, loading, error } = useViolations();

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Speed Violations</h2>
        </div>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Speed Violations</h2>
      </div>

      {violations.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No speed violations found for your vehicle.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {violations.map((violation) => (
            <ViolationCard key={violation.id} violation={violation} />
          ))}
        </div>
      )}
    </div>
  );
}