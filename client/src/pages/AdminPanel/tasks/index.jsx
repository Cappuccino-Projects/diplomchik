import { Button } from '@components/Button'
import AdminPanelWrapper from '../wrapper'
import styles from './styles.module.css'
import TasksList from './tasksList'
import { useDispatch } from 'react-redux'
import { openAddDailyTask } from '../../../app/redux/slices/modalsSlice'

export const Tasks = () => {
	const dispatch = useDispatch()

	const openAddPopup = () => {
		dispatch(openAddDailyTask())
	}

	return (
		<AdminPanelWrapper>
			<div className={styles.tasks}>
				<h1 className={styles.tasks__title}>Ежедневные задания</h1>
				<Button
					variant="primary"
					icon="fi-sr-plus-small"
					className={styles.tasks__button}
					type="button"
					onClick={openAddPopup}
				>
					Новое задание
				</Button>
				<TasksList />
			</div>
		</AdminPanelWrapper>
	)
}
