import { useSelector } from 'react-redux'
import styles from './styles.module.css'

import {
	useGetUserActivateItemsQuery,
	useUpdateUserActivateItemsMutation
} from '@redux/services/userApi'

export const InventoryItemCard = ({ item }) => {
	const userId = useSelector((state) => state.user.user.id)

	const [updateActivateProduct] = useUpdateUserActivateItemsMutation()

	const { data: activateProducts = {} } = useGetUserActivateItemsQuery(userId)

	const onActivateClick = async () => {
		const data = {
			userId: userId,
			avatar: item.typeId === 2 ? item.id : activateProducts.avatar,
			character: item.typeId === 1 ? item.id : activateProducts.character
		}
		await updateActivateProduct(data)
	}

	const onDeactivateClick = async () => {
		const data = {
			userId: userId,
			avatar: item.typeId === 2 ? null : activateProducts.avatar,
			character: item.typeId === 1 ? null : activateProducts.character
		}
		await updateActivateProduct(data)
	}

	return (
		<div className={styles.ShopItemCard}>
			{item.typeId === 2 && (
				<div className={styles.StopItemsImageWrapper}>
					<img
						className={styles.ShopItemAvatarFrame}
						src={`http://places.d3s.ru:9088/bucket/${item.iconPath}`}
					/>
					<img
						className={styles.ShopItemUserImage}
						src="../img/User1Avatar.png"
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
						src={`http://places.d3s.ru:9088/bucket/${item.iconPath}`}
					/>
				</div>
			)}
			<p style={{ marginBottom: 'auto' }}>{item.name}</p>

			<div className={styles.CardButtonsWrapper}>
				{activateProducts.avatar === item.id ||
				activateProducts.character === item.id ? (
					<div className={styles.CardButton} onClick={onDeactivateClick}>
						Используется
					</div>
				) : (
					<div className={styles.CardMainButton} onClick={onActivateClick}>
						Использовать
					</div>
				)}
			</div>
		</div>
	)
}
