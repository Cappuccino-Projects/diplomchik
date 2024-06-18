import { useGetAllreviewQuery } from '@redux/services/reviewApi'
import { useEffect, useState } from 'react'
import { ReviewCard } from '../reviewCard'
import styles from './styles.module.css'

export const ReviewsList = () => {
	const { data = [], error, isLoading } = useGetAllreviewQuery()
	const [reviews, setReviews] = useState([])

	useEffect(() => {
		if (!isLoading) {
			setReviews(data)
		}
	}, [data, isLoading])
	if (isLoading) {
		return <h1 className={styles.reviewsList__message}>Загрузка...</h1>
	}

	if (error) {
		return <h1 className={styles.reviewsList__message}>Произошла ошибка!</h1>
	}
	return (
		<>
			{reviews.length === 0 ? (
				<h1 className={styles.reviewsList__message}>Отзывы отсутствуют</h1>
			) : (
				<ul className={styles.reviewsList}>
					{reviews.map((review) => (
						<li key={review.id}>
							<ReviewCard review={review} />
						</li>
					))}
				</ul>
			)}
		</>
	)
}