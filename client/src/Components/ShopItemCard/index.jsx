import styles from './styles.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { buyItem } from '@redux/slices/shopSlice'
import { decreaseBalance } from '@redux/slices/userSlice'

export const ShopItemCard = ({ item }) => {
	const dispatch = useDispatch()
	const UserBalance = useSelector((state) => state.user.UserBalance)
	const IconBackColor = item.ItemBackgroundColor

	const buy = () => {
		// !!! Доработать
		if (UserBalance >= item.ItemPrice) {
			dispatch(buyItem(item.ItemId))
			dispatch(decreaseBalance(item.ItemPrice))
		}
	}

	return (
		<div className={styles.ShopItemCard}>
			{item.ItemCategory === 'Avatar Frame' && (
				<div className={styles.StopItemsImageWrapper}>
					<img
						className={styles.ShopItemAvatarFrame}
						src={'../img/' + item.ItemImage}
					/>
					<img
						className={styles.ShopItemUserImage}
						src="../img/User1Avatar.png"
					/>
				</div>
			)}
			{item.ItemCategory !== 'Avatar Frame' && (
				<div
					className={styles.StopItemsImageWrapper}
					style={{
						backgroundColor: IconBackColor,
						border: '1px rgba(0, 0, 0, 0.1) solid'
					}}
				>
					<img
						className={styles.ShopItemImage}
						src={'../img/' + item.ItemImage}
					/>
				</div>
			)}
			<p style={{ marginBottom: 'auto' }}>{item.ItemName}</p>

			{!item.ItemObtained && (
				<div className={styles.UserBalance} onClick={buy}>
					<p>{item.ItemPrice}</p>
					<img className={styles.SmallImg} src="../img/crystall.png" />
				</div>
			)}
			{item.ItemObtained && (
				<div className={styles.CardButtonsWrapper}>
					<div
						className={styles.CardMainButton}
						onClick={() => alert('Используем')}
					>
						Использовать
					</div>
					<div
						className={styles.CardButton}
						onClick={() => alert('Не используем')}
					>
						Не использовать
					</div>
				</div>
			)}
		</div>
	)
}
