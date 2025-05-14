'use client';

import { useEffect, useState } from 'react';
import RideCard from '../../../../components/RideCard';
// import RideCard from '@/components/RideCard';

export default function MyRidesPage() {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState('');

  const r = [
    {
      ride: {
        id: 1,
        origin: 'City A',
        destination: 'City B',
        departure: '2023-10-01T10:00:00Z',
        seats: 2,
        cost: 500,
      },
    },
    {
      ride: {
        id: 2,
        origin: 'City C',
        destination: 'City D',
        departure: '2023-10-02T12:00:00Z',
        seats: 1,
        cost: 300,
      },
    },
  ];

  
  useEffect(() => {
    async function fetchJoinedRides() {
      try {
        const res = await fetch('/api/user/rides');
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch rides');
        setRides(data.joinedRides || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchJoinedRides();

    
  }, []);

  return (
  <main className="max-w-4xl mx-auto mt-12 px-4">
    {/* Page Heading */}
    <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
      ✅ My Confirmed Rides
    </h1>

    {/* Error Message */}
    {error && (
      <p className="text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded mb-4 text-center">
        {error}
      </p>
    )}

    {/* Ride List */}
    {rides.length === 0 ? (
      <p className="text-center text-gray-500 italic">No confirmed rides yet.</p>
    ) : (
      <div className="space-y-6">
        {rides.map(({ ride }) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </div>
    )}
  </main>
);

}
