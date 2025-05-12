'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function useApprovalNotifications(userId, onApproved) {
  useEffect(() => {
    if (!userId) return;

    const socket = io('http://localhost:4000');

    socket.on(`join-approved:${userId}`, ({ rideId }) => {
      onApproved(rideId);
    });

    return () => socket.disconnect();
  }, [userId, onApproved]);
}
