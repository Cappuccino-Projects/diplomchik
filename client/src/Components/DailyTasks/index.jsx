import { ProgressBar } from '@components'
import {
	openGetRewards,
	openRewardsNotAvalible
} from '@redux/slices/modalsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const CompletedTasks = ({ countCompletedTasks }) => {
	return (
		<div className={styles.DailyTasksIcons}>
			{Array(3)
				.fill()
				.map((_, index) => {
					return index <= countCompletedTasks - 1 ? (
						<div key={index} className={styles.DailyTaskIconCompleted}>
							<img className={styles.SmallImg} src="../img/completed.png" />
						</div>
					) : (
						<div key={index} className={styles.DailyTaskIconIncompleted}>
							<img className={styles.SmallImg} src="../img/notcompleted.png" />
						</div>
					)
				})}
		</div>
	)
}

export const DailyTasks = ({ ShowInfo = true, ShowLvl = true }) => {
	const dispatch = useDispatch()

	const { dailyTasksStatus, countCompletedTasks, isChestAvailable } =
		useSelector((state) => state.dailyTasks)

	const onChestClick = () => {
		if (isChestAvailable) {
			dispatch(openGetRewards())
		} else {
			dispatch(openRewardsNotAvalible())
		}
	}

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
					<CompletedTasks countCompletedTasks={countCompletedTasks} />
					{/* Сундук */}
					<div
						className={
							isChestAvailable
								? styles.DailyTaskIconCompleted
								: styles.DailyTaskIconIncompleted
						}
						onClick={onChestClick}
					>
						<img className={styles.SmallImg} src="../img/chest.png" />
					</div>
				</div>
				{ShowLvl && <ProgressBar />}
			</div>
		</Link>
	)
}
