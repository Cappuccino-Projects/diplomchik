import { useDeleteReviewMutation } from '@app/redux/services/reviewApi'
import { closeModal } from '@app/redux/slices/modalsSlice'
import { Button } from '@components/Button'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'

export const DeleteReview = () => {
	const dispatch = useDispatch()
	const review = useSelector(state => state.modals.data.deleteReview)
	const [deleteReview] = useDeleteReviewMutation()
	const onClose = () => {
		dispatch(closeModal())
	}
	const onDelete = () => {
		deleteReview(review.id)
		onClose()
	}


	return (
		<div className={styles.deleteReview}>
			<div className={styles.deleteReview__title}>Удаление отзыва</div>
			<div className={styles.deleteReview__description}>
				Вы уверены, что хотите удалить отзыв? Отменить это действие будет
				невозможно
			</div>
			<div className={styles.deleteReview__buttons}>
				<Button
					variant="secondary"
					withBorder
					onClick={onClose}
					className={styles.deleteReview__button}
				>
					Отмена
				</Button>
				<Button
					variant="danger"
					withBorder
					onClick={onDelete}
					className={styles.deleteReview__button}
				>
					Удалить
				</Button>
			</div>
		</div>
	)
}