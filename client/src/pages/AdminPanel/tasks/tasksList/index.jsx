import { useGetAlldailyTasksQuery } from '@app/redux/services/dailyTasksApi'
import styles from './styles.module.css'
import { TaskCard } from '../taskCard'

const TasksList = () => {
	const { data, error, isLoading } = useGetAlldailyTasksQuery()

	if (isLoading) {
		return <h1 className={styles.tasksList__message}>Загрузка...</h1>
	}

	if (error) {
		return <h1 className={styles.tasksList__message}>Произошла ошибка!</h1>
	}

	return (
		<ul className={styles.tasksList}>
			{data.map((task) => (
				<li key={task.id}>
					<TaskCard task={task} />
				</li>
			))}
		</ul>
	)
}

export default TasksList
