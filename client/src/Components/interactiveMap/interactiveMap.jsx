import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectMarker, deselectMarker } from '../../app/redux/slices/placesSlice' // Import your action
import { updateMarker } from '../../app/redux/slices/placesSlice'
import { useEffect } from 'react'
// import styles from './styles.module.css'
import { useGetAllplaceTypesQuery } from '@app/redux/services/placeTypeApi'

const ChangeView = ({ zoom }) => {
	const map = useMap()
	useEffect(() => {
		map.setZoom(zoom)
	}, [zoom, map])
	return null
}

const MapEvents = () => {
	const dispatch = useDispatch()
	useMapEvents({
		click: () => {
			dispatch(deselectMarker())
		}
	})
	return null
}

const getAssetIconPath = (placeTypeId, placeTypes) => {
	if (!placeTypes) return ''
	const type = placeTypes.find((palceType) => palceType.id === placeTypeId)
	return '/img/' + type.icon + '.png'
}

const InteractiveMap = (props) => {
	const position = props.position || [54.240372, 49.557147] // Use props.position if provided, else default to Moscow's coordinates
	const places = useSelector((state) => state.places)
	const { data: placeTypes } = useGetAllplaceTypesQuery()
	const dispatch = useDispatch()

	const markers = useSelector((state) => state.markers) || []

	useEffect(() => {
		console.log(places)
	}, [places])

	const handleDragEnd = (marker, event) => {
		const newLatLng = event.target.getLatLng()
		const updatedMarker = { ...marker, latitude: newLatLng.lat, longitude: newLatLng.lng }
		dispatch(updateMarker(updatedMarker))
	}

	const handleMarkerClick = (place) => {
		dispatch(selectMarker(place)) // If the clicked marker is not selected, select it
		// console.log(place);
	}

	return (
		<MapContainer center={position} zoom={props.zoom || 20} style={{ height: '100vh', width: '100%' }}>
			<ChangeView zoom={props.zoom || 20} />
			<MapEvents />
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
			{Array.isArray(places.places) &&
				placeTypes &&
				places.places.map((place, index) => (
					<Marker
						icon={L.icon({
							iconUrl: getAssetIconPath(place.typeId, placeTypes),
							iconSize: [20, 20],
							iconAnchor: [10, 10],
							popupAnchor: [0, 0]
						})}
						key={index}
						position={[place.latitude, place.longitude]}
						eventHandlers={{ click: () => handleMarkerClick(place) }}
					>
						<Popup>{place.title}</Popup>
					</Marker>
				))}

			{markers.map((marker, index) => (
				<Marker
					key={index}
					position={[marker.latitude, marker.longitude]}
					draggable
					eventHandlers={{
						dragend: (event) => handleDragEnd(marker, event)
					}}
				>
					<Popup>{marker.title}</Popup>
				</Marker>
			))}
		</MapContainer>
	)
}

export default InteractiveMap
