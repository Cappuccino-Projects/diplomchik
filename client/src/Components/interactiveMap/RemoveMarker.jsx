// RemoveMarker.jsx
import { useDispatch, useSelector } from 'react-redux';
import { removeMarker } from '../../app/redux/slices/placesSlice'; 
import { removePlace } from '../../app/redux/slices/placesSlice';

const RemoveMarker = () => {
  const dispatch = useDispatch();

  const selectedMarker = useSelector((state) => state.places.selectedMarker);
  const places = useSelector((state) => state.places) || []; // Access places from the store and default to an empty array if it's not an array

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const statePlaces = places.places;
    const markerToRemove = statePlaces.find(place => place.id === (selectedMarker ? selectedMarker.id : null));

    if (markerToRemove) {
      console.log(markerToRemove);
      dispatch(removeMarker(markerToRemove));
      dispatch(removePlace(markerToRemove));
    } else {
      console.log(`No marker found with id: ${selectedMarker ? selectedMarker.id : 'null'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="submit" value="Remove Selected Marker" />
    </form>
  );
};

export default RemoveMarker;