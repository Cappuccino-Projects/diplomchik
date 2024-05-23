
// EditMarker.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMarker } from '../../app/redux/slices/placesSlice'; 
import { addPlace } from '../../app/redux/slices/placesSlice';

const AddMarker = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const places = useSelector((state) => state.places) || []; // Access places from the store and default to an empty array if it's not an array

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const statePlaces = places.places;
    const nextId = Math.max(...statePlaces.map(place => place.id)) + 1;

    const newMarker = { 
      id: nextId, // generate a unique id
      name, 
      latitude, 
      longitude
    };

    console.log(newMarker);
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