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

	function getRandomElements(arr) {
		if (arr.length <= 3) {
			return arr;
		}
	
		let randomIndices = [];
		while (randomIndices.length < 3) {
			let randomIndex = Math.floor(Math.random() * arr.length);
			if (!randomIndices.includes(randomIndex)) {
				randomIndices.push(randomIndex);
			}
		}
	
		let result = [];
		randomIndices.forEach(index => {
			result.push(arr[index]);
		});
	
		return result;
	}

	const onAcceptClick = async () => {
		// Пользователь получает награду
		await updateUserInfo({
			...user,
			balance: user.balance + balance,
			experience: user.experience + xp
		})

		// Удаляются все задания пользвоателя
		await userDailyTasks.forEach((task) => {
			deleteUserDailyTask({ userId: user.id, missionId: task.missionId })
		})

		// Создается список новых заданий
		const randomDailyTasks = getRandomElements(allDailyTasks, 3)
		await randomDailyTasks.forEach((task) => {
			createUserDailyTask({
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
