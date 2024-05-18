import React from 'react'
import styles from './styles.module.css'

export const CharacterCard = () => {
  return (
    <div className={styles.Card}>
        <div className={styles.CharacterPictureWrapper}>
            <img src='../img/vampirebg.png' className={styles.CharacterPicture}></img>
        </div>
        <p className={styles.CharacterText}>Миша</p>
    </div>
  )
}
