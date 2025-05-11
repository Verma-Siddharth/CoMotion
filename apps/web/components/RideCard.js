'use client';

import JoinButton from './JoinButton';

export default function RideCard({ ride, showJoin = false }) {
  return (
  <div className="rounded-lg border border-blue-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
    {/* Route */}
    <h2 className="text-2xl font-semibold text-blue-700 mb-2">
      {ride.origin} → {ride.destination}
    </h2>

    {/* Ride Details */}
    <div className="space-y-1 text-gray-700 text-sm">
      <p>
        <span className="font-medium text-gray-600">Departure:</span>{' '}
        {new Date(ride.departure).toLocaleString()}
      </p>
      <p>
        <span className="font-medium text-gray-600">Seats Left:</span>{' '}
        {ride.seats}
      </p>
      <p>
        <span className="font-medium text-gray-600">Cost:</span>{' '}
        <span className="text-blue-600 font-semibold">₹{ride.cost}</span>
      </p>
    </div>

    {/* Join Button */}
    {showJoin && (
      <div className="mt-4">
        <JoinButton rideId={ride.id} />
      </div>
    )}
  </div>
);

}
