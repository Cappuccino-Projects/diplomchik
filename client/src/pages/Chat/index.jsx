import styles from './styles.module.css'

export const Chat = (props) => {
	const { places, city } = props

	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.Title}>
				<LogoWrapper city={city} />
				<MinimizeMenuButton />
			</div>
			<BackToMainMenu />
			<div className="ChatBlock">
				<ChatWidget />
			</div>
		</div>
	)
}
