import { useGetProductByIdQuery } from '@app/redux/services/productsApi'
import { useGetUserActivateItemsQuery } from '@app/redux/services/userApi'
import { ProgressBar } from '@components'
import { useGetRankByIdQuery } from '@redux/services/rankApi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getIconPath } from '@shared/api/getIconPath'
import styles from './styles.module.css'

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
	const user = useSelector((state) => state.user.user)

	const { data: rank } = useGetRankByIdQuery(user.rankId)
	const {
		data: userActivateItems = {},
		isSuccess: isSuccessUserActivateItems
	} = useGetUserActivateItemsQuery(user.id)

	const { data: avatar = {}, isSuccess: isSuccessAvatar } =
		useGetProductByIdQuery(userActivateItems.avatar)

	return (
		<Link to="/profile">
			<div className={styles.UserCardWrapper}>
				<div className={styles.UserInfoWrapper}>
					<img
						className={styles.UserCardImage}
						src={
							user.avatarPath
								? getIconPath(user.avatarPath)
								: getIconPath("default-avatar")
						}
					/>
					{isSuccessAvatar && (
						<img
							className={styles.UserFrameImage}
							src={getIconPath(avatar.iconPath)}
						/>
					)}

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
							<img className={styles.SmallImg} src={getIconPath('crystall')} />
						</div>
					</div>
				)}
			</div>
		</Link>
	)
}
