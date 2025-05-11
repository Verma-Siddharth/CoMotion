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
    className={`w-full sm:w-auto px-5 py-2 rounded-md text-white font-medium transition-colors duration-200
      ${status === 'Joining...' || status === 'Request Sent!'
        ? 'bg-blue-300 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}
    `}
    disabled={status === 'Joining...' || status === 'Request Sent!'}
  >
    {status || 'Join Ride'}
  </button>
);

}
