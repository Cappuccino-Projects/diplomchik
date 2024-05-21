import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const ProgressBar = () => {
	const experience = useSelector((state) => state.user.user.experience)

	const [currentlvl, setCurrentlvl] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		setCurrentlvl(Math.floor(experience / 250) + 1)
		setProgress(((experience % 250) / 250) * 100)
	}, [experience])

	return (
		<div className={styles.UserLvlWrapper}>
			<p className="UserCardText">{currentlvl}</p>
			<div className={styles.UserLvlProgressWrapper}>
				<div
					style={{ width: `${progress}%`, transition: 'all 0.5s ease-in-out' }}
					className={styles.UserLvlProgress}
				></div>
			</div>
			<p className="UserCardText">{currentlvl + 1}</p>
		</div>
	)
}
