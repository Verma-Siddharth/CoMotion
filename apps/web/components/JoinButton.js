'use client';

import axios from 'axios';
import { useState } from 'react';

export default function JoinButton({ rideId }) {
  const [status, setStatus] = useState('');

  const handleJoin = async () => {
    setStatus('Joining...');
    const res = await axios.post('/api/ride/join', { rideId });
    console.log('Join Ride Response:', res);
    if (res.status === 200) {
      setStatus('Request Sent!');
    } else {
      const data = await res.json();
      setStatus(data.error || 'Error');
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
