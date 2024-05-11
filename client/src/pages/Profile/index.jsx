import {
	BackToMainMenu,
	MinimizeMenuButton,
	UserCard,
	DailyTasks,
	ProfileSwitch,
	LocationsWrapper
} from '@components'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const Profile = () => {
	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.MenuTopButtonsWrapper}>
				<BackToMainMenu />
				<Link to="/profile/settings">
					<div className="SecondarySmallButton">
						<i className="fi fi-sr-settings" />
						<p>Настройки</p>
					</div>
				</Link>
				<MinimizeMenuButton />
			</div>

			<UserCard ShowLvl={true} ShowBalance={true} IsItProfilePage={true} />
			<DailyTasks ShowInfo={true} ShowLvl={false} />

			<div className={styles.MainMenuButtonsWrapper}>
				<Link to="/shop">
					<div className={styles.MainMenuButton}>
						<img className="SmallImg" src="../img/shop.png" />
						<p>В магазин</p>
					</div>
				</Link>
			</div>
			<ProfileSwitch />
			<LocationsWrapper locations={props.locations} />
			<br></br>
		</div>
	)
}
