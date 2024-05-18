import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const ProgressBar = () => {
	const UserExp = useSelector((state) => state.user.UserExp)

	const [currentlvl, setCurrentlvl] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		setCurrentlvl(Math.floor(UserExp / 250) + 1)
		setProgress(((UserExp % 250) / 250) * 100)
	}, [UserExp])

	return (
		<div className={styles.UserLvlWrapper}>
			<p className="UserCardText">{currentlvl}</p>
			<div className={styles.UserLvlProgressWrapper}>
				<div
					style={{ width: `${progress}%` }}
					className={styles.UserLvlProgress}
				></div>
			</div>
			<p className="UserCardText">{currentlvl + 1}</p>
		</div>
	)
}
