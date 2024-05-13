import { DailyTaskCard } from '@components/DailyTaskCard'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const DailyTasksWrapper = () => {
	const dailyTasks = useSelector((state) => state.dailyTasks.dailyTasks)
	return (
		<div style={{ marginBottom: '30px' }} className={styles.CardsWrapper}>
			{dailyTasks.map((currentTask) => (
				<DailyTaskCard key={currentTask.TaskId} task={currentTask} />
			))}
		</div>
	)
}
