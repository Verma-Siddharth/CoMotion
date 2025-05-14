"use client";

import { useState } from "react";
import useLiveRideLocation from "./hooks/useLiveRideLocation";
import JoinButton from "./JoinButton";
import LiveMap from "./LiveMap";
import axios from "axios";

export default function RideCard({ ride, showJoin = false, status = false }) {
  const location = useLiveRideLocation(ride.id);
  console.log(location);

  const [currentStatus, setCurrentStatus] = useState("");

  const handleJoin = async () => {
    setCurrentStatus("Joining...");
    const res = await axios.post("/api/ride/join", { rideId: ride.id });
    console.log("Join Ride Response:", res);
    if (res.status === 200) {
      setCurrentStatus("Request Sent!");
    } else {
      setCurrentStatus(res.data.error || "Error");
    }
  };

  return (
    <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 space-y-6 backdrop-blur-sm">
      {/* Header: Route */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-extrabold text-blue-700 flex items-center gap-2">
          📍 {ride.origin}
          <span className="text-gray-400 text-xl">→</span>
          {ride.destination}
        </h2>
      </div>

      {/* Ride Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px] text-gray-700 leading-relaxed">
        <p>
          <span className="font-semibold text-blue-600">🕓 Departure:</span>{" "}
          {new Date(ride.departure).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold text-blue-600">🪑 Seats Left:</span>{" "}
          {ride.seats}
        </p>
        <p>
          <span className="font-semibold text-blue-600">💰 Cost:</span>{" "}
          <span className="text-blue-700 font-semibold">₹{ride.cost}</span>
        </p>
        {/* <p>
          {location ? (
            <span className="text-green-600 font-medium">
              🛰️ Live Location: {location.lat.toFixed(4)},{" "}
              {location.lng.toFixed(4)}
            </span>
          ) : (
            <span className="text-gray-500 italic">
              Awaiting driver location...
            </span>
          )}
        </p> */}
      </div>

      {/* Live Map */}
      {status !== "rejected" && (
        <div className="rounded-xl overflow-hidden border border-blue-100 shadow-sm">
          <LiveMap lat={location?.lat} lng={location?.lng} />
        </div>
      )}

      {status && (
        <div className="pt-4 border-t flex justify-end items-center space-x-5">
          <span className="font-semibold text-blue-600">Status: </span>{" "}
          {status === "approved" ? (
            <span className="text-green-700 bg-green-200 rounded-lg p-3 border border-green-600 font-semibold">
              Approved
            </span>
          ) : status === "rejected" ? (
            <span className="text-red-700 bg-red-200 rounded-lg p-3 border border-red-600 font-semibold">
              Rejected
            </span>
          ) : (
            <span className="text-yellow-700 bg-yellow-200 rounded-lg p-3 border border-yellow-600 font-semibold">
              Pending
            </span>
          )}
        </div>
      )}
      {currentStatus === "Request Sent!" && (
        <div className="pt-4 border-t flex justify-end items-center space-x-5">
          <span className="font-semibold text-blue-600">Status: </span>{" "}
          <span className="text-yellow-700 bg-yellow-200 rounded-lg p-3 border border-yellow-600 font-semibold">
            Pending
          </span>
        </div>
      )}
      {/* Join Button */}
      {showJoin && (
        <div className="pt-4 border-t flex justify-end">
          <button
            onClick={handleJoin}
            className={`w-full sm:w-auto px-5 py-2 rounded-md text-white font-medium transition-colors duration-200
      ${
        currentStatus === "Joining..." || currentStatus === "Request Sent!"
          ? "bg-blue-300 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
      }
    `}
            disabled={
              currentStatus === "Joining..." ||
              currentStatus === "Request Sent!"
            }
          >
            {currentStatus || "Join Ride"}
          </button>
        </div>
      )}
    </div>
  );
}
