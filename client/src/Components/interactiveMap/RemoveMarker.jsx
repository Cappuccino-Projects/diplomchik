// RemoveMarker.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSuggestions } from '../../app/redux/slices/placesSlice'; 
import styles from './styles.module.css'


const RemoveMarker = ({onClose}) => { // Add props parameter here
  const dispatch = useDispatch();
  const [, setIsOpen] = useState(false);

  const selectedMarker = useSelector((state) => state.places.selectedMarker);
  const places = useSelector((state) => state.places) || []; 
const handleSubmit = (e) => {
  e.preventDefault();
  
  const statePlaces = places.places;
  const markerToRemove = statePlaces.find(place => place.id === (selectedMarker ? selectedMarker.id : null));

  if (markerToRemove) {
    const updatedMarker = {
      ...markerToRemove,
      typeChange: 3, 
    };
    console.log(updatedMarker);
    dispatch(updateUserSuggestions(updatedMarker)); // Dispatch with the updatedMarker object
  } else {
    console.log(`No marker found with id: ${selectedMarker ? selectedMarker.id : 'null'}`);
  }

  handleClose(); 
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
        <form onSubmit={handleSubmitAndClose} className={styles.form} >
          <p>Удалить объект?</p>
          <button type="submit" className={styles.button}>Удалить</button>
          <button type="button" onClick={onClose} className={styles.button}>Отменить</button>
        </form>
    </div>
  );
};

export default RemoveMarker;