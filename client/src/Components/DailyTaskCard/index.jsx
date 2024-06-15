import { useGetAlldailyTasksQuery } from '@redux/services/dailyTasksApi'
import { useAddUserDailyTasksMutation, useDeleteUserDailyTaskMutation, useGetUserDailyTasksByIdQuery } from '@redux/services/userApi'
import { openDailyTaskCompleted } from '@redux/slices/modalsSlice'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import { useState } from 'react'
import { getIconPath } from '@shared/api/getIconPath'

export const DailyTaskCard = ({ task }) => {
	const { id, statusId, dueDate, title, description, expAward, iconPath } = task
	const dispatch = useDispatch()

	const [isRefreshAvalible, setRefreshAvalible] = useState(true)

	const { id: userId } = useSelector((state) => state.user.user)

	const { data: userDailyTasks = [] } = useGetUserDailyTasksByIdQuery(userId)

	const { data: allDailyTasks = [] } = useGetAlldailyTasksQuery()

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

	function getCurrentDateWithoutTime() {
		const today = new Date() // Получаем текущую дату и время
		return today.toISOString().split('T')[0] // Возвращаем только дату в формате ГГГГ-ММ-ДД
	}

	const onClickRefresh = async () => {
		// Удаление старого
		await deleteUserDailyTask({ userId, missionId: id })
		// Добавление нового
		await addUserDailyTask({
			userId,
			missionId: getNewMissionId(),
			statusId: 2,
			dueDate: getCurrentDateWithoutTime()
		})
	}

	const onClickOk = async () => {
		// Открытие модального окна для получения опыта за выполнение задания
		dispatch(openDailyTaskCompleted({ id, expAward }))
	}

	return (
		<div className={styles.Card}>
			<div className={styles.DailyTaskTitleWrapper}>
				<div className={styles.DailyTaskTitle}>
					<div className={styles.DailyTaskIcon}>
						<img src={getIconPath(iconPath)} className={styles.DailyTaskImg} />
					</div>
					<p>{title}</p>
				</div>

				{statusId !== 4 && isRefreshAvalible && (
					<>
						<button className={styles.DailyTaskButton} style={{ border: 'none' }} onClick={onClickOk}>
							<i className="fi-sr-check" />
						</button>

						<button className={styles.DailyTaskButton} style={{ border: 'none' }} onClick={onClickRefresh}>
							<i className="fi fi-sr-refresh" />
						</button>
					</>
				)}
			</div>
			<div className={styles.DailyTaskInfoStatusWrapper}>
				<p>{description}</p>

				<div
					style={{
						backgroundColor: statusId === 4 && isRefreshAvalible ? '#CAF05F' : '#EDEDED'
					}}
					className={styles.DailyTaskStatus}
				>
					{statusId === 4 ? 'Выполнено' : 'Выполняется'}
				</div>
			</div>
			<div>dueDate: {dueDate}</div>z
		</div>
	)
}
