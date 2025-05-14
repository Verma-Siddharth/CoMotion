'use client';

import { useEffect, useState } from 'react';
import CreateRideForm from "../../../components/CreateRideForm";
import useDriverSocket from "../../../components/hooks/useDriverSocket";
import axios from 'axios';
import DriverRidesPanel from '../../../components/DriverRidesPanel';
import JoinRequestsPanel from '../../../components/JoinRequestsPanel';

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
  <main className="px-6 py-10 max-w-7xl mx-auto space-y-12">
    {/* Heading */}
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold text-blue-800 tracking-tight"> Driver Dashboard</h1>
      {rideId ? (
        <p className="text-green-600 text-sm">Live ride active. Location is broadcasting.</p>
      ) : (
        <p className="text-gray-500 text-sm">No active ride. You can create one below.</p>
      )}
    </div>

    {/* Create Ride Form */}
    <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <CreateRideForm onRideCreated={(ride) => setRideId(ride.id)} />
    </section>

    {/* Divider */}
    <hr className="border-t border-gray-200" />

    {/* Driver Rides Panel */}
    <section>
      <DriverRidesPanel />
    </section>
  </main>
);

}
