import { useGetUserDailyTasksByIdQuery } from '@redux/services/userApi'
import {
	openGetRewards,
	openRewardsNotAvalible
} from '@redux/slices/modalsSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { ProgressBar } from '@components/ProgressBar'
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

export const DailyTasks = ({
	ShowInfo = true,
	ShowLvl = true
}) => {
	const activeUserId = useSelector((state) => state.user.user.id)
	const dispatch = useDispatch()
	const [isChestAvailable, setChestAvailable] = useState(false)
	const [countCompletedTasks, setCountCompletedTasks] = useState(0)
	const [status, setStatus] = useState('')

	const statusId = 4
	const { data: userDailyTasks = [], isFetching: isFetchingUserDailyTasks } =
		useGetUserDailyTasksByIdQuery(activeUserId)

	useEffect(() => {
		if (!isFetchingUserDailyTasks) {
			setCountCompletedTasks(
				userDailyTasks.filter((item) => item.statusId === statusId).length
			)
		}
	}, [userDailyTasks])

	useEffect(() => {
		setChestAvailable(countCompletedTasks === 3)
		setStatus(countCompletedTasks < 3 ? 'Выполняется' : 'Выполнено')
	}, [countCompletedTasks])

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
					<div className={styles.DailyTasksStatus}>{status}</div>
				</div>
				{ShowInfo && (
					<p className={styles.DailyTasksAbout}>
						Выполняйте ежедневные задания, чтобы повышать уровень профиля
					</p>
				)}
				<div className={styles.DailyTasksIconsWrapper}>
					<CompletedTasks countCompletedTasks={countCompletedTasks} />
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
				{ShowLvl && <ProgressBar/>}
			</div>
		</Link>
	)
}
