import { useGetAlldailyTasksQuery } from '@redux/services/dailyTasksApi'
import {
	useAddUserDailyTasksMutation,
	useDeleteUserDailyTaskMutation,
	useGetUserDailyTasksByIdQuery
} from '@redux/services/userApi'
import { openDailyTaskCompleted } from '@redux/slices/modalsSlice'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'

export const DailyTaskCard = ({ task }) => {
	const { id, statusId, title, description, expAward, iconPath } = task
	const dispatch = useDispatch()
	const isRefreshAvalible = true

	const { id: userId } = useSelector((state) => state.user.user)

	const { data: userDailyTasks = [], isFetching: isFetchingUserDailyTasks } =
		useGetUserDailyTasksByIdQuery(userId)

	const { data: allDailyTasks = [], isFetching: isFetchingAllDailyTasks } =
		useGetAlldailyTasksQuery()

	const [deleteUserDailyTask] = useDeleteUserDailyTaskMutation()
	const [addUserDailyTask] = useAddUserDailyTasksMutation()

	const getNewMissionId = () => {
		const a = allDailyTasks.map((dailyTask) => dailyTask.id)
		const b = userDailyTasks.map((dailyTask) => dailyTask.missionId)
		const currentList = a.filter((id) => !b.includes(id))

		const randomIndex = Math.floor(Math.random() * currentList.length)
		const randomElement = currentList[randomIndex]

		return randomElement
	}

	const onClickRefresh = async () => {
		// Удаление старого
		await deleteUserDailyTask({ userId, missionId: id })
		// Добавление нового
		await addUserDailyTask({
			userId,
			missionId: getNewMissionId(),
			statusId: 2
		})
	}

	const onClickOk = async () => {
		dispatch(openDailyTaskCompleted({ id, expAward }))
	}

	return (
		<div className={styles.Card}>
			<div className={styles.DailyTaskTitleWrapper}>
				<div className={styles.DailyTaskTitle}>
					<div className={styles.DailyTaskIcon}>
						<img
							src={`http://places.d3s.ru:9088/bucket/${iconPath}`}
							className={styles.DailyTaskImg}
						/>
					</div>
					<p>{title}</p>
				</div>

				{statusId !== 4 && isRefreshAvalible && (
					<>
						<button className={styles.DailyTaskButton} style={{border: "none"}} onClick={onClickOk}>
							<i className="fi-sr-check" />
						</button>

						<button className={styles.DailyTaskButton} style={{border: "none"}} onClick={onClickRefresh}>
							<i className="fi fi-sr-refresh" />
						</button>
					</>
				)}
			</div>

			<div className={styles.DailyTaskInfoStatusWrapper}>
				<p>{description}</p>

				<div
					style={{
						backgroundColor:
							statusId === 4 && isRefreshAvalible ? '#CAF05F' : '#EDEDED'
					}}
					className={styles.DailyTaskStatus}
				>
					{statusId === 4 ? 'Выполнено' : 'Выполняется'}
				</div>
			</div>
		</div>
	)
}
