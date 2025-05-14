"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function JoinRequestsPanel() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/driver/requests");
        console.log("Join Requests:", response.data.requests);
        if (response.status === 200) {
          setRequests(response.data.requests || []);
        } else {
          console.error("Error fetching requests: ", error);
        }
      } catch (error) {
        console.error("Error fetching requests: ", error);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (joinRequestId, action) => {
    const res = await axios.post(`/api/ride/${action}`, { joinRequestId });
    if (res.status === 200) {
      setRequests((prev) => prev.filter((r) => r.id !== joinRequestId));
    } else {
      alert(res.data.error);
    }
  };

  return (
  <div className="mt-7 px-6 lg:px-12">
    {/* Section Heading */}
    <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-16 tracking-tight">
      Pending Join Requests
    </h2>

    {requests.length === 0 ? (
      <p className="text-center text-lg text-gray-500 italic">No pending requests at the moment.</p>
    ) : (
      <div className="grid gap-10 lg:grid-cols-2">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-gradient-to-br from-white via-blue-20 to-blue-50 border border-blue-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-[1.01]"
          >
            {/* Floating Tag */}
            <div className="inline-block mb-4 text-xs font-medium uppercase tracking-wide bg-blue-600 text-white px-3 py-1 rounded-full shadow-sm">
              Ride Request
            </div>

            {/* Route */}
            <h3 className="text-3xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              {req.ride.origin}
              <span className="text-gray-400 text-2xl">→</span>
              {req.ride.destination}
            </h3>

            {/* Passenger Info */}
            <div className="text-gray-700 text-lg space-y-2 mb-6">
              <p>
                👤 <span className="font-semibold">Passenger:</span>{" "}
                <span className="text-gray-900">{req.user.name}</span>{" "}
                <span className="text-gray-500">({req.user.email})</span>
              </p>
              <p>
                🕒 <span className="font-semibold">Requested at:</span>{" "}
                {new Date(req.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleAction(req.id, "approve")}
                className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              >
                ✅ Approve
              </button>
              <button
                onClick={() => handleAction(req.id, "reject")}
                className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              >
                ❌ Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);



}
