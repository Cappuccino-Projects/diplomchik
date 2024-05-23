
// EditMarker.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMarker } from '../../app/redux/slices/placesSlice'; 
import { addPlace } from '../../app/redux/slices/placesSlice';

const AddMarker = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newMarker = { 
      id: Date.now(), // generate a unique id
      name, 
      latitude, 
      longitude
    };

    dispatch(addMarker(newMarker));
    dispatch(addPlace(newMarker));
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
      <input type="submit" value="Add Marker" />
    </form>
  );
};

export default AddMarker;