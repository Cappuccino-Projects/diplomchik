import { useSelector } from 'react-redux'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import {
	useGetReviewByIdQuery,
	useUpdateReviewByIdMutation
} from '@redux/services/reviewApi'

export const EditReviewModal = ({ close }) => {
	const reviewId = useSelector(
		(state) => state.modals.data.editRewiewToChange.id
	)
	const { data: review = {}, isSuccess: isSuccessReview } =
		useGetReviewByIdQuery(reviewId)

	const [updateReview] = useUpdateReviewByIdMutation()

	const [rating, setRating] = useState(0)
	const [commentInput, setCommentInput] = useState('')

	useEffect(() => {
		if (isSuccessReview) {
			setRating(review.rank)
			setCommentInput(review.comment)
		}
	}, [review])

	const save = () => {
		const newReview = { ...review, rank: rating, comment: commentInput }
		updateReview(newReview)
	}

	return (
		<>
			<div className={styles.ModalWindowTitle}>Редактирование отзыва</div>
			<div
				style={{ fontSize: '20px', marginTop: '10px' }}
				className={styles.ModalWindowText}
			>
				<b>{'Название'}</b>
			</div>
			<div
				style={{ fontSize: '14px', color: 'grey' }}
				className={styles.AllplacesButton}
			>
				{'Культурные места'}
			</div>
			<div className={styles.ModalWindowText}>{reviewId.address}</div>
			<div style={{ marginTop: '20px' }} className={styles.ModalWindowText}>
				Комментарий
			</div>
			<input
				type="text"
				style={{ height: '32px' }}
				className="MenuTextArea"
				placeholder="Поделитесь впечатлениями"
				value={commentInput}
				onChange={(e) => setCommentInput(e.target.value)}
			></input>
			<div style={{ marginTop: '10px' }} className={styles.ModalWindowText}>
				Фотографии
			</div>
			<div className="LocationCardImageWrapper">
				<div className={styles.LocationCardImage}>
					<div className={styles.DeleteImageButton}>
						<i className="fi fi-sr-cross-small"></i>
					</div>
					<img src={'../img/place2.jpg'} className={styles.LocationImage}></img>
				</div>

				<div className={styles.LocationCardImage}>
					<div className={styles.DeleteImageButton}>
						<i className="fi fi-sr-cross-small"></i>
					</div>
					<img src={'../img/place2.jpg'} className={styles.LocationImage}></img>
				</div>

				<div className={styles.LocationCardImage}>
					<div className={styles.AddImageButton}>
						<i className="fi fi-sr-plus-small"></i>
					</div>
					<img className={styles.LocationImage}></img>
				</div>
			</div>

			<div style={{ marginTop: '10px' }} className={styles.ModalWindowText}>
				Оценка
			</div>

			<div className="LocationCardImageWrapper">
				{Array(5)
					.fill()
					.map((_, index) => {
						return (
							<button
								key={index}
								onClick={() => setRating(index + 1)}
								className={
									rating === index + 1
										? styles.RatingActive
										: styles.RatingNotActive
								}
							>
								{index + 1}
							</button>
						)
					})}
			</div>
			<div
				style={{ marginTop: '20px' }}
				className={styles.ModalWindowButtonsWrapper}
			>
				<button className={styles.ModalButton} onClick={close}>
					Удалить
				</button>
				<button className={styles.ModalMainButton} onClick={save}>
					Сохранить
				</button>
			</div>
		</>
	)
}
