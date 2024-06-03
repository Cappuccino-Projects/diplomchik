import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import { openBuyConfirm } from '@app/redux/slices/modalsSlice'

export const ShopItemCard = ({ item }) => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.user)

	const onClickBuy = () => {
		dispatch(openBuyConfirm(item))
	}

	return (
		<div className={styles.ShopItemCard}>
			{item.typeId === 2 && (
				<div className={styles.StopItemsImageWrapper}>
					<img
						className={styles.ShopItemAvatarFrame}
						src={`../img/${item.iconPath}.png`}
					/>
					<img
						className={styles.ShopItemUserImage}
						src={`http://places.d3s.ru:9088/bucket/${user.avatarPath}`}
					/>
				</div>
			)}
			{item.typeId === 1 && (
				<div
					className={styles.StopItemsImageWrapper}
					style={{
						backgroundColor: item.ItemBackgroundColor,
						border: '1px rgba(0, 0, 0, 0.1) solid'
					}}
				>
					<img
						className={styles.ShopItemImage}
						src={`../img/${item.iconPath}.png`}
					/>
				</div>
			)}
			<p style={{ marginBottom: 'auto' }}>{item.name}</p>
			<div
				className={styles.UserBalance}
				onClick={onClickBuy}
				style={user.balance <= item.price ? { backgroundColor: '#ededed' } : {}}
			>
				<p>{item.price}</p>
				<img className={styles.SmallImg} src="../img/crystall.png" />
			</div>
		</div>
	)
}
