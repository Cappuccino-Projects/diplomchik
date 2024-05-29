import { openEditReviewModal } from '@redux/slices/modalsSlice'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'

export const LocationCard = ({ item }) => {
	const { id, userid, placeType, rank, place, comment, photoPath } = item

	const dispatch = useDispatch()

	const onChangeReviewClick = () => {
		dispatch(openEditReviewModal({ id }))
	}

	return (
		<div className={styles.LocationCard}>
			<div className={styles.LocationCardTitleWrapper}>
				<div className={styles.LocationCardNameRatingWrapper}>
					<b className={styles.LocationCardName}>
						{place.title ? place.title : 'Нет названия'}
					</b>
					<p className={styles.LocationCardRating}>{`★ ${rank}`}</p>
				</div>
				<button
					className={styles.CardEditButton}
					style={{ border: 'none' }}
					onClick={onChangeReviewClick}
				>
					Ред.
					<i className="fi fi-sr-edit" />
				</button>
			</div>
			<b className={styles.LocationCardName}>{placeType.name}</b>

			<b className={styles.LocationCardName}>{place.address}</b>
			<p className="LocationCardInfo">{comment}</p>
			{photoPath && (
				<div className={styles.LocationCardImageWrapper}>
					<img
						src={`../img/${photoPath}`}
						className={styles.LocationCardImage}
					/>
				</div>
			)}
		</div>
	)
}
