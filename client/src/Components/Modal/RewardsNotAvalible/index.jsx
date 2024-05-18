import styles from './styles.module.css'

export const RewardsNotAvalible = ({ close }) => {
	return (
		<>
			<div className={styles.ModalWindowTitle}>
				Вы ещё не выполнили задания!
			</div>
			<div className={styles.ModalWindowText}>
				Выполните все задания, чтобы получить награду!
			</div>
			<div className={styles.ModalWindowButtonsWrapper}>
				<div className={styles.ModalButton} onClick={close}>
					Хорошо
				</div>
			</div>
		</>
	)
}
