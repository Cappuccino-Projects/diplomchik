import { useDeleteUserByIdMutation } from '@app/redux/services/userApi'
import { closeModal } from '@app/redux/slices/modalsSlice'
import { deleteUser } from '@app/redux/slices/userSlice'
import { Button } from '@components/Button'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.css'

export const DeleteUser = () => {
	const user = useSelector((state) => state.modals.data.deleteUser)
	const dispatch = useDispatch()
	const [deletedUser] = useDeleteUserByIdMutation()

	const onClose = () => dispatch(closeModal())
	const onDelete = () => {
		deletedUser(user.id)
		dispatch(deleteUser(user))
		dispatch(closeModal())
	}

	return (
		<div className={styles.deleteUser}>
			<div className={styles.deleteUser__title}>Удаление пользователя</div>
			<div className={styles.deleteUser__description}>
				Вы уверены, что хотите удалить пользователя? Отменить это действие будет
				невозможно
			</div>
			<div className={styles.deleteUser__buttons}>
				<Button
					variant="secondary"
					withBorder
					onClick={onClose}
					className={styles.deleteUser__button}
				>
					Отмена
				</Button>
				<Button
					variant="danger"
					withBorder
					onClick={onDelete}
					className={styles.deleteUser__button}
				>
					Удалить
				</Button>
			</div>
		</div>
	)
}
