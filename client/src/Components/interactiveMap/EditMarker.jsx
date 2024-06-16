import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateUserSuggestions } from '../../app/redux/slices/placesSlice';
import styles from './styles.module.css'

const EditMarker = ({onClose}) => {
  const dispatch = useDispatch();

  const selectedMarker = useSelector((state) => state.places.selectedMarker);

  const [latitude, setLatitude] = useState(selectedMarker?.latitude || '');
  const [longitude, setLongitude] = useState(selectedMarker?.longitude || '');
  const [address, setAddress] = useState(selectedMarker?.address || '');
  const [title, setTitle] = useState(selectedMarker?.title || '');
  const [type, setType] = useState(selectedMarker?.type || '');
  const [typeId, setTypeId] = useState(selectedMarker?.typeId || '');

  useEffect(() => {
    if (selectedMarker) {
      setTitle(selectedMarker.title || '');
      setTypeId(selectedMarker.typeId || '');
      setAddress(selectedMarker.address || '');
      setLatitude(selectedMarker.latitude || '');
      setLongitude(selectedMarker.longitude || '');
      setType(selectedMarker.type || '');
    }
  }, [selectedMarker]);

const handleSubmit = (e) => {
  e.preventDefault();

  const updatedPlace = {
    id: selectedMarker.id, 
    title,
    typeId,
    address,
    latitude, 
    longitude,
    type,
    changeType: 2,
  };


  dispatch(updateUserSuggestions(updatedPlace));
};
  const handleSubmitAndClose = (e) => {
    e.preventDefault();
    handleSubmit(e);
    onClose();
  };

  return (
    <form onSubmit={handleSubmitAndClose} className={styles.form} >
      <label className={styles.label}>
        Название:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
      </label><br />

      <label className={styles.label}>
        Адрес:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={styles.input}/>
      </label><br />
      <label className={styles.label}>
        Широта:
        <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} className={styles.input}/>
      </label><br />
      <label className={styles.label}>
        Долгота:
        <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} className={styles.input}/>
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

export default EditMarker;