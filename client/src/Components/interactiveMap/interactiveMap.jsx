import {  MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectMarker, deselectMarker } from '../../app/redux/slices/placesSlice' // Import your action
import { useEffect } from 'react'

const ChangeView = ({ zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setZoom(zoom);
  }, [zoom, map]);
  return null;
}

const MapEvents = () => {
  const dispatch = useDispatch();
  useMapEvents({
    click: () => {
      dispatch(deselectMarker());
      
    },
  });
  return null;
}

const InteractiveMap = (props) => {
  const position = props.position || [54.240372, 49.557147] // Use props.position if provided, else default to Moscow's coordinates
  const places = useSelector((state) => state.places) || [] // Access places from the store and default to an empty array if it's not an array
  const dispatch = useDispatch();
  
  
  
  // useEffect(() => {
  //   console.log(places);
  // }, [places]);
  
  
  
  const handleMarkerClick = (place) => {
      dispatch(selectMarker(place)); // If the clicked marker is not selected, select it
      console.log(place);
  };

  return (
    <MapContainer center={position} zoom={props.zoom || 20} style={{ height: "100vh", width: "100%" }}>
      <ChangeView zoom={props.zoom || 20} />
      <MapEvents />
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