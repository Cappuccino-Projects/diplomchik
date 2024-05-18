import styles from './styles.module.css'

export const ModalWindow = ({ isOpen, close, children }) => {
	return (
		isOpen && (
			<div className={styles.ModalWindowWrapper}>
				<div className={styles.ModalWindow}>{children}</div>
				<div className={styles.ModalWindowBackground} onClick={close}></div>
			</div>
		)
	)
}
