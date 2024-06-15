import { DailyTaskCard } from '@components'
import styles from './styles.module.css'
import { useGetUserDailyTasksByIdQuery } from '@redux/services/userApi'
import { useGetAlldailyTasksQuery } from '@redux/services/dailyTasksApi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const DailyTasksWrapper = () => {
	//!!!
	const activeUserId = useSelector((state) => state.user.user.id)
	
	const { data: userDailyTasks = [], isFetching: isFetchingUserDailyTasks } =
		useGetUserDailyTasksByIdQuery(activeUserId)

	const { data: allDailyTasks = [], isFetching: isFetchingAllDailyTasks } =
		useGetAlldailyTasksQuery()

	const [currentDailyTasks, setCurrentDailyTasks] = useState([])

	useEffect(() => {
		if (!isFetchingUserDailyTasks && !isFetchingAllDailyTasks) {
			const userProductIds = userDailyTasks.map((up) => up.missionId)
			const currentDailyTasks = allDailyTasks
				.filter((p) => userProductIds.includes(p.id))
				.map((p) => {
					const userProduct = userDailyTasks.find((up) => up.missionId === p.id)
					return { ...p, statusId: userProduct.statusId, dueDate: userProduct.dueDate }
				})
			
			setCurrentDailyTasks(currentDailyTasks)
		}
	}, [userDailyTasks, allDailyTasks])

	return (
		<div style={{ marginBottom: '30px' }} className={styles.CardsWrapper}>
			{currentDailyTasks.map((task) => (
				<DailyTaskCard key={task.id} task={task} />
			))} 
		</div>
	)
}
