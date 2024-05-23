import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMarker } from '../../app/redux/slices/placesSlice'; 
import { updatePlace } from '../../app/redux/slices/placesSlice'; // Import the updatePlaces action

const EditMarker = () => {
  const selectedMarker = useSelector((state) => state.locations.selectedMarker);
  const dispatch = useDispatch();

  const [name, setName] = useState(selectedMarker && selectedMarker.name ? selectedMarker.name : '');
  const [latitude, setLatitude] = useState(selectedMarker && selectedMarker.latitude ? selectedMarker.latitude : '');
  const [longitude, setLongitude] = useState(selectedMarker && selectedMarker.longitude ? selectedMarker.longitude : '');
  
  useEffect(() => {
    if (selectedMarker) {
      setName(selectedMarker.name || '');
      setLatitude(selectedMarker.latitude || '');
      setLongitude(selectedMarker.longitude || '');
    }
  }, [selectedMarker]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    dispatch(updateMarker({ 
      id: selectedMarker.id, 
      name, 
      latitude, 
      longitude
    }));

    dispatch(updatePlace({ // Dispatch the updatePlaces action
      id: selectedMarker.id, 
      name, 
      latitude, 
      longitude
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Latitude:
        <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      </label>
      <label>
        Longitude:
        <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      </label>
      <input type="submit" value="Update Marker" />
    </form>
  );
};

export default EditMarker;