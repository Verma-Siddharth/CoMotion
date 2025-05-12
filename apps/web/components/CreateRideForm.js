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
      className="max-w-xl mx-auto p-4 border rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Create a New Ride</h2>

      {status && <p className="text-sm text-blue-600">{status}</p>}

      <input
        type="text"
        name="origin"
        placeholder="Origin"
        className="w-full border px-3 py-2 rounded"
        value={form.origin}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="destination"
        placeholder="Destination"
        className="w-full border px-3 py-2 rounded"
        value={form.destination}
        onChange={handleChange}
        required
      />

      <input
        type="datetime-local"
        name="departure"
        className="w-full border px-3 py-2 rounded"
        value={form.departure}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="seats"
        min="1"
        className="w-full border px-3 py-2 rounded"
        value={form.seats}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="cost"
        placeholder="Cost in ₹"
        className="w-full border px-3 py-2 rounded"
        value={form.cost}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-red-600  px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Creating..." : "Create Ride"}
      </button>
    </form>
  );
}
