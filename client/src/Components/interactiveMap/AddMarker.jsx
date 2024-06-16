
// EditMarker.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlace } from '../../app/redux/slices/placesSlice'; 
import { updateUserSuggestions } from '../../app/redux/slices/placesSlice';
import styles from './styles.module.css'

const AddMarker = ({onClose}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('Новое место');
  const [latitude, setLatitude] = useState('54.240908');
    const [longitude, setLongitude] = useState('49.557214');
    const [type, setType] = useState();
    const [typeId, setTypeId] = useState(1);


  const places = useSelector((state) => state.places) || []; // Access places from the store and default to an empty array if it's not an array

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newMarker = { 
      id: places.length + 1, // Generate a new id based on the length of the places array
      title: title, // Use the title from the state
      typeId: typeId,
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
        Название:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
      </label><br />
      <label className={styles.label}>
        Широта:
        <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} className={styles.input}/>
      </label><br />
      <label className={styles.label}>
        Долгота:
        <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} className={styles.input} />
      </label><br />
      <label className={styles.label}>
        Тип места:
        <input type="text" value={typeId} onChange={(e) => setTypeId(e.target.value)} className={styles.input}/>
      </label><br />
      <button type="submit" className={styles.button}>Сохранить</button>
      <button type="button" onClick={onClose} className={styles.button}>Отменить</button>
    </form>
  );
};

export default AddMarker;