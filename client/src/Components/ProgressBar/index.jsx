import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const ProgressBar = () => {
	const experience = useSelector((state) => state.user.user.experience)

	const [currentlvl, setCurrentlvl] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const calculatedlvl = Math.floor(experience / 250) + 1
		const calculatedProgress = ((experience % 250) / 250) * 100
		
		setCurrentlvl(calculatedlvl)
		setProgress(calculatedProgress)
	}, [experience])

	return experience && (
		<div className={styles.UserLvlWrapper}>
			<p className="UserCardText">{currentlvl ? currentlvl : 0}</p>
			<div className={styles.UserLvlProgressWrapper}>
				<div
					style={{
						width: `${progress ? progress : 0}%`,
						transition: 'all 0.5s ease-in-out'
					}}
					className={styles.UserLvlProgress}
				></div>
			</div>
			<p className="UserCardText">{currentlvl ? currentlvl + 1 : 1}</p>
		</div>
	)
}
