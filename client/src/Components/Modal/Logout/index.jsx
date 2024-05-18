import styles from './styles.module.css'

export const Logout = ({ close }) => {
	return (
		<>
			<div className={styles.ModalWindowTitle}>
				Вы уверены, что хотите выйти?
			</div>
			<div className={styles.ModalWindowText}>
				Вы будете перенаправлены на страницу авторизации
			</div>
            <div className={styles.ModalWindowButtonsWrapper}>
				<div className={styles.ModalButton} onClick={close}>
					Отмена
				</div>
				<div className={styles.ModalMainButton} onClick={close}>
					Выйти
				</div>
			</div>
		</>
	)
}
