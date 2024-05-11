import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const DailyTasks = (props) => {
	return (
		<Link to="/dailytasks">
			<div className={styles.DailyTasksWrapper}>
				<div className={styles.DailyTasksStatusWrapper}>
					<p className={styles.DailyTasksTitle}>Ежедневные задания</p>
					<div className={styles.DailyTasksStatus}>В процессе</div>
				</div>
				{props.ShowInfo && (
					<p className={styles.DailyTasksAbout}>
						Выполняйте ежедневные задания, чтобы повышать уровень профиля
					</p>
				)}
				<div className={styles.DailyTasksIconsWrapper}>
					<div className={styles.DailyTasksIcons}>
						<div className={styles.DailyTaskIconCompleted}>
							<img className={styles.SmallImg} src="../img/completed.png" />
						</div>
						<div className={styles.DailyTaskIconCompleted}>
							<img className={styles.SmallImg} src="../img/completed.png" />
						</div>
						<div className={styles.DailyTaskIconIncompleted}>
							<img className={styles.SmallImg} src="../img/notcompleted.png" />
						</div>
					</div>
					<div className={styles.DailyTaskIconIncompleted}>
						<img className={styles.SmallImg} src="../img/chest.png" />
					</div>
				</div>
				{props.ShowLvl && (
					<div className={styles.UserLvlWrapper}>
						{/* нету UserLvl */}
						<p className="UserLvl">6</p>
						<div className={styles.UserLvlProgressWrapper}>
							<div
								style={{ width: '36%' }}
								className={styles.UserLvlProgress}
							></div>
						</div>
						<p className="UserLvl">7</p>
					</div>
				)}
			</div>
		</Link>
	)
}

export default DailyTasks
