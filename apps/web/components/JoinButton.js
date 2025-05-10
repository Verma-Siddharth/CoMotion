'use client';

import { useState } from 'react';

export default function JoinButton({ rideId }) {
  const [status, setStatus] = useState('');

  const handleJoin = async () => {
    setStatus('Joining...');
    const res = await fetch('/api/ride/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rideId }),
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error || 'Error');
    } else {
      setStatus('Request Sent!');
    }
  };

  return (
    <button
      onClick={handleJoin}
      className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      disabled={status === 'Joining...' || status === 'Request Sent!'}
    >
      {status || 'Join Ride'}
    </button>
  );
}
