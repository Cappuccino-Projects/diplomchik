import styles from './styles.module.css'

export const Favourite = (props) => {
	const { locations } = props

	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.MenuTopButtonsWrapper}>
				<BackToMainMenu />
				<MinimizeMenuButton />
			</div>
			<p className={styles.TitleText}>Избранное</p>
			<LocationsWrapper locations={locations} />
			<UserCard ShowLvl={false} ShowBalance={false} IsItProfilePage={false} />
		</div>
	)
}
