"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function JoinRequestsPanel() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/driver/requests");
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

  const handleAction = async (requestId, action) => {
    const res = await fetch(`/api/ride/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId }),
    });

    const data = await res.json();
    if (res.ok) {
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Pending Join Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="border p-4 rounded shadow-sm">
              <p>
                <strong>Ride:</strong> {req.ride.origin} →{" "}
                {req.ride.destination}
              </p>
              <p>
                <strong>Passenger:</strong> {req.user.name} ({req.user.email})
              </p>
              <p>
                <strong>Requested at:</strong>{" "}
                {new Date(req.createdAt).toLocaleString()}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleAction(req.id, "approve")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(req.id, "reject")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
