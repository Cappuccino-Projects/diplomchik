import { useCreateChangeMutation } from '@redux/services/changesApi'
import { useGetAllplaceTypesQuery, useGetPlaceTypeByIdQuery, useUpdatePlaceByIdMutation } from '@redux/services/placeTypeApi'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updatePlace, updateUserSuggestions } from '@redux/slices/placesSlice'
import styles from './styles.module.css'

const EditMarker = ({ onClose }) => {
  const dispatch = useDispatch();

  const selectedMarker = useSelector((state) => state.places.selectedMarker);
  const user = useSelector((state) => state.user.user)

  const [latitude, setLatitude] = useState(selectedMarker?.latitude || '');
  const [longitude, setLongitude] = useState(selectedMarker?.longitude || '');
  const [address, setAddress] = useState(selectedMarker?.address || '');
  const [title, setTitle] = useState(selectedMarker?.title || '');
  const [type, setType] = useState(selectedMarker?.type || '');
  const [typeId, setTypeId] = useState(selectedMarker?.typeId || '');
  const [allTypes, setAllTypes] = useState([]);
  const [initialPlaceType, setInitialPlaceType] = useState('');

  const { data: allPlaceTypes = [], isFetching: isFetchingAllPlaceTypes } = useGetAllplaceTypesQuery()
  const { data: placeType = {}, isFetching: isFetching } = useGetPlaceTypeByIdQuery(typeId)

  const [createChange] = useCreateChangeMutation();
  const [updateMarker] = useUpdatePlaceByIdMutation()

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

	useEffect(() => {
		if (!isFetchingAllPlaceTypes) {
			setAllTypes(allPlaceTypes)
		} else {
			setAllTypes([])
		}
	}, [allPlaceTypes, isFetchingAllPlaceTypes])

  useEffect(() => {
		if (!isFetching) {
			setInitialPlaceType(placeType)
		} else {
			setInitialPlaceType('')
		}
	}, [isFetching, placeType])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedPlace = {
      id: selectedMarker.id, 
      title: title,
      typeId: typeId,
      address: address,
      latitude: latitude, 
      longitude: longitude,
      photoPath: null,
      changeType: 2,
      type: type
    };
  
    try {
      // Логирование до вызова updateMarker
      console.log('Calling updateMarker with:', updatedPlace);
      const actionResult = await updateMarker(updatedPlace);
      
      // Логирование после получения результата
      console.log('updateMarker result:', actionResult);
      dispatch(updatePlace(actionResult));
  
      // Логирование до вызова createChange
      const changeData = {
        userId: user.id,
        approverId: 2,
        placeId: updatedPlace.id, 
        typeId: 2,
        timestamp: new Date()
      };
      console.log('Calling createChange with:', changeData);
      await createChange(changeData).unwrap();
      
      // Логирование после создания change
      console.log('createChange successful');
      dispatch(updateUserSuggestions(actionResult));
  
    } catch(error) {
      // Логирование ошибки
      console.error('Error:', error);
      console.log('fail');
    }
  };
  const handleSubmitAndClose = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    onClose();
  };

  const filteredTypes = allTypes.filter((type) => type.id !== initialPlaceType.id)

  if (selectedMarker === null || selectedMarker === undefined) {
    return <div className={styles.addMarker__notFoundPlace}>
			<h2>Пожалуйста выберите объект на карте</h2>
			<button type="button" onClick={onClose} className={styles.button}>
				Закрыть
			</button>
		</div>;
  }

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
        <select value={typeId} onChange={(e) => setTypeId(e.target.value)} className={styles.select}>
          <option value={initialPlaceType.id}>{initialPlaceType.name}</option>
          {filteredTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </label><br />

      <button type="submit" className={styles.button}>Сохранить</button>
      <button type="button" onClick={onClose} className={styles.button}>Отменить</button>
    </form>
  );
};

export default EditMarker;