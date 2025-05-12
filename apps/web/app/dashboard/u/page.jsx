"use client";

import { useEffect, useState } from "react";
import RideCard from "../../../components/RideCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import useApprovalNotifications from "../../../components/hooks/useApprovalNotifications";

export default function UserDashboard() {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchMe() {
      const res = await axios.get("/api/auth/me");
      console.log("User Info:", res.data);
      if (res.status === 200) {
        const { id } = res.data;
        setUserId(id);
      } else {
        console.error("Failed to fetch user info");
      }
    }

    async function fetchRides() {
      try {
        const response = await axios.get("/api/rides/available");
        console.log("Available Rides:", response.data);
        if (response.status === 200) {
          setRides(response.data.rides || []);
        } else {
          console.error("Failed to fetch rides");
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchMe();
    fetchRides();
  }, []);

  useApprovalNotifications(userId, (rideId) => {
    setMessage(`Your request for Ride ${rideId} was approved!`);
    setTimeout(() => setMessage(""), 5000);
  });

  return (
    <main className="max-w-4xl mx-auto mt-10">
      {message && (
        <p className="bg-green-200 text-green-800 p-2 rounded mb-4">
          {message}
        </p>
      )}
      <h1 className="text-2xl font-bold mb-6">Available Rides</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {rides.length === 0 ? (
        <p>No rides available right now.</p>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} showJoin />
          ))}
        </div>
      )}
    </main>
  );
}
