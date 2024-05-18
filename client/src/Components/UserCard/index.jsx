import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { ProgressBar } from '@components'
import { useSelector } from 'react-redux'

const getWord = (num) => {
	if (num % 10 === 1 && num % 100 !== 11) {
		return 'фантик'
	} else if (
		[2, 3, 4].includes(num % 10) &&
		![12, 13, 14].includes(num % 100)
	) {
		return 'фантика'
	} else {
		return 'фантиков'
	}
}

export const UserCard = ({ ShowLvl = true, ShowBalance = true }) => {
	const { UserName, UserRole, UserBalance } = useSelector((state) => state.user)

	return (
		<Link to="/profile">
			<div className={styles.UserCardWrapper}>
				<div className={styles.UserInfoWrapper}>
					<img className={styles.UserCardImage} src="../img/User1Avatar.png" />
					<img className={styles.UserFrameImage} src="../img/frame1.png" />
					<div className={styles.UserCardInfo}>
						<p className={styles.UserName}>{UserName}</p>
						<p className={styles.UserRole}>{UserRole}</p>
					</div>
				</div>
				{/* ProgressBar */}
				{ShowLvl && <ProgressBar />}
				{/* UserBalance */}
				{ShowBalance && (
					<div className={styles.UserLvlWrapper}>
						{/* Нет UserCardText */}
						<p>Баланс</p>
						<div className={styles.UserBalance}>
							{/* Нет UserCardText */}
							<p>{`${UserBalance}  ${getWord(UserBalance)}`}</p>
							<img className={styles.SmallImg} src="../img/crystall.png" />
						</div>
					</div>
				)}
			</div>
		</Link>
	)
}
