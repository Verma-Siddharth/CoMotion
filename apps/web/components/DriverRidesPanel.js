"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function DriverRidesPanel() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get("/api/driver/rides");
        console.log("Rides:", response.data);
        if (response.status === 200) {
          setRides(
            (response.data.rides || []).filter(
              (ride) => ride.status === "ACTIVE" || ride.status === "SCHEDULED"
            )
          );
        } else {
          console.error("Failed to fetch rides");
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };

    fetchRides();
  }, []);

  const handleUpdate = async (rideId, action) => {
    try {
      const response = await axios.post(`/api/ride/${action}`, { rideId });
      console.log("Update Ride Response:", response);
      if (response.status === 200) {
        setRides((prev) =>
          prev.map((r) =>
            r.id === rideId
              ? { ...r, status: action === "end" ? "ENDED" : "CANCELLED" }
              : r
          )
        );
      } else {
        console.error("Failed to update ride");
      }
    } catch (error) {
      console.error("Error updating ride:", error);
    }
  };

  return (
  <div className="mt-16 max-w-6xl mx-auto px-6">
    {/* Section Heading */}
    <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">
      Your Rides 
    </h2>

    {/* Empty state */}
    {rides.length === 0 ? (
      <p className="text-center text-gray-500 italic text-base">
        You haven’t posted any rides yet.
      </p>
    ) : (
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200 space-y-4"
          >
            {/* Route */}
            <h3 className="text-xl font-semibold text-blue-700">
              {ride.origin} <span className="text-gray-400">→</span> {ride.destination}
            </h3>

            {/* Ride Details */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                🕓 <span className="font-medium">Departure:</span>{" "}
                {new Date(ride.departure).toLocaleString()}
              </p>
              <p>
                🚦 <span className="font-medium">Status:</span>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      ride.status === 'SCHEDULED'
                        ? 'bg-yellow-100 text-yellow-800'
                        : ride.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                >
                  {ride.status}
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex justify-end gap-3">
              {ride.status === "SCHEDULED" && (
                <button
                  onClick={() => handleUpdate(ride.id, "cancel")}
                  className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  Cancel Ride
                </button>
              )}
              {ride.status === "ACTIVE" && (
                <button
                  onClick={() => handleUpdate(ride.id, "end")}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  End Ride
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

}
