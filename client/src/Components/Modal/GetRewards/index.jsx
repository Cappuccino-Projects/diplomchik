import { getRewards } from '@redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'

export const GetRewards = ({ close }) => {
	const dispatch = useDispatch()

	const rewards = {
		xp: 30,
		balance: 35
	}
	const onAcceptClick = () => {
		dispatch(getRewards(rewards))
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
					<p>{rewards.balance} </p>
					<img className={styles.SmallImg} src="../img/crystall.png" />
				</div>

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
