
// EditMarker.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlace } from '../../app/redux/slices/placesSlice'; 
import { updateUserSuggestions } from '../../app/redux/slices/placesSlice';
import styles from './styles.module.css'

const AddMarker = ({onClose}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('new place');
  const [latitude, setLatitude] = useState('54.240908');
  const [longitude, setLongitude] = useState('49.557214');


  const places = useSelector((state) => state.places) || []; // Access places from the store and default to an empty array if it's not an array

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newMarker = { 
      id: places.length + 1, // Generate a new id based on the length of the places array
      title: title, // Use the title from the state
      typeId: 1,
      address: '',
      latitude: latitude, // Use the latitude from the state
      longitude: longitude, // Use the longitude from the state
      PlaceImage: 'shop.png',
      photoPath: null,
      type: null,
      changeType: 1,
    };
  
    dispatch(addPlace(newMarker));
    dispatch(updateUserSuggestions(newMarker));
  
    // Clear the input fields
    setTitle('');
    setLatitude('');
    setLongitude('');
  };

  const handleSubmitAndClose = (e) => {
    e.preventDefault();
    handleSubmit(e);
    onClose();
  };

  return (
    <form onSubmit={handleSubmitAndClose} className={styles.form}>
      <label className={styles.label}>
        Name:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
      </label><br />
      <label className={styles.label}>
        Latitude:
        <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} className={styles.input}/>
      </label><br />
      <label className={styles.label}>
        Longitude:
        <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} className={styles.input} />
      </label><br />
      <button type="submit" className={styles.button}>сохранить</button>
      <button type="button" onClick={onClose} className={styles.button}>отменить</button>
    </form>
  );
};

export default AddMarker;