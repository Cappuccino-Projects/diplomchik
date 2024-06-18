import { useAddFavoriteByUserIdMutation } from '@app/redux/services/userApi'
import { closeModal, openAddFavorite } from '@app/redux/slices/modalsSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useGetAllplaceTypesQuery } from '../../app/redux/services/placeTypeApi'
import { PlaceIcon } from '../PlaceIcon'
import styles from './styles.module.css'

export const AllPlacesWrapper = (props) => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.user)
	const { data: placeTypes, isLoading, error } = useGetAllplaceTypesQuery()
  console.log('placeTypes:', placeTypes)
	const [selectedType, setSelectedType] = useState('')
	const [filterChosen, setFilterChosen] = useState(false)
	const openAddFavorited = () => dispatch(openAddFavorite())
	const closeAddFavorited = () => dispatch(closeModal())
	if (isLoading) return 'Загрузка...'
	if (error) return `Ошибка: ${error.message}`

	const filteredPlaces = props.places?.filter((place) => selectedType === null || String(place.typeId) === String(selectedType))

	const handleAllPlacesClick = () => {
		setSelectedType(null)
		setFilterChosen(true)
	}

	const handlePlaceTypeClick = (typeId) => {
		setSelectedType(typeId)
		setFilterChosen(true)
	}

	const [addFavorite] = useAddFavoriteByUserIdMutation()

	const addFavoriterr = () => {
		console.log(props)
		addFavorite({ userId: user.id, placeId: props.places[3].id })
	}
	
const placeTypesButtons = (
  <div className={styles.catWrapper}>
    {placeTypes?.map((type) => (
      <div key={type.id}>
        <button className={styles.CurrentPlace} onClick={() => handlePlaceTypeClick(type.id)}>
          <PlaceIcon placeName={type.name} placeIcon={type.icon} />
        </button>
      </div>
    ))}
  </div>
);

	const filteredPlacesCards =
		filterChosen &&
		filteredPlaces?.map((CurrentPlace) => {
			const placeType = placeTypes?.find((type) => type.id === CurrentPlace.typeId)
			const placeTypeName = placeType ? placeType.name : ''

			return (
				<div className={styles.LocationCard} key={CurrentPlace.id}>
					<div className={styles.LocationCardTitleWrapper}>
						<b className={styles.LocationCardName}>{CurrentPlace.title ? CurrentPlace.title : placeTypeName}</b>

						<div className={styles.LocationCardRating}>
							<i
								className="fi fi-sr-heart"
								onClick={addFavoriterr}
							/>
							<i
								className="fi-sr-comment"
								onClick={openAddFavorited}
								close={closeAddFavorited}
							/>
						</div>

						{/*<button className={styles.CardEditButton}> Ред. </button>*/}
					</div>

					{CurrentPlace.title ? <p className={styles.LocationTypeName}>Тип: {placeTypeName}</p> : null}

					{CurrentPlace.address ? (
						<p className={styles.LocationCardName}>{CurrentPlace.address}</p>
					) : (
						<p className={styles.LocationCoorddName}>
							Координаты: {CurrentPlace.latitude ? CurrentPlace.latitude : ''},{CurrentPlace.longitude ? CurrentPlace.longitude : ''}
						</p>
					)}
					<p className="LocationCardInfo">{CurrentPlace.description ? CurrentPlace.description : ''}</p>
				</div>
			)
		})

	return (
		<div className={styles.placesBlock}>
			<div className={styles.BlockTitleWrapper}>

				{/* <p className={styles.BlockTitleText}>{props.WrapperText}</p> */}

				{props.WrapperButtonEnabled && (
					<Link to="/allplaces">
						<div className={styles.AllplacesButton}>Все места</div>
					</Link>
				)}
			</div>

			<div className={styles.placesBlock}>
				<div className={styles.BlockTitleWrapper}>
					<h2 className={styles.BlockTitleText}> {props.WrapperText}</h2>
					<button className={styles.CardEditButton} onClick={handleAllPlacesClick}>
          Все места 
					</button>
				</div>

				<div className={styles.catWrapper}>{placeTypesButtons}</div>
			</div>

			<div className={styles.placesWrapper} style={{ display: 'block' }}>
				{filteredPlacesCards}
			</div>
		</div>
	)
}
