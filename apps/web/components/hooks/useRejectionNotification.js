'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function useRejectionNotifications(userId, onRejected) {
  useEffect(() => {
    if (!userId) return;

    const socket = io('http://localhost:4000');

    socket.on(`join-rejected:${userId}`, ({ rideId }) => {
      onRejected(rideId);
    });

    return () => socket.disconnect();
  }, [userId, onRejected]);
}
