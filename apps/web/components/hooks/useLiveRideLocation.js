'use client';

import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useLiveRideLocation(rideId) {
  const [location, setLocation] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!rideId) return;

    const socket = io('http://localhost:4000'); // match your socket-server

    socket.on(`ride-location:${rideId}`, (data) => {
      setLocation(data); // { lat, lng }
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [rideId]);

  return location; // returns { lat, lng } or null
}
