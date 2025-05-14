"use client";

import { useState } from "react";
import axios from "axios";

export default function CreateRideForm({ onRideCreated }) {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    departure: "",
    seats: 1,
    cost: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await axios.post("/api/ride/create", form);
      console.log("Create Ride Response:", response);
      if (response.status === 200) {
        setStatus("Ride created!");
        setForm({
          origin: "",
          destination: "",
          departure: "",
          seats: 1,
          cost: "",
        });
        if (onRideCreated) onRideCreated(response.data.ride);
      } else {
        setStatus("Failed to create ride");
      }
    } catch (error) {
      console.error("Error creating ride:", error);
      setStatus("Failed to create ride");
    }
    setLoading(false);
  };

  return (
  <form
    onSubmit={handleSubmit}
    className="max-w-2xl mx-auto mt-2 p-4 bg-white border border-blue-100 rounded-2xl shadow-xl space-y-5 overflow-y-auto max-h-[90vh]"
  >
    {/* Heading */}
    <div className="text-center">
      <h2 className="text-2xl font-bold text-blue-700">🚗 Create a Ride</h2>
      <p className="text-gray-500 text-sm">Enter ride details below.</p>
    </div>

    {/* Status Message */}
    {status && (
      <div className="text-sm text-blue-700 bg-blue-50 border border-blue-100 px-3 py-2 rounded text-center shadow-sm">
        {status}
      </div>
    )}

    {/* Form Inputs */}
    <div className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="origin" className="text-sm font-medium text-gray-600 mb-1">Origin</label>
        <input
          type="text"
          name="origin"
          placeholder="🛫 Where from?"
          className="rounded-lg px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 text-sm"
          value={form.origin}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="destination" className="text-sm font-medium text-gray-600 mb-1">Destination</label>
        <input
          type="text"
          name="destination"
          placeholder="🛬 Where to?"
          className="rounded-lg px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 text-sm"
          value={form.destination}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="departure" className="text-sm font-medium text-gray-600 mb-1">Departure Time</label>
        <input
          type="datetime-local"
          name="departure"
          className="rounded-lg px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 text-sm"
          value={form.departure}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="seats" className="text-sm font-medium text-gray-600 mb-1">Seats Available</label>
        <input
          type="number"
          name="seats"
          min="1"
          placeholder="🪑 Seats"
          className="rounded-lg px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 text-sm"
          value={form.seats}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="cost" className="text-sm font-medium text-gray-600 mb-1">Cost (₹)</label>
        <input
          type="number"
          name="cost"
          placeholder="💰 Cost"
          className="rounded-lg px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 text-sm"
          value={form.cost}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="pt-2">
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {loading ? "⏳ Creating..." : "🚀 Create Ride"}
      </button>
    </div>
  </form>
);



}
