import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { ProgressBar } from '@components'

const CompletedTasks = ({ countCompletedTasks }) => {
	// props: {
    //     countCompletedTasks - от 0 до 3
    // }
	return Array(3).fill().map((_, index) => {
		return (index <= countCompletedTasks - 1) ? (
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

export const DailyTasks = (props) => {
	
	const countCompletedTasks = 1
	const status = "В процессе"
	
	return (
		<Link to="/dailytasks">
			<div className={styles.DailyTasksWrapper}>
				<div className={styles.DailyTasksStatusWrapper}>
					<p className={styles.DailyTasksTitle}>Ежедневные задания</p>
					<div className={styles.DailyTasksStatus}>{status}</div>
				</div>
				{props.ShowInfo && (
					<p className={styles.DailyTasksAbout}>
						Выполняйте ежедневные задания, чтобы повышать уровень профиля
					</p>
				)}
				<div className={styles.DailyTasksIconsWrapper}>
					<div className={styles.DailyTasksIcons}>
						<CompletedTasks countCompletedTasks={countCompletedTasks}/>
					</div>
					<div className={styles.DailyTaskIconIncompleted}>
						<img className={styles.SmallImg} src="../img/chest.png" />
					</div>
				</div>
				{props.ShowLvl && <ProgressBar currentlvl={10} value={52} />}
			</div>
		</Link>
	)
}
