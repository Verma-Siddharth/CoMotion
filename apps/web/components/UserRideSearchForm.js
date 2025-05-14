"use client";

import { useState } from "react";
import RideCard from "./RideCard";
import axios from "axios";

export default function UserRideSearchForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setRides([]);

    if (!from || !to) {
      setError("Please enter both origin and destination");
      return;
    }

    try {
      const response = await axios.get(`/api/rides/search?from=${from}&to=${to}`);
      console.log("Available Rides:", response.data);
      if (response.status === 200) {
        setRides(response.data.rides || []);
      } else {
        console.error("Failed to fetch rides");
        setError(err.message || "Search failed");
      }
    } catch (err) {
      console.error("Failed to fetch rides");
      setError(err.message || "Search failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded mt-8">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Find a Ride</h2>

        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>

      {/* Results */}
      {rides.length > 0 ? (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-700">Matching Rides</h3>
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} showJoin status />
          ))}
        </div>
      ) :
      <div className="mt-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-700">No Matching Rides Found</h3>
        </div>
      }
    </div>
  );
}
