import { getRewards } from '@redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'

export const GetRewards = ({ close }) => {
	const dispatch = useDispatch()

	const rewards = {
		xp: 30
	}
	const onAcceptClick = () => {
		dispatch(getRewards(rewards))
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
				<div className={styles.UserBalance}>
					<p>{rewards.xp + ' опыта'}</p>
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
