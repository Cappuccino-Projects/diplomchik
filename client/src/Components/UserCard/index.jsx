import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { ProgressBar } from '@components'
import { useGetUserByIdQuery } from '@app/redux/services/userApi'
import { useSelector } from 'react-redux'
import { useGetRankByIdQuery } from '@redux/services/rankApi'
import { useEffect, useState } from 'react'
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

// avatarPath: null
// balance: 0
// city: null
// cityId: 1
// displayName: "Test User"
// email: "test@example.com"
// experience: 0
// id: 1
// login: "test"
// passwordHash: "123"
// rank: null
// rankId: 1
// theme: null
// themeId: null

export const UserCard = ({ ShowLvl = true, ShowBalance = true }) => {
	const user = useSelector((state) => state.user.user)

	const { data: rank } = useGetRankByIdQuery(user.rankId)

	

	return (
		<Link to="/profile">
			<div className={styles.UserCardWrapper}>
				<div className={styles.UserInfoWrapper}>
					<img
						className={styles.UserCardImage}
						src={user.avatarPath ? user.avatarPath : '../img/User1Avatar.png'}
					/>
					<img className={styles.UserFrameImage} src="../img/frame1.png" />

					<div className={styles.UserCardInfo}>
						<p className={styles.UserName}>{user?.displayName}</p>
						<p className={styles.UserRole}>{rank?.name}</p>
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
							<p>{`${user?.balance}  ${getWord(user?.balance)}`}</p>
							<img className={styles.SmallImg} src="../img/crystall.png" />
						</div>
					</div>
				)}
			</div>
		</Link>
	)
}
