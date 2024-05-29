import { useUpdateUserInfoByIdMutation } from '@app/redux/services/userApi'
import { useUpdateUserDailyTasksByIdMutation } from '@redux/services/userApi'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

export const DailyTaskCompleted = ({ close }) => {
	const [updateUserInfo] = useUpdateUserInfoByIdMutation()
	const [updateUserDailyTask] = useUpdateUserDailyTasksByIdMutation()
	const user = useSelector((state) => state.user.user)
	const { id, expAward } = useSelector(
		(state) => state.modals.data.editCompletedDailyTask
	)

	const onAcceptClick = async () => {
		const updateUser = {
			...user,
			experience: user.experience + expAward
		}
		await updateUserInfo(updateUser)
		await updateUserDailyTask({ userId: user.id, missionId: id, statusId: 4 })
		close()
	}

	return (
		<>
			<div className={styles.ModalWindowTitle}>
				Ежедневное задание выполнено!
			</div>
			<div className={styles.ModalWindowText}>
				Выполните оставшиеся, чтобы получить все награды
			</div>

			<div className={styles.ModalWindowButtonsWrapper}>
				<div className={styles.UserBalance} style={{margin: "auto"}}>
					<p>{expAward + ' опыта'}</p>
				</div>
			</div>
			<div className={styles.ModalWindowButtonsWrapper}>
				<div className={styles.ModalButton} onClick={close}>
					Отмена
				</div>

				<div className={styles.ModalMainButton} onClick={onAcceptClick}>
					Забрать
				</div>
			</div>
		</>
	)
}
