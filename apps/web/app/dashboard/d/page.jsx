'use client';

import { useEffect, useState } from 'react';
import CreateRideForm from "../../../components/CreateRideForm";
import useDriverSocket from "../../../components/hooks/useDriverSocket";
import axios from 'axios';
import DriverRidesPanel from '../../../components/DriverRidesPanel';
import JoinRequestsPanel from '../../../components/JoinRequestPanel';

export default function DriverDashboardPage() {
  const [driverId, setDriverId] = useState(null);
  const [rideId, setRideId] = useState(null); 

  useEffect(() => {
    async function fetchMe() {
      const res = await axios.get('/api/auth/me');
      console.log('Driver Info:', res.data);
      if (res.status === 200) {
        const { id } = res.data;
        setDriverId(id);
        const rideRes = await axios.get('/api/driver/active-ride');
        console.log('Active Ride:', rideRes.data);
        if (rideRes.status === 200) {
          const { ride } = rideRes.data;
          if (ride) {
            setRideId(ride.id);
          }
        } else {
          console.error('Failed to fetch active ride');
        }
      } else {
        console.error('Failed to fetch driver info');
      }
    }

    fetchMe();
  }, []);

  useDriverSocket(driverId, rideId);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Driver Dashboard</h1>

      {rideId ? (
        <p className="text-green-600">Live ride active. Location is broadcasting.</p>
      ) : (
        <p className="text-gray-500">No active ride. Create one below.</p>
      )}

      <CreateRideForm onRideCreated={(ride) => setRideId(ride.id)} />

      <DriverRidesPanel />

      <JoinRequestsPanel />
    </main>
  );
}
