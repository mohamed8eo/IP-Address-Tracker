// components/LeafletMap.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's missing marker icons in many bundlers (like Vite or CRA)
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// 🔁 Helper component to update map center dynamically
const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const LeafletMap = ({ center = [34.505, -0.03] }) => {
  return (
    <MapContainer center={center} zoom={13}  className='h-[100vh] w-full'>
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
      <ChangeMapCenter center={center} />

      <Marker position={center}>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
