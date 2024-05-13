import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { ProgressBar } from '@components'
import { useSelector } from 'react-redux'

const CompletedTasks = ({ countCompletedTasks }) => {
	// props: {
	//     countCompletedTasks - от 0 до 3
	// }
	return Array(3)
		.fill()
		.map((_, index) => {
			return index <= countCompletedTasks - 1 ? (
				<div className={styles.DailyTaskIconCompleted}>
					<img className={styles.SmallImg} src="../img/completed.png" />
				</div>
			) : (
				<div className={styles.DailyTaskIconIncompleted}>
					<img className={styles.SmallImg} src="../img/notcompleted.png" />
				</div>
			)
		})
}

export const DailyTasks = ({ ShowInfo = true, ShowLvl = true }) => {
	const dailyTasksStatus = useSelector(
		(state) => state.dailyTasks.dailyTasksStatus
	)
	const countCompletedTasks = useSelector(
		(state) => state.dailyTasks.countCompletedTasks
	)
	
	return (
		<Link to="/dailytasks">
			<div className={styles.DailyTasksWrapper}>
				<div className={styles.DailyTasksStatusWrapper}>
					<p className={styles.DailyTasksTitle}>Ежедневные задания</p>
					<div className={styles.DailyTasksStatus}>{dailyTasksStatus}</div>
				</div>
				{ShowInfo && (
					<p className={styles.DailyTasksAbout}>
						Выполняйте ежедневные задания, чтобы повышать уровень профиля
					</p>
				)}
				<div className={styles.DailyTasksIconsWrapper}>
					<div className={styles.DailyTasksIcons}>
						{/* 3 штуки и сундучок */}
						<CompletedTasks countCompletedTasks={countCompletedTasks} />
					</div>
					<div className={styles.DailyTaskIconIncompleted}>
						<img className={styles.SmallImg} src="../img/chest.png" />
					</div>
				</div>
				{ShowLvl && <ProgressBar />}
			</div>
		</Link>
	)
}
