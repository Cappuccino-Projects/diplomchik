import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useSelector } from 'react-redux'

const InteractiveMap = () => {
  const position = [55.751244, 37.618423] // Moscow's coordinates [lat, lng]
  const places = useSelector((state) => state.places) || [] // Access places from the store and default to an empty array if it's not an array

  return (
    <MapContainer center={position} zoom={5} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {Array.isArray(places.places) && places.places.map((place, index) => (
        <Marker key={index} position={[place.latitude, place.longitude]}>
          <Popup>
            {place.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default InteractiveMap