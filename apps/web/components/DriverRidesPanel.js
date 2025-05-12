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
          setRides(response.data.rides);
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
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Your Rides</h2>
      {rides.length === 0 ? (
        <p>No rides posted yet.</p>
      ) : (
        rides.map((ride) => (
          <div key={ride.id} className="border p-4 rounded">
            <h3 className="text-lg font-bold">
              {ride.origin} → {ride.destination}
            </h3>
            <p>
              <strong>Departure:</strong>{" "}
              {new Date(ride.departure).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {ride.status}
            </p>
            <div className="mt-2 space-x-2">
              {ride.status === "SCHEDULED" && (
                <button
                  onClick={() => handleUpdate(ride.id, "cancel")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Cancel Ride
                </button>
              )}
              {ride.status === "ACTIVE" && (
                <button
                  onClick={() => handleUpdate(ride.id, "end")}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  End Ride
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
