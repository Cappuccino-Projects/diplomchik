import styles from './styles.module.css'

import { useUpdateUserProductActiveByIdMutation } from '@redux/services/userApi'
export const InventoryItemCard = ({ item }) => {
	// active: 0
	// iconPath: "avatar_frame2"
	// id: 2
	// name: "Киберпанк"
	// price: 200
	// type: null
	// typeId: 2,

	const [activateProduct, { isError }] =
		useUpdateUserProductActiveByIdMutation()

	const onActivateClick = async () => {
		const data = { userId: 1, productId: item.id, active: 1 }
		await activateProduct(data)
	}
	
	const onDeactivateClick = async () => {
		const data = { userId: 1, productId: item.id, active: 0 }
		await activateProduct(data)
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
						src={'../img/' + item.ItemImage}
					/>
				</div>
			)}
			<p style={{ marginBottom: 'auto' }}>{item.name}</p>

			<div className={styles.CardButtonsWrapper}>
				{item.active === 0 ? (
					<div className={styles.CardMainButton} onClick={onActivateClick}>
						Использовать
					</div>
				) : (
					<div className={styles.CardButton} onClick={onDeactivateClick}>Используется</div>
				)}
			</div>
		</div>
	)
}
