'use client';

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css';



export default function LiveMap({ lat, lng }) {
  if (!lat || !lng) return <p className="text-gray-500">Waiting for driver location...</p>;

  return (
    <div className="h-60 w-full rounded overflow-hidden border mt-4">
      <MapContainer center={[lat, lng]} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={new Icon({iconUrl: "leaflet/dist/images/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41]})}>
          <Popup>Driver's current location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
