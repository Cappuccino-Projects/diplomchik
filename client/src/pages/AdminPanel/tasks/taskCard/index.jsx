import { Button } from '@components/Button'
import styles from './styles.module.css'
import {
	openDeleteDailyTask,
	openEditDailyTask
} from '@app/redux/slices/modalsSlice'
import { useDispatch } from 'react-redux'

export const TaskCard = ({ task }) => {
	const { title, description, expAward, iconPath } = task
	const dispatch = useDispatch()
	const openEdit = () => dispatch(openEditDailyTask(task))
	const openDelete = () => dispatch(openDeleteDailyTask(task))

	return (
		<div className={styles.taskCard}>
			<div className={styles.taskCard__header}>
				<div className={styles.taskCard__icon}>
					<img src={`http://places.d3s.ru:9088/bucket/${iconPath}`}/>
				</div>
				<div className={styles.taskCard__title}>{title}</div>
				<div className={styles.taskCard__controls}>
					<Button
						variant="icon"
						icon="fi-sr-trash"
						type="button"
						onClick={openDelete}
					/>
					<Button
						variant="icon"
						icon="fi-sr-edit"
						type="button"
						onClick={openEdit}
					/>
				</div>
			</div>
			<div className={styles.taskCard__description}>{description}</div>
			<div className={styles.taskCard__exp}>{expAward} xp</div>
		</div>
	)
}
