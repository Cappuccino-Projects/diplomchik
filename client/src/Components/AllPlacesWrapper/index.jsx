import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { useGetAllplaceTypesQuery } from '../../app/redux/services/placeTypeApi'
import { PlaceIcon } from '../PlaceIcon'

export const AllPlacesWrapper = (props) => {
	const { data: placeTypes, isLoading, error } = useGetAllplaceTypesQuery()
  console.log('placeTypes:', placeTypes)
	const [selectedType, setSelectedType] = useState('')
	const [filterChosen, setFilterChosen] = useState(false)

	if (isLoading) return 'Loading...'
	if (error) return `An error has occurred: ${error.message}`

	const filteredPlaces = props.places?.filter((place) => selectedType === null || String(place.typeId) === String(selectedType))

	const handleAllPlacesClick = () => {
		setSelectedType(null)
		setFilterChosen(true)
	}

	const handlePlaceTypeClick = (typeId) => {
		setSelectedType(typeId)
		setFilterChosen(true)
	}

	const placeTypesButtons = placeTypes?.map((type) => (
		<div key={type.id}>
			<button className={styles.CurrentPlace} onClick={() => handlePlaceTypeClick(type.id)}>
				<PlaceIcon placeName={type.name} placeIcon={type.icon} />
			</button>
		</div>
	))

	const filteredPlacesCards =
		filterChosen &&
		filteredPlaces?.map((CurrentPlace) => {
			const placeType = placeTypes?.find((type) => type.id === CurrentPlace.typeId)
			const placeTypeName = placeType ? placeType.name : ''

			return (
				<div className={styles.LocationCard} key={CurrentPlace.id}>
					<div className={styles.LocationCardTitleWrapper}>
						<div className={styles.LocationCardNameRatingWrapper}>
							<b className={styles.LocationCardName}>{CurrentPlace.title ? CurrentPlace.title : placeTypeName}</b>

							<p className={styles.LocationCardRating}> {CurrentPlace.rank ? `★ ${CurrentPlace.rank}` : 'Без рейтинга'}</p>
						</div>

						<button className={styles.CardEditButton}>Ред.</button>
					</div>

					{CurrentPlace.address ? (
						<p className={styles.LocationCardName}>{CurrentPlace.address}</p>
					) : (
						<p className={styles.LocationCardName}>
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

			<div className="placesBlock">
				<div className="BlockTitleWrapper">
					<h2 className="BlockTitleText"> {props.WrapperText}</h2>
					<button className="AllplacesButton" onClick={handleAllPlacesClick}>
          Все места 
					</button>
				</div>

				<div className="placesWrapper">{placeTypesButtons}</div>
			</div>

			<div className={styles.placesWrapper} style={{ display: 'block' }}>
				{filteredPlacesCards}
			</div>
		</div>
	)
}
