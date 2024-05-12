import styles from './styles.module.css'

export const ProgressBar = ({ currentlvl = 0, value = 0 }) => {
	// props: {
    //     currentlvl - уровень сейчас,
    //     value - процент 
    // }

	// !!! Нет UserCardText
	return (
		<div className={styles.UserLvlWrapper}>
			<p className="UserCardText">{currentlvl}</p>
			<div className={styles.UserLvlProgressWrapper}>
				<div
					style={{ width: `${value}%` }}
					className={styles.UserLvlProgress}
				></div>
			</div>
			<p className="UserCardText">{currentlvl + 1}</p>
		</div>
	)
}
