import {
	useAddUserDailyTasksMutation,
	useDeleteUserDailyTaskMutation,
	useGetUserDailyTasksByIdQuery,
	useUpdateUserInfoByIdMutation
} from '@redux/services/userApi'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'
import { useGetAlldailyTasksQuery } from '@redux/services/dailyTasksApi'

export const GetRewards = ({ close }) => {
	const user = useSelector((state) => state.user.user)

	const [updateUserInfo] = useUpdateUserInfoByIdMutation()
	const [deleteUserDailyTask] = useDeleteUserDailyTaskMutation()
	const [createUserDailyTask] = useAddUserDailyTasksMutation()

	const { data: userDailyTasks } = useGetUserDailyTasksByIdQuery(user.id)
	const { data: allDailyTasks } = useGetAlldailyTasksQuery()

	const balance = 35
	const xp = 30

	function getRandomElements(array, count) {
		const shuffled = array.sort(() => 0.5 - Math.random())
		return shuffled.slice(0, count)
	}

	const onAcceptClick = async () => {
		const updateUser = {
			...user,
			balance: user.balance + balance,
			experience: user.experience + xp
		}
		await updateUserInfo(updateUser)

		userDailyTasks.forEach(async (task) => {
			await deleteUserDailyTask(task.id)
		})

		const randomDailyTasks = getRandomElements(allDailyTasks, 3)
		randomDailyTasks.forEach(async (task) => {
			await createUserDailyTask({
				userId: user.id,
				statusId: 2,
				missionId: task.id
			})
		})

		close()
	}

	return (
		<>
			<div className={styles.ModalWindowTitle}>
				Ежедневные задания выполнены!
			</div>
			<div className={styles.ModalWindowText}>
				Вы хорошо постарались и заслужили награду!
			</div>
			<div
				className={styles.ModalWindowButtonsWrapper}
				style={{ margin: 'auto' }}
			>
				<div className={styles.UserBalance}>
					<p>{balance} </p>
					<img className={styles.SmallImg} src="../img/crystall.png" />
				</div>

				<div className={styles.UserBalance}>
					<p>{xp + ' опыта'}</p>
				</div>
			</div>
			<div className={styles.ModalWindowButtonsWrapper}>
				<button
					className={styles.ModalButton}
					style={{ border: 'none' }}
					onClick={close}
				>
					Отмена
				</button>

				<button
					className={styles.ModalMainButton}
					style={{ border: 'none' }}
					onClick={onAcceptClick}
				>
					Забрать
				</button>
			</div>
		</>
	)
}
