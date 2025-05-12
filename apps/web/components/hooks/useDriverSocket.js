'use client';

import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

// 🔁 Emits live driver location every time position changes
export default function useDriverSocket(driverId, rideId) {
  const socketRef = useRef(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (!driverId || !rideId) return;

    const socket = io('http://localhost:4000'); // match your socket-server port
    socketRef.current = socket;

    // Start watching the driver's GPS location
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log('Driver location:', { latitude, longitude });
        socket.emit('driver:location', {
          driverId,
          rideId,
          lat: latitude,
          lng: longitude,
        });
      },
      (err) => {
        console.error('Geolocation error:', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );

    return () => {
      // Cleanup when component unmounts
      navigator.geolocation.clearWatch(watchIdRef.current);
      socket.disconnect();
    };
  }, [driverId, rideId]);
}
