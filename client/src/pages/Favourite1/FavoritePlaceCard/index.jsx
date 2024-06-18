import styles from './styles.module.css'

import { useGetPlaceByIdQuery } from '@redux/services/placeTypeApi'

export const FavoritePlaceCard = ({ favorite, review }) => {

	const { data: place = {} } = useGetPlaceByIdQuery(favorite.placeId)
	

	return <div className={styles.LocationCard} key={favorite.id}>
	<div className={styles.LocationCardTitleWrapper}>
		<b className={styles.LocationCardName}>{place.title ? place.title : 'Нет названия'}</b>

		<p className={styles.LocationCardRating}> {review.rank ? `★ ${review.rank}` : 'Без рейтинга'}</p>

		{/* <button className={styles.CardEditButton}> Ред. </button> */}
	</div>

	{place.title ? <p className={styles.LocationTypeName}>Тип: {place.typeId}</p> : null}

	{place.address ? (
		<p className={styles.LocationCardName}>{place.address}</p>
	) : (
		<p className={styles.LocationCoorddName}>
			Координаты: {place.latitude ? place.latitude : ''},{place.longitude ? place.longitude : ''}
		</p>
	)}
	<p className="LocationCardInfo">{review.comment ? review.comment : ''}</p>
</div>
}