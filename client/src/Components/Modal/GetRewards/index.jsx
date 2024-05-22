import { useUpdateUserInfoByIdMutation } from '@app/redux/services/userApi'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

export const GetRewards = ({ close }) => {
	const [updateUserInfo] = useUpdateUserInfoByIdMutation()
	const user = useSelector((state) => state.user.user)
	
	const balance = 35
	const xp = 30

	const onAcceptClick = async () => {
		const updateUser = {
			...user,
			balance: user.balance + balance,
			experience: user.experience + xp
		}
		console.log("updateUser", updateUser)
		await updateUserInfo(updateUser)
		// ТУТ НАДО СБРОСИТЬ ЗАДАНИЯ
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

			<div className={styles.ModalWindowButtonsWrapper}>
				<div className={styles.UserBalance}>
					<p>{balance} </p>
					<img className={styles.SmallImg} src="../img/crystall.png" />
				</div>

				<div className={styles.UserBalance}>
					<p>{xp + ' опыта'}</p>
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
