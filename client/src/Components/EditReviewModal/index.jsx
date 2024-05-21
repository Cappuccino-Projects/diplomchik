import React from 'react'
import styles from './styles.module.css'

export const EditReviewModal = () => {
    return (
        <div className={styles.ModalWindowWrapper}>
            <div style={{ gap: "10px" }} className={styles.ModalWindow}>
                <div className={styles.ModalWindowTitle}>
                    Редактирование отзыва
                </div>
                <div className={styles.Text}>
                    Название места
                </div>
                <input style={{ height: "32px", marginTop: "5px" }} className='MenuTextArea' placeholder='Ботанический сад'></input>
                <div className={styles.ModalWindowText}>
                    Категория
                </div>
                <input style={{ height: "32px" }} className='MenuTextArea' placeholder='Культура и отдых'></input>
                <div className={styles.ModalWindowText}>
                    Комментарий
                </div>
                <input style={{ height: "32px" }} className='MenuTextArea' placeholder='Поделитесь впечатлениями'></input>
                <div className={styles.ModalWindowText}>
                    Фотографии
                </div>
                <div className='LocationCardImageWrapper'>
                    <div className={styles.LocationCardImage}>
                        <div className={styles.DeleteImageButton}><i className="fi fi-sr-cross-small"></i></div>
                        <img
                            src={"../img/place2.jpg"}
                            className={styles.LocationImage}
                        ></img>
                    </div>

                    <div className={styles.LocationCardImage}>
                        <div className={styles.DeleteImageButton}><i className="fi fi-sr-cross-small"></i></div>
                        <img
                            src={"../img/place2.jpg"}
                            className={styles.LocationImage}
                        ></img>
                    </div>

                    <div className={styles.LocationCardImage}>
                        <div className={styles.AddImageButton}><i className="fi fi-sr-plus-small"></i></div>
                        <img
                            className={styles.LocationImage}
                        ></img>
                    </div>
                </div>

                <div className={styles.ModalWindowText}>
                    Оценка
                </div>
                <div className='LocationCardImageWrapper'>
                    <button className={styles.RatingNotActive}>1</button>
                    <button className={styles.RatingNotActive}>2</button>
                    <button className={styles.RatingNotActive}>3</button>
                    <button className={styles.RatingActive}>4</button>
                    <button className={styles.RatingNotActive}>5</button>
                </div>

                <div className={styles.ModalWindowButtonsWrapper}>
				<div className={styles.ModalButton}>
					Удалить
				</div>
				<div className={styles.ModalMainButton}>
					Сохранить
				</div>
			</div>
            </div>
            <div className={styles.ModalWindowBackground} onClick={close}></div>
        </div>
    )
}
