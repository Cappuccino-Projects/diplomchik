import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import { closeModal } from '@app/redux/slices/modalsSlice'
import { useDeleteDailyTaskByIdMutation } from '@app/redux/services/dailyTasksApi'
import { Button } from '@components/Button'

export const DeleteDailyTask = () => {
	const task = useSelector((state) => state.modals.data.deleteDailyTask)
	const dispatch = useDispatch()
	const [deleteTask] = useDeleteDailyTaskByIdMutation()

	const onClose = () => dispatch(closeModal())
	const onDelete = () => {
		deleteTask({ id: task.id })
		dispatch(closeModal())
	}

	return (
		<div className={styles.deleteTask}>
			<div className={styles.deleteTask__title}>Удаление задания</div>
			<div className={styles.deleteTask__description}>
				Вы уверены, что хотите удалить задание? Отменить это действие будет
				невозможно
			</div>
			<div className={styles.deleteTask__buttons}>
				<Button
					variant="secondary"
					withBorder
					onClick={onClose}
					className={styles.deleteTask__button}
				>
					Отмена
				</Button>
				<Button
					variant="danger"
					withBorder
					onClick={onDelete}
					className={styles.deleteTask__button}
				>
					Удалить
				</Button>
			</div>
		</div>
	)
}
