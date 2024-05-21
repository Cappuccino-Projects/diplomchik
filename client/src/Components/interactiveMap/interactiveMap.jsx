import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectMarker } from '../../app/redux/slices/locationsSlice' // Import your action

const InteractiveMap = (props) => {
  const position = props.position || [54.240372, 49.557147] // Use props.position if provided, else default to Moscow's coordinates
  const places = useSelector((state) => state.places) || [] // Access places from the store and default to an empty array if it's not an array
  const dispatch = useDispatch(); // Get the dispatch function

  const handleMarkerClick = (place) => {
    dispatch(selectMarker(place)); // Dispatch the selectMarker action with the clicked place as the payload
  };

  return (
    <MapContainer center={position} zoom={props.zoom || 20} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {Array.isArray(places.places) && places.places.map((place, index) => (
        <Marker key={index} position={[place.latitude, place.longitude]} eventHandlers={{ click: () => handleMarkerClick(place) }}>
          <Popup>
            {place.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default InteractiveMap