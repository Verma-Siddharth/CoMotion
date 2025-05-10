'use client';

import { useEffect, useState } from 'react';
import RideCard from '@/components/RideCard';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchRides() {
      try {
        const res = await fetch('/api/rides/available');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load rides');
        setRides(data.rides || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchRides();
  }, []);

  return (
    <main className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Available Rides</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {rides.length === 0 ? (
        <p>No rides available right now.</p>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} showJoin />
          ))}
        </div>
      )}
    </main>
  );
}
