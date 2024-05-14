import styles from './styles.module.css'

export const ModalWindow = ({
	isShowModal = false,
	close,
	act,
	actButtonText = 'Действие',
	isActButtonShowed = true,
	сloseButtonText = 'Закрыть',
	isCloseButtonShowed = true,
	children
}) => {
	return (
		isShowModal && (
			<div className={styles.ModalWindowWrapper}>
				<div className={styles.ModalWindow}>
					{children}
					<div className={styles.ModalWindowButtonsWrapper}>
						{isCloseButtonShowed && (
							<div className={styles.ModalButton} onClick={close}>
								{сloseButtonText}
							</div>
						)}

						{isActButtonShowed && (
							<div className={styles.ModalMainButton} onClick={act}>
								{actButtonText}
							</div>
						)}
					</div>
				</div>
				<div className={styles.ModalWindowBackground} onClick={close}></div>
			</div>
		)
	)
}
