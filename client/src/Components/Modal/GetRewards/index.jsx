import { useUpdateUserInfoByIdMutation, useDeleteUserDailyTaskMutation, useGetUserDailyTasksByIdQuery } from '@app/redux/services/userApi'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

export const GetRewards = ({ close }) => {
	const user = useSelector((state) => state.user.user)
	
	const [updateUserInfo] = useUpdateUserInfoByIdMutation()
	const [deleteUserDailyTask] = useDeleteUserDailyTaskMutation()

	const { data: userDailyTasks } = useGetUserDailyTasksByIdQuery(user.id)
	
	const balance = 35
	const xp = 30

	const onAcceptClick = async () => {
		const updateUser = {
			...user,
			balance: user.balance + balance,
			experience: user.experience + xp
		}

		await updateUserInfo(updateUser)
		// ТУТ НАДО СБРОСИТЬ ЗАДАНИЯ

		//УДАЛЯЮ ВСЕ ЗАДАНИЯ
		userDailyTasks.forEach(task => {
			deleteUserDailyTask(task.id)
		});

		// СОЗДАЮ 3 ЗАДАНИЯ

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
				<button className={styles.ModalButton} onClick={close}>
					Отмена
				</button>

				<button className={styles.ModalMainButton} onClick={onAcceptClick}>
					Забрать
				</button>
			</div>
		</>
	)
}
