import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMarker } from '../../app/redux/slices/locationsSlice'; // Import your update action
import { updateMarker } from '../../app/redux/slices/locationsSlice'; 

const EditMarker = () => {
  const selectedMarker = useSelector((state) => state.locations.selectedMarker); // Access the selected marker from the store
  console.log('selectedMarker---', selectedMarker);

  const dispatch = useDispatch(); // Get the dispatch function

  // Use React's useState hook to create state variables for each property of the marker
  const [title, setTitle] = useState(selectedMarker ? selectedMarker.title : '');
  const [typeId, setTypeId] = useState(selectedMarker ? selectedMarker.typeId : '');
  const [address, setAddress] = useState(selectedMarker ? selectedMarker.address : '');
  const [latitude, setLatitude] = useState(selectedMarker ? selectedMarker.latitude : '');
  const [longitude, setLongitude] = useState(selectedMarker ? selectedMarker.longitude : '');

  useEffect(() => {
    if (selectedMarker) {
      setTitle(selectedMarker.title || '');
      setTypeId(selectedMarker.typeId || '');
      setAddress(selectedMarker.address || '');
      setLatitude(selectedMarker.latitude || '');
      setLongitude(selectedMarker.longitude || '');
    }
  }, [selectedMarker]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Dispatch the selectMarker action with the id of the marker you want to select
    // dispatch(selectMarker(selectedMarker.id));
  
    // Dispatch the updateMarker action with the updated marker as the payload
    dispatch(updateMarker({ id: selectedMarker.id, title, typeId, address, latitude, longitude }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Type ID:
        <input type="number" value={typeId} onChange={(e) => setTypeId(e.target.value)} />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
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