"use client";

import { useEffect, useState } from "react";
import RideCard from "../../../components/RideCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import useApprovalNotifications from "../../../components/hooks/useApprovalNotifications";
import useRejectionNotifications from "../../../components/hooks/useRejectionNotification";
import UserRideSearchForm from "../../../components/UserRideSearchForm";

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

  useRejectionNotifications(userId, (rideId) => {
    setMessage(`Your request for Ride ${rideId} was rejected.`);
    setTimeout(() => setMessage(""), 5000);
  });

  return (
    <main className="max-w-4xl mx-auto mt-12 px-4">
      {/* Success Message */}
      {message && (
        <p className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 text-center shadow-sm">
          {message}
        </p>
      )}

<div className="p-4">
<UserRideSearchForm />
</div>
      
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        All Available Rides
      </h1>

      {/* Error Message */}
      {error && (
        <p className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-center shadow-sm">
          {error}
        </p>
      )}

      {/* Ride List */}
      {rides.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No rides available right now.
        </p>
      ) : (
        <div className="space-y-6">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} showJoin />
          ))}
        </div>
      )}
    </main>
  );
}
