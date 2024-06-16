import { useDeletePlaceByIdMutation } from '@app/redux/services/placeTypeApi'
import { closeModal } from '@app/redux/slices/modalsSlice'
import { Button } from '@components/Button'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'

export const DeletePlace = () => {
	const place = useSelector((state) => state.modals.data.deletePlace)
	const dispatch = useDispatch()
	const [deletePlace] = useDeletePlaceByIdMutation()

	const onClose = () => dispatch(closeModal())
	const onDelete = () => {
		deletePlace({ id: place.id })
		dispatch(closeModal())
	}

	return (
		<div className={styles.deletePlace}>
			<div className={styles.deletePlace__title}>Удаление заявки</div>
			<div className={styles.deletePlace__description}>
				Вы уверены, что хотите удалить заявку пользователя? Отменить это действие будет
				невозможно
			</div>
			<div className={styles.deletePlace__buttons}>
				<Button
					variant="secondary"
					withBorder
					onClick={onClose}
					className={styles.deletePlace__button}
				>
					Отмена
				</Button>
				<Button
					variant="danger"
					withBorder
					onClick={onDelete}
					className={styles.deletePlace__button}
				>
					Удалить
				</Button>
			</div>
		</div>
	)
}
