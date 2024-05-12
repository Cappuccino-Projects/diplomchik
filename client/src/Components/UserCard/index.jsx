import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const UserCard = (props) => {

	return (
		<Link to="/profile">
			<div className={styles.UserCardWrapper}>
				<div className={styles.UserInfoWrapper}>
					<img className={styles.UserCardImage} src="../img/User1Avatar.png" />
					<img className={styles.UserFrameImage} src="../img/frame1.png" />
					<div className={styles.UserCardInfo}>
						<p className={styles.UserName}>Щуковская Анастасия</p>
						<p className={styles.UserRole}>Проверенный пользователь </p>
					</div>
				</div>
				{props.ShowLvl && (
					<div className={styles.UserLvlWrapper}>
						{/* Нет UserCardText */}
						<p className="UserCardText">6</p>
						<div className={styles.UserLvlProgressWrapper}>
							<div
								style={{ width: '16%' }}
								className={styles.UserLvlProgress}
							></div>
						</div>
						{/* Нет UserCardText */}
						<p className="UserCardText">7</p>
					</div>
				)}
				{props.ShowBalance && (
					<div className={styles.UserLvlWrapper}>
						{/* Нет UserCardText */}
						<p className="UserCardText">Баланс</p>
						<div className={styles.UserBalance}>
							{/* Нет UserCardText */}
							<p className="UserCardText">542 фантики</p>
							<img className={styles.SmallImg} src="../img/crystall.png" />
						</div>
					</div>
				)}
			</div>
		</Link>
	)
}
