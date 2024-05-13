import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const ProgressBar = () => {
	const { currentlvl, value } = useSelector(
		(state) => state.dailyTasks.progressBar
	)

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
