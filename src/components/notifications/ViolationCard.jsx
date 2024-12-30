import React from 'react';
import { AlertTriangle, CreditCard } from 'lucide-react';
import { usePayment } from '../../hooks/usePayment';
import { FINE_AMOUNT } from '../../utils/payment';

export default function ViolationCard({ violation }) {
  const { handlePayment, loading, error } = usePayment();

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      })
    };
  };

  const { date, time } = formatDateTime(violation.Timestamp);

  return (
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <div>
            <h3 className="font-medium text-gray-900">Speed Violation Detected</h3>
            <p className="text-sm text-gray-600">Vehicle: {violation.NumberPlate}</p>
          </div>
        </div>
        <button
          onClick={() => handlePayment(violation.id)}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <CreditCard className="h-4 w-4" />
          Pay Fine (₹{FINE_AMOUNT})
        </button>
      </div>
      
      <div className="mt-3">
        <p className="text-gray-800">
          Speed: <span className="font-semibold">{Number(violation.Speed).toFixed(2)} km/h</span>
        </p>
        <div className="text-sm text-gray-600 mt-1">
          <p>Date: {date}</p>
          <p>Time: {time}</p>
        </div>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}