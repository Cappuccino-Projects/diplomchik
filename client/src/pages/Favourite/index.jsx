import {
	BackToMainMenu,
	LocationsWrapper,
	UserCard
} from '@components'
import styles from './styles.module.css'

export const Favourite = (props) => {
	const { locations } = props

	return (
		<>
			<BackToMainMenu />

			<p className={styles.TitleText}>Избранное</p>
			<LocationsWrapper locations={locations} />
			<UserCard ShowLvl={false} ShowBalance={false} IsItProfilePage={false} />
		</>
	)
}
