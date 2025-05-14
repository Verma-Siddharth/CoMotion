'use client';

import useLiveRideLocation from './hooks/useLiveRideLocation';
import JoinButton from './JoinButton';
import LiveMap from './LiveMap';

export default function RideCard({ ride, showJoin = false }) {

  const location = useLiveRideLocation(ride.id);

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
      <p>
        {location ? (
          <span className="text-green-600 font-medium">
            🛰️ Live Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </span>
        ) : (
          <span className="text-gray-500 italic">Awaiting driver location...</span>
        )}
      </p>
    </div>

    {/* Live Map */}
    <div className="rounded-xl overflow-hidden border border-blue-100 shadow-sm">
      <LiveMap lat={location?.lat} lng={location?.lng} />
    </div>

    {/* Join Button */}
    {showJoin && (
      <div className="pt-4 border-t flex justify-end">
        <JoinButton rideId={ride.id} />
      </div>
    )}
  </div>
);



}
