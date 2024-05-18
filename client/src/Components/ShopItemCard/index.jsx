import { openBuyConfirm } from '@redux/slices/modalsSlice'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'

import { setEditCharacter, setEditAvatar } from '@redux/slices/userSlice'

export const ShopItemCard = ({ item }) => {
	const dispatch = useDispatch()
	const UserBalance = useSelector((state) => state.user.UserBalance)

	const [isEdit, setEdit] = useState(false)

	const editCharacter = useSelector((state) => state.user.Edit.Character)
	const editAvatar = useSelector((state) => state.user.Edit.Avatar)

	useEffect(() => {
		if (item.ItemId === editCharacter.ItemId || item.ItemId === editAvatar.ItemId) {
			setEdit(true)
		}
		if (item.ItemId !== editCharacter.ItemId && item.ItemId !== editAvatar.ItemId) {
			setEdit(false)
		}
	}, [editCharacter, editAvatar])

	const onClickBuy = () => {
		if (UserBalance >= item.ItemPrice) {
			dispatch(openBuyConfirm(item))
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
			{item.ItemCategory === 'Character' && (
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
			<p style={{ marginBottom: 'auto' }}>{item.ItemName}</p>
			{/* Магазин */}
			{!item.ItemObtained && (
				<div
					className={styles.UserBalance}
					onClick={onClickBuy}
					style={
						UserBalance <= item.ItemPrice ? { backgroundColor: '#ededed' } : {}
					}
				>
					<p>{item.ItemPrice}</p>
					<img className={styles.SmallImg} src="../img/crystall.png" />
				</div>
			)}
			{/* Инвентарь */}
			{item.ItemObtained && (
				<div className={styles.CardButtonsWrapper}>
					{!isEdit ? (
						<div
							className={styles.CardMainButton}
							onClick={() => {
								if (item.ItemCategory === 'Avatar Frame') {
									dispatch(setEditAvatar(item))
								}
								if (item.ItemCategory === 'Character') {
									dispatch(setEditCharacter(item))
								}
							}}
						>
							Использовать
						</div>
					) : (
						<div
							className={styles.CardButton}
							// onClick={() => alert('Не используем')}
						>
							Используется
						</div>
					)}
				</div>
			)}
		</div>
	)
}
