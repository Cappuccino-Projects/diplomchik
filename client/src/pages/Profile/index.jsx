import {
	BackToMainMenu,
	DailyTasks,
	LocationsWrapper,
	MinimizeMenuButton,
	UserCard,
	ChangesWrapper
} from '@components'

import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { useState } from 'react'

export const Profile = () => {
	const [isShowReviews, setShowReviews] = useState(true)

	return (
		<div className={styles.MenuWrapper}>
			<div className={styles.MenuTopButtonsWrapper}>
				<BackToMainMenu />
				<Link to="/profile/settings">
					<div className={styles.SecondarySmallButton}>
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
					<div className={styles.MenuButton}>
						<img className={styles.SmallImg} src="../img/shop.png" />
						<p>В магазин</p>
					</div>
				</Link>

				<Link to="/inventory">
					<div className={styles.MenuButton}>
						<img className={styles.SmallImg} src="../img/backpack.png" />
						<p>Инвентарь</p>
					</div>
				</Link>
			</div>

			<div className={styles.ProfileSwitch}>
				<p
					onClick={() => setShowReviews(true)}
					className={
						isShowReviews ? styles.ActiveSwitchText : styles.SwitchText
					}
				>
					Отзывы
				</p>
				<p
					onClick={() => setShowReviews(false)}
					className={
						isShowReviews ? styles.SwitchText : styles.ActiveSwitchText
					}
				>
					Изменения
				</p>
			</div>
			{isShowReviews ? <LocationsWrapper /> : <ChangesWrapper />}
		</div>
	)
}
