"use client";

import { useEffect, useState } from "react";
import RideCard from "../../../../components/RideCard";
import axios from "axios";

export default function MyRidesPage() {
  const [approvedRides, setApprovedRides] = useState([]);
  const [rejectedRides, setRejectedRides] = useState([]);
  const [requestedRides, setRequestedRides] = useState([]);

  requestedRides
  const [error, setError] = useState("");
  const [view, setView] = useState("requested"); // toggle state

  const r = [
    {
      ride: {
        id: 1,
        origin: "City A",
        destination: "City B",
        departure: "2023-10-01T10:00:00Z",
        seats: 2,
        cost: 500,
      },
    },
    {
      ride: {
        id: 2,
        origin: "City C",
        destination: "City D",
        departure: "2023-10-02T12:00:00Z",
        seats: 1,
        cost: 300,
      },
    },
  ];
  useEffect(() => {

    async function fetchRequestedRides() {
      try {
        const response = await axios.get("/api/user/requested-rides");
        if (response.status === 200) {
          setRequestedRides(response.data.joinedRides || []);
        } else {
          setError("Failed to fetch requested rides");
        }
      } catch (err) {
        setError(err.message);
      }
    }
    
    async function fetchApprovedRides() {
      try {
        const response = await axios.get("/api/user/approved-rides");
        if (response.status === 200) {
          setApprovedRides(response.data.joinedRides || []);
        } else {
          setError("Failed to fetch approved rides");
        }
      } catch (err) {
        setError(err.message);
      }
    }

    async function fetchRejectedRides() {
      try {
        const response = await axios.get("/api/user/rejected-rides");
        if (response.status === 200) {
          setRejectedRides(response.data.joinedRides || []);
        } else {
          setError("Failed to fetch rejected rides");
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchApprovedRides();
    fetchRejectedRides();
    fetchRequestedRides();
    // setApprovedRides(r);
    // setRejectedRides(r);
  }, []);

  const rideMap = {
    approved: approvedRides,
    rejected: rejectedRides,
    requested: requestedRides,
  };

  const displayedRides = rideMap[view] || [];
  return (
    <main className="max-w-4xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        My Rides
      </h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("requested")}
          className={`px-4 py-2 rounded font-medium ${
            view === "requested"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Requested
        </button>
        <button
          onClick={() => setView("approved")}
          className={`px-4 py-2 rounded font-medium ${
            view === "approved"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setView("rejected")}
          className={`px-4 py-2 rounded font-medium ${
            view === "rejected"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded mb-4 text-center">
          {error}
        </p>
      )}

      {/* Ride List */}
      {displayedRides.length === 0 ? (
        <p className="text-center text-gray-500 italic">No {view} rides yet.</p>
      ) : (
        <div className="space-y-6">
          {displayedRides.map(({ ride }) => (
            <RideCard key={ride.id} ride={ride} status={view} />
          ))}
        </div>
      )}
    </main>
  );
}
