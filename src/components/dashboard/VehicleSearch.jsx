import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function VehicleSearch() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const q = query(
        collection(db, 'vehicles'),
        where('vehicleNumber', '==', vehicleNumber.toUpperCase())
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setSearchResults(querySnapshot.docs[0].data());
      } else {
        setSearchResults(null);
      }
    } catch (error) {
      console.error('Error searching vehicle:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </form>

      {searchResults && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Vehicle Details</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Vehicle Number:</span> {searchResults.vehicleNumber}</p>
            <p><span className="font-medium">Owner Name:</span> {searchResults.ownerName}</p>
            <p><span className="font-medium">Registration Date:</span> {searchResults.registrationDate}</p>
          </div>
        </div>
      )}
    </div>
  );
}