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
    // async function fetchJoinedRides() {
    //   try {
    //     const res = await fetch('/api/user/rides');
    //     const data = await res.json();

    //     if (!res.ok) throw new Error(data.error || 'Failed to fetch rides');
    //     setRides(data.joinedRides || []);
    //   } catch (err) {
    //     setError(err.message);
    //   }
    // }

    // fetchJoinedRides();

    setRides(r);
  }, []);

  return (
    <main className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">My Confirmed Rides</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {rides.length === 0 ? (
        <p>No confirmed rides yet.</p>
      ) : (
        <div className="space-y-4">
          {rides.map(({ ride }) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </main>
  );
}
