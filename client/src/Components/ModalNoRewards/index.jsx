import styles from './styles.module.css'
import { ModalWindow } from '@components'

export const ModalNoRewards = ({ isShowModal, close }) => {
	return (
		<ModalWindow
			isShowModal={isShowModal}
			close={close}
			isActButtonShowed={false}
		>
			<div className={styles.ModalWindowTitle}>Вы ещё не выполнили задания! </div>
			<div className={styles.ModalWindowText}>Выполните все задания, чтобы получить награду!</div>
		</ModalWindow>
	)
}
