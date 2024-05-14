import styles from './styles.module.css'
import { ModalWindow } from '@components'

export const ModalRewards = ({ isShowModal, close, act, rewards }) => {
	return (
		<ModalWindow isShowModal={isShowModal} close={close} act={act} actButtonText = 'Получить награду'>
			<div className={styles.ModalWindowTitle}>
				Ежедневные задания выполнены!
			</div>
			<div className={styles.ModalWindowText}>
				Вы хорошо постарались и заслужили награду!
			</div>

			<div className={styles.ModalWindowButtonsWrapper}>
				<div className={styles.UserBalance}>
					<p>{rewards.balance}</p>
					<img className={styles.SmallImg} src="../img/crystall.png" />
				</div>

				<div className={styles.UserBalance}>
					<p>{rewards.exp + ' опыта'}</p>
				</div>
			</div>
		</ModalWindow>
	)
}
