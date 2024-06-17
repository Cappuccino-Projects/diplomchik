// RemoveMarker.jsx
import { useCreateChangeMutation } from '@redux/services/changesApi'
import { useDeletePlaceByIdMutation } from '@redux/services/placeTypeApi'
import { removePlace, updateUserSuggestions } from '@redux/slices/placesSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'


const RemoveMarker = ({ onClose }) => { // Add props parameter here
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const selectedMarker = useSelector((state) => state.places.selectedMarker);
  const places = useSelector((state) => state.places) || [];
  const user = useSelector((state) => state.user.user);

  const [removeMarker] = useDeletePlaceByIdMutation();
  const [createChange] = useCreateChangeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const statePlaces = places.places;
    const markerToRemove = statePlaces.find(place => place.id === (selectedMarker ? selectedMarker.id : null));
    console.log(markerToRemove)
    if (markerToRemove) {
      const updatedMarker = {
        ...markerToRemove,
        changeType: 3
      };
      console.log(updatedMarker);
      try {
        const result = await removeMarker({ id: markerToRemove.id });
        dispatch(removePlace(result))
        
        await createChange({
          userId: user.id,
          placeId: markerToRemove.id,
          approverId: 2,
          typeId: 3,
          timestamp: new Date()
        }).unwrap()

        dispatch(updateUserSuggestions(result))
      } catch(error) {
        console.log('fail')
      }
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

  if (selectedMarker === null || selectedMarker === undefined) {
    return <div className={styles.addMarker__notFoundPlace}>
			<h2>Пожалуйста выберите объект на карте</h2>
			<button type="button" onClick={onClose} className={styles.button}>
				Закрыть
			</button>
		</div>;
  }

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