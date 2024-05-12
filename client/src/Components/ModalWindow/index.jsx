import styles from "./styles.module.css";

export const ModalWindow = (props) => {
    return (
        <div className={styles.ModalWindowWrapper}>
            <div className={styles.ModalWindow}>
                <div className={styles.ModalWindowTitle}>{props.ModalTitleText}</div>
                <div className={styles.ModalWindowText}>{props.ModalText}</div>
                {props.ShowRewards &&
                    (<div className={styles.ModalWindowButtonsWrapper}>
                        <div className={styles.UserBalance}>
                            <p>{props.Balance}</p>
                            <img className={styles.SmallImg} src="../img/crystall.png" />
                        </div>

                        <div className={styles.UserBalance}>
                            <p>{props.Exp + " опыта"}</p>
                        </div>
                    </div>)
                }
                <div className={styles.ModalWindowButtonsWrapper}>
                    {props.CloseButtonShowed &&
                        (<div className={styles.ModalButton}>{props.CloseButtonText}</div>)
                    }

                    {props.ActButtonShowed &&
                        (<div className={styles.ModalMainButton}>{props.ActButtonText}</div>)
                    }
                </div>


            </div>

            <div className={styles.ModalWindowBackground}></div>
        </div>
    );
};
