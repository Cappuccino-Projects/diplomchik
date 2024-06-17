// EditMarker.jsx
import { useCreateChangeMutation } from '@app/redux/services/changesApi'
import { useAddPlaceMutation, useGetAllplaceTypesQuery } from '@app/redux/services/placeTypeApi'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPlace, updateUserSuggestions } from '../../app/redux/slices/placesSlice'
import styles from './styles.module.css'

const AddMarker = ({ onClose, coordinates }) => {
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [typeId, setTypeId] = useState(0)
	const [allTypes, setAllTypes] = useState([])

	// const places = useSelector((state) => state.places) || [] // Access places from the store and default to an empty array if it's not an array
	// const userSuggestions = useSelector((state) => state.userSuggestions) 
	const user = useSelector((state) => state.user.user)
	const [addMarker] = useAddPlaceMutation()
	const [createChange] = useCreateChangeMutation()

	const { data: allPlaceTypes = [], isFetching: isFetchingAllPlaceTypes } = useGetAllplaceTypesQuery()

	useEffect(() => {
		if (!isFetchingAllPlaceTypes) {
			setAllTypes(allPlaceTypes)
		} else {
			setAllTypes([])
		}
	}, [allPlaceTypes, isFetchingAllPlaceTypes])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const newMarker = {
			title: title, // Use the title from the state
			typeId: typeId,
			address: null,
			latitude: coordinates.latitude, // Use the latitude from the state
			longitude: coordinates.longitude, // Use the longitude from the state
			photoPath: null
		}

		try {
			const result = await addMarker(newMarker).unwrap()
			dispatch(addPlace(result))

			await createChange({
				userId: user.id,
				placeId: result.id,
				approverId: 2,
				typeId: 1,
				timestamp: new Date()
			}).unwrap()

			dispatch(updateUserSuggestions(result))

		} catch(error) {
			console.log('fail')
		} 
		// Clear the input fields
		setTitle('')
	}

	const handleSubmitAndClose = async (e) => {
		e.preventDefault()
		await handleSubmit(e)
		onClose()
	}

	if (coordinates.latitude === null || coordinates.latitude === undefined 
		|| coordinates.longitude === null || coordinates.longitude === undefined) {
		return <div className={styles.addMarker__notFoundPlace}>
			<h2>Пожалуйста выберите место на карте</h2>
			<button type="button" onClick={onClose} className={styles.button}>
				Закрыть
			</button>
		</div>;
	}

	return (
			<form onSubmit={handleSubmitAndClose} className={styles.form}>
			<label className={styles.label}>
				Название:
				<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
			</label>
			<br />
			<label className={styles.label}>
				Широта:
				<input type="number" value={coordinates.latitude} className={styles.input} readOnly />
			</label>
			<br />
			<label className={styles.label}>
				Долгота:
				<input type="number" value={coordinates.longitude} className={styles.input} readOnly />
			</label>
			<br />
			<label className={styles.label}>
				Тип места:
				<select value={typeId} onChange={(e) => setTypeId(e.target.value)} className={styles.select}>
					<option value="">Выберите тип места</option>
					{allTypes.map((type) => (
						<option key={type.id} value={type.id} className={styles.option}>
							{type.name}
						</option>
					))}
				</select>
			</label>
			<br />
			<button type="submit" className={styles.button}>
				Сохранить
			</button>
			<button type="button" onClick={onClose} className={styles.button}>
				Отменить
			</button>
		</form>
	)
}

export default AddMarker
