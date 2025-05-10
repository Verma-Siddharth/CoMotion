'use client';

import JoinButton from './JoinButton';

export default function RideCard({ ride, showJoin = false }) {
  return (
    <div className="border p-4 rounded shadow flex flex-col gap-2">
      <h2 className="text-xl font-semibold">{ride.origin} → {ride.destination}</h2>
      <p><strong>Departure:</strong> {new Date(ride.departure).toLocaleString()}</p>
      <p><strong>Seats Left:</strong> {ride.seats}</p>
      <p><strong>Cost:</strong> ₹{ride.cost}</p>
      {showJoin && <JoinButton rideId={ride.id} />}
    </div>
  );
}
