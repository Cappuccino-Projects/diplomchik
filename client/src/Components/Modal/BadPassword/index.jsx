import styles from './styles.module.css'

export const BadPassword = ({ close }) => {
    return (
        <>
            <div className={styles.ModalWindowTitle}>
                Неправильный текущий пароль
            </div>
            <div className={styles.ModalWindowText}>
                Неправильный текущий пароль!
            </div>
            <div className={styles.ModalWindowButtonsWrapper}>
                <div className={styles.ModalButton} onClick={close}>
                    Хорошо, я исправлю
                </div>
            </div>
        </>
    )
}
