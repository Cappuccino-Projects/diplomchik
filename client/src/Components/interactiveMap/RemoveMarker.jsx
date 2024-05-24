// RemoveMarker.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeMarker } from '../../app/redux/slices/placesSlice'; 
import { removePlace } from '../../app/redux/slices/placesSlice';
import { deletePlaceAsync } from '../../app/redux/slices/placesSlice';

const RemoveMarker = ({onClose}) => { // Add props parameter here
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const selectedMarker = useSelector((state) => state.places.selectedMarker);
  const places = useSelector((state) => state.places) || []; // Access places from the store and default to an empty array if it's not an array

const handleSubmit = (e) => {
  e.preventDefault();
  
  const statePlaces = places.places;
  const markerToRemove = statePlaces.find(place => place.id === (selectedMarker ? selectedMarker.id : null));

  if (markerToRemove) {
    console.log(markerToRemove);
    dispatch(removeMarker(markerToRemove));
    dispatch(deletePlaceAsync(markerToRemove));
  } else {
    console.log(`No marker found with id: ${selectedMarker ? selectedMarker.id : 'null'}`);
  }

  handleClose(); // Close the modal after submitting
};

const handleClose = () => {
  setIsOpen(false);
};

const handleSubmitAndClose = (e) => {
  e.preventDefault();
  handleSubmit(e);
  onClose();
};

  return (
    <div>
        <form onSubmit={handleSubmitAndClose}>
          <p>Are you sure you want to remove the selected marker?</p>
          <button type="submit">Yes, remove</button>
          <button type="button" onClick={onClose}>No, cancel</button>
        </form>
    </div>
  );
};

export default RemoveMarker;