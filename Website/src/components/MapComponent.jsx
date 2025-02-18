import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ latitude, longitude }) => {
  const position = [latitude, longitude];

  return (
    <MapContainer className='w-full h-full rounded-2xl' center={position} zoom={16} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Your Location
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
