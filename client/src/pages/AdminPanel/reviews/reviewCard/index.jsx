import { Button } from '@components/Button'
import { useGetPlaceByIdQuery } from '@redux/services/placeTypeApi'
import { useGetUserByIdQuery } from '@redux/services/userApi'
import { openDeleteReview } from '@redux/slices/modalsSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'

export const ReviewCard = ({ review }) => {
	const { comment, photoPath, rank, placeId, userId } = review
	const [place, setPlace] = useState('')
	const [author, setAuthor] = useState('')

	const dispatch = useDispatch()
	const openDelete = () => dispatch(openDeleteReview(review))

	const {data: User, isFetching: isFetchingUser} = useGetUserByIdQuery(userId)
	const {data: Place, isFetching: isFetchingPlace} = useGetPlaceByIdQuery(placeId)

	useEffect(() => {
		if (!isFetchingPlace) {
			setPlace(Place.address)
		} else {
			setPlace('')
		}
	}, [review, Place, isFetchingPlace])

	useEffect(() => {
		if (!isFetchingUser) {
			setAuthor(User.displayName)
		} else {
			setAuthor('')
		}
	}, [User, isFetchingUser])

	return (
		<div className={styles.reviewCard}>
			<div className={styles.reviewCard__header}>	
				<h1 className={styles.reviewCard__address}>{place !== null ? place : 'Адрес не указан'}</h1>
				<Button variant="icon" icon="fi-sr-trash" type="button" onClick={openDelete} />
			</div>
			<div className={styles.reviewCard__description}>
				<div className={styles.reviewCard__header}>
					<div className={styles.reviewCard__author}>{author}</div>
					<div className={styles.reviewCard__rank}>
						{rank === 5 ? '★★★★★' : rank === 4 ? '★★★★' : rank === 3 ? '★★★' : rank === 2 ? '★★' : rank === 1 ? '★' : 'Не оценено'}
					</div>
				</div>
				<div className={styles.reviewCard__comment}>{comment}</div>
			</div>
		</div>
	)
}